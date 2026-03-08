'use client'
import { useState } from 'react'
import Link from 'next/link'

const JOBS = [
    {
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        color: 'text-[#49BBBD]',
        bg: 'bg-[#E8F8F8]',
    },
    {
        title: 'Instructional Designer',
        department: 'Education',
        location: 'Paris, France',
        type: 'Full-time',
        color: 'text-[#F48C06]',
        bg: 'bg-[#FFF3E0]',
    },
    {
        title: 'Community Manager',
        department: 'Marketing',
        location: 'Remote',
        type: 'Part-time',
        color: 'text-[#E05C5C]',
        bg: 'bg-[#FDE8E8]',
    },
    {
        title: 'Product Designer (UI/UX)',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        color: 'text-[#6C70B5]',
        bg: 'bg-[#EEF0FF]',
    },
    {
        title: 'Content Marketing Specialist',
        department: 'Marketing',
        location: 'London, UK',
        type: 'Full-time',
        color: 'text-[#49BBBD]',
        bg: 'bg-[#E8F8F8]',
    },
    {
        title: 'Backend Engineer (Node.js)',
        department: 'Engineering',
        location: 'Remote',
        type: 'Contract',
        color: 'text-[#2F327D]',
        bg: 'bg-[#EEF0FF]',
    },
]

const PERKS = [
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
        ),
        title: '100% Remote',
        desc: 'Work from anywhere in the world. We trust you to manage your time.',
        color: 'text-[#49BBBD]',
        bg: 'bg-[#E8F8F8]',
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
        ),
        title: 'Free Courses',
        desc: 'Unlimited access to all courses on our platform for you and your family.',
        color: 'text-[#F48C06]',
        bg: 'bg-[#FFF3E0]',
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2"/><line x1="12" y1="12" x2="12" y2="16"/>
            </svg>
        ),
        title: 'Competitive Pay',
        desc: 'Salaries benchmarked against top market rates, reviewed annually.',
        color: 'text-[#E05C5C]',
        bg: 'bg-[#FDE8E8]',
    },
    {
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
        ),
        title: 'Great Team',
        desc: 'Work alongside passionate people who care about education and craft.',
        color: 'text-[#6C70B5]',
        bg: 'bg-[#EEF0FF]',
    },
]

const FILTERS = ['All', 'Engineering', 'Education', 'Design', 'Marketing']

