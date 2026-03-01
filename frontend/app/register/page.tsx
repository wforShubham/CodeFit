'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/store'
import api from '@/lib/api'
import { Sparkles, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'JOB_SEEKER',
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/auth/register', formData)
      setSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col items-center justify-center p-6">
        <div className="fixed inset-0 z-0 flex justify-center pointer-events-none">
          <div className="absolute top-[-20%] w-[1000px] h-[600px] bg-green-500/10 blur-[120px] rounded-full" />
        </div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="w-full max-w-sm rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm shadow-2xl relative z-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-xl font-medium tracking-tight text-white mb-2">Check your inbox</h2>
          <p className="text-zinc-400 font-light text-sm mb-8 leading-relaxed">
            We've sent a verification link to <br /><span className="font-medium text-white">{formData.email}</span>
          </p>
          <Link
            href="/login"
            className="flex items-center justify-center w-full h-11 bg-white hover:bg-zinc-200 text-black rounded-xl font-medium transition-transform active:scale-[0.98]"
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 flex justify-center pointer-events-none">
        <div className="absolute bottom-[-20%] w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20" />
              <Sparkles className="w-4 h-4 text-white relative z-10" />
            </div>
            <span className="font-medium tracking-tight text-white">CodeFit</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Register Form */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Create an account</h1>
            <p className="text-sm text-zinc-400 font-light">Join CodeFit to start interviewing</p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-zinc-300">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all font-light"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-zinc-300">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all font-light"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-zinc-300">
                  I want to
                </Label>
                <Select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all font-light appearance-none"
                >
                  <option value="JOB_SEEKER" className="bg-[#121214]">Find a Job (Candidate)</option>
                  <option value="INTERVIEWER" className="bg-[#121214]">Interview Candidates</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-zinc-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full h-11 px-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all font-light"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-white hover:bg-zinc-200 text-black rounded-xl font-medium transition-transform active:scale-[0.98] mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </span>
                ) : (
                  'Create account'
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-x-0 h-px bg-white/5" />
                <span className="relative bg-[#0d0d0f] px-4 text-xs tracking-wider uppercase text-zinc-500 font-medium">
                  Or sign up with
                </span>
              </div>

              {/* Google OAuth Button */}
              <Button
                type="button"
                onClick={() => window.location.href = 'http://localhost:3001/api/auth/google'}
                className="w-full h-11 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl font-medium flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Google</span>
              </Button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <span className="text-zinc-500 text-sm font-light">Already have an account? </span>
            <Link href="/login" className="text-white hover:underline text-sm font-medium transition-all">
              Sign in instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
