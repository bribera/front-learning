'use client'
import React, { useEffect, useState } from 'react'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import Link from 'next/link'

const LitteratureCourse = () => {
    const [tabs, setTabs] = useState([])           // ← dynamique depuis Strapi
  const [activeTab, setActiveTab] = useState(null)
  const [instructor, setInstructor] = useState(null)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const PAGE_SIZE = 6

//   slug à exclure
const EXCLUDED_SLUGS = ['news', 'press-release', 'marketing']  // ← mets tes slugs ici

     // ✅ Fetch catégories → tabs
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchUrl('/categories?pagination[limit]=20&sort=name:asc')
        const cats = (data.data || [])
            .filter(cat => !EXCLUDED_SLUGS.includes(cat.slug)) 
        setTabs(cats)
        // Active la première catégorie par défaut
        if (cats.length > 0) setActiveTab(cats[0])
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategories()
  }, [])


   useEffect(() => {
    if (!activeTab) return

    const fetchBooks = async () => {
        try {
            setLoading(true)

            // Si activeTab.slug === 'all' → pas de filtre, on récupère tous les books
            const categoryFilter = activeTab.slug === 'all'
            ? ''
            : `&filters[categories][id][$eq]=${activeTab.id}`

            const data = await fetchUrl(
            `/books?populate=*` +
            categoryFilter +
            `&pagination[page]=${currentPage}` +
            `&pagination[pageSize]=${PAGE_SIZE}` +
            `&sort=createdAt:desc`
            )
            console.log('books', data)
            setBooks(data.data || [])
            setTotalPages(data.meta?.pagination?.pageCount || 1)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        }
        fetchBooks()
    }, [activeTab, currentPage])

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
            // Essaie d'abord avec populate=*
            const data = await fetchUrl(
            '/instructors?populate[0]=avatar&populate[1]=socialLink.icon&populate[2]=books&pagination[limit]=1'
            )
            setInstructor(data.data?.[0] || null)
            console.log('instructor:', data.data?.[0])
            } catch (err) {
            console.error(err)
            }
        }
        fetchInstructor()
    }, [])

    

  // Reset page à 1 quand on change de tab
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }


  return (
    <div className='pt-[143px] pl-[120px] pr-[121px]'>
      <div className="h-full relative mb-[68px]">
        <img src="/images/bg_lecture.png" alt="" className='h-[415px]'/>
        <div className="absolute inset-0 top-0 left-0 h-full justify-center flex items-center pt-[38px] pb-[28px] px-[40px] gap-[28px]">
            {/* Avatar */}
            <div className="w-[338px] h-[338px] rounded-full overflow-hidden border-[4px] border-white shadow-lg flex-shrink-0">
              <img
                src={optimizeCloudinaryUrl(getStrapiMedia(instructor?.avatar?.url))}
                alt={instructor?.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Infos */}
            <div className="flex-1 bg-white/80 pl-[50px] pr-[46.48px]  pt-[48px] pb-[36px] rounded-[20px]">
              <div className="flex justify-between items-"> 
                <div className="">
                    <h1 className="text-black font-medium text-[30px] mb-[7px]">
                        {instructor?.name ?? 'John Anderson'}
                    </h1>
                    <p className="text-[#2D3436]/70 inter text-[18px] mb-[15px]">
                        {instructor?.role ?? 'Assistant Professor of Marquette University'}
                    </p>
                </div>
                <button className="bg-[#49BBBD] flex items-start h-fit text-white font-bold px-[27px] py-[16px] rounded-[12px] hover:bg-[#3aa9ab] transition-colors text-[24px] whitespace-nowrap">
                    Enroll Now
                </button>
              </div>
              <p className="text-[#2D3436] text-[25px] leading-[32px] font-regular line-clamp-2 inter">
                {instructor?.description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              </p>

              {/* Stats */}
                <div className="flex justify-between mt-[25px]">
                    <div className="flex items-center gap-[24px]">
                        <div className="flex items-center gap-[6px] pl-[32px]">
                            <img src="/images/start.png" alt="" className="w-[14px] h-[14px]" />
                            <span className="text-[#2D3436]/80 inter text-[15px] leading-[32px]">
                                {instructor?.rating ?? '4.0'} instructor Rating
                            </span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <img src="/images/students.png" alt="" className="w-[14px] h-[14px]" />
                            <span className="text-[#2D3436]/80 inter text-[15px] leading-[32px]">
                                {instructor?.students ?? '286'} Students
                            </span>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <img src="/images/courses.png" alt="" className="w-[14px] h-[14px]" />
                            <span className="text-[#2D3436]/80 inter text-[15px] leading-[32px]">
                                {instructor?.books.length ?? '0w'} Courses
                            </span>
                        </div>
                    </div>
                    {/* Bouton + Réseaux sociaux */}
                    <div className="flex flex-col items-end gap-[16px]">
                    
                        <div className="flex items-center gap-[10px]">
                            {instructor?.socialLink?.map((social) => (
                            <Link
                                key={social.id}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[28px] h-[28px] rounded-full overflow-hidden hover:opacity-80 transition-opacity"
                            >
                                {social.icon?.url ? (
                                <img
                                    src={optimizeCloudinaryUrl(getStrapiMedia(social.icon.url))}
                                    alt="social"
                                    className="w-full h-full object-contain"
                                />
                                ) : (
                                <div className="w-full h-full bg-[#49BBBD] rounded-full" />
                                )}
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

          </div>
      </div>
      {/* tabs */}
       {/* ── Tabs ── */}
        <div className="flex items-center pb-[68px] gap-[25.84px] flex-wrap mb-[32px]">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => handleTabChange(tab)}
                className={`px-[20px] py-[8px] 2xl:py-[16px] 2xl:px-[27px]  rounded-[12px] text-[14px] 2xl:text-[24px] font-bold transition-all ${
                tab.id === activeTab?.id
                    ? 'bg-[#49BBBD] text-white'
                    : 'bg-[#BBBBBB]/50 text-[#696969] hover:border-[#49BBBD] hover:text-[#49BBBD]'
                }`}
            >
               <p className='capitalize w-[129px] text-center'>{tab.name}</p> 
            </button>
            ))}
        </div>
      {/* grid books */}
      {/* ── Titre ── */}
      <h2 className="text-black pb-[49px] tracking-[2%] font-medium text-[30px] mb-[28px]">
        Literature course
      </h2>

      {/* ── Grille books ── */}
      {loading ? (
        <div className="grid grid-cols-3 gap-[24px]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-[8px] animate-pulse">
              <div className="h-[220px] bg-gray-200 rounded-t-[8px]" />
              <div className="p-4 flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-[40px]" />
              </div>
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center py-[60px] text-[#83839A]">
          <p className="text-[16px] font-semibold">No books in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] lg:gap-[86px]">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white pt-[29.64px] pl-[26.52px] pr-[25.61px] rounded-[8px] overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="w-full overflow-hidden">
                <img
                  src={optimizeCloudinaryUrl(getStrapiMedia(book.cover?.url))}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-[16px] pt-[28.13px] pb-[31.35px] flex items-center justify-between">
                <p className="text-black text-[25px] ">All Benefits of PLUS</p>
                <p className="text-[#49BBBD] font-extrabold text-[30px]">${book.price ?? 24}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-[8px] mt-[48px] pb-[80px]">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-[70px] h-[70px] flex items-center justify-center text-[#49BBBD] bg-[#49BBBD]/20 hover:border-[#49BBBD] hover:text-[#49BBBD] disabled:opacity-30"
          >
           <img src="/images/prev.svg" alt="" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-[70px] h-[70px] text-[30px] transition-colors ${
                p === currentPage
                  ? 'bg-[#49BBBD] text-white '
                  : 'text-black hover:border-[#49BBBD] hover:text-[#49BBBD]'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-[70px] h-[70px] bg-[#49BBBD]/20 flex items-center justify-center text-[#49BBBD] hover:border-[#49BBBD] hover:text-[#49BBBD] disabled:opacity-30"
          >
            <img src="/images/next.svg" alt="" />
          </button>
        </div>
      )}

    </div>
  )
  
}

export default LitteratureCourse
