'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store'
import api from '@/lib/api'
import { Calendar, Users, Video, Plus, UserPlus, Sparkles, Target, TrendingUp, Clock, CheckCircle, Trash2, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { FriendList } from '@/components/friends/FriendList'
import { Navbar } from '@/components/layout/navbar'

interface Interview {
  id: string
  title: string
  description?: string
  status: string
  scheduledAt?: string
  createdAt: string
  updatedAt: string
  participants: Array<{
    candidate?: { id: string; firstName: string; lastName: string }
    interviewer?: { id: string; firstName: string; lastName: string }
  }>
}

export default function DashboardPage() {
  const router = useRouter()
  // Use a selector that returns both user and updateUser to avoid unnecessary re-renders
  const { user, updateUser } = useAuthStore((state) => ({
    user: state.user,
    updateUser: state.updateUser
  }))
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (!user) {
        router.push('/login')
        return
      }

      try {
        // Always fetch latest user data to ensure role and other details are in sync
        const { data } = await api.get('/users/me')
        if (updateUser) {
          updateUser(data)
        }
      } catch (err) {
        console.error('Failed to sync user data:', err)
      }

      fetchInterviews()
    }

    init()
  }, [])

  const fetchInterviews = async () => {
    try {
      const response = await api.get('/interviews')
      setInterviews(response.data)
    } catch (error) {
      console.error('Failed to fetch interviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinInterview = (interviewId: string) => {
    router.push(`/interview/${interviewId}`)
  }

  const handleCompleteInterview = async (interviewId: string) => {
    try {
      await api.patch(`/interviews/${interviewId}/end`)
      fetchInterviews()
    } catch (error) {
      console.error('Failed to complete interview:', error)
    }
  }

  const handleDeleteInterview = async (interviewId: string) => {
    if (!confirm('Are you sure you want to delete this interview? This action cannot be undone.')) {
      return
    }
    try {
      await api.delete(`/interviews/${interviewId}`)
      fetchInterviews()
    } catch (error) {
      console.error('Failed to delete interview:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 animate-pulse">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm text-zinc-500 font-mono">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 flex justify-center pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Removed duplicated Navbar pipeline since dashboard/layout.tsx already handles it */}

      <main className="relative z-10 container mx-auto px-6 py-12 flex-1">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">
                Dashboard
              </h1>
              <p className="text-zinc-400 text-lg font-light">
                Welcome back, {user?.firstName}. Here is your interview overview.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {user?.role === 'INTERVIEWER' && (
                <Link href="/dashboard/create-interview">
                  <Button className="h-11 px-8 bg-white text-black hover:bg-zinc-200 rounded-full font-medium transition-all shadow-[0_0_20px_0px_rgba(255,255,255,0.1)] active:scale-95 text-base">
                    <Plus className="w-5 h-5 mr-2" />
                    New Interview
                  </Button>
                </Link>
              )}
              {user?.role === 'JOB_SEEKER' && (
                <Link href="/dashboard/friends">
                  <Button variant="ghost" className="h-11 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-full font-medium transition-all active:scale-95 text-base">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Find Friends
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none text-indigo-400">
                <Video className="w-20 h-20 blur-[20px] translate-x-1/4 -translate-y-1/4" />
              </div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Video className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-3xl font-semibold text-white">
                  {interviews.filter(i => i.status === 'ACTIVE').length}
                </span>
              </div>
              <h3 className="text-base font-medium text-zinc-300 relative z-10">Active Interviews</h3>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none text-blue-400">
                <Calendar className="w-20 h-20 blur-[20px] translate-x-1/4 -translate-y-1/4" />
              </div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-3xl font-semibold text-white">
                  {interviews.filter(i => i.status === 'SCHEDULED').length}
                </span>
              </div>
              <h3 className="text-base font-medium text-zinc-300 relative z-10">Scheduled</h3>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none text-emerald-400">
                <Clock className="w-20 h-20 blur-[20px] translate-x-1/4 -translate-y-1/4" />
              </div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-3xl font-semibold text-white">
                  {interviews.length}
                </span>
              </div>
              <h3 className="text-base font-medium text-zinc-300 relative z-10">Total Interviews</h3>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none text-purple-400">
                <Target className="w-20 h-20 blur-[20px] translate-x-1/4 -translate-y-1/4" />
              </div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-3xl font-semibold text-white">
                  98%
                </span>
              </div>
              <h3 className="text-base font-medium text-zinc-300 relative z-10">Success Rate</h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">

              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  Your Upcoming Interviews
                </h2>
              </div>

              {/* Filter out completed interviews for the main section */}
              {interviews.filter(i => i.status !== 'COMPLETED').length === 0 ? (
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-12 text-center backdrop-blur-sm flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    <Calendar className="w-6 h-6 text-zinc-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">No active interviews</h3>
                  <p className="text-zinc-400 mb-8 max-w-sm font-light leading-relaxed">
                    {user?.role === 'INTERVIEWER'
                      ? 'Create a new interview to start connecting with talented developers.'
                      : 'You don\'t have any scheduled interviews yet. Check back later!'
                    }
                  </p>
                  {user?.role === 'INTERVIEWER' && (
                    <Link href="/dashboard/create-interview">
                      <Button className="h-10 px-6 rounded-full bg-white text-black hover:bg-zinc-200 font-medium transition-transform active:scale-95">
                        <Plus className="w-4 h-4 mr-2" />
                        Create a New Interview
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {interviews.filter(i => i.status !== 'COMPLETED').map((interview, index) => {
                    const otherParticipant = interview.participants.find(
                      (p) => p.candidate?.id !== user?.id && p.interviewer?.id !== user?.id
                    )?.candidate || interview.participants.find(
                      (p) => p.candidate?.id !== user?.id && p.interviewer?.id !== user?.id
                    )?.interviewer

                    const isInterviewer = user?.role === 'INTERVIEWER';

                    return (
                      <div
                        key={interview.id}
                        className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm hover:bg-white/[0.04] transition-all relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                      >
                        {/* Animated border pulse for active */}
                        {interview.status === 'ACTIVE' && (
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
                        )}

                        <div className="flex-1 relative z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-1 text-xs font-mono tracking-wider uppercase rounded-md border ${interview.status === 'ACTIVE'
                              ? 'bg-green-500/10 text-green-400 border-green-500/20'
                              : interview.status === 'SCHEDULED'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                : 'bg-white/5 text-zinc-400 border-white/10'
                              }`}>
                              {interview.status}
                            </span>
                            <h3 className="text-xl font-medium text-white">
                              {interview.title}
                            </h3>
                          </div>

                          {interview.description && (
                            <p className="text-zinc-400 text-base font-light leading-relaxed mb-4 line-clamp-1">
                              {interview.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-zinc-500">
                            {interview.scheduledAt && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(interview.scheduledAt), 'MMM d, h:mm a')}
                              </div>
                            )}
                            {otherParticipant && (
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {otherParticipant.firstName} {otherParticipant.lastName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center gap-2 relative z-10 sm:w-32">
                          {(interview.status === 'SCHEDULED' || interview.status === 'ACTIVE') && (
                            <Button
                              onClick={() => handleJoinInterview(interview.id)}
                              className="w-full h-10 bg-white text-black hover:bg-zinc-200 rounded-lg text-base font-medium transition-transform active:scale-95"
                            >
                              Join
                            </Button>
                          )}

                          {interview.status === 'ACTIVE' && (
                            <Button
                              onClick={() => handleCompleteInterview(interview.id)}
                              variant="ghost"
                              className="w-full h-9 bg-white/5 hover:bg-green-500/10 text-green-400 hover:text-green-300 border border-white/5 rounded-lg text-sm font-medium"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Done
                            </Button>
                          )}

                          <Button
                            onClick={() => handleDeleteInterview(interview.id)}
                            variant="ghost"
                            className="w-full h-9 bg-transparent hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-lg text-sm transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Completed Interviews Section */}
              {interviews.filter(i => i.status === 'COMPLETED').length > 0 && (
                <div className="pt-8">
                  <h2 className="text-base font-medium text-zinc-400 mb-4 flex items-center tracking-wide uppercase">
                    Past Interviews
                  </h2>
                  <div className="space-y-3">
                    {interviews.filter(i => i.status === 'COMPLETED').map((interview) => {
                      const otherParticipant = interview.participants.find(
                        (p) => p.candidate?.id !== user?.id && p.interviewer?.id !== user?.id
                      )?.candidate || interview.participants.find(
                        (p) => p.candidate?.id !== user?.id && p.interviewer?.id !== user?.id
                      )?.interviewer

                      return (
                        <div
                          key={interview.id}
                          className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                              <CheckCircle className="w-4 h-4 text-zinc-500" />
                            </div>
                            <div>
                              <h3 className="text-base font-medium text-zinc-300">
                                {interview.title}
                              </h3>
                              <p className="text-sm text-zinc-500 font-mono mt-1 flex items-center gap-2">
                                {format(new Date(interview.updatedAt || interview.createdAt), 'MMM d, yyyy')}
                                {otherParticipant && (
                                  <>
                                    <span>•</span>
                                    <span>{otherParticipant.firstName} {otherParticipant.lastName}</span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteInterview(interview.id)}
                            className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Columns */}
            <div className="space-y-6">
              {user?.role === 'INTERVIEWER' && (
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                  <h3 className="text-sm font-medium text-zinc-400 mb-4 tracking-wide uppercase">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Link href="/dashboard/create-interview" className="block">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Start Interview</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                    <Link href="/welcome" className="block">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Go to Home</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {user?.role === 'JOB_SEEKER' && (
                <>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-zinc-400 tracking-wide uppercase">
                        Friends
                      </h3>
                      <Link href="/dashboard/friends" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                        Manage
                      </Link>
                    </div>
                    {/* The FriendList component might need styling updates separately, 
                        but wrapping it here sets context */}
                    <div className="-mx-2">
                      <FriendList />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                    <h3 className="text-sm font-medium text-zinc-400 mb-4 tracking-wide uppercase">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Link href="/dashboard/friends" className="block">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                              <UserPlus className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Find Friends</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                      <Link href="/welcome" className="block">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">Go to Home</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
