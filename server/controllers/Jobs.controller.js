import Jobs from '../models/Jobs';
import Company from '../models/Company';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export const getJobs = async (req, res) => {
  // currently just filtering GET jobs just by date added...
  const postings = await Jobs.find({ company: req.params.companyId })
    .sort('-dateCreated')
    .select('-description')
    .exec();

  if (!postings) throw Error('UNABLE_TO_FIND_JOBS');

  res.stats(200).send({ data: { postings }, errors: [] });
};

/**
 * Get a single job
 * @param req
 * @param res
 * @returns void
 */
export const getJob = async (req, res) => {
  const posting = await Jobs.findOne({ _id: req.params.jobId })
    .select('-description')
    .exec();

  if (!posting) throw Error('UNABLE_TO_FIND_JOB');

  res.status(200).send({ data: { posting }, errors: [] });
};

/**
 * Create a job
 * @param req
 * @param res
 * @returns void
 */
export const createJob = async (req, res) => {
  const { body, params } = req;

  const job = await new Jobs({
    description: {
      blocks: body.description.blocks
    },
    descriptionRaw: body.descriptionRaw,
    receivingEmails: body.receivingEmails,
    company: params.companyId,
    role: body.role,
    title: body.title,
    employmentType: body.employmentType,
    location: body.location,
    remote: body.remote,
    salary: {
      max: body.salary.max,
      min: body.salary.min
    },
    equity: {
      max: body.equity.max || 0,
      min: body.equity.min || 0,
      offer: body.equity.offer
    }
  }).save();

  if (!job) throw Error('UNABLE_TO_CREATE_JOB');

  // Add the company to the current user
  const company = await Company.findOne({ _id: job.company });
  if (!company) throw Error('UNABLE_TO_FIND_COMPANY');

  company.jobs.push(job._id);
  company.save();

  res.status(200).send({
    data: { job },
    errors: []
  });
};

/**
 * Update a single Job
 * @param req
 * @param res
 * @returns void
 */
export const updateJob = async (req, res) => {
  const values = req.body;

  const posting = await Jobs.findOneAndUpdate(
    { _id: req.params.jobId },
    { ...values },
    { new: true }
  ).exec();

  if (!posting) throw Error('UNABLE_TO_UPDATE_JOB');

  res.status(200).send({
    data: { posting },
    errors: []
  });
};

/**
 * Delete a job
 * @param req
 * @param res
 * @returns void
 */
export const deleteJob = async (req, res) => {
  const job = await Jobs.findOne({ _id: req.params.jobId }).exec();

  if (!job) throw Error('UNABLE_TO_FIND_JOB');

  job.remove();

  res.status(200).send({
    data: {},
    errors: []
  });
};
