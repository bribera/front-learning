import { useRouter } from 'next/navigation'
import React from 'react'

// Couleurs dynamiques qui alternent par index
const LESSON_COLORS = [
    { bg: 'bg-[#E8F8F8]', text: 'text-[#49BBBD]', active: 'bg-[#49BBBD] text-white', dot: 'bg-[#49BBBD]' },
    { bg: 'bg-[#FFF3E0]', text: 'text-[#F5A623]', active: 'bg-[#F5A623] text-white', dot: 'bg-[#F5A623]' },
    { bg: 'bg-[#FDE8E8]', text: 'text-[#E05C5C]', active: 'bg-[#E05C5C] text-white', dot: 'bg-[#E05C5C]' },
    { bg: 'bg-[#EEF0FF]', text: 'text-[#6C70B5]', active: 'bg-[#6C70B5] text-white', dot: 'bg-[#6C70B5]' },
]

const QUIZ_COLORS = [
    { bg: 'bg-[#FFF3E0]', text: 'text-[#F5A623]' },
    { bg: 'bg-[#FDE8E8]', text: 'text-[#E05C5C]' },
    { bg: 'bg-[#E8F8F8]', text: 'text-[#49BBBD]' },
    { bg: 'bg-[#EEF0FF]', text: 'text-[#6C70B5]' },
]

const CalendarSidebar = ({ lessons = [], quizzes=[], activeId, onSelect }) => {

    const router = useRouter()

  return (
    <div className=' w-fit'>
        <div className=" w-full  flex-shrink-0 bg-white flex flex-col h-full">
            {/* Header avec icône retour + titre */}
            <div className="pt-[26px] pl-[30px] pb-[47px] flex items-center gap-[8px]">
                <button
                    onClick={() => router.back()}
                    className="w-[50px] h-[50px]  bg-[#49BBBD] flex items-center justify-center hover:bg-[#E8E8F0] transition-colors flex-shrink-0"
                >
                    <img src="/images/back.png" alt="" />
                </button>
            </div>
            <div className=" pr-5 flex-1 overflow-y-auto pb-[14px]">
                <p className="pl-[30px] text-[11px] lg:text-[22px] 2xl:text-[30px] font-semibold text-[#252641 truncate mb-[16px]">
                    Change Simplification
                </p>
                   {/* Lessons */}
                <div className="pl-[21px] flex flex-col gap-[15px] mb-[50px] w-full">
                    {lessons.length > 0 ? lessons.map((lesson, i) => {
                        const color = LESSON_COLORS[i % LESSON_COLORS.length]
                        const isActive = activeId === (lesson.documentId || lesson.id)
                        return (
                            <button key={lesson.documentId || lesson.id || i}
                                onClick={() => onSelect?.(lesson.documentId || lesson.id)}
                                className={`w-full flex items-center justify-between px-[9px] py-[6px] 2xl:py-[20px] 2xl:pl-[25px] lg:pr-[18px] rounded-[7px] gap-[15px] text-left transition-colors ${
                                    isActive ? color.active : `${color.bg} ${color.text} hover:opacity-80`
                                }`}>
                                {/* <div className={`w-[5px] h-[5px] rounded-full flex-shrink-0 mr-[6px] ${isActive ? 'bg-white' : color.dot}`} /> */}
                               <div className="flex items-center gap-[15px]">

                                    {
                                        isActive ? (
                                        <div className=" w-[14px] h-[14px] lg:w-5 lg:h-5">
                                            <img src="/images/bookblanc.png" alt="" />
                                        </div>
                                        ): (
                                        <div className=" w-[14px] h-[14px] lg:w-5 lg:h-5">
                                            <img src="/images/bookblack.png" alt="" />
                                        </div>
                                        )
                                    }
                                    <span className="text-[10px] 2xl:text-[16px] font-medium truncate flex-1">
                                        {lesson.title || `Lesson ${i + 1}`}
                                    </span>
                               </div>
                                {lesson.duration && (
                                    <p className={`text-[9px] flex-shrink-0 ml-[4px] ${isActive ? 'opacity-80' : 'opacity-60'}`}>
                                        {lesson.duration}
                                    </p>
                                )}
                            </button>
                        )
                    }) : (
                        <p className="text-[10px] text-[#696984]/50 italic">No lessons yet</p>
                    )}
                </div>
                {/* PRACTICE QUIZ */}
                {quizzes.length > 0 && (
                    <>
                        <p className="pl-[21px] text-[11px] lg:text-[22px] 2xl:text-[30px] font-semibold text-[#252641] uppercase mb-[20px]">
                            PRACTICE QUIZ
                        </p>
                        <div className="pl-[21px] flex flex-col gap-[5px]">
                            {quizzes.map((quiz, i) => {
                                const color = QUIZ_COLORS[i % QUIZ_COLORS.length]
                                return (
                                    <div key={quiz.documentId || quiz.id || i}
                                        className={`w-full flex items-center justify-between px-[9px] py-[6px] rounded-[7px] ${color.bg}`}>
                                        {/* <div className={`w-[5px] h-[5px] rounded-full flex-shrink-0 mr-[6px] ${color.text.replace('text-', 'bg-')}`} /> */}
                                        <div className="flex items-center gap-[15px]">

                                            {
                                                quizzes ? (
                                                <div className=" w-[14px] h-[14px] lg:w-5 lg:h-5">
                                                    <img src="/images/bookblack.png" alt="" />
                                                </div>
                                                ): (
                                                <div className=" w-[14px] h-[14px] lg:w-5 lg:h-5">
                                                    <img src="/images/bookblanc.png" alt="" />
                                                </div>
                                                )
                                            }

                                            <span className={`text-[10px] 2xl:text-[16px] font-medium truncate ${color.text}`}>
                                                {quiz.question || quiz.title || `Quiz ${i + 1}`}
                                            </span>
                                        </div>
                                        {quiz.duration && (
                                            <span className={`text-[9px] flex-shrink-0 ml-[4px] opacity-70 ${color.text}`}>
                                                {quiz.duration}
                                            </span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default CalendarSidebar