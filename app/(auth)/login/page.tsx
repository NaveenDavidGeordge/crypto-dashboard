'use client'

// import { api } from '@/lib/api'
import { api } from '@/services/api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {

    try {
      const res = await api.post('/login', { email, password })
      console.log('Login response:', res)
      localStorage.setItem('token', res.data.token)
      router.push('/dashboard')
    } catch(error) {
      setError('Invalid login')
    }
    
  }

  

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
