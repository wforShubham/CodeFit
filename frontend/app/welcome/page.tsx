'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store'
import { Navbar } from '@/components/layout/navbar'
import {
  Video,
  Code,
  PenTool,
  Users,
  Calendar,
  BarChart3,
  ArrowRight,
  Sparkles,
  Play,
  UserPlus,
  Briefcase,
  Target,
  Trophy,
  Zap
} from 'lucide-react'

export default function WelcomePage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  // Define quick actions based on user role
  const quickActions = [
    // Only show "Start Interview" for interviewers
    ...(user?.role === 'INTERVIEWER' ? [{
      title: 'Start Interview',
      description: 'Begin a new technical interview session',
      icon: Video,
      href: '/dashboard/create-interview',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    }] : []),
    {
      title: 'Join Interview',
      description: 'Enter an existing interview room',
      icon: Play,
      href: '/dashboard',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'My Interviews',
      description: 'View your scheduled interviews',
      icon: Calendar,
      href: '/dashboard',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Find Partners',
      description: 'Connect with other developers',
      icon: UserPlus,
      href: '/dashboard/friends',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    }
  ]

  const features = [
    {
      icon: Code,
      title: 'Real-time Coding',
      description: 'Collaborative code editor with live synchronization',
      stats: '500+ problems solved'
    },
    {
      icon: Video,
      title: 'HD Video Calls',
      description: 'Crystal-clear video with WebRTC technology',
      stats: '10K+ interviews conducted'
    },
    {
      icon: PenTool,
      title: 'Smart Whiteboard',
      description: 'Interactive drawing tools for visual explanations',
      stats: '1000+ diagrams created'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multi-user sessions with role-based access',
      stats: '500+ active users'
    }
  ]

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col">
      {/* Subtle Background Effects */}
      <div className="fixed inset-0 z-0 flex justify-center pointer-events-none">
        <div className="absolute top-[-20%] w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-20">
        <Navbar />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Hero */}
          <div className="mb-20 pt-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur text-sm font-medium text-zinc-300 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Welcome to your CodeFit dashboard
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6">
              {user?.role === 'JOB_SEEKER' ? 'Ready for an interview?' : 'Ready to Interview?'}
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
              Choose your next action and dive into the world of collaborative technical interviews.
              Everything you need is just one click away.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="flex flex-wrap justify-center gap-4 mb-24 max-w-5xl mx-auto">
            {quickActions.map((action, index) => (
              <Link key={action.title} href={action.href} className="group block w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] min-w-[240px] max-w-[320px]">
                <div className="h-full rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all hover:-translate-y-1 relative overflow-hidden backdrop-blur-sm">
                  {/* Hover glow */}
                  <div className={`absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${action.color}`}>
                    <action.icon className="w-24 h-24 blur-[30px] translate-x-1/4 -translate-y-1/4" />
                  </div>

                  <div className={`w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center mb-5 ${action.bgColor}`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100 mb-2 relative z-10">{action.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light mb-8 relative z-10">{action.description}</p>

                  <div className="absolute bottom-6 left-6 flex items-center text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    <span>Open</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-sm mb-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-2xl font-medium text-white mb-10 text-center relative z-10">Your Interview Journey</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-3xl font-medium text-white mb-1">12</div>
                <div className="text-sm text-zinc-500 font-light">Completed</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-medium text-white mb-1">8</div>
                <div className="text-sm text-zinc-500 font-light">Successful Hires</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-medium text-white mb-1">95%</div>
                <div className="text-sm text-zinc-500 font-light">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-3xl font-medium text-white mb-1">24</div>
                <div className="text-sm text-zinc-500 font-light">Connections</div>
              </div>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="mb-24">
            <h2 className="text-2xl font-medium text-white mb-8 text-center">Why Choose CodeFit?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div key={feature.title} className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-colors">
                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center mb-4">
                    <feature.icon className="w-4 h-4 text-zinc-300" />
                  </div>
                  <h3 className="text-base font-medium text-zinc-100 mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4 font-light leading-relaxed">{feature.description}</p>
                  <div className="text-xs text-zinc-500 font-mono">{feature.stats}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16 border-t border-white/5">
            <h2 className="text-3xl font-medium text-white mb-4">
              Code Your Next Opportunity
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto font-light">
              Join thousands of developers who trust CodeFit for their most important technical interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user?.role === 'INTERVIEWER' && (
                <Link href="/dashboard/create-interview">
                  <Button className="h-11 px-6 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-base transition-transform active:scale-95 shadow-[0_0_20px_4px_rgba(255,255,255,0.1)]">
                    Create New Interview
                  </Button>
                </Link>
              )}
              <Link href="/dashboard">
                <Button variant="ghost" className="h-11 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5 font-medium text-base transition-transform active:scale-95">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
