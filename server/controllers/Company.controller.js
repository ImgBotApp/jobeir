import Company from '../models/Company';
import Users from '../models/Users';
import Invite from '../models/Invite';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import { send } from '../mail/mail';

/**
 * Get all Companies
 * @param req
 * @param res
 * @returns void
 */
export function getCompanies(req, res) {
  Company.find().sort('-dateAdded').exec((err, companies) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ companies });
  });
}
/**
 * Check if a company exists
 * @param req
 * @param res
 * @returns void
 */
export function checkCompany(req, res) {
  Company.findOne({
    name: req.params.name.toLowerCase()
  }).exec((err, company) => {
    if (err) {
      res.status(500).send(err);
    }

    // if there is a company return an error
    if (company) {
      res.status(409).send({
        data: {},
        errors: [
          {
            error: 'COMPANY_ALREADY_EXISTS',
            message: `The company ${req.params.name} already exists`
          }
        ]
      });
    } else {
      // if no company exists, let the user continue
      res.status(200).send({
        data: {},
        errors: []
      });
    }
  });
}

/**
 * Save a Company
 * @param req
 * @param res
 * @returns void
 */
export function createCompany(req, res) {
  if (!req.body.name || !req.body.website || !req.body.product) {
    return res.status(403).end();
  }

  const newCompany = new Company(req.body);

  // Let's sanitize inputs
  newCompany.creator = req.user._doc._id;
  newCompany.members.push(req.user._doc._id);
  newCompany.name = sanitizeHtml(newCompany.name.toLowerCase());
  newCompany.displayName = sanitizeHtml(req.body.name);
  newCompany.website = sanitizeHtml(newCompany.website);
  newCompany.size = sanitizeHtml(newCompany.size);
  newCompany.perks = newCompany.perks;
  newCompany.product = sanitizeHtml(newCompany.product);
  newCompany.phone = sanitizeHtml(newCompany.phone);

  newCompany.slug = slug(newCompany.name.toLowerCase(), { lowercase: true });
  newCompany.cuid = cuid();

  // Add the company to the current user
  Users.findOne({ _id: req.user._doc._id }, (err, user) => {
    if (err) throw err;

    user.companies.push(newCompany._id);

    user.activeCompany = {
      _id: newCompany._id,
      displayName: newCompany.displayName,
      name: newCompany.name
    };

    user.save(err => {
      if (err) {
        res.status(500).send({
          data: {},
          errors: [
            {
              error: 'INTERNAL_SERVER_ERROR',
              message: `There was an error creating the company ${req.body
                .name}`
            }
          ]
        });
      }
    });
  });

  newCompany.save((err, saved) => {
    if (err) {
      res.status(409).send({
        data: {},
        errors: [
          {
            error: 'COMPANY_ALREADY_EXISTS',
            message: `The company ${req.body.name} already exists`
          }
        ]
      });
    } else {
      res.status(200).send({
        data: { company: saved },
        errors: []
      });
    }
  });
}

/**
 * Update a single Company
 * @param req
 * @param res
 * @returns void
 */
export function updateCompany(req, res) {
  const values = req.body;

  Company.findOneAndUpdate(
    { _id: req.params.id },
    { ...values },
    { new: true }
  ).exec((err, company) => {
    if (err) return res.status(500).send({ error: err });

    res.status(200).send({
      data: { company },
      errors: []
    });
  });
}

/**
 * Update a single Company
 * @param req
 * @param res
 * @returns void
 */
