'use client'
import React, {Children, useEffect, useState } from 'react'
import {fetchUrl, getStrapiMedia, optimizeCloudinaryUrl} from "../../config/api-config"
import Link from 'next/link'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import MarketingArticles from '../../components/blog/MarketingArticles'

const listimages = [
    {
        id: 1,
        image: "/images/uxui.png",
    },
    {
        id: 2,
        image: "/images/react.png",
    },
    {
        id: 3,
        image: "/images/php.png",
    },
    {
        id: 4,
        image: "/images/javascript.png",
    },
]

const page = ({currentBlogId = 1}) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const blogsPerPage = 2;

   const fetchRelatedBlogs = async (currentBlogId, limit = 10) => {
    try {
        const res = await fetchUrl(
        `/articles?populate=*&filters[id][$ne]=${currentBlogId}&pagination[limit]=${limit}&sort=createdAt:desc`)
        
        console.log(res, 'blog page')
        return res.data
    } catch (error) {
        console.error('Error fetching related blogs:', error)
        return []
    }
    }

    

    useEffect(() => {
        const loadBlogs = async () => {
            setLoading(true);
            setError(null)
            const data = await fetchRelatedBlogs(currentBlogId,10);
            setBlogs(data);
            setLoading(false);
        }
        loadBlogs();
    }, [currentBlogId]);

    const totalPages = Math.ceil(blogs.length / blogsPerPage)
    const startIndex = currentPage * blogsPerPage
    const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage)

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => Math.min(totalPages -1, prevPage + 1));
        }
    }

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => Math.max(0, prevPage - 1));
        }
    }

   const extractText = (content) => {
        if (!content) return '';
        // Si c'est déjà une string
        if (typeof content === 'string') return content.replace(/<[^>]*>/g, '');
        // Si c'est un tableau de blocs Strapi (rich text)
        if (Array.isArray(content)) {
            return content
            .map(block => {
                if (block.type === 'paragraph' && Array.isArray(block.children)) {
                return block.children.map(child => child.text || '').join('');
                }
                return '';
            })
            .join(' ')
            .trim();
        }
        return '';
    }; 


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    if (loading) {
        return (
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">Related Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
    }

    if (blogs.length === 0) {
        return (
            <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">Related Blog</h2>
                    <p className="text-gray-600">No related blogs found.</p>
                </div>
            </section>
        )
    }

  return (
    <div>
        {/* head */}
        <section>
            <div className="flex flex-col lg:flex-row justify-between gap-[80px]  xl:gap-[176px] lg:items-center mt-[145px] mb-[60px] bg-[#9DCCFF]/20 px-10 md:px-20 lg:pl-[80px] lg:pr-[79px] xl:pl-[118px] xl:pr-[163px] pt-[70px] pb-[70.25px] xl:px-[60px] xl:py-[60px]">
                <div className="md:w-[78%] lg:w-[96%] xl:w-[100%]">
                    <p className=" text-[18px] xl:text-[24px] font-normal text-black leading-auto">By Themadbrains in <span className='text-[#49BBBD] font-bold'>inspiration</span></p>
                    <h2 className="pt-[24px] text-[32px] text-[#2F327D] xl:text-[44px] font-semibold leading-auto">Why Swift UI Should Be on the Radar of Every Mobile Developer</h2>
                    <p className="pt-[14px] pb-[25px] text-[18px] xl:text-[24px] text-[#696984] leading-[180%] tracking-[2%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                    <Link href="/blog" className="">
                        <div className="bg-[#49BBBD] w-fit px-10 pt-[20px] pb-[12px] rounded-[12px] text-white font-bold text-[16px] xl:text-[18px] hover:underline">
                            Start learning now
                        </div>
                    </Link>
                </div>
                <div className="w-full  lg:w-[779px] lg:h-[526.88px] xl:w-[779px] rounded-[20px] bg-[#9DCCFF]/20">
                    <img src="/images/blogHead.png" alt="blog head" className="w-full h-full object-cover object-center rounded-[20px]" />
                </div>
            </div>
        </section>

        {/* reading blog list */}
        <section className='px-10 lg:pl-[80px] my-[80px] lg:pr-[98px] xl:pl-[110px] xl:pr-[158px]'>
            <div className="flex flex-col ">
                <div className="pb-[26px] flex justify-between items-center ">
                    <h2 className="text-[24px]  text-black xl:text-[30px] font-bold leading-auto">Reading blog List</h2>
                    <Link href="/blog" className="text-[#49BBBD] text-[20px] font-bold hover:underline">See all</Link>                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[36px] lg:gap-[76px]">
                    {listimages.map((item) => (
                        <div key={item.id} className="w-full h-full 3xl:w-[356px] 3xl:h-[327px] rounded-[20px] bg-[#9DCCFF]/20">
                            <img src={item.image} alt={`blog ${item.id}`} className="w-full h-full object-cover object-center rounded-[20px]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* related blog */}
        <section className='bg-[#9DCCFF]/20 px-10 lg:pl-[80px] pt-[93px] pb-[60px] lg:pr-[98px] xl:pl-[110px] xl:pr-[158px]'>
            <div className="flex flex-col ">
                <h2 className="text-[24px] pb-[41px] text-black xl:text-[30px] font-bold leading-auto">Related blog</h2>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-[36px] lg:gap-[76px]">
                    {currentBlogs.map((blog) => {
                        const coverImageUrl = blog.image.url
                        const imageUrl = blog.image.url;
                        const author = blog.author
                        return (
                            <div key={blog.id} className="w-full h-full 3xl:w-[356px] 3xl:h-[327px] rounded-[20px] bg-white pl-[33.36px] pr-[32.65px] pt-[59.62px] pb-[64.12px] overflow-hidden shadow-[0px_10px_60px_rgba(38,45,118,0.08)]">
                                <div className="pb-[12.38px]">
                                    <img src={optimizeCloudinaryUrl(getStrapiMedia(coverImageUrl))}
                                        alt={blog.title}
                                        className='w-full h-full objectif-cover'
                                    />
                                </div>
                               <div className="">
                                    <h3 className='pb-[14.63px] text-[22px] xl:text-[26px] leading-[180%] font-medium text-[#252641] line-clamp-2'>{blog.title}</h3>
                                    <div className="pl-[23.63px] flex items-center">
                                        {
                                            blog?.image ? (
                                                <div className="w-10 h-10 xl:w-[70.88px] xl:h-[70.88px] rounded-[60px] bg-[#D9D9D9]">
                                                    <img src={getStrapiMedia(imageUrl)}
                                                        alt={blog.author}
                                                        className=''
                                                    />
                                                </div>
                                            ) : (
                                               <div className="w-10 h-10 rounded-full bg-[#00a8b1] flex items-center justify-center text-white font-semibold">
                                                    {(blog.author || 'A').charAt(0).toUpperCase()}
                                                </div> 
                                            )
                                        }
                                        <div className="pl-[16.88px]">
                                             <p className="text-sm xl:text-[18px] font-medium text-black leading-auto tracking-[2%] ">
                                                {blog.author || 'Anonymous'}
                                            </p> 
                                        </div>
                                    </div>
                                 
                                    <p className="text-[20px] pt-[23.61px] mb-[44.99px] line-clamp-2">
                                        {extractText(blog.content)}
                                    </p>
                                    <div className=" flex justify-between">
                                        <div className="">
                                            <Link href={`/blog/${blog.slug}`} className='underline'>Read more</Link>
                                        </div>
                                        <div className="flex items-center gap-x-[7.87px]">
                                            <img src='/images/eye.png'/>
                                            <p className="">{blog.vues}</p>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        )
                    })}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                <div className="flex justify-end items-center gap-4 mt-8">
                    <button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className={`w-10 h-10 rounded-[4px] flex items-center justify-center transition-colors ${
                        currentPage === 0
                        ? 'bg-[#49BBBD]/50  cursor-not-allowed text-white'
                        : 'bg-[#00a8b1] text-white hover:bg-[#00a8b1]/90'
                    }`}
                    aria-label="Previous page"
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    </button>

                    <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                    className={`w-10 h-10 rounded-[4px] flex items-center justify-center transition-colors ${
                        currentPage === totalPages - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#00a8b1] text-white hover:bg-[#00a8b1]/90'
                    }`}
                    aria-label="Next page"
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    </button>
                </div>
                )}
            </div>
        </section>

        {/* marketing articles */}
        <section className='pt-[80px] pb-[171px] pl-[120px] pr-[80px]'>
            <div className="flex justify-between">
                <p className="text-[30px] text-black font-medium tracking-[2%]">Marketing Articles</p>
                <div className="text-[#49BBBD] font-bold text-[20px]">
                    <Link href="/blog">See all</Link>
                </div>
            </div>
            <div className="">
                <MarketingArticles />
            </div>
        </section>
    </div>
  )
}

export default page