'use client'
import React, { useEffect, useState } from 'react'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import CardMarketing from '../blog/CardMarketing'
import Link from 'next/link'
import CreatorCard from './CreatorCard'
import PromoOffer from '../checkout/PromoOffer'
import Testimonial from './Testimonial'




// Composant of Select Personnalisé
function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className=" relative flex items-center pt-[18px] pb-[19px] rounded-[10px] bg-white px-[18px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none text-[14px] 2xl:text-[24px] pr-[43px] text-[#252641] font-medium cursor-pointer outline-none tracking-[4%] hover:bg-[#49BBBD] focus:bg-[#49BBBD]"
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {/* Flèche custom */}
      <div className="absolute right-[18px] top-1/2 -translate-y-1/2 cursor-pointer  ml-[10px] h-[32px] flex items-center">
        <img src="/images/chevrondown.png" alt=""  className=''/>
      </div>
    </div>
  )
}


const Search = () => {
    const [creators, setCreator] = useState([])
    const [offers, setOffers] = useState([])
    const [query, setQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('All')
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    // Filtres select
    const [subject, setSubject] = useState('')
    const [partner, setPartner] = useState('')
    const [language, setLanguage] = useState('')
    const [learningType, setLearningType] = useState('')
    const [difficulty, setDifficulty] = useState('')

    const fetchCourses = async (search = "", category= '') => {
        try {
            setLoading(true)
            let url = `/articles?populate=*&filters[category][slug][$eq]=marketing&sort=publishedAt:desc&pagination[limit]=12`
            if (search) url += `&filters[title][$containsi]=${search}`
            if(category && category !== 'All') url += `&filters[category][name][$eq]=${category}`
            const data = await fetchUrl(url)
            console.log('data courses', courses)
            setCourses(data.data || []) 
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
    
    const fetCreators = async () => {
        try {
            setLoading(true);
            // Filtrer uniquement les instructors
            const date = await fetchUrl('/instructors?populate=*&pagination[limit]=6');
            console.log("date", date)
            setCreator(date.data || date);
        } catch (err) {
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPromOffers = async () => {
        try {
        setLoading(true);
        const resp= await fetchUrl('/promo-offers?populate=*&pagination[limit]=3');
        const normalized = (resp.data || []).map((entry) => ({
            id:          entry.id,
            title:       entry.title ?? 'Offre',
            description: entry.description ?? [],
            rate_prom:   entry.rate_prom?.rate ?? 0,   // ← nombre, pas objet
            bg_order:    entry.bg_order?.url ?? null,   // ← string url, pas objet
        }))
        console.log("response", resp)
        setOffers(normalized);
        } catch (err) {
        console.error('Erreur:', err);
        } finally {
        setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchCourses()
        fetCreators()
        fetchPromOffers()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        fetchCourses(query, activeFilter)
    }

    const handleFiltrer = (filter) => {
        setActiveFilter(filter)
        fetchCourses(query, filter)
    }

    // Options des selects
  const SUBJECT_OPTIONS = [
    { value: 'Development', label: 'Development' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Data', label: 'Data & AI' },
  ]
  const PARTNER_OPTIONS = [
    { value: 'Development', label: 'Development' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Data', label: 'Data & AI' },
  ]
  const LANGUAGE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'de', label: 'German' },
  ]
  const LEARNING_TYPE_OPTIONS = [
    { value: 'video', label: 'Video' },
    { value: 'live', label: 'Live Session' },
    { value: 'article', label: 'Article' },
    { value: 'quiz', label: 'Quiz' },
  ]
  const DIFFICULTY_OPTIONS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]

//   const displayCourses = courses.length > 0 ? courses : MOCK_COURSES

  return (
    <div className='pt-[143px] '>
        <section>
            <div className="relative w-full h-[326px]">
                <img src="/images/search.png" alt="" className='w-full h-full' />
                <div className="absolute inset-0 top-0 py-[80px]  justify-center items-center">
                    {/* search bar */}
                    <div className="max-w-[1324px] mx-auto flex flex-col gap-[20px]">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="flex items-center bg-white rounded-[12px] shadow-md overflow-hidden px-[20px] py-[6px] gap-[12px]">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Search your favorite course"
                                    className="flex-1 pl-[34.62px] pt-[21px] pb-[22px] text-[16px] 2xl:text-[20px] text-[#252641] outline-none placeholder:text-[#83839A]/60"
                                />
                                <button type="submit" className="bg-[#49BBBD] text-white font-bold px-[24px] py-[15px] 2xl:py-[16px] 2xl:pl-[41.32px] 2xl:pr-[42.44px] rounded-[8px] hover:bg-[#49BBBD]/90 transition-colors text-[15px] 2xl:text-[24px]">
                                    Search
                                </button>
                            </div>
                        </form>
                        {/* filtre */}
                        <div className="flex items-center gap-[12px] 2xl:gap-[20px] mb-[16px] flex-wrap">
                            <FilterSelect
                            label="Subject"
                            options={SUBJECT_OPTIONS}
                            value={subject}
                            onChange={(val) => { setSubject(val); fetchCourses(query, val || activeFilter) }}
                            />
                            <FilterSelect
                            label="Partner"
                            options={PARTNER_OPTIONS}
                            value={partner}
                            onChange={(val) => { setPartner(val); fetchCourses(query, val || activeFilter) }}
                            />
                            <FilterSelect
                            label="All Lessons"
                            options={[
                                { value: 'all', label: 'All Lessons' },
                                { value: 'free', label: 'Free' },
                                { value: 'paid', label: 'Paid' },
                            ]}
                            value={activeFilter === 'All' ? '' : activeFilter}
                            onChange={(val) => handleFiltrer(val || 'All')}
                            />
                            <FilterSelect
                            label="Language"
                            options={LANGUAGE_OPTIONS}
                            value={language}
                            onChange={setLanguage}
                            />
                            <FilterSelect
                            label="Learning type"
                            options={LEARNING_TYPE_OPTIONS}
                            value={learningType}
                            onChange={setLearningType}
                            />
                            {/* <FilterSelect
                            label="Difficulty"
                            options={DIFFICULTY_OPTIONS}
                            value={difficulty}
                            onChange={setDifficulty}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="pt-[69px] pl-[120px] pr-[118px] pb-[65px]">
                {/* Skeleton loader */}
                {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
                    {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-[8px] overflow-hidden shadow-sm animate-pulse">
                        <div className="h-[200px] bg-gray-200" />
                        <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                        </div>
                    </div>
                    ))}
                </div>
                ) : courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[80px]">
                    <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-4 opacity-30">
                    <circle cx="32" cy="32" r="30" stroke="#252641" strokeWidth="2"/>
                    <path d="M20 44s4-8 12-8 12 8 12 8" stroke="#252641" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="24" cy="26" r="3" fill="#252641"/>
                    <circle cx="40" cy="26" r="3" fill="#252641"/>
                    </svg>
                    <p className="text-[#252641] font-bold text-[18px]">No courses found</p>
                    <p className="text-[#83839A] text-[14px] mt-2">Try adjusting your search or filters</p>
                </div>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
                    {courses.map((course, index) => (
                        // <CourseCard key={course.id} course={course} index={index} />
                        <CardMarketing key={course.id} article={course} publishedAt={course.publishedAt}/>
                    ))}
                </div>
                )}

            </div>
        </section>
        <section className=' pl-[120px]'>
            <div className="pr-[148px] bg-[#9DCCFF]/20 pl-[133px] pt-[33px] pb-[31.77px] flex flex-col lg:flex-row justify-between items-center 2xl:gap-[256px]">
                <div className="">
                    <p className="pb-[25px] font-semibold text-[30px] text-[#252641] w-[80%]">Know about learning learning platform</p>
                    <div className="">
                        <ul className='flex flex-col gap-2.5'>
                            <li className='flex items-center gap-[16px]'>
                                <div className="w-5 h-5 rounded-full bg-[#55EFC4]"></div>
                                <p className="text-[#2D3436] text-[18px] inter leading-[32px]">Free E-book, video & consolation</p>
                            </li>
                            <li className='flex items-center gap-[16px]'>
                                <div className="w-5 h-5 rounded-full bg-[#55EFC4]"></div>
                                <p className="text-[#2D3436] text-[18px] inter leading-[32px]">Top instructors from around world</p>
                            </li>
                            <li className='flex items-center gap-[16px]'>
                                <div className="w-5 h-5 rounded-full bg-[#55EFC4]"></div>
                                <p className="text-[#2D3436] text-[18px] inter leading-[32px]">Top courses from your team</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-[25px]">
                        <Link href="/meeting" className=' '>
                            <button className='text-[24px] py-4 px-[39px] bg-[#49BBBD] rounded-[12px]  font-bold text-white'>Start learning now</button>
                        </Link>
                    </div>
                </div>
                <div className="">
                    <img src="/images/callmeet.png" alt="" />
                </div>
            </div>
        </section>

         {/* recommande for you */}
        <section className='pt-[65px]'>
            <div className="bg-[#9DCCFF]/20 px-10 lg:px-[90px] xl:pl-[139px] xl:pr-[135px] pb-[113px] pt-[91px]">
                <div className="flex justify-between items-center pb-[67px]">
                    <p className="text-[22px] lg:text-[26px] xl:text-[30px] font-medium tracking-[2%]">Recommended for you</p>
                    <div className="text-[#49BBBD]  text-[20px] font-bold">
                        <Link href="/">See all</Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[50px]">
                    {courses.slice(0, 4).map((course) => (
                        <CardMarketing
                        key={course.id}
                        article={course}
                        publishedAt={course.publishedAt}
                        />
                    ))}
                </div>
            </div>
        </section>

        <section className='pt-[90px] pb-[80px]  pl-[139px] pr-[135px]'>
            <div className="flex justify-between items-center mb-[40px]">
                <p className="text-[#252641] font-semibold text-[28px]">
                    Classes taught by best creators
                </p>
                <Link
                    href="/instructors"
                    className="text-[#49BBBD] font-bold text-[16px] hover:underline"
                >
                    See all
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px]">
                {
                    creators.map((creator, id) => (
                        <CreatorCard key={id} creator={creator} />
                    ))
                }
            </div>
        </section>
        {/* students say */}
        <section className='bg-[#9DCCFF]/20 px-10 pt-[70px] pb-[80px]  pl-[139px] pr-[137px]'>
            <p className="text-[30px] text-black font-medium tracking-[2%] pb-[70px]">What our students have to say</p>
            <Testimonial />
        </section>
        {/* promo offers */}
        <section className='pl-[139px] pr-[135px] pb-[76px] pt-[70px]'>
            <div className="flex justify-between">
                <p className="text-[30px] text-black font-medium tracking-[2%]">Top Education offers and deals are listed here</p>
                <div className="text-[#49BBBD] font-bold text-[20px]">
                    <Link href="/blog">See all</Link>
                </div>
            </div>
            <div className="">
                <PromoOffer offers={offers}/>
            </div>
        </section>
    </div>
  )
}

export default Search
