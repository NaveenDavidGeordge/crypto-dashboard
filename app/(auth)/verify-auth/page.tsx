'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/services/api'
import { otpRegex } from '@/utils/validators'

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!otpRegex.test(otp)) {
      setError('Enter a valid 6-digit OTP')
      return
    }

    try {
      setLoading(true)

      await api.post('/auth/verify-otp', { otp })

      router.push('/dashboard')
    } catch {
      setError('Invalid or expired OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Verify OTP</h1>

      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          placeholder="6-digit code"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          maxLength={6}
          className="w-full rounded-md border px-3 py-2 text-center tracking-widest"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </>
  )
}
