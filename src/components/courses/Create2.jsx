'use client'
import React, { useEffect, useState } from 'react'
import CalendarSidebar from './CalendarSidebar'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchUrl } from '../../config/api-config'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'


const SocialIcons = ({ course }) => {
    const links = [
        { url: course?.tweeter,   icon: "/images/twitter.svg" },
        { url: course?.facebook,  icon: "/images/facebook.svg"},
        { url: course?.youtube,   icon: "/images/youtube.svg" },
        { url: course?.instagram, icon: "/images/instagram.svg" },
        { url: course?.telegram,  icon: "/images/telegram.svg" },
        { url: course?.whatsapp,  icon: "/images/whatsapp.svg" },
    ].filter(l => l.url)

    if (links.length === 0) return null

    return (
        <div className="flex items-center gap-[5px] flex-shrink-0">
            {links.map((l, i) => (
                <Link key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                    className=" "
                    // style={{ backgroundColor: `${l.color}20` }}
                    >
                    <div className="w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                        <img src={l.icon} alt="" className='' />
                    </div>
                </Link>
            ))}
        </div>
    )
}


const CARD_COLORS = [
    'bg-[#E8F8F8]',
    'bg-[#FFF3E0]',
    'bg-[#FDE8F0]',
]

const Create2 = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const courseId = searchParams.get('courseId')
 
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true) // ← ajouté
    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [activeMenu, setActiveMenu] = useState(null)
    const [shareCards, setShareCards] = useState([])
 

    useEffect(() => {
        if (!courseId) return
        const load = async () => {
            try {
                setLoading(true)
                const [courseData, eventsData] = await Promise.all([
                    fetchUrl(`/courses/${courseId}?populate[lessons]=true&populate[quiz]=true`),
                    fetchUrl(`/course-events?filters[courses][documentId][$eq]=${courseId}&populate[courses][fields][0]=facebook&populate[courses][fields][1]=tweeter&populate[courses][fields][2]=instagram&populate[courses][fields][3]=youtube&populate[courses][fields][4]=whatsapp&populate[courses][fields][5]=telegram&sort=createdAt:desc`)
                ])
                const c = courseData.data
                console.log('c', c)
                setCourse(c)
                setLessons(c?.lessons || [])
                setQuizzes(c?.quiz || [])
                if (c?.lessons?.[0]) setActiveMenu(c.lessons[0].documentId || c.lessons[0].id)
                setShareCards(eventsData.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [courseId])

    const handleSave = async () => {
        setSaving(true)
        try {
            router.push(`/courses/calendar/view?courseId=${courseId}`)
        } finally {
            setSaving(false)
        }
    }

    return (
    <div className='flex h-screen bg-[#F0F2F9] overflow-hidden'>
        <CalendarSidebar lessons={lessons} quizzes={quizzes} activeId={activeMenu} onSelect={setActiveMenu} />
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header teal */}
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
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-[32px] py-[24px]">
                <div className=" flex flex-col gap-[20px]">
                   {/* Share and Refer */}
                    <div className='pb-[59px]'>
                        <h2 className="text-[17px] lg:text-[30px] font-bold text-[#252641] mb-[10px]">Share and Refer</h2>
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
                    </div> 


                    {/* Loading */}
                    {loading ? (
                        <div className="flex items-center justify-center py-[40px]">
                            <div className="w-8 h-8 border-4 border-[#E8E8F0] border-t-[#49BBBD] rounded-full animate-spin" />
                        </div>
                    ) : shareCards.length === 0 ? (
                        <div className="bg-white rounded-[12px] p-[24px] text-center shadow-[0px_2px_12px_rgba(38,45,118,0.06)]">
                            <p className="text-[13px] text-[#696984] mb-[12px]">No events created yet.</p>
                            <button onClick={() => router.back()}
                                className="bg-[#49BBBD] text-white font-bold text-[12px] lg:text-[18px] px-[20px] py-[8px] rounded-[8px] hover:bg-[#3da8aa] transition-colors">
                                ← Create an event first
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* share card */}
                            {shareCards.map((card, i) => (
                                <div key={card.documentId || card.id}
                                    className={`rounded-[20px] bg-white p-[30px] `}>
                                    <div className="flex items-start justify-between mb-[6px]">
                                        <div className="flex-1 min-w-0 gap-1">
                                            <h3 className="text-[22px] lg:text-[30px] font-semibold text-[#252641] mb-[17px]">{card.title} </h3>
                                            <div className="text-[12px] lg:text-[18px] flex items-ceenter lg:text-[13pxpx] 2xl:text-[18px] text-[#696984] ">
                                                {
                                                    card.activities?.location && (
                                                    <p className="pr-[5px]">{card.activities.location} / </p>
                                                    )  
                                                }
                                                    {/* date/heure */}
                                                {card.activities?.startDateTime && (
                                                    <p className="">
                                                        {new Date(card.activities.startDateTime).toLocaleString('fr-FR', {
                                                            day: '2-digit', month: 'short', year: 'numeric',
                                                            hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <SocialIcons course={course}/>
                                    </div>
                                    {/* <p className="text-[11px] text-[#696984] leading-[175%] mt-[8px]">{card.text}</p> */}
                                        {/* description */}
                                    {card.description ? (
                                        <div className={`mt-[20px] pt-[21px] pl-[21px] pb-[30px] pr-[45px] ${CARD_COLORS[i % CARD_COLORS.length]}`}>
                                            <BlocksRenderer
                                                content={card.description}
                                                blocks={{
                                                    paragraph: ({ children }) => (
                                                        <p className="text-[11px] lg:text-[18px] text-[#696984] leading-[175%]">{children}</p>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </>)
                    }

                    {/* Navigation */}
                   
                    <div className="flex justify-between pt-[48px] pb-[20px]">
                        <button onClick={() => router.back()}
                            className="border border-[#E8E8F0] bg-white text-[#696984] text-[12px] font-medium px-[20px] py-[10px] rounded-[8px] hover:bg-[#F5F7FF] transition-colors">
                            ← <span className='pl-[5px]'>Previous</span> 
                        </button>
                        <button onClick={handleSave} disabled={saving}
                            className="bg-[#49BBBD] text-white font-bold text-[13px] lg:text-[20px] px-[20px] py-[10px] rounded-[8px] hover:bg-[#3da8aa] disabled:opacity-50 transition-colors ">
                            {saving ? 'Saving...' : 'View Calendar →'}
                        </button>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create2