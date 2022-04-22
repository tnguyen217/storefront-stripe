import { getProduct } from "./../../libs/getProduct";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const product = await getProduct(req.body.uid);
  if(product){
    if (req.method === 'POST') {
        /* 
         Create A Stripe Checkout Session
         line_items: an array/list of items the customer is purchasing (item is an object)  
         make sure the product is a whole number.
        
         mode is type of payment
             subscription: fixed price subscriptions
             setup: if you want to save customer payment details for later purchases
             payment: one time payments

        success_url: redirect page to successfull payment currently will go back to the
                     storefront index page.
    
        cancel_url: redirect page to a cancel payment  page currently will go back to the
                     storefront index page.
        */
      try {
        const session = await stripe.checkout.sessions.create({
              line_items: [
            {
              name:product.productName,
              description: product.productDescription,
              images:[product.imageUrl],
              amount: product.productPrice*100,
              currency:"CAD",
              quantity:1
  
            },
          ],
          mode: 'payment',
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
   }
}
