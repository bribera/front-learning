'use client'
import { useState } from 'react'
import Link from 'next/link'

const TEAM = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', color: 'bg-[#49BBBD]' },
    { name: 'Marcus Chen', role: 'Head of Education', color: 'bg-[#2F327D]' },
    { name: 'Amira Diallo', role: 'Lead Instructor', color: 'bg-[#F48C06]' },
    { name: 'Lucas Petit', role: 'Product Designer', color: 'bg-[#E05C5C]' },
    { name: 'Priya Sharma', role: 'Tech Lead', color: 'bg-[#6C70B5]' },
    { name: 'David Osei', role: 'Community Manager', color: 'bg-[#49BBBD]' },
]

const STATS = [
    { value: '10K+', label: 'Active Students' },
    { value: '200+', label: 'Expert Instructors' },
    { value: '500+', label: 'Courses Available' },
    { value: '95%', label: 'Satisfaction Rate' },
]

const VALUES = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
        ),
        title: 'Quality Education',
        desc: 'We believe every learner deserves world-class content, designed by industry experts and delivered with care.',
        color: 'text-[#49BBBD]',
        bg: 'bg-[#E8F8F8]',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
        ),
        title: 'Learn at Your Pace',
        desc: 'Flexible schedules and self-paced content so you can learn without disrupting your life.',
        color: 'text-[#F48C06]',
        bg: 'bg-[#FFF3E0]',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
        ),
        title: 'Community First',
        desc: 'Join thousands of learners and mentors who support each other every step of the way.',
        color: 'text-[#2F327D]',
        bg: 'bg-[#EEF0FF]',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        ),
        title: 'Career Outcomes',
        desc: 'Our courses are built around real job outcomes — not just certificates, but skills that get you hired.',
        color: 'text-[#E05C5C]',
        bg: 'bg-[#FDE8E8]',
    },
]

