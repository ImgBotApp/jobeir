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
      q?: string, // title
      l?: string, // location
      lng?: string, // longitutde
      lat?: string, // latitude
      s?: string, // start
      cs?: string, // companySize
      d?: string, // distance
      et?: string, // employmentType
      r?: string // remote
    }
  },
  res: { status: Function }
) {
  const skip: number = parseFloat(req.query.s) || 0;
  const query: {} = buildJobSearchQuery(req.query);
  const csQuery = req.query.cs ? { 'company.size': req.query.cs } : {};

  Promise.all([
    Jobs.find(query)
      .populate('company')
      .skip(skip)
      .limit(20)
      .sort('-createdAt')
      .select('-receivingEmails -description')
      .exec(),
    Jobs.find(query).populate('company').count().exec()
  ]).then(
    (data: Array<{ postings: Array<{}>, count: number }>) => {
      let postings: Array<{}> = data[0];
      let count: number = data[1];

      // filter comapny size
      if (req.query.cs) {
        postings = postings.filter(
          posting => posting.company.size === req.query.cs
        );

        count = postings.length;
      }

      res.status(200).send({ data: { postings, count }, errors: [] });
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
