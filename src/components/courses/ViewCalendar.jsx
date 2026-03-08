'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import CalendarSidebar from './CalendarSidebar'
import { fetchUrl } from '../../config/api-config'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const HOURS = ['8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM']

function getCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    while (days.length % 7 !== 0) days.push(null)
    return days
}

// Mappe les events sur les jours du mois courant
function buildEventsMap(events, year, month) {
    const map = {}
    events.forEach(evt => {
        const dt = evt.activities?.startDateTime
        if (!dt) return
        const d = new Date(dt)
        if (d.getFullYear() === year && d.getMonth() === month) {
            const day = d.getDate()
            if (!map[day]) map[day] = []
            map[day].push(evt)
        }
    })
    return map
}

// Mappe les events sur les heures pour la timeline
function buildTimelineMap(events, year, month, day) {
    const map = {}
    events.forEach(evt => {
        const dt = evt.activities?.startDateTime
        if (!dt) return
        const d = new Date(dt)
        if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
            const hour = d.getHours()
            if (!map[hour]) map[hour] = []
            map[hour].push(evt)
        }
    })
    return map
}

const ViewCalendar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const courseId = searchParams.get('courseId')

    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [activeMenu, setActiveMenu] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
  
  
    const today = new Date()
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [selectedDay, setSelectedDay] = useState(today.getDate())

    const calendarDays = getCalendarDays(currentYear, currentMonth)
    const eventsMap = buildEventsMap(events, currentYear, currentMonth)
    const timelineMap = buildTimelineMap(events, currentYear, currentMonth, selectedDay)
    const selectedWeekday = WEEKDAYS[new Date(currentYear, currentMonth, selectedDay).getDay()]


    useEffect(() => {
        if (!courseId) return
        const load = async () => {
            try {
                setLoading(true)
                const [courseData, eventsData] = await Promise.all([
                    fetchUrl(`/courses/${courseId}?populate[lessons]=true&populate[quiz]=true`),
                    fetchUrl(`/course-events?filters[courses][documentId][$eq]=${courseId}&sort=createdAt:asc&pagination[limit]=100`)
                ])
                console.log('eventsData:', eventsData) // ← ajoute ça

                const c = courseData.data
                console.log('c:', c) // ← ajoute ça

                setCourse(c)
                setLessons(c?.lessons || [])
                setQuizzes(c?.quiz || [])
                if (c?.lessons?.[0]) setActiveMenu(c.lessons[0].documentId || c.lessons[0].id)
                setEvents(eventsData.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [courseId])

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
        else setCurrentMonth(m => m - 1)
    }
    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
        else setCurrentMonth(m => m + 1)
    }

    // Heures à afficher dans la timeline (8h → 19h)
    const timelineHours = Array.from({ length: 12 }, (_, i) => i + 8)

    // Commence à 0h (minuit) → 23h
    // const timelineHours = Array.from({ length: 24 }, (_, i) => i)

    return (
    <div className='flex h-screen bg-[#F0F2F9] overflow-hidden'>
        <CalendarSidebar lessons={lessons} quizzes={quizzes} activeId={activeMenu} onSelect={setActiveMenu} />
   
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header — même style que Create2 */}
                <div className="bg-[#49BBBD] text-white px-[24px] py-[12px] flex flex-col items-start justify-between flex-shrink-0">
                    <h1 className="text-[22px] lg:text-[44px] pb-[5px]">
                        {course?.title || 'Learn about Adobe XD & Prototyping'}
                    </h1>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-[16px] lg:text-[24px]">{course?.subtitle || 'Introduction about XD'}</p>
                        <div className="flex items-center gap-[10px]">
                            {/* <Link href={`/courses/calendar/full?courseId=${courseId}`}>
                                <button className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-[12px] py-[5px] rounded-[6px] transition-colors mr-[8px]">
                                    Full View →
                                </button>
                            </Link> */}
                            <img src="/images/clockwhite.png" alt="" className="w-[16px] 2xl:w-[24px]" />
                            <span className="text-[16px] lg:text-[24px] text-white">1 hour</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-[32px] py-[24px]">
                    <div className="">
                        {/* Share and refer */}
                        <div className="mb-[22px]">
                            <h2 className="text-[22px] lg:text-[30px] font-bold text-[#252641] mb-[8px]">Share and refer</h2>
                            <p className="text-[14px] lg:text-[18px] text-[#696984] leading-[185%]">
                                Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        {loading ? (
                            <div className="flex items-center justify-center py-[60px]">
                                <div className="w-8 h-8 border-4 border-[#E8E8F0] border-t-[#49BBBD] rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="flex items-start items-stretch">

                                {/* ── Calendrier mensuel ── */}
                                <div className="bg-white flex-1 rounded-es-[12px] p-[20px] shadow-[0px_2px_12px_rgba(38,45,118,0.06)] flex-1">
                                    {/* Month nav */}
                                    <div className="flex items-center justify-between mb-[16px]">
                                        <button onClick={prevMonth}
                                            className="w-[26px] h-[26px] rounded-full bg-[#F5F7FF] flex items-center justify-center hover:bg-[#E8E8F0] transition-colors">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#696984" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                                        </button>
                                        <p className="text-[13px] lg:text-[20px] font-bold text-[#252641]">
                                            {MONTHS[currentMonth]} {currentYear}
                                        </p>
                                        <button onClick={nextMonth}
                                            className="w-[26px] h-[26px] rounded-full bg-[#F5F7FF] flex items-center justify-center hover:bg-[#E8E8F0] transition-colors">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#696984" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                                        </button>
                                    </div>

                                    {/* Day headers */}
                                    <div className="grid grid-cols-7 mb-[4px]">
                                        {DAYS.map(d => (
                                            <div key={d} className="text-center text-[10px] font-bold text-[#696984] py-[2px]">{d}</div>
                                        ))}
                                    </div>

                                    {/* Days grid */}
                                    <div className="grid grid-cols-7">
                                        {calendarDays.map((day, i) => {
                                            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                                            const isSelected = day === selectedDay
                                            const hasEvents = day && eventsMap[day]?.length > 0

                                            return (
                                                <div key={i}
                                                    onClick={() => day && setSelectedDay(day)}
                                                    className={`relative flex flex-col items-center justify-center h-[36px] rounded-[4px] cursor-pointer transition-colors ${
                                                        !day ? '' : isSelected ? 'bg-[#49BBBD]/10' : 'hover:bg-[#F5F7FF]'
                                                    }`}>
                                                    {day && (
                                                        <>
                                                            <span className={`text-[12px] font-medium leading-none ${
                                                                isToday
                                                                    ? 'w-[24px] h-[24px] bg-[#49BBBD] text-white rounded-full flex items-center justify-center text-[11px]'
                                                                    : isSelected ? 'text-[#49BBBD] font-bold'
                                                                    : 'text-[#252641]'
                                                            }`}>{day}</span>
                                                            {hasEvents && (
                                                                <div className="absolute bottom-[2px] flex gap-[2px]">
                                                                    {eventsMap[day].slice(0, 3).map((_, ei) => (
                                                                        <div key={ei} className="w-[4px] h-[4px] rounded-full bg-[#49BBBD]" />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* ── Timeline du jour sélectionné ── */}
                                <div className="flex-1 bg-white rounded-r-[12px] p-[16px] shadow-[0px_2px_12px_rgba(38,45,118,0.06)]">
                                    <p className="text-[12px] text-center lg:text-[20px] font-bold text-[#252641] mb-[14px]">
                                        {MONTHS[currentMonth].slice(0,3)} {selectedDay}, {selectedWeekday}
                                    </p>

                                    <div className="flex flex-col overflow-y-auto max-h-[340px]">
                                        {timelineHours.map(hour => {
                                            const label = hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`
                                            const hourEvents = timelineMap[hour] || []
                                            return (
                                                <div key={hour} className="flex gap-[8px] min-h-[40px]">
                                                    <div className="w-[38px] flex-shrink-0 pt-[2px]">
                                                        <span className="text-[9px] text-[#696984]">{label}</span>
                                                    </div>
                                                    <div className="flex-1 border-t border-[#F0F0F0] pt-[4px] pb-[4px]">
                                                        {hourEvents.map((evt, i) => (
                                                            <div key={i}
                                                                className="bg-[#49BBBD]/15 rounded-[4px] px-[8px] py-[4px] mb-[3px]">
                                                                <p className="text-[10px] font-semibold text-[#49BBBD] truncate">
                                                                    {evt.title}
                                                                </p>
                                                                {evt.activities?.endDateTime && (
                                                                    <p className="text-[9px] text-[#49BBBD]/70">
                                                                        → {new Date(evt.activities.endDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                         {/* Navigation */}
                        <div className="flex justify-between mt-[24px] pb-[20px]">
                            <button onClick={() => router.back()}
                                className="border border-[#E8E8F0] bg-white text-[#696984] text-[12px] font-medium px-[20px] py-[10px] rounded-[8px] hover:bg-[#F5F7FF] transition-colors">
                                ← Back
                            </button>
                            <Link href={`/courses/calendar/full?courseId=${courseId}`}>
                                <button className="bg-[#49BBBD] text-white font-bold text-[13px] px-[28px] py-[10px] rounded-[8px] hover:bg-[#3da8aa] transition-colors shadow-[0px_6px_20px_rgba(73,187,189,0.35)]">
                                    Full View →
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

        </div>
   
    </div>
  )
}

export default ViewCalendar