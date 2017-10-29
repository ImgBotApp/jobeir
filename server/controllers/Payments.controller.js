// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE);

/*
 * Get all jobs
 * @param req
 * @param res
 * @returns void
 */
export const stripeProcessor = async (req, res) => {
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken; // Using Express

  // Charge the user's card:
  const payment = await stripe.charges.create({
    amount: 49,
    currency: 'usd',
    description: 'Jobeir payment',
    source: token
  });

  console.log(payment);
  //   (err, charge) => {
  //     console.log({ err, charge });
  //     // asynchronously called
  //   },
  // );

  res.status(200).send({ data: {}, errors: [] });
};
