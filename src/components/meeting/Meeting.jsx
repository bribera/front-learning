'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'

// ── Icônes SVG inline ─────────────────────────────────────────────────────────
const MicIcon = ({ muted }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {muted ? (
            <>
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
            </>
        ) : (
            <>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
            </>
        )}
    </svg>
)

const CameraIcon = ({ off }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {off ? (
            <>
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
            </>
        ) : (
            <>
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </>
        )}
    </svg>
)

const ChatIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

const ShareIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
)

const EndCallIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.43 9.64a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.54 0h3.06a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.56 7.9" />
        <line x1="23" y1="1" x2="1" y2="23" />
    </svg>
)

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
)

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

// ── Données mockup ────────────────────────────────────────────────────────────
const MOCK_PARTICIPANTS = [
    { id: 3, name: 'Lina M.', avatar: '/images/lina.png', speaking: false },
    { id: 1, name: 'Sarah K.', avatar: '/images/sarah.png', speaking: false },
    { id: 2, name: 'James R.', avatar: '/images/mark.png', speaking: true },
]

const MOCK_LESSONS = [
    { id: 1, title: 'Introduction to the course', duration: '5 min', done: true },
    { id: 2, title: 'Setting up your environment', duration: '12 min', done: true },
    { id: 3, title: 'Core concepts & fundamentals', duration: '20 min', done: false },
    { id: 4, title: 'Building your first project', duration: '35 min', done: false },
    { id: 5, title: 'Advanced techniques', duration: '28 min', done: false },
    { id: 6, title: 'Final review & wrap-up', duration: '10 min', done: false },
]

const MOCK_BOOKS = [
    { id: 1, cover: '/images/uxui.png', title: 'All Benefits of PLUS', price: '$24' },
    { id: 2, cover: '/images/react.png', title: '10 Benefits of PLUS', price: '$24' },
]

const MOCK_SECTIONS = [
    {
        id: 1,
        title: 'Get Started',
        duration: '1 Hour',
        lessons: 5,
        items: []
    },
    {
        id: 2,
        title: 'Illstarator Structuors',
        duration: '2 Hour',
        lessons: 3,
        items: [
            { id: 1, title: 'Lorem ipsum dolor sit amet', duration: '65:00', locked: false, active: true },
            { id: 2, title: 'Lorem ipsum dolor', duration: '25:00', locked: true },
            { id: 3, title: 'Lorem ipsum dolor sit amet', duration: '30:00', locked: true },
        ]
    },
    {
        id: 3,
        title: 'Using Illstarator',
        duration: '1 Hour',
        lessons: 4,
        items: []
    },
    {
        id: 4,
        title: 'What is Pandas?',
        duration: '12:54',
        lessons: 5,
        items: []
    },
    {
        id: 5,
        title: 'Work with Numpy',
        duration: '59:00',
        lessons: 3,
        items: []
    },
]


