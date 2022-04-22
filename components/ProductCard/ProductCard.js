import React from 'react';
import Image from 'next/image'
import {productCard, price, name, description} from './styles.module.scss'


// const myLoader = ({ src, width, quality }) => {
//   return `${src}?w=${width}&q=${quality || 75}`
// }


function ProductCard ({children, product, ...props})  {
  const {productName, productPrice, productDescription, imageUrl, uid}= {...product}
  return (
       <aside className={productCard}>
         <header>
           <Image 
            src={imageUrl}
            alt={productName}
            width="280"
            height="500"
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

export default ProductCard