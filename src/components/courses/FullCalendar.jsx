'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import CardMarketing from '../blog/CardMarketing'


// ── Couleurs dynamiques sidebar ──────────────────────────────────────────────
const LESSON_COLORS = [
    { bg: 'bg-[#E8F8F8]', text: 'text-[#49BBBD]', active: 'bg-[#49BBBD] text-white' },
    { bg: 'bg-[#FFF3E0]', text: 'text-[#F5A623]', active: 'bg-[#F5A623] text-white' },
    { bg: 'bg-[#FDE8E8]', text: 'text-[#E05C5C]', active: 'bg-[#E05C5C] text-white' },
    { bg: 'bg-[#EEF0FF]', text: 'text-[#6C70B5]', active: 'bg-[#6C70B5] text-white' },
]

// ── Sidebar FullView avec 2 sections PRACTICE QUIZ ───────────────────────────
const FullSidebar = ({ lessons = [], quizzes = [], activeId, onSelect, onBack }) => {
    const mid = Math.ceil(lessons.length / 2)
    const firstHalf = lessons.slice(0, mid)
    const secondHalf = lessons.slice(mid)
    const firstQuiz = quizzes.slice(0, Math.ceil(quizzes.length / 2))
    const secondQuiz = quizzes.slice(Math.ceil(quizzes.length / 2))

    const renderLesson = (lesson, i, offset = 0) => {
        const color = LESSON_COLORS[(i + offset) % LESSON_COLORS.length]
        const isActive = activeId === (lesson.documentId || lesson.id)
        return (
            <button key={lesson.documentId || lesson.id || i}
                onClick={() => onSelect?.(lesson.documentId || lesson.id)}
                className={`w-full flex items-center justify-between gap-[6px] 2xl:gap-[15px] px-[9px] py-[6px] rounded-[7px] text-left transition-colors ${isActive ? color.active : `${color.bg} ${color.text} hover:opacity-80`}`}>
                {
                    isActive ? (
                    <div className=" w-[8px] h-[8px] lg:w-3 lg:h-3 2xl:w-[23px] 2xl:h-[23px]">
                        <img src="/images/bookblanc.png" alt="" />
                    </div>
                    ): (
                    <div className=" w-[8px] h-[8px] lg:w-3 lg:h-3 2xl:w-[23px] 2xl:h-[23px]">
                        <img src="/images/bookblack.png" alt="" />
                    </div>
                    )
                }
                <span className="text-[10px] font-medium truncate flex-1">{lesson.title || `Lesson ${i + offset + 1}`}</span>
                {lesson.duration && <span className="text-[9px] flex-shrink-0 ml-[4px] opacity-60">{lesson.duration}</span>}
            </button>
        )
    }

    const renderQuiz = (quiz, i, offset = 0) => {
        const color = LESSON_COLORS[(i + offset + 1) % LESSON_COLORS.length]
        return (
            <div key={quiz.documentId || quiz.id || i}
                className={`w-full flex items-center gap-[6px] 2xl:gap-[15px] justify-between px-[9px] py-[6px] rounded-[7px] ${color.bg}`}>
                <div className=" w-[8px] h-[8px] lg:w-3 lg:h-3 2xl:w-[23px] 2xl:h-[23px]">
                    <img src="/images/bookblack.png" alt="" />
                </div>            
                <span className={`text-[10px] font-medium truncate flex-1 ${color.text}`}>{quiz.question || quiz.title || `Quiz ${i + 1}`}</span>
                {quiz.duration && <span className={`text-[9px] flex-shrink-0 ml-[4px] opacity-60 ${color.text}`}>{quiz.duration}</span>}
            </div>
        )
    }

    return (
        <div className=" flex-shrink-0 bg-white border-r border-[#E8E8F0] flex flex-col h-full overflow-hidden">
            <div className="ml-[30px] pt-[14px] pb-[8px]">
                <button
                    onClick={onBack}
                    className="w-[50px] h-[50px]  bg-[#49BBBD] flex items-center justify-center hover:bg-[#E8E8F0] transition-colors flex-shrink-0"
                >
                    <img src="/images/back.png" alt="" />
                </button>
            </div>
            <div className="pl-[21px] flex-1 overflow-y-auto  pb-[14px] pr-5">
                <p className=" pl-[9px] text-[11px] lg:text-[22px] 2xl:text-[30px] font-semibold text-[#252641 truncate mb-[16px]">Change Simplification</p>

                {/* First half lessons */}
                {/* <div className=" flex flex-col gap-[5px] mb-[12px]">
                    {firstHalf.map((l, i) => renderLesson(l, i, 0))}
                </div> */}

                {/* Toutes les lessons */}
                <div className="flex flex-col gap-[5px] mb-[12px]">
                    {lessons.map((l, i) => renderLesson(l, i, 0))}
                </div>

                {/* First PRACTICE QUIZ */}
                {firstQuiz.length > 0 && (
                    <>
                        <p className="text-[10px] font-bold text-[#252641] uppercase tracking-[1px] mb-[6px]">PRACTICE QUIZ</p>
                        <div className="flex flex-col gap-[5px] mb-[12px]">
                            {firstQuiz.map((q, i) => renderQuiz(q, i, 0))}
                        </div>
                    </>
                )}

                {/* Second half lessons */}
                {/* {secondHalf.length > 0 && (
                    <div className="flex flex-col gap-[5px] mb-[12px]">
                        {secondHalf.map((l, i) => renderQuiz(l, i, mid))}
                    </div>
                )} */}

                {/* Second PRACTICE QUIZ */}
                {secondQuiz.length > 0 && (
                    <>
                        <p className="text-[10px] font-bold text-[#252641] uppercase tracking-[1px] mb-[6px]">PRACTICE QUIZ</p>
                        <div className="flex flex-col gap-[5px]">
                            {secondQuiz.map((q, i) => renderQuiz(q, i, 2))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

// ── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ value = 5 }) => (
    <div className="flex gap-[2px]">
        {[1,2,3,4,5].map(s => (
            <svg key={s} width="13" height="13" viewBox="0 0 24 24"
                fill={s <= value ? '#F5A623' : 'none'}
                stroke={s <= value ? '#F5A623' : '#D9D9D9'} strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        ))}
    </div>
)

// ── FullView ─────────────────────────────────────────────────────────────────
const FullCalendar = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const courseId = searchParams.get('courseId')

    const [activeMenu, setActiveMenu] = useState(null)
    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [events, setEvents] = useState([])
    const [reviews, setReviews] = useState([])
    const [suggestedCourses, setSuggestedCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [carouselIdx, setCarouselIdx] = useState(0)
    const PER_PAGE = 4

    useEffect(() => {
        if (!courseId) return
        const load = async () => {
            try {
                setLoading(true)
                const [courseData, eventsData, suggested] = await Promise.all([
                    fetchUrl(`/courses/${courseId}?populate[lessons][populate][review]=true&populate[quiz]=true&populate[thumbnail]=true&populate[instructor]=true`),
                    fetchUrl(`/course-events?filters[courses][documentId][$eq]=${courseId}&sort=createdAt:asc&pagination[limit]=100`),
                    fetchUrl(`/courses?populate[thumbnail]=true&populate[instructor]=true&pagination[limit]=8`)
                ])
                const c = courseData.data
                setCourse(c)
                setLessons(c?.lessons || [])
                setQuizzes(c?.quiz || [])
                const allReviews = (c?.lessons || [])
                    .flatMap(l => l.review || [])  // prend les reviews de toutes les lessons
                setReviews(allReviews)
               
                if (c?.lessons?.[0]) setActiveMenu(c.lessons[0].documentId || c.lessons[0].id)
                setEvents(eventsData.data || [])
                setSuggestedCourses((suggested.data || []).filter(s => s.documentId !== courseId))
            } catch (err) { console.error(err) }
            finally { setLoading(false) }
        }
        load()
    }, [courseId])

     const totalPages = Math.ceil(suggestedCourses.length / PER_PAGE)
    const visibleCourses = suggestedCourses.slice(carouselIdx * PER_PAGE, carouselIdx * PER_PAGE + PER_PAGE)

    const thumbnail = course?.thumbnail?.url
        ? optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))
        : null



   // ✅ Safe : lessons peut être vide au moment du render
    const firstVideoUrl = lessons[0]?.videoUrl || null

    const getDescription = (desc) => {
        if (!desc) return ''
        if (typeof desc === 'string') return desc
        return desc?.[0]?.children?.[0]?.text || ''
    }

    // Premier event comme "review" mis en avant
    // const featuredEvent = events[0] || null
    // Convertit https://www.youtube.com/watch?v=ABC123
    // en        https://www.youtube.com/embed/ABC123
    const convertToEmbed = (url) => {
        if (!url) return null
        // Format watch?v=
        const match = url.match(/[?&]v=([^&]+)/)
        if (match) return `https://www.youtube-nocookie.com/embed/${match[1]}`
        // Format youtu.be/
        const shortMatch = url.match(/youtu\.be\/([^?]+)/)
        if (shortMatch) return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}`
        // ✅ Format Shorts
        const shortsMatch = url.match(/shorts\/([^?]+)/)
        if (shortsMatch) return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`
        // URL invalide
        return null
    }

    console.log('videoUrl brut:', firstVideoUrl)
    console.log('embed:', convertToEmbed(firstVideoUrl))

  return (
    <div className="flex h-screen bg-[#F0F2F9] overflow-hidden">
        <FullSidebar
            lessons={lessons}
            quizzes={quizzes}
            activeId={activeMenu}
            onSelect={setActiveMenu}
            onBack={() => router.back()}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header — même style que Create2 */}
                <div className="bg-[#49BBBD] text-white px-[50px] py-[12px] flex flex-col items-start justify-between flex-shrink-0">
                    <h1 className="text-[16px] lg:text-[22px] 2xl:text-[44px] pb-[5px]">
                        {course?.title || 'Learn about Adobe XD & Prototyping'}
                    </h1>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-[11px] lg:text-[16px] 2xl:text-[24px]">{course?.subtitle || 'Introduction about XD'}</p>
                        <div className="flex items-center gap-[10px]">
                            <img src="/images/clockwhite.png" alt="" className="w-[16px] 2xl:w-[24px]" />
                            <span className="text-[11px] lg:text-[16px] 2xl:text-[24px] text-white">1 hour</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-9 h-9 border-4 border-[#E8E8F0] border-t-[#49BBBD] rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="m-[50px] flex-1 overflow-y-auto">

                        {/* Hero — videoUrl de la première lesson OU thumbnail du cours */}
                        <div className="h-[880px] overflow-hidden flex-shrink-0 bg-[#1a1a2e]">
                             {firstVideoUrl ? (
                                <iframe
                                    src={convertToEmbed(firstVideoUrl)}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : thumbnail ? (
                                <img src={thumbnail} alt={course?.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#49BBBD]/30 to-[#2F327D]/20" />
                            )}
                        </div>

                        <div className="py-[24px] flex flex-col ">

                            {/* OS Super Coins — description du cours */}
                            <div>
                                <h2 className="text-[16px]  mb-[30px] lg:text-[22px] xl:text-[30px] font-semibold text-[#252641] mb-[8px]">OS Super Coins on the way</h2>
                                {course?.description ? (
                                    <BlocksRenderer
                                        content={course.description}
                                        blocks={{
                                            paragraph: ({ children }) => (
                                                <p className="text-[12px] lg:text-[18px] text-[#696984] leading-[180%]">{children}</p>
                                            ),
                                        }}
                                    />
                                ) : (
                                    <p className="text-[12px] text-[#696984] leading-[180%]">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                                    </p>
                                )}
                            </div>

                            {/* Events créés — liste */}
                            {events.length > 0 && (
                                <div className="flex flex-col pt-[50px] gap-[50px]">
                                    {events.map((event, i) => (
                                        <div key={event.documentId || event.id}
                                            className="">
                                            
                                            <h3 className="text-[16px] lg:text-[30px] font-semibold text-[#252641] mb-[30px]">{event.title}</h3>
                                          
                                            {event.description ? (
                                                <BlocksRenderer
                                                    content={event.description}
                                                    blocks={{
                                                        paragraph: ({ children }) => (
                                                            <p className="text-[12px] lg:text-[18px] text-[#696984]">{children}</p>
                                                        ),
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Who this course is for */}
                            <div>
                                {/* <h2 className="text-[16px]  mb-[30px] lg:text-[22px] xl:text-[30px] font-semibold text-[#252641] mb-[10px]">Who this course is for?</h2>
                                <ul className="flex flex-col gap-[8px]">
                                    {[
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-[8px]">
                                            <div className="w-[14px] h-[14px] rounded-full bg-[#49BBBD]/15 flex items-center justify-center flex-shrink-0 mt-[2px]">
                                                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#49BBBD" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                                            </div>
                                            <span className="text-[12px] text-[#696984]">{item}</span>
                                        </li>
                                    ))}
                                </ul> */}
                                {/* Who this course is for */}
                                <div className='pt-[50px]'>
                                    <h2 className="text-[16px] lg:text-[30px] font-bold text-[#252641] mb-[10px]">Who this course is for?</h2>
                                    <ul className="flex flex-col gap-[8px]">
                                        {(Array.isArray(course?.forWho) ? course.forWho : []).map((item, i) => (
                                            <li key={i} className="flex items-start gap-[8px]">
                                                <div className="w-[14px] h-[14px] rounded-full bg-[#49BBBD]/15 flex items-center justify-center flex-shrink-0 mt-[2px]">
                                                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#49BBBD" strokeWidth="3" strokeLinecap="round">
                                                        <polyline points="20 6 9 17 4 12"/>
                                                    </svg>
                                                </div>
                                                <span className="text-[12px] lg:text-[18px] text-[#696984]">
                                                    {typeof item === 'string' ? item : item.text || item.label || ''}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Achievable */}
                            <div className='pt-[50px]'>
                                <h2 className="text-[16px] mb-[30px] lg:text-[30px] font-semibold text-[#252641] mb-[8px]">Achievable</h2>
                                <p className="text-[12px] lg:text-[16px] 2xl:text-[18px] text-[#696984] tracking-[2%]">
                                    {course?.achievable || 'Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodeiusmodadipiscing elit, sed do eiusmodLWho this course is for?Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodeiusmodadipiscing elit, sed do eiusmodL'}
                                </p>
                            </div>

                            {/* event review */}
                            {/* Reviews depuis lessons */}
                            {reviews.length > 0 && (
                                <div className="flex flex-col gap-[12px] pt-[76px]">
                                    {/* <h2 className="text-[16px] font-bold text-[#252641]">Reviews</h2> */}
                                    {reviews.map((review, i) => (
                                        <div key={i} className="bg-[#F48C06]/30 rounded-[12px] p-[20px] shadow-[0px_2px_12px_rgba(38,45,118,0.06)]">
                                            <div className="flex items-center gap-[12px] mb-[10px]">
                                                <div className="w-[40px] h-[40px] overflow-hidden bg-[#49BBBD]/20 flex items-center justify-center flex-shrink-0">
                                                    {review.avatar?.url ? (
                                                        <img src={getStrapiMedia(review.avatar.url)} alt={review.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-[15px] font-bold text-[#49BBBD]">
                                                            {(review.name || 'R').charAt(0)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-[#252641]">{review.name || 'Lina'}</p>
                                                    <Stars value={review.rating || 5} />
                                                </div>
                                                {review.date && (
                                                    <span className="ml-auto text-[10px] text-[#696984]">
                                                        {new Date(review.date).toLocaleDateString('fr-FR')}
                                                    </span>
                                                )}
                                            </div>
                                            {review.text ? (
                                                <BlocksRenderer
                                                    content={review.text}
                                                    blocks={{
                                                        paragraph: ({ children }) => (
                                                            <p className="text-[12px] text-[#696984] leading-[175%]">{children}</p>
                                                        ),
                                                    }}
                                                />
                                            ) : (
                                                <p className="">Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmodLorem</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Student also bought */}
                            <div>
                                <div className="flex items-center justify-between mb-[14px] pt-[65px]">
                                    <h2 className="text-[16px] lg:text-[30px] font-semibold text-[#252641]">Student also bought</h2>
                                    <div className="flex items-center gap-[5px]">
                                        <button onClick={() => setCarouselIdx(p => Math.max(0, p - 1))}
                                            disabled={carouselIdx === 0}
                                            className="w-[24px] h-[24px] bg-[#49BBBD] text-white flex items-center justify-center disabled:bg-[#E8E8E8] transition-colors">
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                                        </button>
                                        <button onClick={() => setCarouselIdx(p => Math.min(totalPages - 1, p + 1))}
                                            disabled={carouselIdx >= totalPages - 1}
                                            className="w-[24px] h-[24px] bg-[#49BBBD] text-white flex items-center justify-center disabled:bg-[#E8E8E8] transition-colors">
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px]">
                                    {visibleCourses.map(c => {
                                        const thumb = c?.thumbnail?.url
                                            ? optimizeCloudinaryUrl(getStrapiMedia(c.thumbnail.url))
                                            : null
                                            // ✅ Adapte les champs cours → format CardMarketing
                                            const articleData = {
                                                image: c?.thumbnail,
                                                Field: c?.Field || c?.level || '',
                                                title: c?.title,
                                                content: c?.description,
                                                imageAuthor: c?.instructor?.avatar || c?.thumbnail,
                                                author: c?.instructor?.name || 'Instructor',
                                                priceDefault: c?.price,
                                                priceReviews: c?.priceSale || c?.price,
                                            }
                                        return (
                                            <Link href={`/courses/${c.slug || c.documentId}`} key={c.documentId || c.id}>
                                                {/* <div className="bg-white w-[374px] pt-[20px]  pl-[21px] pr-[18px] rounded-[10px] overflow-hidden border border-[#E8E8F0] hover:shadow-md transition-shadow cursor-pointer">
                                                    <div className=" bg-[#9DCCFF]/20 overflow-hidden">
                                                        {thumb ? (
                                                            <img src={thumb} alt={c.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-[#49BBBD]/20 to-[#2F327D]/20" />
                                                        )}
                                                    </div>
                                                    <div className="p-[10px]">
                                                        <p className="text-[11px] font-bold text-[#252641] line-clamp-2 mb-[8px] leading-[140%]">
                                                            {c.title}
                                                        </p>
                                                        {c.description ? (
                                                            <BlocksRenderer
                                                                content={c.description}
                                                                blocks={{
                                                                    paragraph: ({ children }) => (
                                                                        <p className=" line-clamp-3 text-[12px] text-[#696984] leading-[180%]">{children}</p>
                                                                    ),
                                                                }}
                                                            />
                                                        ) : null}
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-[5px]">
                                                                <div className="w-[20px] h-[20px] rounded-full bg-[#49BBBD]/20 flex items-center justify-center">
                                                                    <span className="text-[8px] font-bold text-[#49BBBD]">
                                                                        {(c.instructor?.name || 'I').charAt(0)}
                                                                    </span>
                                                                </div>
                                                                <span className="text-[9px] text-[#696984] truncate max-w-[55px]">
                                                                    {c.instructor?.name || 'Lina'}
                                                                </span>
                                                            </div>
                                                            <div className="text-right">
                                                                {c.priceSale && <p className="text-[9px] text-[#696984] line-through">${c.price}</p>}
                                                                <p className="text-[11px] font-bold text-[#49BBBD]">${c.priceSale || c.price || '99'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <CardMarketing article={articleData} publishedAt={c.publishedAt} />
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="h-[20px]" />
                        </div>
                    </div>
                )}
            </div>

    </div>
  )
}

export default FullCalendar