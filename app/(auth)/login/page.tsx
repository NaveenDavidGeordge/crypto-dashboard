'use client'

import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {

    try {
      const res = await api.post('/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      router.push('/dashboard')
    } catch(error : any) {
      if (error.response) {
          if (error.response.status === 401) {
            setError('Invalid email or password')
            } else {
              setError(error.response.data?.message || 'Something went wrong')
            }
        } else if (error.request) {
          setError('Technical issue. Please try again later.')
        } else {
          setError('Unexpected error occurred')
        }
    }
    
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) router.push('/dashboard')
  })

  

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80 space-y-3 rounded-md border p-6">
        <h2 className="text-lg font-semibold">Login</h2>

        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full rounded bg-black py-2 text-white"
        >
          Login
        </button>
      </div>
    </div>
  )
}
