import Company from '../models/Company';
import User from '../models/User';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

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
 * Save a Company
 * @param req
 * @param res
 * @returns void
 */
export function createCompany(req, res) {
  if (!req.body.name || !req.body.website || !req.body.product) {
    res.status(403).end();
  }

  const newCompany = new Company(req.body);

  // Let's sanitize inputs
  newCompany.name = sanitizeHtml(newCompany.name);
  newCompany.website = sanitizeHtml(newCompany.website);
  newCompany.product = sanitizeHtml(newCompany.product);
  newCompany.location = sanitizeHtml(newCompany.location);
  newCompany.phone = sanitizeHtml(newCompany.phone);

  newCompany.slug = slug(newCompany.name.toLowerCase(), { lowercase: true });
  newCompany.cuid = cuid();

  // Add the company to the current user
  User.findOne({ _id: req.body.id }, function(err, user) {
    if (err) throw err;

    user.companies.created.push({
      name: req.body.name,
      date: new Date(),
    });

    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .send({
            data: {},
            errors: [{
              error: "INTERNAL_SERVER_ERROR",
              message:`There was an error creating the company ${req.body.name}`
            }],
          })
      }
    });
  });
  
  newCompany.save((err, saved) => {
    if (err) {
      res
        .status(409)
        .send({
          data: {},
          errors: [{
            error: "COMPANY_ALREADY_EXISTS",
            message:`The company ${req.body.name} already exists`
          }],
        })
    } else {
      res
        .status(200)
        .send({
          data: { company: saved },
          errors: []
        });
    }
  });
}

/**
 * Get a single Company
 * @param req
 * @param res
 * @returns void
 */
export function getCompany(req, res) {
  Company.findOne({ name: req.params.name }).exec((err, company) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ company });
  });
}

/**
 * Delete a Company
 * @param req
 * @param res
 * @returns void
 */
export function deleteCompany(req, res) {
  Company.findOne({ cuid: req.params.cuid }).exec((err, company) => {
    if (err) {
      res.status(500).send(err);
    }

    company.remove(() => {
      res.status(200).end();
    });
  });
}