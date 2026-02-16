import { Heading } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import Pagination from './components/Pagination'

export default function Home({searchParams}: {searchParams: {page: string}}) {
  return (
   <main>
    {/* <Heading color='green' >Yuzzo The Creator</Heading> */}
    
    <Pagination currentPage={parseInt(searchParams.page) || 1} itemCount={100} pageSize={10}/>
   </main>
  )
}
