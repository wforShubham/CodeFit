'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store'
import api from '@/lib/api'
import { Briefcase, Users } from 'lucide-react'

export default function OnboardingPage() {
    const router = useRouter()
    const { user, setAuth, accessToken, refreshToken } = useAuthStore()
    const [selectedRole, setSelectedRole] = useState<'JOB_SEEKER' | 'INTERVIEWER' | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleComplete = async () => {
        if (!selectedRole) {
            setError('Please select a role')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await api.patch('/users/onboarding', { role: selectedRole })
            const updatedUser = response.data

            // Update user in store
            if (user && accessToken && refreshToken) {
                setAuth(updatedUser, accessToken, refreshToken)
            }

            // Redirect to welcome page
            router.push('/welcome')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to complete onboarding')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-6">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-cyan-900/10" />
            <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10 max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome to CodeFit!</h1>
                    <p className="text-slate-300 text-lg">Let's get you set up. What brings you here?</p>
                </div>

                {/* Role Selection Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Job Seeker Card */}
                    <button
                        onClick={() => setSelectedRole('JOB_SEEKER')}
                        className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${selectedRole === 'JOB_SEEKER'
                                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                                : 'border-slate-700 bg-slate-800/50 hover:border-blue-500/50 hover:bg-slate-800'
                            }`}
                    >
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${selectedRole === 'JOB_SEEKER'
                                ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                                : 'bg-slate-700 group-hover:bg-blue-500/20'
                            }`}>
                            <Briefcase className={`w-8 h-8 transition-colors ${selectedRole === 'JOB_SEEKER' ? 'text-white' : 'text-slate-300'
                                }`} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">I'm a Job Seeker</h3>
                        <p className="text-slate-300">
                            Looking to practice interviews, improve my skills, and land my dream job.
                        </p>
                        {selectedRole === 'JOB_SEEKER' && (
                            <div className="absolute top-4 right-4">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </button>

                    {/* Interviewer Card */}
                    <button
                        onClick={() => setSelectedRole('INTERVIEWER')}
                        className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${selectedRole === 'INTERVIEWER'
                                ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25'
                                : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-slate-800'
                            }`}
                    >
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${selectedRole === 'INTERVIEWER'
                                ? 'bg-purple-500 shadow-lg shadow-purple-500/50'
                                : 'bg-slate-700 group-hover:bg-purple-500/20'
                            }`}>
                            <Users className={`w-8 h-8 transition-colors ${selectedRole === 'INTERVIEWER' ? 'text-white' : 'text-slate-300'
                                }`} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">I'm an Interviewer</h3>
                        <p className="text-slate-300">
                            Ready to help others prepare for interviews and share my expertise.
                        </p>
                        {selectedRole === 'INTERVIEWER' && (
                            <div className="absolute top-4 right-4">
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {/* Continue Button */}
                <div className="text-center">
                    <Button
                        onClick={handleComplete}
                        disabled={!selectedRole || loading}
                        className={`px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${selectedRole
                                ? selectedRole === 'JOB_SEEKER'
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/25'
                                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Setting up...</span>
                            </span>
                        ) : (
                            'Continue to CodeFit'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
