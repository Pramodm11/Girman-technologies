import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star } from 'lucide-react'

interface User {
  id: number
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  email: string
  company: string
  jobTitle: string
  rating: number
}

export default function SearchResults() {
  const router = useRouter()
  const { q } = router.query
  const [searchTerm, setSearchTerm] = useState(q as string || '')
  const [results, setResults] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (q) {
      fetchResults(q as string)
    }
  }, [q])

  const fetchResults = async (query: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error fetching results:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Search Results - Girman Technologies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img src="/logo.jpeg" alt="Girman Technologies Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-900">Girman</span>
          </Link>
          <form onSubmit={handleSearch} className="flex-grow max-w-2xl mx-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </form>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Search Results for "{q}"</h2>
          {loading ? (
            <p>Loading...</p>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((user) => (
                <Card key={user.id} className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <img src="/logo.jpeg" alt={`${user.firstName} ${user.lastName}`} className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < user.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{user.phoneNumber}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Fetch Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{user.firstName} {user.lastName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          <p><strong>Email:</strong> {user.email}</p>
                          <p><strong>Phone:</strong> {user.phoneNumber}</p>
                          <p><strong>Address:</strong> {user.address}</p>
                          <p><strong>Company:</strong> {user.company}</p>
                          <p><strong>Job Title:</strong> {user.jobTitle}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <img src="/placeholder.svg?height=200&width=200" alt="No results" className="mx-auto mb-4" />
              <p className="text-xl font-semibold">No results found</p>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}