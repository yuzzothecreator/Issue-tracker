import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
   <main>
    <h1>Hellow world</h1>
    <Link href="/users" >New user</Link>
   </main>
  )
}
