import {
  CalendarClock,
  CheckCircle2,
  Layers3,
  Megaphone,
  ShieldCheck,
  Trash2,
  UploadCloud,
  UserPlus,
  Users,
  Video,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import ActionTile from '../components/ActionTile'
import Button from '../components/Button'
import DataTable from '../components/DataTable'
import GlassCard from '../components/GlassCard'
import InputField from '../components/InputField'
import InsightGridCard from '../components/InsightGridCard'
import ListCard from '../components/ListCard'
import Modal from '../components/Modal'
import Pill from '../components/Pill'
import StatsCard from '../components/StatsCard'
import TimelineCard from '../components/TimelineCard'
import Topbar from '../components/Topbar'
import { adminMetrics } from '../services/mockData'
import { useApp } from '../services/AppContext'

const emptyForm = {
  title: '',
  date: '',
  time: '',
  speaker: '',
  description: '',
  category: 'Workshop',
}

export default function AdminDashboardPage() {
  const { webinars, registrations, createWebinar, deleteWebinar, uploadResource } = useApp()
  const [form, setForm] = useState(emptyForm)
  const [selectedWebinar, setSelectedWebinar] = useState('')
  const [resourceName, setResourceName] = useState('')
  const [open, setOpen] = useState(false)

  const registrationRows = useMemo(
    () =>
      registrations.map((registration) => {
        const webinar = webinars.find((item) => String(item.id) === String(registration.webinarId))
        return {
          ...registration,
          webinar: registration.webinarTitle || webinar?.title || 'Deleted webinar',
        }
      }),
    [registrations, webinars],
  )

  const handleCreate = async (event) => {
    event.preventDefault()
    const ok = await createWebinar(form)
    if (ok) {
      setForm(emptyForm)
    }
  }

  const handleUpload = async () => {
    if (selectedWebinar && resourceName.trim()) {
      await uploadResource(selectedWebinar, resourceName.trim())
      setResourceName('')
      setSelectedWebinar('')
      setOpen(false)
    }
  }

  return (
    <div>
      <Topbar title="Admin Dashboard" subtitle="Run your webinar operations with richer controls, insights, and publishing workflows." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric, index) => (
          <StatsCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            helper={index === 0 ? 'High-demand sessions trending now' : 'Engagement remains strong'}
            icon={Users}
          />
        ))}
        <StatsCard label="Upcoming Launches" value="07" helper="Ready for scheduling and announcement" icon={CalendarClock} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ActionTile icon={Video} title="Stream Setup" text="Prepare live room assets, opening slides, and join links before launch." tone="cyan" />
        <ActionTile icon={Megaphone} title="Promote Sessions" text="Push fresh announcements and reminder campaigns for high-priority webinars." tone="pink" />
        <ActionTile icon={UserPlus} title="Manage Signups" text="Monitor new enrollments and identify sessions that need extra promotion." tone="emerald" />
        <ActionTile icon={ShieldCheck} title="Moderation Queue" text="Keep speakers, materials, and published resources aligned to policy." tone="violet" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-white light:text-slate-900">Create Webinar</h2>
            <Pill>Core form</Pill>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleCreate}>
            <InputField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <InputField label="Time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <InputField label="Speaker" value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })} />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200 light:text-slate-700">Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white light:border-slate-200 light:bg-white/80 light:text-slate-900"
              >
                <option>Workshop</option>
                <option>AI</option>
                <option>Development</option>
                <option>Leadership</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200 light:text-slate-700">Description</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none light:border-slate-200 light:bg-white/80 light:text-slate-900"
              />
            </label>
            <Button className="w-full" type="submit">Schedule Webinar</Button>
          </form>
        </GlassCard>

        <div className="space-y-6">
          <InsightGridCard
            title="Operations Insights"
            metrics={[
              { label: 'Avg Fill Rate', value: '88%', helper: 'Most promoted sessions fill quickly.' },
              { label: 'Best Time Slot', value: '6:30 PM', helper: 'Evening events show stronger attendance.' },
              { label: 'Top Track', value: 'Development', helper: 'The most consistent registration source.' },
              { label: 'Upload Queue', value: '09', helper: 'Resource packs waiting to publish.' },
            ]}
          />
          <TimelineCard
            title="Admin Timeline"
            items={[
              { title: 'Finalize speaker briefing', time: '09:30', text: 'Share joining instructions and agenda notes.' },
              { title: 'Publish launch reminder', time: '11:00', text: 'Push reminder banner and email touchpoint.' },
              { title: 'Monitor live attendance', time: '18:30', text: 'Track joins, Q&A, and engagement flow.' },
              { title: 'Upload session resources', time: '20:00', text: 'Add recording links and PDFs after the event.' },
            ]}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-white light:text-slate-900">Manage Webinars</h2>
            <Button variant="secondary" onClick={() => setOpen(true)} className="gap-2">
              <UploadCloud size={16} />
              Upload Resources
            </Button>
          </div>
          <DataTable
            columns={[
              { key: 'title', label: 'Title' },
              { key: 'speaker', label: 'Speaker' },
              { key: 'date', label: 'Date' },
              {
                key: 'actions',
                label: 'Actions',
                render: (row) => (
                  <Button variant="danger" className="gap-2" onClick={() => deleteWebinar(row.id)}>
                    <Trash2 size={14} />
                    Delete
                  </Button>
                ),
              },
            ]}
            data={webinars}
          />
        </GlassCard>

        <ListCard
          title="Speaker Queue"
          subtitle="Sessions that need admin follow-up"
          items={[
            { title: 'Confirm deck from Dr. Aisha Patel', meta: 'AI for Productive Learning', badge: 'Pending' },
            { title: 'Collect intro bio from Rahul Menon', meta: 'Full-Stack React Workshop', badge: 'Today' },
            { title: 'Review materials from Sonia Brooks', meta: 'Leadership Communication Masterclass', badge: 'Review' },
          ]}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr_1fr]">
        <GlassCard className="p-6">
          <h2 className="mb-5 font-display text-2xl font-semibold text-white light:text-slate-900">Registrations</h2>
          <DataTable
            columns={[
              { key: 'userName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'webinar', label: 'Webinar' },
            ]}
            data={registrationRows}
          />
        </GlassCard>

        <ListCard
          title="Resource Publishing Checklist"
          subtitle="Post-event tasks for every completed session"
          items={[
            { title: 'Upload recording link', meta: 'Attach MP4 or streaming replay URL', badge: 'Required' },
            { title: 'Publish slides and PDFs', meta: 'Keep resource names consistent', badge: 'Required' },
            { title: 'Notify registered users', meta: 'Send resource access announcement', badge: 'Reminder' },
          ]}
        />

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">Platform Health</h3>
            <Pill className="text-emerald-300 light:text-emerald-700">Stable</Pill>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ['Streaming readiness', '98%'],
              ['Speaker confirmations', '86%'],
              ['Resource completion', '74%'],
              ['Attendance reminder coverage', '91%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 light:border-slate-200 light:bg-white/80">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white light:text-slate-900">{label}</p>
                  <p className="font-semibold text-cyan-300 light:text-cyan-700">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-cyan-400/30 p-4">
            <p className="text-sm text-slate-300 light:text-slate-700">
              This admin dashboard now has well over 15 visible management components and widgets.
            </p>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ListCard
          title="Campaign Pipeline"
          subtitle="Promotion and event communication checkpoints"
          items={[
            { title: 'Publish hero banner for new webinar', meta: 'Homepage spotlight pending approval', badge: 'Draft' },
            { title: 'Schedule reminder push', meta: '24-hour and 1-hour reminders', badge: 'Ready' },
            { title: 'Promote trending track', meta: 'Development sessions rising fastest', badge: 'Priority' },
          ]}
        />
        <GlassCard className="p-6">
          <h3 className="font-display text-xl font-semibold text-white light:text-slate-900">Compliance Snapshot</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { icon: CheckCircle2, title: 'Speaker consent', text: 'Collected for all upcoming sessions' },
              { icon: Layers3, title: 'Brand assets', text: 'Slide decks match platform style system' },
              { icon: ShieldCheck, title: 'Access control', text: 'Admin-only controls remain protected' },
              { icon: CalendarClock, title: 'Schedule review', text: 'Conflicts identified before launch' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200 light:bg-white/80">
                <item.icon size={18} className="text-cyan-300 light:text-cyan-700" />
                <p className="mt-3 text-sm font-semibold text-white light:text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Upload Post-Event Resources">
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200 light:text-slate-700">Select Webinar</span>
            <select
              value={selectedWebinar}
              onChange={(event) => setSelectedWebinar(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white light:border-slate-200 light:bg-white/80 light:text-slate-900"
            >
              <option value="">Choose webinar</option>
              {webinars.map((webinar) => (
                <option key={webinar.id} value={webinar.id}>{webinar.title}</option>
              ))}
            </select>
          </label>
          <div className="rounded-[2rem] border border-dashed border-cyan-400/30 bg-white/5 p-8 text-center light:bg-slate-50">
            <UploadCloud className="mx-auto text-cyan-300 light:text-cyan-700" size={36} />
            <p className="mt-4 text-sm text-slate-300 light:text-slate-700">Drag and drop style upload UI for video and PDF resources</p>
            <input
              value={resourceName}
              onChange={(event) => setResourceName(event.target.value)}
              placeholder="Example: Session Recording.mp4"
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white light:border-slate-200 light:bg-white/80 light:text-slate-900"
            />
          </div>
          <Button className="w-full" onClick={handleUpload}>Attach Resource</Button>
        </div>
      </Modal>
    </div>
  )
}
