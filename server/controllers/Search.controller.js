// @flow

import Jobs from '../models/Jobs';
import sanitizeHtml from 'sanitize-html';
import { buildJobSearchQuery } from '../util/buildSearchQuery';

/**
 * Search all jobs
 * @param req
 * @param res
 * @returns void
 */
export function searchJobs(
  req: {
    query: {
      q?: string,
      l?: string,
      lng?: string,
      lat?: string,
      start?: string
    }
  },
  res: { status: Function }
) {
  const skip = parseFloat(req.query.start) || 0;
  const query = buildJobSearchQuery(req.query);

  Promise.all([
    Jobs.find(query)
      .skip(skip)
      .limit(15)
      .sort('-dateCreated')
      .select('-receivingEmails -description')
      .populate('company')
      .exec(),
    Jobs.find(query).count().exec()
  ]).then(
    (data: Array<{}>) => {
      res
        .status(200)
        .json(200, { data: { postings: data[0], count: data[1] }, errors: [] });
    },
    err => res.status(500).send({ data: {}, errors: [err] })
  );
}

/**
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export function getCompanies(req, res) {
  // currently just filtering GET jobs just by date added...
  Jobs.find({ company: req.params.companyId })
    .sort('-dateCreated')
    .populate('company')
    .exec((err, jobs) => {
      if (err) {
        return res.status(204).send({ data: {}, errors: [err] });
      }
      res.json({ data: { postings: jobs }, errors: [] });
    });
}
