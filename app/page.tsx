import { Heading } from '@radix-ui/themes'
import LatestIssues from './LatestIssues'

export default function Home({searchParams}: {searchParams: {page: string}}) {
  return (
   <main>
    <Heading color='green' >Yuzzo The Creator</Heading>
    <LatestIssues />
   </main>
  )
}
