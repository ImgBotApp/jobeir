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
  const { company, job, token, user } = req.body;
  const metadata = {
    companyDisplayName: company.displayName,
    companyName: company.name,
    companyId: company._id,
    jobTitle: job.title,
    jobId: job._id,
    jobCreatedAt: job.createdAt
  };

  // Charge the user's card:
  // stripe.charges.create(
  // {
  //   amount: 49,
  //   currency: 'usd',
  //   description: 'Jobeir payment',
  //   metadata,
  //   source: token.id,
  // },
  //   (err, charge) => {
  //     console.log({ err, charge });

  //     if (err) {
  //       return res.status(400).send({ data: {}, errors: [err] });
  //     }

  //     // Fire off the password reset email
  //     send({
  //       subject: `Jobeir payment confirmation`,
  //       template: 'PaymentConfirmation',
  //       charge,
  //       company,
  //       job,
  //       user,
  //     });

  // return res.status(200).send({ data: {}, errors: [] });

  //     // asynchronously called
  //   },
  // );

  // Create a stripe customer
  const stripeCustomer = await stripe.customers.create({
    email: user.email,
    source: token.id
  });

  // Charge the new stripe customer
  const stripeCharge = await stripe.charges.create({
    amount: 49,
    currency: 'usd',
    description: 'Jobeir payment',
    metadata,
    customer: stripeCustomer.id
  });

  // const jobPosting = await Jobs.findOne({ _id: job._id }).select(
  //   '-description',
  // );

  const jobPosting = await Jobs.findOneAndUpdate(
    { _id: job._id },
    { state: 'active', published: Date.now(), payment: stripeCharge },
    { new: true }
  ).select('-description');

  const jobCompany = await Company.findOneAndUpdate(
    { _id: company._id },
    {
      billing: {
        stripe: {
          customer: stripeCustomer,
          card: stripeCharge.source
        }
      }
    },
    { new: true }
  );

  console.log('charge');
  console.log('charge');
  console.log('charge');
  console.log(stripeCustomer);

  console.log('charge');
  console.log('charge');
  console.log('charge');
  console.log(stripeCharge);

  send({
    subject: `Jobeir payment confirmation`,
    template: 'PaymentConfirmation',
    charge: stripeCharge,
    company,
    job,
    user
  });
  // });

  return res
    .status(200)
    .send({ data: { company: jobCompany, job: jobPosting }, errors: [] });

  // YOUR CODE (LATER): When it's time to charge the customer again, retrieve the customer ID.
  // stripe.charges.create({
  //   amount: 1500, // $15.00 this time
  //   currency: 'cad',
  //   customer: customerId,
  // });

  // console.log(payment);
  //   (err, charge) => {
  //     console.log({ err, charge });
  //     // asynchronously called
  //   },
  // );
  // );

  // Create a Customer:
  // stripe.customers
  //   .create({
  //     email: 'paying.user@example.com',
  //     source: token.id,
  //   })
  //   .then(customer =>
  //     // YOUR CODE: Save the customer ID and other info in a database for later.
  //     console.log('Customer ID', customer.id);
  //     stripe.charges.create({
  //       amount: 49,
  //       currency: 'usd',
  //       customer: customer.id,
  //     }),
  //   )
  //   .then(charge => {
  //     // Use and save the charge info.
  //   });

  // console.log(payment);
  //   (err, charge) => {
  //     console.log({ err, charge });
  //     // asynchronously called
  //   },
  // );
};
