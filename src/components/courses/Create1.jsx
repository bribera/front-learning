'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CalendarSidebar from './CalendarSidebar'
import { fetchUrl } from '../../config/api-config'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'


const Create1 = () => {
     const router = useRouter()
    const searchParams = useSearchParams()
    const courseId = searchParams.get('courseId')

    const [activeMenu, setActiveMenu] = useState(null)
    const [saving, setSaving] = useState(false)
    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [note, setNote] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState({ name: '', email: '', message: '' })
  
    // ── Fetch course + components (lessons, quizzes) ──────────────────────────
    useEffect(() => {
            console.log("useEffect déclenché, courseId:", courseId) // ← ajoute ça

        if (!courseId) return
        fetchUrl(`/courses/${courseId}?populate[lessons]=true&populate[quiz]=true&populate[events]=true&populate[thumbnail]=true`)
            .then(data => {
                const c = data.data
                setCourse(c)
                console.log("course data", c)        // ← déplacé ici
                console.log("lessons", c?.lessons)
                console.log("quizzes", c?.quiz)
                // Pré-remplir les lessons existantes depuis le component Strapi
                if (c?.lessons?.length > 0) {
                    setLessons(c.lessons.map(l => ({
                        id: l.id,
                        title: l.title || '',
                        date: l.date || '',
                        startTime: l.startTime || '',
                        endTime: l.endTime || '',
                        duration: l.duration || '',
                    })))
                    // Sélectionner la première lesson par défaut
                    setActiveMenu(c.lessons[0]?.id || 1)
                }
                setQuizzes(c?.quiz || [])
                if (c?.note) setNote(c.note)
            })
            .catch(console.error)
    }, [courseId])



    const [form, setForm] = useState({
        eventName: '',
        startDateTime: '',
        endDateTime: '',
        location: '',
        notification: '30 mins',
        email: '',
        description: '',
    })
const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

    // ── Save → PUT /courses/:id avec lessons + note comme components ──────────
    // const handleSave = async () => {
    //     setSaving(true)
    //     try {
    //         await fetchUrl(`/courses/${courseId}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 data: {
    //                     note,
    //                     lessons: lessons.map(l => ({
    //                         title: l.title,
    //                         date: l.date,
    //                         startTime: l.startTime,
    //                         endTime: l.endTime,
    //                     }))
    //                 }
    //             })
    //         })
    //         router.push(`/courses/calendar/create/create2?courseId=${courseId}`)
    //     } catch (err) {
    //         console.error(err)
    //         router.push(`/courses/calendar/create/create2?courseId=${courseId}`)
    //     } finally {
    //         setSaving(false)
    //     }
    // }

   const handleSave = async () => {
        setSaving(true)
        try {
            const payload = {
                data: {
                    title: form.eventName,
                    description: form.description ? [{ type: 'paragraph', children: [{ type: 'text', text: form.description }] }] : null,
                    note: form.notification,
                    activities: {
                        location: form.location,
                        email: form.email,
                        startDateTime: form.startDateTime,
                        endDateTime: form.endDateTime,
                    },
                    courses: [courseId], // relation vers le cours
                }
            }
            console.log("payload:", JSON.stringify(payload, null, 2))
            await fetchUrl(`/course-events`, {
                method: 'POST', // ← POST sur course-events, pas PUT sur courses
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            router.push(`/courses/calendar/create/create2?courseId=${courseId}`)
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

  
    return (
    <div className=''>
        <div className="flex h-screen bg-[#F5F7FF] overflow-hidden">
           {/* Sidebar 100% dynamique */}
            <CalendarSidebar
                lessons={lessons}
                quizzes={quizzes}
                activeId={activeMenu}
                onSelect={setActiveMenu}
            />
           
           <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-[#49BBBD] text-white px-[24px] py-[12px] flex flex-col items-start justify-between">
                    <div>
                        <h1 className="text-[16px] lg:text-[22px] 2xl:text-[44px] pb-[5px]">
                            {course?.title || '...'}
                        </h1>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-[11px] lg:text-[16px]  2xl:text-[24px] ">{course?.subtitle || ''}</p>

                        <div className="flex items-center gap-[10px] items-center">
                            <img src="/images/clockwhite.png" alt="" className='w-[16px] 2xl:w-[24px]' />
                            <span className="text-[11px] lg:text-[16px] 2xl:text-[24px] text-white">1 hour</span>
                        </div>
                    </div>
                </div>
             {/* Body */}
                <div className="flex-1 overflow-y-auto pl-[30px] pt-[30px] pb-[152px] pr-[50px] bg-[#9DCCFF]/20">
                    <div className=" flex flex-col gap-[20px]">

                        <h2 className="text-[12px] lg:text-[30px] font-semibold text-[#252641]">Create new event</h2>

                        {/* Description du cours */}
                        
                        {course?.description && (
                            <BlocksRenderer
                                content={course.description}
                                blocks={{
                                    paragraph: ({ children }) => (
                                        <p className="text-[#696984] text-[12px] lg:text-[18px] tracking-[2%]">{children}</p>
                                    ),
                                }}
                            />
                        )}

                        {/* Form card */}
                        <div className="bg-white rounded-[12px] p-[28px] shadow-[0px_2px_16px_rgba(38,45,118,0.07)]">

                            {/* Event Name */}
                            <div className="mb-[22px]">
                                <label className="block text-[12px] lg:text-[18px] font-semibold text-[#5B5B5B] mb-[10px]">Event Name</label>
                                <input type="text"
                                    placeholder="Adobe XD Auto - Animate - Your Guide to Creating"
                                    value={form.eventName}
                                    onChange={e => update('eventName', e.target.value)}
                                    className="w-full border border-[#D9D9D9] rounded-[10px] px-[14px] py-[11px] 2xl:px-[21px] 2xl:pt-[16px] 2xl:pb-[17px] lg:text-[18px] text-[12px] text-[#9D9B9B] placeholder-[#9D9B9B] focus:outline-none focus:border-[#49BBBD] transition-colors"
                                />
                            </div>

                            {/* Start + End datetime */}
                            <div className="grid grid-cols-2 gap-[18px] mb-[20px]">
                                <div>
                                    <label className="block text-[12px] lg:text-[18px] font-semibold text-[#5B5B5B] mb-[10px]">Start date / Time</label>
                                    <input type="datetime-local"
                                        value={form.startDateTime}
                                        onChange={e => update('startDateTime', e.target.value)}
                                        className="w-full border border-[#D9D9D9] rounded-[10px] 2xl:px-[21px] 2xl:pb-[16px] 2xl:pt-[17px] px-[14px] py-[11px] text-[12px] lg:text-[18px] text-[#696984] focus:outline-none focus:border-[#49BBBD] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[12px] lg:text-[18px] font-semibold text-[#5B5B5B] mb-[10px]">End Date / Time</label>
                                    <input type="datetime-local"
                                        value={form.endDateTime}
                                        onChange={e => update('endDateTime', e.target.value)}
                                        className="w-full border border-[#D9D9D9] rounded-[10px] px-[14px] py-[11px] text-[12px] lg:text-[18px] text-[#696984] focus:outline-none focus:border-[#49BBBD] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="mb-[20px]">
                                <label className="block text-[12px] font-semibold text-[#5B5B5B] mb-[10px]">Location</label>
                                <input type="text"
                                    placeholder="2118 Thornridge Cir, Syracuse, Connecticut 35624"
                                    value={form.location}
                                    onChange={e => update('location', e.target.value)}
                                    className="w-full border border-[#D9D9D9] rounded-[10px] px-[14px] py-[11px] text-[12px] text-[#9D9B9B] placeholder-[#9D9B9B] focus:outline-none focus:border-[#49BBBD] transition-colors"
                                />
                            </div>

                            {/* Notification + Email */}
                            <div className="grid grid-cols-2 gap-[18px] mb-[22px]">
                                <div>
                                    <label className="block text-[12px] lg:text-[18px] font-semibold text-[#5B5B5B] mb-[10px]">Notification</label>
                                    <div className="relative">
                                        <select value={form.notification}
                                            onChange={e => update('notification', e.target.value)}
                                            className="w-full border border-[#D9D9D9] rounded-[10px] px-[14px] py-[11px] text-[12px] lg:text-[18px] text-[#9D9B9B] focus:outline-none focus:border-[#49BBBD] transition-colors bg-white appearance-none cursor-pointer pr-[32px]"
                                        >
                                            <option>10 mins</option>
                                            <option>15 mins</option>
                                            <option>30 mins</option>
                                            <option>1 hour</option>
                                            <option>1 day</option>
                                        </select>
                                        <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#696984" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[12px] lg:text-[18px] font-semibold text-[#5B5B5B] mb-[10px]">Email</label>
                                    <input type="email"
                                        placeholder="jessica.hanson@example.com"
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                        className="w-full border border-[#D9D9D9] rounded-[10px] px-[14px] py-[11px] lg:text-[18px] text-[12px] text-[#9D9B9B] placeholder-[#9D9B9B] focus:outline-none focus:border-[#49BBBD] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Event Description */}
                            <div className="mb-[50px]">
                                <label className="block text-[12px] lg:text-[18px] font-semibold text-[#5B5B5B] mb-[10px]">Event Description</label>
                                <textarea
                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur "
                                    rows={6}
                                    value={form.description}
                                    onChange={e => update('description', e.target.value)}
                                    className="w-full border border-[#9D9B9B] rounded-[10px] px-[14px] py-[11px] text-[12px] lg:text-[18px] text-[#9D9B9B] placeholder-[#9D9B9B] focus:outline-none focus:border-[#49BBBD] transition-colors resize-none"
                                />
                            </div>

                            {/* Save */}
                            <div className="flex justify-end">
                                <button onClick={handleSave} disabled={saving}
                                    className="bg-[#49BBBD] text-white font-bold text-[13px] lg:text-[24px]  px-[105px] pt-[13px] pb-[14px] rounded-[12px] hover:bg-[#3da8aa] disabled:opacity-50 transition-colors">
                                    {saving ? 'Saving...' : 'Save Now'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
           </div>
        </div>
    </div>
  )
}

export default Create1