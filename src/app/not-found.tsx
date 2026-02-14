'use client' // Error boundaries must be Client Components

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">
          Something went wrong!
        </h1>
        <div className="space-x-4 mt-8">
          <Button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors"
            variant='outline'
          >
            Try again
          </Button>
          <Button 
            onClick={() => router.push('/')}
            variant='outline'
            className="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600 transition-colors"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  )
}