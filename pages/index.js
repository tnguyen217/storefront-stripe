import { useEffect, useState } from "react"

import PageTitle from "../components/PageTitle/PageTitle"
import {Button} from '../components/Button'
import {User} from "../components/User"


export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(()=>{
    async function loadExternalDataCRAWay(){
      const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
      const data = await res.json()
      setUserData(data)

    }
    loadExternalDataCRAWay()

  },[])


  return (
    <>
      <PageTitle title='StoreFront' tagline="featured products"/>
      <div 
        style={{textAlign:"center"}}
        onClick={()=>setIsLoading(!isLoading)}
      >
        <Button style={{margin:"2rem 0 0"}} >Get some data</Button>
        {
          isLoading && <p style={{padding:"1rem"}}>This is my output</p>
        }
      </div>
      <main>
        {
          userData.map(({id, name, email, username}) => <User key={id} name={name} email={email} username={username} />)

        }

      </main>
    </>
  )
}
