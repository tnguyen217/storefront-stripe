import Head from "next/head"

import { loadStripe } from "@stripe/stripe-js"

import PageTitle from "../components/PageTitle/PageTitle"
import ProductCard from "../components/ProductCard/ProductCard"

// https://storefront-7e0ce-default-rtdb.firebaseio.com/products.json

/*
  SSG Static Site Generation
  data + compile ======> HTML + CSS ---------> egde/CDN
*/ 

export default function Home(props) {

  const products = props.products

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>StoreFront</title>
      </Head>

      <PageTitle title='Plushie' tagline="New Products"/>

      <main>
          {products.map(product=><ProductCard key={product.uid} product={product} />)}
      </main>
    </>
  )
}


/*
  getStaticProps ============> Server node.js
*/ 
export async function getStaticProps(){

  const res = await fetch('https://storefront-7e0ce-default-rtdb.firebaseio.com/products.json')
  const productData = await res.json()
  const products = Object.values(productData)

  return {
    props: {
      products
    }
    
  }
}