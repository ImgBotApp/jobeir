import Company from '../models/Company';
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
export function addCompany(req, res) {
  if (!req.body.name || !req.body.website || !req.body.product) {
    res.status(403).end();
  }

  const newCompany = new Company(req.body);

  // Let's sanitize inputs
  newCompany.name = sanitizeHtml(newCompany.name);
  newCompany.website = sanitizeHtml(newCompany.website);
  newCompany.product = sanitizeHtml(newCompany.product);
  newCompany.location = sanitizeHtml(newCompany.location);

  newCompany.slug = slug(newCompany.name.toLowerCase(), { lowercase: true });
  newCompany.cuid = cuid();
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
        });
    }
    res
      .status(200)
      .send({
        data: { comany: saved },
        errors: []
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