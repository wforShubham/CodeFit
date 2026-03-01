import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Video, Code, PenTool, Github, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-white/10 relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="fixed inset-0 z-0 flex justify-center pointer-events-none">
        <div className="absolute top-[-20%] w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-md bg-[#09090b]/60 sticky top-0">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium tracking-tight text-white">CodeFit</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link href="/register">
              <Button className="h-9 px-4 bg-white text-black hover:bg-zinc-200 rounded-full font-medium transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center pt-32 pb-24 px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur text-xs font-medium text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          CodeFit is now in public beta
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8">
            The platform for <br className="hidden md:block" />
            technical interviews
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Conduct seamless coding interviews with high-fidelity video, real-time code execution,
            and an intuitive collaborative whiteboard—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-base transition-transform active:scale-95 group">
                Start Interviewing
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="ghost" className="h-12 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5 font-medium text-base transition-transform active:scale-95">
                <Github className="mr-2 w-4 h-4" />
                Sign in with GitHub
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Preview / Interface Image Concept */}
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-black/40 p-2 md:p-4 backdrop-blur-xl shadow-2xl mb-32 relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-xl border border-white/5 bg-[#121214] aspect-[16/9] overflow-hidden relative flex flex-col">
            {/* Fake Window Header */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-[#09090B]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="mx-auto bg-white/5 rounded-md px-3 py-1 text-xs text-zinc-500 font-mono flex items-center justify-center h-7 w-64 border border-white/5 shadow-inner">
                interview.codefit.dev
              </div>
            </div>
            {/* Fake Window Content */}
            <div className="flex-1 flex w-full">
              <div className="hidden md:flex w-64 border-r border-white/5 p-4 flex-col gap-4">
                <div className="h-40 rounded-lg bg-zinc-800/50 w-full animate-pulse flex items-center justify-center overflow-hidden relative">
                  <Video className="w-8 h-8 text-white/20" />
                </div>
                <div className="flex-1 rounded-lg bg-zinc-800/30 w-full p-3 flex flex-col gap-3">
                  <div className="h-6 w-1/2 bg-white/10 rounded-md" />
                  <div className="h-4 w-3/4 bg-white/5 rounded-md" />
                  <div className="h-4 w-full bg-white/5 rounded-md" />
                </div>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-4">
                <div className="flex-1 rounded-lg bg-[#0d0d0f] border border-white/5 font-mono text-sm leading-relaxed p-6 text-zinc-400 overflow-hidden relative shadow-inner">
                  <div className="absolute top-0 left-0 w-10 h-full bg-white/[0.02] border-r border-white/5 pointer-events-none" />
                  <div className="relative z-10">
                    <span className="text-zinc-500 mr-4 inline-block w-4 text-right">1</span> <span className="text-indigo-400">function</span> <span className="text-blue-400">fibonacci</span>(n) {'{'}<br />
                    <span className="text-zinc-500 mr-4 inline-block w-4 text-right">2</span> &nbsp;&nbsp;<span className="text-indigo-400">if</span> (n &lt;= 1) <span className="text-indigo-400">return</span> n;<br />
                    <span className="text-zinc-500 mr-4 inline-block w-4 text-right">3</span> &nbsp;&nbsp;<span className="text-indigo-400">return</span> <span className="text-blue-400">fibonacci</span>(n - 1) + <span className="text-blue-400">fibonacci</span>(n - 2);<br />
                    <span className="text-zinc-500 mr-4 inline-block w-4 text-right">4</span> {'}'}<br />
                    <span className="text-zinc-500 mr-4 inline-block w-4 text-right">5</span> <br />
                    <span className="text-zinc-500 mr-4 inline-block w-4 text-right">6</span> console.log(<span className="text-blue-400">fibonacci</span>(10));<span className="inline-block w-2.5 h-4 bg-blue-500 ml-1 translate-y-0.5 animate-pulse rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full max-w-4xl mx-auto py-12 flex flex-col md:flex-row justify-around items-center gap-12 mb-32 border-y border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50 pointer-events-none" />
          <div className="text-center relative z-10 w-full md:w-1/3">
            <div className="text-4xl font-medium text-white mb-2">99.9%</div>
            <div className="text-sm font-light text-zinc-500">Uptime guarantee</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent relative z-10" />
          <div className="text-center relative z-10 w-full md:w-1/3">
            <div className="text-4xl font-medium text-white mb-2">&lt; 50ms</div>
            <div className="text-sm font-light text-zinc-500">Average latency</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent relative z-10" />
          <div className="text-center relative z-10 w-full md:w-1/3">
            <div className="text-4xl font-medium text-white mb-2">10k+</div>
            <div className="text-sm font-light text-zinc-500">Interviews hosted</div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-5xl w-full mx-auto grid md:grid-cols-3 gap-6 mb-32">
          {/* Card 1 */}
          <div className="group rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
              <Video className="w-32 h-32 text-indigo-500 blur-[40px] group-hover:blur-[30px] transition-all duration-500 translate-x-1/4 -translate-y-1/4" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-inner">
              <Video className="w-5 h-5 text-zinc-300 group-hover:text-indigo-300 transition-colors" />
            </div>
            <h3 className="text-xl font-medium text-zinc-100 mb-3 relative z-10">Crystal Clear Video</h3>
            <p className="text-zinc-400 leading-relaxed font-light relative z-10 text-sm">
              Low-latency WebRTC video and audio designed to work seamlessly even on unstable connections.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden backdrop-blur-sm md:-translate-y-6">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
              <Code className="w-32 h-32 text-blue-500 blur-[40px] group-hover:blur-[30px] transition-all duration-500 translate-x-1/4 -translate-y-1/4" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-inner">
              <Code className="w-5 h-5 text-zinc-300 group-hover:text-blue-300 transition-colors" />
            </div>
            <h3 className="text-xl font-medium text-zinc-100 mb-3 relative z-10">Real-time IDE</h3>
            <p className="text-zinc-400 leading-relaxed font-light relative z-10 text-sm">
              Multiplayer code editor with syntax highlighting, autocomplete, and native terminal execution capabilities.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
              <PenTool className="w-32 h-32 text-pink-500 blur-[40px] group-hover:blur-[30px] transition-all duration-500 translate-x-1/4 -translate-y-1/4" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-inner">
              <PenTool className="w-5 h-5 text-zinc-300 group-hover:text-pink-300 transition-colors" />
            </div>
            <h3 className="text-xl font-medium text-zinc-100 mb-3 relative z-10">Infinite Whiteboard</h3>
            <p className="text-zinc-400 leading-relaxed font-light relative z-10 text-sm">
              Express ideas visually with our collaborative canvas. Perfect for system design and complex architecture.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center w-full max-w-3xl mx-auto mb-10 relative py-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
          <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight relative z-10">Ready to hire better?</h2>
          <p className="text-zinc-400 mb-8 font-light max-w-xl mx-auto relative z-10">
            Join the companies transforming their engineering interviews with CodeFit's unified platform.
          </p>
          <Link href="/register" className="relative z-10">
            <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-base transition-transform active:scale-95 shadow-[0_0_40px_8px_rgba(255,255,255,0.1)]">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#09090b] relative z-10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-zinc-300 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="font-semibold text-white tracking-tight">CodeFit</span>
            </div>
            <div className="text-sm text-zinc-500 font-light text-center md:text-right">
              &copy; {new Date().getFullYear()} CodeFit. Designed for engineers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