export default function Careers() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [openJob, setOpenJob] = useState(null)

    const filtered = activeFilter === 'All'
        ? JOBS
        : JOBS.filter(j => j.department === activeFilter)

    return (
        <div className="bg-white min-h-screen pt-[143px]">

            {/* ── Hero ── */}
            <section className="bg-[#2F327D] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-[#49BBBD]" />
                    <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-[#F48C06]" />
                </div>
                <div className="relative max-w-[1100px] mx-auto px-[32px] py-[80px]">
                    <div className="max-w-[620px]">
                        <p className="text-[#49BBBD] text-[13px] font-semibold uppercase tracking-[3px] mb-[12px]">
                            Careers
                        </p>
                        <h1 className="text-[36px] lg:text-[52px] font-bold text-white leading-[115%] mb-[20px]">
                            Build the Future of<br />
                            <span className="text-[#49BBBD]">Online Learning</span>
                        </h1>
                        <p className="text-[15px] text-white/70 leading-[185%] mb-[32px]">
                            We're a small but mighty team on a mission to democratize education. If you're passionate about learning, technology, and impact — we'd love to have you.
                        </p>
                        <a href="#openings">
                            <button className="bg-[#49BBBD] text-white font-bold text-[14px] px-[32px] py-[14px] rounded-[8px] hover:bg-[#3da8aa] transition-colors shadow-[0px_8px_24px_rgba(73,187,189,0.35)]">
                                See Open Positions ↓
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Perks ── */}
            <section className="max-w-[1100px] mx-auto px-[32px] py-[72px]">
                <div className="text-center mb-[48px]">
                    <p className="text-[#49BBBD] text-[12px] font-semibold uppercase tracking-[3px] mb-[10px]">Why Join Us</p>
                    <h2 className="text-[30px] font-bold text-[#252641]">What We Offer</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px]">
                    {PERKS.map((perk, i) => (
                        <div key={i} className="bg-white rounded-[16px] p-[24px] shadow-[0px_4px_20px_rgba(38,45,118,0.06)] text-center hover:shadow-[0px_8px_32px_rgba(38,45,118,0.10)] transition-shadow">
                            <div className={`w-[56px] h-[56px] rounded-[12px] ${perk.bg} ${perk.color} flex items-center justify-center mx-auto mb-[16px]`}>
                                {perk.icon}
                            </div>
                            <h3 className="text-[14px] font-bold text-[#252641] mb-[8px]">{perk.title}</h3>
                            <p className="text-[12px] text-[#696984] leading-[175%]">{perk.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Open Positions ── */}
            <section id="openings" className="bg-[#F5F7FF] py-[72px]">
                <div className="max-w-[1100px] mx-auto px-[32px]">
                    <div className="text-center mb-[40px]">
                        <p className="text-[#49BBBD] text-[12px] font-semibold uppercase tracking-[3px] mb-[10px]">We're Hiring</p>
                        <h2 className="text-[30px] font-bold text-[#252641] mb-[24px]">Open Positions</h2>

                        {/* Filters */}
                        <div className="flex gap-[8px] justify-center flex-wrap">
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-[18px] py-[8px] rounded-[20px] text-[12px] font-semibold transition-colors ${
                                        activeFilter === f
                                            ? 'bg-[#49BBBD] text-white shadow-[0px_4px_12px_rgba(73,187,189,0.30)]'
                                            : 'bg-white text-[#696984] hover:bg-[#E8F8F8] hover:text-[#49BBBD]'
                                    }`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[16px]">
                        {filtered.map((job, i) => (
                            <div key={i}
                                className="bg-white rounded-[16px] shadow-[0px_4px_20px_rgba(38,45,118,0.06)] overflow-hidden">
                                <button
                                    onClick={() => setOpenJob(openJob === i ? null : i)}
                                    className="w-full flex items-center justify-between px-[28px] py-[20px] text-left hover:bg-[#F5F7FF] transition-colors">
                                    <div className="flex items-center gap-[16px]">
                                        <div className={`w-[44px] h-[44px] rounded-[10px] ${job.bg} ${job.color} flex items-center justify-center flex-shrink-0`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <rect x="2" y="7" width="20" height="14" rx="2"/>
                                                <path d="M16 7V5a2 2 0 00-4 0v2"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#252641]">{job.title}</p>
                                            <p className="text-[11px] text-[#696984] mt-[2px]">{job.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-[12px]">
                                        <span className="hidden lg:flex items-center gap-[5px] text-[11px] text-[#696984]">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                                            </svg>
                                            {job.location}
                                        </span>
                                        <span className={`px-[10px] py-[4px] rounded-[12px] text-[10px] font-bold ${job.bg} ${job.color}`}>
                                            {job.type}
                                        </span>
                                        <svg
                                            width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="#696984" strokeWidth="2"
                                            className={`transition-transform ${openJob === i ? 'rotate-180' : ''}`}>
                                            <polyline points="6 9 12 15 18 9"/>
                                        </svg>
                                    </div>
                                </button>

                                {/* Expanded */}
                                {openJob === i && (
                                    <div className="px-[28px] pb-[28px] border-t border-[#F0F0F8]">
                                        <div className="pt-[20px] flex flex-col lg:flex-row gap-[32px]">
                                            <div className="flex-1">
                                                <h4 className="text-[13px] font-bold text-[#252641] mb-[10px]">About the Role</h4>
                                                <p className="text-[12px] text-[#696984] leading-[185%] mb-[16px]">
                                                    We're looking for a passionate {job.title} to join our {job.department} team. You'll work closely with cross-functional teams to deliver high-quality outcomes and contribute to a product used by learners around the world.
                                                </p>
                                                <h4 className="text-[13px] font-bold text-[#252641] mb-[10px]">What You'll Do</h4>
                                                <ul className="flex flex-col gap-[6px]">
                                                    {[
                                                        'Collaborate with product and design teams on new features',
                                                        'Contribute to architecture and technical decisions',
                                                        'Mentor junior team members and review code',
                                                        'Participate in sprint planning and retrospectives',
                                                    ].map((item, j) => (
                                                        <li key={j} className="flex items-start gap-[8px]">
                                                            <div className="w-[14px] h-[14px] rounded-full bg-[#49BBBD]/15 flex items-center justify-center flex-shrink-0 mt-[2px]">
                                                                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#49BBBD" strokeWidth="3" strokeLinecap="round">
                                                                    <polyline points="20 6 9 17 4 12"/>
                                                                </svg>
                                                            </div>
                                                            <span className="text-[12px] text-[#696984]">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="lg:w-[220px] flex flex-col gap-[12px]">
                                                <div className="bg-[#F5F7FF] rounded-[12px] p-[16px]">
                                                    <p className="text-[11px] font-bold text-[#252641] mb-[10px] uppercase tracking-[1px]">Details</p>
                                                    {[
                                                        { label: 'Location', value: job.location },
                                                        { label: 'Type', value: job.type },
                                                        { label: 'Department', value: job.department },
                                                        { label: 'Start', value: 'As soon as possible' },
                                                    ].map((d, k) => (
                                                        <div key={k} className="flex justify-between mb-[6px]">
                                                            <span className="text-[11px] text-[#696984]">{d.label}</span>
                                                            <span className="text-[11px] font-semibold text-[#252641]">{d.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button className={`w-full py-[12px] rounded-[8px] text-[13px] font-bold text-white transition-colors bg-[#49BBBD] hover:bg-[#3da8aa] shadow-[0px_4px_16px_rgba(73,187,189,0.30)]`}>
                                                    Apply Now →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-[#49BBBD] py-[64px]">
                <div className="max-w-[700px] mx-auto px-[32px] text-center">
                    <h2 className="text-[28px] font-bold text-white mb-[12px]">
                        Don't See the Right Role?
                    </h2>
                    <p className="text-[14px] text-white/80 leading-[185%] mb-[28px]">
                        We're always on the lookout for talented people. Send us your CV and tell us how you'd make an impact.
                    </p>
                    <a href="mailto:careers@yourplatform.com">
                        <button className="bg-white text-[#49BBBD] font-bold text-[14px] px-[32px] py-[14px] rounded-[8px] hover:bg-white/90 transition-colors shadow-[0px_8px_24px_rgba(0,0,0,0.12)]">
                            Send Open Application →
                        </button>
                    </a>
                </div>
            </section>

        </div>
    )
}