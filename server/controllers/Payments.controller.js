import stripePackage from 'stripe';
import Jobs from '../models/Jobs';
import Company from '../models/Company';
import { send } from '../mail/mail';
import * as err from '../errors/types';

const stripe = stripePackage(process.env.STRIPE_PRIVATE);

/*
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export const stripeProcessor = async (req, res) => {
  const { company, customer, job, token, user } = req.body;

  const metadata = {
    companyDisplayName: company.displayName,
    companyName: company.name,
    companyId: company._id,
    jobTitle: job.title,
    jobId: job._id,
    jobCreatedAt: job.createdAt,
  };

  /**
   * If there's an existing Stripe customer we're going to assign it to
   * stripeCustomer. If there's no existing customer we'll create one
   * based off the user and source token.
   */
  let stripeCustomer = customer;

  if (!customer) {
    stripeCustomer = await stripe.customers.create({
      email: user.email,
      source: token.id,
    });
  }

  // Charge the Stripe customer
  const stripeCharge = await stripe.charges.create({
    amount: 4900, // $49
    currency: 'usd',
    description: 'Jobeir payment',
    metadata,
    customer: stripeCustomer.id,
  });

  // Update the job posting to active, published, and charged.
  const jobPosting = await Jobs.findOneAndUpdate(
    { _id: job._id },
    { state: 'active', published: Date.now(), payment: stripeCharge },
    { new: true },
  ).select('-description');

  // Update the Company profile with the stripe customer date

  /**
   * If there's an existing Stripe customer we're not going to want to update
   * the company's profile. Same technique as above.
   */
  let jobCompany = company;

  if (!customer) {
    jobCompany = await Company.findOneAndUpdate(
      { _id: company._id },
      {
        billing: {
          stripe: {
            customer: stripeCustomer,
          },
        },
      },
      { new: true },
    );
  }

  send({
    subject: `Jobeir payment confirmation`,
    template: 'PaymentConfirmation',
    charge: stripeCharge,
    company,
    job,
    user,
  });

  return res
    .status(200)
    .send({ data: { company: jobCompany, job: jobPosting }, errors: [] });
};
