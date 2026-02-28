'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Courses from '../../components/courses/Courses'
import Category from '../../components/category/Category'
import MarketingArticles from "../../components/blog/MarketingArticles"
import CardMarketing from '../../components/blog/CardMarketing'
import { fetchUrl } from '../../config/api-config'

const categories = [
    {
        id:"1",
        image: "/images/design.png",
        title: "Design",
        style:"bg-[#49BBBD]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
    {
        id:"2",
        image: "/images/develop.png",
        title: "Development",
        style:"bg-[#5B72EE]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
    {
        id:"3",
        image: "/images/development.png",
        title: "Development",
        style:"bg-[#9DCCFF]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
    {
        id:"4",
        image: "/images/business.png",
        title: "Business",
        style:"bg-[#00CBB8]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
    {
        id:"5",
        image: "/images/marketing.png",
        title: "Marketing",
        style:"bg-[#F48C06]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
    {
        id:"6",
        image: "/images/photography.png",
        title: "Photography",
        style:"bg-[#EE645B]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
    {
        id:"7",
        image: "/images/acting.png",
        title: "Acting",
        style:"bg-[#252641]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
    {
        id:"8",
        image: "/images/business.png",
        title: "Business",
        style:"bg-[#00CBB8]/30",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod"
    },
]

const page = () => {

    const CARDS_PER_PAGE = 4
    const [news, setNews] = useState([]);
    const  [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const totalPages = Math.ceil(news.length / CARDS_PER_PAGE)
    const visible = news.slice(
        pages * CARDS_PER_PAGE,
        pages * CARDS_PER_PAGE + CARDS_PER_PAGE
    )

    const prev = () => setPages((p) => Math.max(0, p - 1));
    const next = () => setPages((p) => Math.min(totalPages - 1, p + 1))
    
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Filtrer uniquement les articles de catégorie "marketing"
        const data = await fetchUrl('/articles?populate=*&filters[category][slug][$eq]=marketing&sort=publishedAt:desc');
        setNews(data.data || data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };
        useEffect(() => {
            fetchNews();
        }, []);
    
    
      if (loading) {
        return (
          <section className="bg-gray-50 py-[143px] px-8">
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
    <div>
        <section className='pt-[143px] bg-[#9DCCFF]/20 px-10 lg:px-[90px]  xl:pl-[120px] xl:pr-[113px] pb-[57px]'>
            <div className="pb-[50px] pt-[50px] flex justify-between items-center">
                <p className="text-[20px] lg:text-[36px] font-semibold text-[#252641]">Welcome back, ready for your next lesson?</p>
                <div className="">
                    <Link href="/" className='text-[16px] lg:text-[20px] font-bold text-[#49BBBD]'>View history</Link>
                </div>
            </div>
            <div className="">
                <Courses />
            </div>
        </section>

        <section className='xl:pl-[119px] px-[40px] lg:px-[90px] xl:pr-[165px] pt-[80px] pb-[100px]'>
            
            <div className="pb-[53px]">
                <p className="text-[#252641] font-semibold text-[22px] lg:text-[26px] xl:text-[36px]">Choice favourite course from top category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] xl:gap-[80px]">
                {
                    categories.map((category, id ) => (                       
                        <Category key={category.id} category={category} />
                    ))
                }
            </div>
        </section>
                {/* recommande for you */}
        <section>
            <div className="bg-[#9DCCFF]/20 px-10 lg:px-[90px] xl:pl-[139px] xl:pr-[135px] pb-[113px] pt-[91px]">
                <div className="flex justify-between items-center pb-[67px]">
                    <p className="text-[22px] lg:text-[26px] xl:text-[30px] font-medium tracking-[2%]">Recommended for you</p>
                    <div className="text-[#49BBBD]  text-[20px] font-bold">
                        <Link href="/">See all</Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[50px]">
                    {visible.map((article) => (
                        <CardMarketing key={article.id} article={article} publishedAt={article.publishedAt}/>
                    ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-end gap-2 mt-5">
                    <button
                        onClick={prev}
                        disabled={pages === 0}
                        aria-label="Previous"
                        className="w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-[4px] bg-[#49BBBD] text-white text-xl flex items-center justify-center
                                hover:bg-[#45cdcf] transition-colors disabled:bg-[#49BBBD]/50 disabled:cursor-not-allowed"
                    >
                        <img src="/images/left.png" alt="" className='xl:w-[12px] xl:h-[28px] '/>
                    </button>
                    <button
                        onClick={next}
                        disabled={pages === totalPages - 1}
                        aria-label="Next"
                        className="w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-lg bg-[#49BBBD] text-white text-xl flex items-center justify-center
                                hover:bg-[#4bd3d5] transition-colors disabled:bg-[#49BBBD]/50 disabled:cursor-not-allowed"
                    >
                        <img src="/images/right.png" alt="" className='xl:w-[12px] xl:h-[28px] '/>
                    </button>
                    </div>
                )}
            </div>
        </section>

        <section>
            <div className="px-10 lg:px-[90px] xl:pl-[139px] xl:pr-[135px] pb-[213px] pt-[91px]">
                <div className="flex justify-between items-center pb-[67px]">
                    <p className="text-[22px] lg:text-[26px] xl:text-[30px] font-medium tracking-[2%]">Get choice of your course</p>
                    <div className="text-[#49BBBD]  text-[20px] font-bold">
                        <Link href="/">See all</Link>
                    </div>
                </div>
                <div className="">
                    <MarketingArticles />
                </div>
            </div>
        </section>
    </div>
  )
}

export default page
