import Jobs from '../models/Jobs';
import sanitizeHtml from 'sanitize-html';

/**
 * To do
 * Search by job title
 *  - based on fuzzy return of title string
 * Search by job location
 *  - based on coordinates, and city
 */
export function searchJobs(req, res) {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);

  // build query based on coordinates
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 10000
      }
    },
    'role.value': req.query.q
  };

  // find Jobs based on coordinates
  Jobs.find(q)
    .sort('-dateCreated')
    .select('-receivingEmails')
    .populate('company')
    .exec((err, jobs) => {
      if (err) {
        return res.status(204).send({ data: {}, errors: [err] });
      } else {
        res.json({ data: { postings: jobs }, errors: [] });
      }
    });

  // Job.find({}).sort('-dateCreated').populate('company').exec((err, jobs) => {
  //   if (err) {
  //     return res.status(204).send({ data: {}, errors: [err] });
  //   } else {
  //     res.json({ data: { postings: jobs }, errors: [] });
  //   }
  // });
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
      } else {
        res.json({ data: { postings: jobs }, errors: [] });
      }
    });
}