// ── CourseContents component ──────────────────────────────────────────────────
const CourseContents = ({ totalSections = 5, completedSections = 2 }) => {
    const [openSection, setOpenSection] = useState(2)
    const progress = (completedSections / totalSections) * 100

    return (
        <div className="bg-white rounded-[20px] p-[24px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-[6px]">
                <h3 className="text-[18px] font-bold text-[#252641]">Course Contents</h3>
                <div className="">
                    <img src="/images/calendar.png" alt="" />
                </div>
            </div>

            {/* Progress */}
            <p className="text-[11px] font-bold text-[#49BBBD] mb-[8px] tracking-[1px]">
                {completedSections}/{totalSections} COMPLETED
            </p>
            <div className="w-full h-[4px] bg-[#E8E8E8] rounded-full mb-[20px]">
                <div
                    className="h-full bg-[#49BBBD] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-[8px]">
                {MOCK_SECTIONS.map((section) => (
                    <div
                        key={section.id}
                        className={`rounded-[12px] overflow-hidden border transition-all duration-200 ${
                            openSection === section.id ? 'border-[#49BBBD]' : 'border-[#E8E8E8]'
                        }`}
                    >
                        {/* Section header */}
                        <button
                            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                            className="w-full flex items-center justify-between px-[14px] py-[12px] hover:bg-[#F5F9FF] transition-colors"
                        >
                            <div className="text-left">
                                <p className={`text-[13px] font-semibold ${
                                    openSection === section.id ? 'text-[#49BBBD]' : 'text-[#252641]'
                                }`}>
                                    {section.title}
                                </p>
                                <div className="flex items-center gap-[10px] mt-[4px]">
                                    <div className="flex items-center gap-[3px]">
                                        <div className="">
                                            <img src="/images/clock.png" alt="" />
                                        </div>
                                        <span className="text-[11px] text-[#696984]">{section.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-[3px]">
                                        <div className="">
                                            <img src="/images/books.png" alt="" />
                                        </div>
                                        <span className="text-[11px] text-[#696984]">{section.lessons} Lessons</span>
                                    </div>
                                </div>
                            </div>
                            <svg
                                width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke={openSection === section.id ? '#49BBBD' : '#696984'}
                                strokeWidth="2"
                                className={`flex-shrink-0 transition-transform duration-200 ${
                                    openSection === section.id ? 'rotate-180' : ''
                                }`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {/* Section items */}
                        {openSection === section.id && section.items.length > 0 && (
                            <div className="border-t border-[#49BBBD]/20">
                                {section.items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`flex items-center justify-between px-[14px] py-[10px] transition-colors ${
                                            item.active ? 'bg-[#F0FAFA]' : 'hover:bg-[#F5F9FF]'
                                        }`}
                                    >
                                        <span className={`text-[12px] font-medium ${
                                            item.active ? 'text-[#49BBBD]' : 'text-[#696984]'
                                        }`}>
                                            {index + 1}. {item.title}
                                        </span>
                                        <div className="flex items-center gap-[5px] flex-shrink-0">
                                            <span className={`text-[12px] font-medium ${
                                                item.active ? 'text-[#49BBBD]' : 'text-[#696984]'
                                            }`}>
                                                {item.duration}
                                            </span>
                                            {item.locked && <img src="/images/lock.png" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Composant principal ───────────────────────────────────────────────────────
const Meeting = ({ searchParams }) => {
    const meetingId = searchParams.get('meetingId') || '85 746 3214'
    const courseId = searchParams.get('courseId')
    const password = searchParams.get('password') || ''  // ← ajoute cette ligne
    

    const [micMuted, setMicMuted] = useState(false)
    const [cameraOff, setCameraOff] = useState(false)
    const [activeSection, setActiveSection] = useState('contents') // 'contents' | 'books'
    const [timer, setTimer] = useState(0)
    const [suggestedCourses, setSuggestedCourses] = useState([])
     const [zoomJoined, setZoomJoined] = useState(false)
    const [zoomError, setZoomError] = useState(null)
    const [loadingZoom, setLoadingZoom] = useState(false)
    const clientRef = useRef(null)


    // Timer du meeting
    useEffect(() => {
        const interval = setInterval(() => setTimer(t => t + 1), 1000)
        return () => clearInterval(interval)
    }, [])

    const formatTime = (s) => {
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60)
        const sec = s % 60
        return h > 0
            ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
            : `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    }

   useEffect(() => {
    const fetchSuggested = async () => {
        try {
            const data = await fetchUrl(
                `/courses?populate[thumbnail]=true&pagination[limit]=2${courseId ? `&filters[id][$ne]=${courseId}` : ''}`
            )
            setSuggestedCourses(data.data || [])
        } catch (err) {
            console.error(err)
        }
    }
    fetchSuggested()
}, [courseId])


     // Zoom
    const joinZoomMeeting = async () => {
        setLoadingZoom(true)
        setZoomError(null)
        try {
            const res = await fetch('/api/zoom/signature', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ meetingNumber: meetingId, role: 0 })
            })
            const { signature } = await res.json()
            const { default: ZoomMtgEmbedded } = await import('@zoom/meetingsdk/embedded')
            const client = ZoomMtgEmbedded.createClient()
            clientRef.current = client
            const meetingSDKElement = document.getElementById('meetingSDKElement')
            await client.init({ zoomAppRoot: meetingSDKElement, language: 'fr-FR' })
            await client.join({
                meetingNumber: meetingId,
                password,
                userName: 'Étudiant',
                signature,
                sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
            })
            setZoomJoined(true)
        } catch (err) {
            console.error('Zoom error:', err)
            setZoomError('Impossible de rejoindre le meeting.')
        } finally {
            setLoadingZoom(false)
        }
    }

    const leaveZoomMeeting = async () => {
        if (clientRef.current) {
            await clientRef.current.leaveMeeting()
            clientRef.current = null
            setZoomJoined(false)
        }
    }

    return (
        <div className="min-h-screen pr-[104px] pl-[97px] pb-[88px]">
            <div className="flex gap-[65px] h-[calc(100vh-80px)]">

                {/* ── Partie gauche : vidéo ── */}
                <div className="relative flex-1 flex flex-col ">

                    {/* Header meeting */}
                    <div className="flex items-center gap-[50px] w-full">
                        <div className="w-[50px] h-[50px] bg-[#49BBBD] flex items-center justify-center text-white">
                            <img src="/images/left.png" alt="" />
                        </div>
                        <div className="flex items-center w-full justify-between pl-[35px] py-[35px] pr-[61px] mb-[30px] rounded-[26px] bg-white">
                            <div className="flex items-center gap-[12px]">
                                <div className="w-[10px] h-[10px] rounded-full bg-[#49BBBD] animate-pulse" />
                                <div>
                                    <p className="text-[15px] font-semibold text-[#252641]">UX/UI Design Conference Meeting</p>
                                    <p className="text-[13px] text-[#696984]">ID: {meetingId} · {formatTime(timer)}</p>
                                </div>
                            </div>
                            <button className="text-[#696984] hover:text-[#252641] transition-colors">
                                <SettingsIcon />
                            </button>
                        </div>
                    </div>

                    {/* Zone vidéo principale */}
                    <div className="flex-1 relative overflow-hidden">
                        {/* Zone Zoom SDK */}
                        <div id="meetingSDKElement" className="absolute inset-0 rounded-[20px] overflow-hidden" />

                        {/* Écran d'attente avant de rejoindre */}
                        {!zoomJoined && (
                            // <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a2e] rounded-[20px] gap-[20px]">
                            //     <div className="w-[80px] h-[80px] rounded-full bg-[#49BBBD]/20 flex items-center justify-center">
                            //         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#49BBBD" strokeWidth="2">
                            //             <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                            //         </svg>
                            //     </div>
                            //     <p className="text-white text-[20px] font-semibold">Meeting ID: {meetingId}</p>
                            //     {zoomError && (
                            //         <p className="text-red-400 text-[14px] text-center px-[20px]">{zoomError}</p>
                            //     )}
                            //     <button
                            //         onClick={joinZoomMeeting}
                            //         disabled={loadingZoom}
                            //         className="bg-[#49BBBD] text-white font-bold text-[18px] px-[40px] py-[14px] rounded-[12px] hover:bg-[#49BBBD]/90 disabled:opacity-50 transition-colors"
                            //     >
                            //         {loadingZoom ? 'Connexion...' : 'Rejoindre le meeting'}
                            //     </button>
                            // </div>
                            
                            <div className="absolute inset-0 flex items-center justify-center rounded-[20px]">
                                <img
                                    src="/images/meeting.png"
                                    alt="Main speaker"
                                    className="w-full h-full object-cover rounded-[20px]"
                                />
                                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-[16px]">
                                    <p className="text-white text-[18px] font-semibold">ID: {meetingId}</p>
                                    {zoomError && (
                                        <p className="text-red-400 text-[13px] text-center px-[20px]">{zoomError}</p>
                                    )}
                                    <button
                                        onClick={joinZoomMeeting}
                                        disabled={loadingZoom}
                                        className="bg-[#49BBBD] text-white font-bold text-[16px] px-[32px] py-[12px] rounded-[12px] hover:bg-[#49BBBD]/90 disabled:opacity-50 transition-colors"
                                    >
                                        {loadingZoom ? 'Connexion...' : 'Rejoindre le meeting'}
                                    </button>
                                </div>
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /> */}
                            </div>
                        )}
                        

                        {/* Nom du speaker principal */}
                        <div className="absolute bottom-[20px] left-[20px]">
                            <span className="bg-black/50 text-white text-[13px] font-medium px-[10px] py-[5px] rounded-[6px] backdrop-blur-sm">
                                Instructeur — En direct
                            </span>
                        </div>

                        {/* Vignettes participants */}
                        <div className="absolute top-[29.22px] right-[53px] flex flex-col gap-[10px]">
                            {MOCK_PARTICIPANTS.map((p) => (
                                <div
                                    key={p.id}
                                    className={`relative w-[80px] 3xl:w-[209px] 3xl:h-[169.46px] rounded-[20px] mb-[16.7px] overflow-hidden  border-5 transition-all ${
                                        p.speaking ? 'border-[#49BBBD]' : 'border-white'
                                    }`}
                                >
                                    <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <span className="absolute bottom-[3px] left-[5px] text-white text-[10px] font-medium">
                                        {p.name}
                                    </span>
                                    {p.speaking && (
                                        <div className="absolute top-[4px] right-[4px] w-[8px] h-[8px] rounded-full bg-[#49BBBD] animate-pulse" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Barre de contrôles */}
                    <div className="absolute bottom-[24.21px] left-[50px] right-[51px] rounded-[20px] flex items-center justify-center gap-[12px] px-[30px] py-[16px]  bg-[#E6F2FF]">
                        {/* Micro */}
                        <button
                            onClick={() => setMicMuted(!micMuted)}
                            className={`flex flex-col items-center gap-[4px] w-[80px] h-[66.78px] rounded-[13px] items-center justify-center transition-colors ${
                                micMuted ? 'bg-red-100 text-red-500' : 'bg-[#F5F9FF] text-[#696984] hover:bg-[#9DCCFF]/30'
                            }`}
                        >
                            <MicIcon muted={micMuted} />
                        </button>

                        {/* Caméra */}
                        <button
                            onClick={() => setCameraOff(!cameraOff)}
                            className={`flex items-center justify-center w-[52px] h-[52px] 3xl:w-[80px] 3xl:h-[66.78px] rounded-[13px] transition-colors ${
                                cameraOff ? 'bg-red-100 text-red-500' : 'bg-[#F5F9FF] text-[#696984] hover:bg-[#9DCCFF]/30'
                            }`}
                        >
                            <CameraIcon off={cameraOff} />
                        </button>

                        {/* Chat */}
                        <button className="flex items-center justify-center w-[52px] h-[52px] 3xl:w-[80px] 3xl:h-[66.78px] rounded-[13px] bg-[#F5F9FF] text-[#696984] hover:bg-[#9DCCFF]/30 transition-colors">
                            <ChatIcon />
                        </button>

                        {/* Partage */}
                        <button className="flex items-center justify-center w-[52px] h-[52px] 3xl:w-[80px] 3xl:h-[66.78px] rounded-[13px] bg-[#F5F9FF] text-[#696984] hover:bg-[#9DCCFF]/30 transition-colors">
                            <ShareIcon />
                        </button>

                        {/* Fin d'appel */}
                        <Link href={`/courses`}>
                            <button className="flex items-center justify-center w-[52px] h-[52px] 3xl:w-[80px] 3xl:h-[66.78px] rounded-[13px] bg-red-500 text-white hover:bg-red-600 transition-colors">
                                <EndCallIcon />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* ── Partie droite : sidebar ── */}
                <div className="w-[320px] xl:w-[380px] flex flex-col rounded-[15px] gap-[29px] overflow-y-auto">

                    {/* Course Contents */}
                    <CourseContents totalSections={5} completedSections={2} />

                    {/* Book for you */}
                    <div className='bg-white pl-[30px] pr-[31px] pt-[46px] pb-[53px] rounded-[15px]'>
                        <button
                            className="w-full flex items-center justify-between pb-[28px]"
                        >
                            <p className="text-[16px] font-semibold text-[#252641]">Book for you</p>
                            <div className="">
                                <img src="/images/calendar.png" alt="" />
                            </div>
                        </button>

                        <div className="flex gap-[27px]">
                            {suggestedCourses.map((c) => (
                                <Link href={`/courses/${c.slug}`} key={c.id}>
                                    <div className="flex flex-col drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] justify-center items-center gap-[12px] bg-white rounded-[12px] px-[14px] pt-[10px] pb-[18px] cursor-pointer hover:bg-[#9DCCFF]/20 transition-colors">
                                        <img
                                            src={optimizeCloudinaryUrl(getStrapiMedia(c.thumbnail?.url))}
                                            alt={c.title}
                                            className="3xl:w-[60px] h-[163px] object-cover rounded-[16px] flex-shrink-0"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <p className="text-[24px] font-medium text-center text-[#252641] line-clamp-2 pt-[7px] pb-[10px]">{c.title}</p>
                                            <div className="flex items-center justify-center">
                                                {/* <p className="text-[15px] font-bold text-[#49BBBD]">${c.priceSale}</p> */}
                                                <p className="text-[30x] font-semibold text-[#49BBBD] text-center">${c.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Meeting