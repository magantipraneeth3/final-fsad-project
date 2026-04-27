import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Mic2,
  RadioTower,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import FeatureCard from '../components/FeatureCard'
import GlassCard from '../components/GlassCard'
import SectionTitle from '../components/SectionTitle'
import TestimonialCard from '../components/TestimonialCard'
import WebinarCard from '../components/WebinarCard'
import { testimonials } from '../services/mockData'
import { useApp } from '../services/AppContext'

export default function HomePage() {
  const { webinars, registerForWebinar } = useApp()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section id="home" className="page-shell scroll-mt-28 grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 light:text-cyan-700">
            Live webinars, immersive workshops, career-ready learning
          </span>
          <h1 className="mt-8 font-display text-5xl font-extrabold leading-tight text-white md:text-7xl light:text-slate-900">
            Upgrade Your Skills with <span className="gradient-text">Live Webinars</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 light:text-slate-700">
            Join expert-led sessions, register in seconds, attend live classes, and revisit recordings with downloadable materials in one polished learning platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
            <a href="/#webinars">
              <Button variant="secondary">Explore Webinars</Button>
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {[
              ['25K+', 'Learners'],
              ['350+', 'Sessions Hosted'],
              ['96%', 'Completion Rate'],
            ].map(([value, label]) => (
              <div key={label} className="glass rounded-3xl p-4">
                <p className="font-display text-2xl font-bold text-white light:text-slate-900">{value}</p>
                <p className="mt-1 text-sm text-slate-400 light:text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-hero-grid blur-2xl" />
          <div className="glass overflow-hidden rounded-[2rem] p-5">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-cyan-500/25 via-violet-500/20 to-pink-500/20 p-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-6 light:bg-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cyan-300 light:text-cyan-700">Next Featured Workshop</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white light:text-slate-900">
                      {webinars[0]?.title}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/15 px-3 py-2 text-xs font-semibold text-emerald-300 light:text-emerald-700">
                    Live Soon
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-4 light:bg-white/80">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 light:text-slate-500">Speaker</p>
                    <p className="mt-2 text-lg font-semibold text-white light:text-slate-900">{webinars[0]?.speaker}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4 light:bg-white/80">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 light:text-slate-500">Session Time</p>
                    <p className="mt-2 text-lg font-semibold text-white light:text-slate-900">
                      {webinars[0]?.date} | {webinars[0]?.time}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: RadioTower, label: 'HD Live Stream' },
                    { icon: Mic2, label: 'Ask Experts Live' },
                    { icon: Award, label: 'Certificates' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center light:bg-white/80">
                      <Icon className="mx-auto text-cyan-300 light:text-cyan-700" size={22} />
                      <p className="mt-2 text-sm text-slate-300 light:text-slate-700">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="page-shell scroll-mt-28 py-16">
        <SectionTitle
          eyebrow="Why Learners Choose Us"
          title="Everything needed for engaging online learning events"
          text="From registration to resource access, every touchpoint is designed to feel smooth, modern, and motivating."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard icon={RadioTower} title="Live Sessions" description="High-energy webinars with countdowns, instant joins, and a polished streaming-ready UI." />
          <FeatureCard icon={Mic2} title="Expert Trainers" description="Spotlight industry mentors, speaker profiles, and topic-led learning journeys." />
          <FeatureCard icon={Award} title="Certification" description="Reinforce outcomes with completion-ready workshop flows and downloadable resources." />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: 'Interactive Community',
              text: 'Peer learning rooms, feedback loops, and discussion moments that keep learners active throughout the session.',
            },
            {
              icon: BriefcaseBusiness,
              title: 'Career-Focused Tracks',
              text: 'Curated workshops for upskilling, portfolio growth, technical mastery, and leadership communication.',
            },
            {
              icon: Sparkles,
              title: 'Premium Learning Experience',
              text: 'Glassmorphism visuals, responsive layouts, and intentional motion create a modern event experience.',
            },
          ].map((item) => (
            <GlassCard key={item.title} className="p-6">
              <item.icon className="text-cyan-300 light:text-cyan-700" size={22} />
              <h3 className="mt-4 font-display text-xl font-semibold text-white light:text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">{item.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="webinars" className="page-shell scroll-mt-28 py-16">
        <SectionTitle
          eyebrow="Upcoming Sessions"
          title="Browse upcoming webinars and reserve your seat"
          text="Animated cards, speaker details, and quick registration help users discover the right session fast."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {webinars.slice(0, 3).map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} onRegister={registerForWebinar} />
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['High-demand topics', 'AI tools, frontend engineering, leadership, and communication labs.'],
            ['Flexible attendance', 'Register now, attend live later, and access recordings after the event.'],
            ['Workshop support', 'Slides, templates, guides, and practice material all in one place.'],
            ['Learning momentum', 'Trending cohorts and repeat learners keep the platform active every week.'],
          ].map(([title, text]) => (
            <GlassCard key={title} className="p-5">
              <p className="text-sm font-semibold text-white light:text-slate-900">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">{text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="testimonials" className="page-shell scroll-mt-28 py-16">
        <SectionTitle
          eyebrow="Success Stories"
          title="Trusted by ambitious learners and training teams"
          text="A premium interface is only worth it if it helps people keep learning. That part matters here too."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} {...item} />
          ))}
        </div>
        <GlassCard className="mt-8 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300 light:text-cyan-700">Learner Momentum</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white light:text-slate-900">
                Weekly live cohorts are growing with stronger engagement
              </h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300 light:text-slate-700">
              <TrendingUp className="text-emerald-400" size={18} />
              28% more webinar enrollments this quarter
              <ArrowRight size={16} />
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="page-shell py-16">
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 light:text-cyan-700">Ready to learn live?</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white light:text-slate-900">
                Start attending workshops that move your career forward
              </h2>
            </div>
            <div className="flex gap-4">
              <Link to="/register">
                <Button>Join Now</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
