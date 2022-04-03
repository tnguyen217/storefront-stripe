import PageTitle from "../components/PageTitle/PageTitle"

export default function Home() {
  // Json data array objects
  // array will be firebase data
  // 3 products
  const productData =[1,2,3,4,5]

  productData.map(item=>console.log(item))
  return (
    <>
      <PageTitle title='StoreFront' tagline="featured products"/>
      <div></div>
    </>
  )
}
