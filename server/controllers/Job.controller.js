import Job from '../models/Job';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export function getJobs(req, res) {
  Job.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Get a single job
 * @param req
 * @param res
 * @returns void
 */
export function getJob(req, res) {
  Job.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Create a job
 * @param req
 * @param res
 * @returns void
 */
export function createJob(req, res) {
  if (!req.body.title) {
    res.status(403).end();
  }
  const newJob = new Job(req.body);

  newJob.description.blocks = newJob.description.blocks;

  // Let's sanitize inputs
  newJob.company = sanitizeHtml(newJob.company);
  newJob.title = sanitizeHtml(newJob.title.label);
  newJob.employmentType = sanitizeHtml(newJob.employmentType);
  newJob.locations = sanitizeHtml(newJob.locations);
  newJob.remote = sanitizeHtml(newJob.remote);
  newJob.salaryMin = sanitizeHtml(newJob.salaryMin);
  newJob.salaryMax = sanitizeHtml(newJob.salaryMax);
  newJob.equityMin = sanitizeHtml(newJob.equityMin);
  newJob.equityMax = sanitizeHtml(newJob.equityMax);
  newJob.offerEquity = sanitizeHtml(newJob.offerEquity);

  newJob.slug = slug(newJob.title.toLowerCase(), { lowercase: true });
  newJob.cuid = cuid();

  newJob.save((err, saved) => {
    if (err) {
      res.status(409).send({
        data: {},
        errors: [
          {
            error: 'UNABLE_TO_CREATE_JOB',
            message: `Unable to create the job ${req.body.title.label}`,
          },
        ],
      });
    } else {
      res.status(200).send({
        data: { job: saved },
        errors: [],
      });
    }
  });
}

/**
 * Delete a job
 * @param req
 * @param res
 * @returns void
 */
export function deleteJob(req, res) {
  Job.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
