import Job from '../models/Job';
import sanitizeHtml from 'sanitize-html';

/**
 * To do
 * Search by job title
 *  - based on fuzzy return of title string
 * Search by job location
 *  - based on coordinates, and city
 */
export function getJobs(req, res) {
  Job.find({ company: req.params.companyId })
    .sort('-dateCreated')
    .populate('company')
    .exec((err, jobs) => {
      if (err) {
        return res.status(204).send({ data: {}, errors: [err] });
      } else {
        res.json({ data: { postings: jobs }, errors: [] });
      }
    });
}

/**
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export function getCompanies(req, res) {
  // currently just filtering GET jobs just by date added...
  Job.find({ company: req.params.companyId })
    .sort('-dateCreated')
    .populate('company')
    .exec((err, jobs) => {
      if (err) {
        return res.status(204).send({ data: {}, errors: [err] });
      } else {
        res.json({ data: { postings: jobs }, errors: [] });
      }
    });
}
