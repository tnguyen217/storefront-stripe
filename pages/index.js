import { useEffect, useState } from "react"

import PageTitle from "../components/PageTitle/PageTitle"
import ProductCard from "../components/ProductCard/ProductCard"

// https://storefront-7e0ce-default-rtdb.firebaseio.com/products.json

/*
  SSG Static Site Generation
  data + compile ======> HTML + CSS ---------> egde/CDN
*/ 

export default function Home(props) {

  const products = props.products

  return (
    <>
      <PageTitle title='StoreFront' tagline="product specials"/>

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