'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/services/api'

export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/protected')
        setLoading(false)
      } catch {
        router.replace('/login')
      }
    }

    checkAuth()
  }, [router])

  return { loading }
}
