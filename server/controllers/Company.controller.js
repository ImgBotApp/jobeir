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
  if (!req.body.company.name || !req.body.company.title || !req.body.company.content) {
    res.status(403).end();
  }

  const newCompany = new Company(req.body.company);

  // Let's sanitize inputs
  newCompany.title = sanitizeHtml(newCompany.title);
  newCompany.name = sanitizeHtml(newCompany.name);
  newCompany.content = sanitizeHtml(newCompany.content);

  newCompany.slug = slug(newCompany.title.toLowerCase(), { lowercase: true });
  newCompany.cuid = cuid();
  newCompany.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ company: saved });
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