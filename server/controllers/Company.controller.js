import Company from '../models/Company';
import Users from '../models/Users';
import Invite from '../models/Invite';
import sanitizeHtml from 'sanitize-html';
import { send } from '../mail/mail';

/**
 * Get all Companies
 * @param req
 * @param res
 * @returns void
 */
export const getCompanies = async (req, res) => {
  const companies = await Company.find().sort('-dateAdded').exec();

  if (!companies) throw Error('ERROR_GETTING_COMPANIES');

  res.status(200).send({ data: companies, errors: [] });
};
/**
 * Check if a company exists
 * @param req
 * @param res
 * @returns void
 */
export const checkCompany = async (req, res) => {
  const company = await Company.findOne({
    name: req.params.name.toLowerCase()
  }).exec();

  if (company) throw Error('COMPANY_ALREADY_EXISTS');

  res.status(200).send({
    data: {},
    errors: []
  });
};

/**
 * Save a Company
 * @param req
 * @param res
 * @returns void
 */
export const createCompany = async (req, res) => {
  const { body, user: { _id } } = req;

  const company = await new Company({
    creator: _id,
    members: [{ member: _id }],
    name: sanitizeHtml(body.name.toLowerCase()),
    displayName: sanitizeHtml(body.name),
    website: sanitizeHtml(body.website),
    size: sanitizeHtml(body.size),
    perks: sanitizeHtml(body.perks),
    product: sanitizeHtml(body.product),
    phone: sanitizeHtml(body.phone)
  }).save();

  if (!company) throw Error('ERROR_CREATING_COMPANY');

  const user = await Users.findOne({ _id: req.user._id }).exec();
  if (!user) throw Error('ERROR_CREATING_COMPANY');

  user.companies.push(company._id);
  user.activeCompany = {
    _id: company._id,
    displayName: company.displayName,
    name: company.name
  };

  user.save();

  res.status(200).send({
    data: { company },
    errors: []
  });
};

/**
 * Update a single Company
 * @param req
 * @param res
 * @returns void
 */
export const updateCompany = async (req, res) => {
  const values = req.body;

  const company = await Company.findOneAndUpdate(
    { _id: req.params.id },
    { ...values },
    { new: true }
  ).exec();

  if (!company) throw Error('ERROR_UPDATING_COMPANY');

  res.status(200).send({
    data: { company },
    errors: []
  });
};

/**
 * Update a single Company
 * @param req
 * @param res
 * @returns void
 */
export const inviteCompanyMember = async (req, res) => {
  // find if the member to invite exists
  const user = await Users.findOne({ email: req.body.email }).exec();
  if (!user) throw Error('ERROR_FINDING_USER');

  const company = await Company.findOne({
    _id: req.params.id
  }).exec();
  if (!company) throw Error('ERROR_FINDING_COMPANY');
  // create the invitation

  // check to see if the member has already been invited
  const memberExists = company.members.some(member =>
    member._id.equals(user._id)
  );
  // check to see if the member has already been invited
  const inviteExists = company.invites.some(
    invite => invite && invite.invitee.equals(user._id)
  );

  // throw an error if either exists
  if (memberExists) throw Error('USER_ALREADY_ADDED');
  if (inviteExists) throw Error('USER_ALREADY_ADDED');

  const invite = await new Invite({
    creator: req.user._id,
    invitee: user._id,
    company: company._id
  }).save();

  // Add the invite to the company and user
  user.invites.push(invite._id);
  company.invites.push(invite._id);

  // save the udpated user and comapny
  user.save();
  company.save();

  // changing protocol for local testing
  const protocol = req.headers.host.includes('localhost')
    ? 'http://'
    : 'https://';
  const resetUrl = `${protocol}${req.headers.host}/invite/${invite._id}`;

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
};

export const acceptInviteCompanyMember = async (req, res) => {
  const invite = await Invite.findOne({
    _id: req.params.inviteId,
    expires: { $gt: Date.now() }
  }).exec();

  if (!invite) throw Error('INVALID_INVITE_TOKEN');

  invite.accepted = true;
  invite.dateAccepted = Date.now();

  invite.save();

  const company = await Company.findOne({
    _id: req.params.id
  }).exec();

  if (!company) throw Error('ERROR_FINDING_COMPANY');

  const user = await Users.findOne({ _id: req.user._id }).exec();
  if (!user) throw Error('ERROR_FINDING_USER');

  const memberExists = company.members.some(member =>
    member._id.equals(req.user._id)
  );

  if (memberExists) {
    throw Error('USER_ALREADY_PART_OF_COMPANY');
  }

  /**
   * We know that if the user has not been added to a company or created
   * a company that this is their only company so we make it their active
   * company by default
   */
  if (user.companies.length === 0) {
    user.activeCompany = {
      _id: company._id,
      displayName: company.displayName,
      name: company.name
    };
  }

  user.companies.push(company._id);
  company.members.push(req.user._id);

  company.save();
  user.save();

  return res.status(200).send({
    data: { company },
    errors: []
  });
};

/**
 * Get a single Company
 * @param req
 * @param res
 * @returns void
 */
export const removeCompanyMember = async (req, res) => {
  const company = await Company.findOne({ _id: req.params.id }).exec();
  if (!company) throw Error('ERROR_FINDING_COMPANY');

  const user = await Users.findOne({ _id: req.params.memberId }).exec();
  if (!user) throw Error('ERROR_FINDING_USER');

  const companyIndex = user.companies
    .map(comp => comp._id)
    .indexOf(req.params.id);

  const userIndex = company.members
    .map(member => member._id)
    .indexOf(req.params.memberId);

  user.companies.splice(companyIndex, 1);
  company.members.splice(userIndex, 1);

  user.save();
  company.save();

  return res.status(200).send({
    data: { company },
    errors: []
  });
};

/**
 * Get a single Company
 * @param req
 * @param res
 * @returns void
 */
export const getCompany = async (req, res) => {
  const company = await Company.findOne({ _id: req.params.id }).exec();

  if (!company) throw Error('ERROR_FINDING_COMPANY');

  res.status(200).send({ data: { company }, errors: [] });
};

/**
 * Delete a Company
 * @param req
 * @param res
 * @returns void
 */
export const deleteCompany = async (req, res) => {
  const company = await Company.findOne({ _id: req.params.id }).remove();

  return res.status(200).send({ data: { company }, errors: [] });
};

/**
 * Upload an image to a Company
 * @param req
 * @param res
 * @returns void
 */
export const upload = async (req, res) => {
  const company = await Company.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      logo: req.body.path
    },
    { new: true }
  );

  if (!company) throw Error('ERROR_UPLOADING_LOGO');

  return res.status(200).send({
    data: { company },
    errors: []
  });
};