export function inviteCompanyMember(req, res) {
  // find if the member to invite exists
  Users.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(500).send({
        data: [],
        errors: [
          {
            error: 'INVALID_USER',
            message: `A user with email ${req.body.email} does not exist.`
          }
        ]
      });
    }

    // if they don't exist, send back an error object
    if (!user) {
      return res.status(200).send({
        data: [],
        errors: [
          {
            error: 'INVALID_USER',
            message: `A user with email ${req.body.email} does not exist.`
          }
        ]
      });
    }

    // create the invitation

    Company.findOne({
      _id: req.params.id
    })
      .populate('invites')
      .exec((err, company) => {
        if (err) return res.status(500).send({ data: {}, error: err });

        // check to see if the member has already been invited
        const memberExists = company.members.some(member =>
          member._id.equals(user._id)
        );
        // check to see if the member has already been invited
        const inviteExists = company.invites.some(
          invite => invite._id && invite._id.equals(user._id)
        );

        if (memberExists || inviteExists) {
          return res.status(200).send({
            data: [],
            errors: [
              {
                error: 'USER_ALREADY_ADDED',
                message: memberExists
                  ? `${req.body.email} has already joined.`
                  : `${req.body.email} has already received an invite.`
              }
            ]
          });
        }

        const invite = new Invite({
          creator: req.user._doc._id,
          company: company._id
        });

        invite.save();

        user.invites.push(invite._id);
        company.invites.push(invite._id);

        user.save((err, user) => {
          if (err) return res.status(500).send({ data: {}, error: err });
        });

        company.save((err, company) => {
          if (err) {
            return res.status(500).send({
              data: {},
              errors: [
                {
                  error: 'INTERNAL_SERVER_ERROR',
                  message: 'There was an error updating your password'
                }
              ]
            });
          }

          // changing protocol for local testing
          const protocol = req.headers.host.includes('localhost')
            ? 'http://'
            : 'https://';
          const resetUrl = `${protocol}${req.headers
            .host}/invite/${invite._id}`;

          // Fire off the password reset email
          send({
            subject: `Invitation to join ${company.displayName}`,
            template: 'CompanyInvite',
            user,
            company,
            resetUrl
          });

          return res.status(200).send({
            data: { company },
            errors: []
          });
        });
      });
  });
}

export function acceptInviteCompanyMember(req, res) {
  Invite.findOne({
    _id: req.params.inviteId,
    expires: { $gt: Date.now() }
  }).exec((err, invite) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!invite) {
      return res.status(401).send({
        data: [],
        errors: [
          {
            error: 'EXPIRED_INVITE_TOKEN',
            message:
              'Unable to update password. Your reset password link has timed out.'
          }
        ]
      });
    }

    invite.accepted = true;
    invite.dateAccepted = Date.now();

    invite.save();

    Company.findOne({
      _id: req.params.id
    })
      .populate()
      .exec((err, company) => {
        if (err) return res.status(500).send({ data: {}, error: err });

        const memberExists = company.members.some(member =>
          member._id.equals(req.user._doc._id)
        );

        if (!memberExists) {
          company.members.push(req.user._doc._id);
        }

        company.save((err, company) => {
          if (err) {
            return res.status(500).send({
              data: {},
              errors: [
                {
                  error: 'INTERNAL_SERVER_ERROR',
                  message: 'There was an error updating your password'
                }
              ]
            });
          }

          return res.status(200).send({
            data: { company },
            errors: []
          });
        });
      });
  });
}

/**
 * Get a single Company
 * @param req
 * @param res
 * @returns void
 */
export function getCompany(req, res) {
  Company.findOne({ _id: req.params.id }).exec((err, company) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ data: { company }, errors: [] });
  });
}

/**
 * Delete a Company
 * @param req
 * @param res
 * @returns void
 */
export function deleteCompany(req, res) {
  Company.findOne({ _id: req.params.id }).exec((err, company) => {
    if (err) {
      res.status(500).send(err);
    }

    company.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Upload an image to a Company
 * @param req
 * @param res
 * @returns void
 */
export const upload = (req, res, next) => {
  Company.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      logo: req.body.path
    },
    { new: true },
    (err, company) => {
      if (err) return res.status(500).send({ error: err });

      return res.status(200).send({
        data: { company },
        errors: []
      });
    }
  );
};
