import { Heading } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import Pagination from './components/Pagination'

export default function Home() {
  return (
   <main>
    {/* <Heading color='green' >Yuzzo The Creator</Heading> */}
    
    <Pagination currentPage={2} itemCount={100} pageSize={10}/>
   </main>
  )
}
