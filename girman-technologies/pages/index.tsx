import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Girman Technologies Search</title>
        <link rel="icon" href="/logo.jpeg" />
      </Head>
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/name.jpeg" alt="Girman Technologies" className="w-80 h-25" />
        </div>
        <div className="flex space-x-4">
          <Link href="https://girmantech.com" className="text-blue-600 hover:underline">
            Website
          </Link>
          <Link href="https://www.linkedin.com/company/girmantech/" className="text-blue-600 hover:underline">
            LinkedIn
          </Link>
          <a href="mailto:contact@girmantech.com" className="text-blue-600 hover:underline">
            Contact
          </a>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <h1 className="text-7xl font-bold text-center flex items-center justify-center">
            <img src="/logo.jpeg" alt="Girman Logo" className="w-14 h-14 mr-2" />
            Girman
          </h1>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      </main>
    </div>
  )
}