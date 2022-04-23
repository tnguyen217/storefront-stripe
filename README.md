# Plushie Next.js StoreFront

Assessment 5 - Get and display all products by Next.js and make payment by Stripe
1. Get Products
2. Checkout Session

## getProducts.js
This file is used to retrieve all product data from Firebase RTD.

1. Get Data
```javascript
    async function getProduct(uid){
        const res = await fetch(`https://storefront-7e0ce-default-rtdb.firebaseio.com/products/${uid}.json`)
        const product = await res.json()
        return product
    } 

    export { getProduct }
```

1. Pass data and map them into each ProductCard compoment in index.js
```javascript
    <main>
        {products.map(product=><ProductCard key={product.uid} product={product} />)}
    </main>
```

1. In ProductCard.js, data are reconstructed and placed in template. Buy Now button is linked with product card for checkout products
```javascript
    function ProductCard ({children, product, ...props})  {
        const {productName, productPrice, productDescription, imageUrl, uid}= {...product}
        return (
            <aside className={productCard}>
                <header>
                <Image 
                    src={imageUrl}
                    alt={productName}
                    width="380"
                    height="340"
                    className={productImage}
                    />

                </header>
                <h2 className={name}>{productName}</h2>
                <p className={price}>${productPrice}</p>
                <p className={description}>{productDescription}</p>
                <footer>
                    <form action="/api/checkout" method="POST">
                    <input type="hidden" name="uid" value={uid}/>
                    <button type="submit">Buy Now</button>
                    </form>
                </footer>
            </aside>
        )
    }
```

1. libs/checkout.js
```javascript
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
```