export default function AboutUs() {
    return (
        <div className="bg-white min-h-screen pt-[143px]">

            {/* ── Hero ── */}
            <section className="bg-[#2F327D] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#49BBBD]" />
                    <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-[#F48C06]" />
                </div>
                <div className="relative max-w-[1100px] mx-auto px-[32px] py-[80px] flex flex-col lg:flex-row items-center gap-[48px]">
                    <div className="flex-1 text-white">
                        <p className="text-[#49BBBD] text-[13px] font-semibold uppercase tracking-[3px] mb-[12px]">
                            About Us
                        </p>
                        <h1 className="text-[36px] lg:text-[48px] font-bold leading-[115%] mb-[20px]">
                            Empowering Learners<br />
                            <span className="text-[#49BBBD]">Around the World</span>
                        </h1>
                        <p className="text-[15px] text-white/70 leading-[185%] max-w-[480px]">
                            We started with a simple belief: quality education should be accessible to everyone, everywhere. Today we're a global platform connecting passionate instructors with curious learners.
                        </p>
                        <div className="flex gap-[16px] mt-[32px]">
                            <Link href="/courses">
                                <button className="bg-[#49BBBD] text-white font-bold text-[14px] px-[28px] py-[13px] rounded-[8px] hover:bg-[#3da8aa] transition-colors shadow-[0px_8px_24px_rgba(73,187,189,0.35)]">
                                    Explore Courses
                                </button>
                            </Link>
                            <Link href="/careers">
                                <button className="border border-white/30 text-white font-semibold text-[14px] px-[28px] py-[13px] rounded-[8px] hover:bg-white/10 transition-colors">
                                    Join Our Team
                                </button>
                            </Link>
                        </div>
                    </div>
                    {/* Illustration grid */}
                    <div className="flex-shrink-0 grid grid-cols-2 gap-[12px]">
                        {['bg-[#49BBBD]/30', 'bg-[#F48C06]/30', 'bg-white/10', 'bg-[#6C70B5]/30'].map((bg, i) => (
                            <div key={i} className={`w-[140px] h-[140px] rounded-[16px] ${bg} flex items-center justify-center`}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.6">
                                    {i === 0 && <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>}
                                    {i === 1 && <><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></>}
                                    {i === 2 && <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>}
                                    {i === 3 && <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>}
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="bg-[#49BBBD] py-[40px]">
                <div className="max-w-[1100px] mx-auto px-[32px] grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
                    {STATS.map((s, i) => (
                        <div key={i} className="text-center text-white">
                            <p className="text-[36px] lg:text-[44px] font-bold leading-none">{s.value}</p>
                            <p className="text-[13px] text-white/75 mt-[6px]">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Our Story ── */}
            <section className="max-w-[1100px] mx-auto px-[32px] py-[72px]">
                <div className="flex flex-col lg:flex-row gap-[60px] items-center">
                    <div className="flex-1">
                        <p className="text-[#49BBBD] text-[12px] font-semibold uppercase tracking-[3px] mb-[10px]">Our Story</p>
                        <h2 className="text-[30px] font-bold text-[#252641] mb-[20px] leading-[130%]">
                            From a Small Idea to a<br />Global Learning Platform
                        </h2>
                        <p className="text-[13px] text-[#696984] leading-[185%] mb-[16px]">
                            It started in 2018 with a whiteboard, three co-founders, and a shared frustration: online learning felt impersonal, expensive, and disconnected from the real world of work.
                        </p>
                        <p className="text-[13px] text-[#696984] leading-[185%] mb-[16px]">
                            We built our first 10 courses in a small apartment in Paris. Within a year, learners from 40 countries had enrolled. Today, we partner with 200+ expert instructors and serve learners in every continent.
                        </p>
                        <p className="text-[13px] text-[#696984] leading-[185%]">
                            Our mission hasn't changed: make expert knowledge accessible, practical, and affordable for everyone.
                        </p>
                    </div>
                    {/* Timeline */}
                    <div className="flex-1 flex flex-col gap-[0px]">
                        {[
                            { year: '2018', title: 'Founded in Paris', desc: '3 founders, 10 courses, 1 big dream.' },
                            { year: '2019', title: '10,000 Students', desc: 'Reached our first major milestone.' },
                            { year: '2021', title: 'Mobile App Launch', desc: 'Learning on the go, anywhere.' },
                            { year: '2023', title: 'Global Expansion', desc: '50+ countries, 500+ courses.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-[20px]">
                                <div className="flex flex-col items-center">
                                    <div className="w-[36px] h-[36px] rounded-full bg-[#49BBBD] flex items-center justify-center flex-shrink-0">
                                        <div className="w-[10px] h-[10px] rounded-full bg-white" />
                                    </div>
                                    {i < 3 && <div className="w-[2px] flex-1 bg-[#E8E8F0] my-[4px]" />}
                                </div>
                                <div className="pb-[24px]">
                                    <p className="text-[11px] font-bold text-[#49BBBD] mb-[2px]">{item.year}</p>
                                    <p className="text-[14px] font-bold text-[#252641] mb-[4px]">{item.title}</p>
                                    <p className="text-[12px] text-[#696984]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="bg-[#F5F7FF] py-[72px]">
                <div className="max-w-[1100px] mx-auto px-[32px]">
                    <div className="text-center mb-[48px]">
                        <p className="text-[#49BBBD] text-[12px] font-semibold uppercase tracking-[3px] mb-[10px]">What We Stand For</p>
                        <h2 className="text-[30px] font-bold text-[#252641]">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
                        {VALUES.map((v, i) => (
                            <div key={i} className="bg-white rounded-[16px] p-[28px] shadow-[0px_4px_20px_rgba(38,45,118,0.06)] flex gap-[20px]">
                                <div className={`w-[56px] h-[56px] rounded-[12px] ${v.bg} ${v.color} flex items-center justify-center flex-shrink-0`}>
                                    {v.icon}
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-bold text-[#252641] mb-[8px]">{v.title}</h3>
                                    <p className="text-[12px] text-[#696984] leading-[180%]">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="max-w-[1100px] mx-auto px-[32px] py-[72px]">
                <div className="text-center mb-[48px]">
                    <p className="text-[#49BBBD] text-[12px] font-semibold uppercase tracking-[3px] mb-[10px]">The People Behind It</p>
                    <h2 className="text-[30px] font-bold text-[#252641]">Meet Our Team</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-[24px]">
                    {TEAM.map((member, i) => (
                        <div key={i} className="bg-white rounded-[16px] p-[24px] shadow-[0px_4px_20px_rgba(38,45,118,0.06)] text-center hover:shadow-[0px_8px_32px_rgba(38,45,118,0.12)] transition-shadow">
                            <div className={`w-[72px] h-[72px] rounded-full ${member.color} mx-auto mb-[16px] flex items-center justify-center`}>
                                <span className="text-[26px] font-bold text-white">{member.name.charAt(0)}</span>
                            </div>
                            <p className="text-[14px] font-bold text-[#252641] mb-[4px]">{member.name}</p>
                            <p className="text-[11px] text-[#49BBBD] font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-[#2F327D] py-[64px]">
                <div className="max-w-[700px] mx-auto px-[32px] text-center">
                    <h2 className="text-[30px] font-bold text-white mb-[16px]">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-[14px] text-white/70 leading-[185%] mb-[32px]">
                        Join over 10,000 students already learning on our platform. Your next skill is just one course away.
                    </p>
                    <div className="flex gap-[16px] justify-center flex-wrap">
                        <Link href="/courses">
                            <button className="bg-[#49BBBD] text-white font-bold text-[14px] px-[32px] py-[14px] rounded-[8px] hover:bg-[#3da8aa] transition-colors shadow-[0px_8px_24px_rgba(73,187,189,0.35)]">
                                Browse Courses
                            </button>
                        </Link>
                        <Link href="/careers">
                            <button className="border border-white/30 text-white font-semibold text-[14px] px-[32px] py-[14px] rounded-[8px] hover:bg-white/10 transition-colors">
                                Work With Us →
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}