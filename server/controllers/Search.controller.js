// @flow

import Jobs from '../models/Jobs';
import { buildJobSearchQuery } from '../util/buildSearchQuery';

/**
 * Search all jobs
 * @param req
 * @param res
 * @returns void
 */
export const searchJobs = async (
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
) => {
  const skip: number = parseFloat(req.query.s) || 0;
  const query: {} = buildJobSearchQuery(req.query);

  // 1. Query the database for a list of all stores
  const postingsPromise = Jobs.find(query)
    .populate('company')
    .skip(skip)
    .limit(20)
    .sort('-published')
    .select('-receivingEmails -description');

  const countPromise = Jobs.find(query)
    .populate('company')
    .count();

  let [postings, count] = await Promise.all([postingsPromise, countPromise]);

  /**
   * Okay, here's the thing, this needs to be done better. We shouldn't be making
   * a query and then applying a filter, but that's just the way it is now.
   */
  if (req.query.cs) {
    postings = postings.filter(
      posting => posting.company.size === req.query.cs
    );

    count = postings.length;
  }

  res.status(200).send({ data: { postings, count }, errors: [] });
};

/**
 * Get all companies
 * @param req
 * @param res
 * @returns void
 */
export const getCompanies = async (req, res) => {
  const postings = await Jobs.find({ company: req.params.companyId })
    .sort('-dateCreated')
    .populate('company');

  res.status(200).send({ data: { postings }, errors: [] });
};
