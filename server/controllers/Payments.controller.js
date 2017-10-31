import stripePackage from 'stripe';
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
    jobIt: job._id,
    jobCreatedAt: job.createdAt
  };

  console.log(req.body);
  // Charge the user's card:
  stripe.charges.create(
    {
      amount: 49,
      currency: 'usd',
      description: 'Jobeir payment',
      metadata,
      source: token.id
    },
    (err, charge) => {
      console.log({ err, charge });

      if (err) {
        return res.status(400).send({ data: {}, errors: [err] });
      }

      // Fire off the password reset email
      send({
        subject: `Jobeir payment confirmation`,
        template: 'PaymentConfirmation',
        charge,
        company,
        job,
        user
      });

      return res.status(200).send({ data: {}, errors: [] });

      // asynchronously called
    }
  );

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
