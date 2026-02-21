"use client"
import React, { useEffect, useState } from 'react'
import { fetchUrl } from '../../config/api-config'
import CardCourses from './CardCourses'

const CARDS_PER_PAGE = 3;

const Courses = () => {
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(0)
    const totalPages = Math.ceil(courses.length / CARDS_PER_PAGE)
    const visible = courses.slice(
        page * CARDS_PER_PAGE,
        page * CARDS_PER_PAGE + CARDS_PER_PAGE
    )

    const prev = () => setPage((p) => Math.max(0, p - 1));
    const next = () => setPage((p) => Math.min(totalPages - 1, p + 1))
    const[ loading, setLoading] = useState(true)
    const[ error, setError] = useState(null)

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const data = await fetchUrl("/courses?populate[0]=thumbnail&populate[1]=instructor&populate[2]=instructor.avatar")
            console.log(data)
            setCourses(data.data || data)
            setError(null)
        } catch (error) {
            setError(error.message)
            console.error(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [])

    if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Chargement ...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px]">
        {
            visible.map((course) => (
                <CardCourses key={course.id} course={course}/>
            ))
        }
        {visible.length < CARDS_PER_PAGE &&
          Array.from({ length: CARDS_PER_PAGE - visible.length }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white/50 rounded-xl min-h-[220px]" />
          ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous"
            className="w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-[4px] bg-[#49BBBD] text-white text-xl flex items-center justify-center
                       hover:bg-[#45cdcf] transition-colors disabled:bg-[#49BBBD]/50 disabled:cursor-not-allowed"
          >
            <img src="/images/left.png" alt="" className='xl:w-[12px] xl:h-[28px] '/>
          </button>
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            aria-label="Next"
            className="w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-lg bg-[#49BBBD] text-white text-xl flex items-center justify-center
                       hover:bg-[#4bd3d5] transition-colors disabled:bg-[#49BBBD]/50 disabled:cursor-not-allowed"
          >
            <img src="/images/right.png" alt="" className='xl:w-[12px] xl:h-[28px] '/>
          </button>
        </div>
      )}
    </div>
  )
}

export default Courses
