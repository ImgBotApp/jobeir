import Job from '../models/Job';
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
export function getJobs(req, res) {
  // currently just filtering GET jobs just by date added...
  Job.find({ company: req.params.companyId })
    .sort('-dateAdded')
    .exec((err, jobs) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ data: { postings: jobs }, errors: [] });
    });
}

/**
 * Get a single job
 * @param req
 * @param res
 * @returns void
 */
export function getJob(req, res) {
  Job.findOne({ _id: req.params.jobId })
    .populate('company')
    .exec((err, job) => {
      if (err) {
        res.status(500).send(err);
      }

      if (!job) {
        res.status(204).send({
          data: {},
          errors: [
            {
              error: 'UNABLE_TO_FIND_JOB',
              message: 'Unable to find job'
            }
          ]
        });
      } else {
        res.json({ data: { posting: job }, errors: [] });
      }
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
    res.status(400).end();
  }

  const newJob = new Job(req.body);

  newJob.description.blocks = newJob.description.blocks;
  newJob.receivingEmails = newJob.receivingEmails;

  // Let's sanitize inputs
  newJob.company = sanitizeHtml(req.params.companyId);
  newJob.title = sanitizeHtml(newJob.title.label);
  newJob.employmentType = sanitizeHtml(newJob.employmentType);
  newJob.address = newJob.address;
  newJob.remote = sanitizeHtml(newJob.remote);
  newJob.salaryMin = sanitizeHtml(newJob.salaryMin);
  newJob.salaryMax = sanitizeHtml(newJob.salaryMax);
  newJob.equityMin = sanitizeHtml(newJob.equityMin || 0);
  newJob.equityMax = sanitizeHtml(newJob.equityMax || 0);
  newJob.offerEquity = sanitizeHtml(newJob.offerEquity);
  newJob.slug = slug(newJob.title.toLowerCase(), { lowercase: true });
  newJob.cuid = cuid();

  // Add the company to the current user
  Company.findOne({ _id: newJob.company }, function(err, company) {
    if (err) throw err;

    company.jobs.push(newJob._id);

    company.save(err => {
      if (err) {
        res.status(500).send({
          data: {},
          errors: [
            {
              error: 'INTERNAL_SERVER_ERROR',
              message: `There was an error creating the job ${newJob.title}`
            }
          ]
        });
      }
    });
  });

  newJob.save((err, saved) => {
    if (err) {
      res.status(409).send({
        data: {},
        errors: [
          {
            error: 'UNABLE_TO_CREATE_JOB',
            message: `Unable to create the job ${req.body.title.label}`
          }
        ]
      });
    } else {
      res.status(200).send({
        data: { job: saved },
        errors: []
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
  Job.findOne({ _id: req.params.id }).exec((err, job) => {
    if (err) {
      res.status(500).send(err);
    }

    job.remove(() => {
      res.status(200).end();
    });
  });
}
