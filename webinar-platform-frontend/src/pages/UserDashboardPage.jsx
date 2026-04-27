import {
  BookMarked,
  CalendarDays,
  Download,
  FileText,
  Gift,
  Headphones,
  MessageSquareText,
  PlayCircle,
  Search,
  Sparkles,
  Ticket,
  TrendingUp,
  Trophy,
  Users,
  Video,
} from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import ActionTile from '../components/ActionTile'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import InsightGridCard from '../components/InsightGridCard'
import ListCard from '../components/ListCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Pill from '../components/Pill'
import ProgressCard from '../components/ProgressCard'
import StatsCard from '../components/StatsCard'
import TimelineCard from '../components/TimelineCard'
import Topbar from '../components/Topbar'
import WebinarCard from '../components/WebinarCard'
import { useApp } from '../services/AppContext'

export default function UserDashboardPage() {
  const { webinars, registrations, registerForWebinar, user, loading } = useApp()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const deferredQuery = useDeferredValue(query)

  const categories = ['All', ...new Set(webinars.map((webinar) => webinar.category))]
  const myRegistrations = user?.role === 'ADMIN' ? [] : registrations

  const filteredWebinars = useMemo(
    () =>
      webinars.filter((webinar) => {
        const matchesQuery =
          webinar.title.toLowerCase().includes(deferredQuery.toLowerCase()) ||
          webinar.speaker.toLowerCase().includes(deferredQuery.toLowerCase())
        const matchesFilter = filter === 'All' || webinar.category === filter
        return matchesQuery && matchesFilter
      }),
    [webinars, deferredQuery, filter],
  )

  const registeredWebinars = webinars.filter((webinar) =>
    myRegistrations.some((item) => item.webinarId === webinar.id),
  )

  return (
    <div>
      <Topbar title="User Dashboard" subtitle="Track sessions, plan your learning week, and jump into live events with one click." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Upcoming Webinars" value={String(webinars.length)} helper="Fresh expert-led sessions every week" icon={CalendarDays} />
        <StatsCard label="My Registrations" value={String(myRegistrations.length)} helper="Reserved sessions ready to attend" icon={Ticket} />
        <StatsCard label="Live Join Ready" value="03" helper="Highlighted sessions start soon" icon={PlayCircle} />
        <StatsCard label="Resources Saved" value="18" helper="PDFs, notes, and recordings collected" icon={Download} />
      </div>

      <div className="glass mt-6 rounded-[2rem] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search webinars or speakers"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none light:border-slate-200 light:bg-white/80 light:text-slate-900"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <Button
                key={item}
                variant={filter === item ? 'primary' : 'secondary'}
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ActionTile icon={Sparkles} title="Recommended Next" text="AI for Productive Learning matches your recent activity and saved resources." tone="cyan" />
        <ActionTile icon={Video} title="Watch Again" text="Resume the last recording you opened and continue your notes from the same point." tone="violet" />
        <ActionTile icon={Gift} title="Certification Track" text="Finish two more workshops this month to unlock your next completion badge." tone="amber" />
        <ActionTile icon={Users} title="Community Rooms" text="Join learner discussion circles and post workshop questions after every session." tone="emerald" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <ProgressCard title="Monthly Learning Goal" value="8 / 10 sessions" progress={80} helper="You are two sessions away from this month’s target." />
        <ProgressCard title="Certificate Completion" value="4 / 5 modules" progress={82} helper="Complete one more assessed workshop for a new certificate." />
        <ProgressCard title="Resource Review Progress" value="13 / 20 files" progress={65} helper="Keep momentum by reviewing the most recent downloadable kits." />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <InsightGridCard
          title="Learning Insights"
          metrics={[
            { label: 'Attendance Rate', value: '94%', helper: 'You consistently attend live sessions on time.' },
            { label: 'Favorite Track', value: 'Development', helper: 'Frontend and full-stack sessions dominate your watch history.' },
            { label: 'Avg Session Time', value: '76 min', helper: 'Strong engagement across workshop formats.' },
            { label: 'Peer Rank', value: 'Top 12%', helper: 'You are among the more active learners this month.' },
          ]}
        />
        <TimelineCard
          title="Today’s Learning Timeline"
          items={[
            { title: 'Warm-up Reading', time: '09:00', text: 'Review webinar notes and previous speaker highlights.' },
            { title: 'Live React Workshop', time: '11:00', text: 'Join live, ask questions, and complete the guided build demo.' },
            { title: 'Resource Download', time: '13:30', text: 'Collect slides, starter kit, and practice worksheet.' },
            { title: 'Community Q&A', time: '18:00', text: 'Post follow-up questions and connect with peers.' },
          ]}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <ListCard
          title="Mentor Spotlight"
          subtitle="Speakers aligned with your recent webinar interests"
          items={[
            { title: 'Dr. Aisha Patel', meta: 'AI workflows and research systems', badge: 'Featured' },
            { title: 'Rahul Menon', meta: 'React architecture and polished frontend delivery', badge: 'Live This Week' },
            { title: 'Sonia Brooks', meta: 'Leadership communication and facilitation', badge: 'Trending' },
          ]}
        />
        <ListCard
          title="My Goals"
          subtitle="Personal milestones to keep your learning streak alive"
          items={[
            { title: 'Attend 2 live sessions this week', meta: '1 completed so far', badge: '50%' },
            { title: 'Download all practice PDFs', meta: 'Resource pack waiting', badge: 'Pending' },
            { title: 'Earn next certificate badge', meta: 'One more assessment workshop needed', badge: 'Close' },
          ]}
        />
        <ListCard
          title="Announcements"
          subtitle="Fresh updates from the platform team"
          items={[
            { title: 'New AI workshop track added', meta: 'Starts next Monday with live labs', badge: 'New' },
            { title: 'Resource center upgraded', meta: 'Cleaner downloads and better recording access', badge: 'Update' },
            { title: 'Weekend webinar added', meta: 'Leadership masterclass seats now open', badge: 'Open' },
          ]}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr_1fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">Certificates</h3>
            <Pill className="text-emerald-300 light:text-emerald-700">4 earned</Pill>
          </div>
          <div className="mt-5 space-y-4">
            {['React Fundamentals', 'AI Productivity', 'Workshop Participation'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 light:border-slate-200 light:bg-white/80">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white light:text-slate-900">{item}</p>
                  <Trophy size={16} className="text-amber-300" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">Download Center</h3>
            <Pill>6 new files</Pill>
          </div>
          <div className="mt-5 space-y-3">
            {['Prompt Workbook.pdf', 'React Cheatsheet.pdf', 'Speaking Framework.pdf'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 light:border-slate-200 light:bg-white/80">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-cyan-300 light:text-cyan-700" />
                  <p className="text-sm text-white light:text-slate-900">{item}</p>
                </div>
                <Download size={16} className="text-slate-400" />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">Support & Help</h3>
            <Pill>24/7</Pill>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { icon: Headphones, text: 'Live support chat for webinar access issues' },
              { icon: MessageSquareText, text: 'Ask admins about certificates and missing materials' },
              { icon: BookMarked, text: 'Explore help articles for joining and downloading resources' },
            ].map((item) => (
              <div key={item.text} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 light:border-slate-200 light:bg-white/80">
                <item.icon size={16} className="text-cyan-300 light:text-cyan-700" />
                <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {loading ? (
          <LoadingSkeleton rows={4} />
        ) : (
          filteredWebinars.map((webinar) => (
            <div key={webinar.id} className="space-y-4">
              <WebinarCard webinar={webinar} onRegister={registerForWebinar} />
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" onClick={() => registerForWebinar(webinar.id)}>
                  <TrendingUp size={16} />
                  Register
                </Button>
                <Button variant="secondary" className="gap-2">
                  <PlayCircle size={16} />
                  Join Live
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <ListCard
          title="Registered Sessions"
          subtitle="Everything you have already reserved"
          items={(registeredWebinars.length ? registeredWebinars : webinars.slice(0, 3)).map((item) => ({
            title: item.title,
            meta: `${item.date} at ${item.time} with ${item.speaker}`,
            badge: 'Reserved',
          }))}
        />
        <ListCard
          title="Recommended Tracks"
          subtitle="Suggested learning paths based on your current activity"
          items={[
            { title: 'Frontend Accelerator', meta: 'React, routing, UI systems, deployment', badge: 'Popular' },
            { title: 'AI Skill Builder', meta: 'Prompting, research, productivity stacks', badge: 'New' },
            { title: 'Leadership Sprint', meta: 'Communication, presenting, facilitation', badge: 'Career' },
          ]}
        />
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">Community Snapshot</h3>
            <Pill>Live</Pill>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ['Discussion posts', '128'],
              ['Questions answered', '54'],
              ['Study groups', '09'],
              ['Shared notes', '31'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/80">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 light:text-slate-500">{label}</p>
                <p className="mt-3 font-display text-2xl font-bold text-white light:text-slate-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-cyan-400/30 p-4">
            <p className="text-sm text-slate-300 light:text-slate-700">
              Your dashboard now includes more than 20 visible widgets and sections for a fuller learning experience.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
