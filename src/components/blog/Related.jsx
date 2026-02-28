'use client'
import React, { useEffect, useState } from 'react'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from "../../config/api-config"
import Link from 'next/link'

const RelatedBlogs = ({ currentBlogId }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const blogsPerPage = 2;

    const fetchRelatedBlogs = async () => {
        try {
            const data = await fetchUrl(`/blogs?populate=*&filters[id][$ne]=${currentBlogId}&pagination[limit]=10&sort=createdAt:desc`)
            setBlogs(data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (currentBlogId) fetchRelatedBlogs();
    }, [currentBlogId]);

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

    const totalPages = Math.ceil(blogs.length / blogsPerPage)
    const currentBlogs = blogs.slice(currentPage * blogsPerPage, (currentPage + 1) * blogsPerPage)

    if (loading) return (
        <section className="bg-[#9DCCFF]/20 px-10 lg:pl-[80px] pt-[93px] pb-[60px] lg:pr-[98px] xl:pl-[110px] xl:pr-[158px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    </div>
                ))}
            </div>
        </section>
    )

    if (blogs.length === 0) return null;

    return (
        <section className='bg-[#9DCCFF]/20 px-10 lg:pl-[80px] pt-[93px] pb-[60px] lg:pr-[98px] xl:pl-[110px] xl:pr-[158px]'>
            <div className="flex flex-col">
                <div className="flex justify-between items-center pb-[41px]">
                    <h2 className="text-[24px] text-black xl:text-[30px] font-bold">Related Blog</h2>
                    <Link href="/blog" className="text-[#49BBBD] text-[20px] font-bold hover:underline">See all</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[36px] lg:gap-[76px]">
                    {currentBlogs.map((blog) => (
                        <div key={blog.id} className="rounded-[20px] bg-white pl-[33.36px] pr-[32.65px] pt-[59.62px] pb-[64.12px] overflow-hidden shadow-[0px_10px_60px_rgba(38,45,118,0.08)]">
                            <div className="pb-[12.38px]">
                                <img 
                                    src={optimizeCloudinaryUrl(getStrapiMedia(blog.coverImage?.url))}
                                    alt={blog.title}
                                    className='w-full h-[200px] object-cover rounded-[12px]'
                                />
                            </div>
                            <div>
                                <h3 className='pb-[14.63px] text-[22px] xl:text-[26px] leading-[180%] font-medium text-[#252641]'>
                                    {blog.title}
                                </h3>
                                <div className="flex items-center gap-3 pl-[23.63px]">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#D9D9D9]">
                                        {blog.image?.url 
                                            ? <img src={getStrapiMedia(blog.image.url)} alt={blog.author} className='w-full h-full object-cover'/>
                                            : <div className="w-full h-full bg-[#00a8b1] flex items-center justify-center text-white font-semibold">
                                                {(blog.author || 'A').charAt(0).toUpperCase()}
                                              </div>
                                        }
                                    </div>
                                    <p className="text-[18px] font-medium text-black">{blog.author || 'Anonymous'}</p>
                                </div>
                                <p className="text-[20px] pt-[23.61px] mb-[20px] line-clamp-2 text-[#696984] overflow-hidden">
                                    {/* {blog.description?.find(b => b.type === 'paragraph')
                                        ?.children?.map(c => c.text).join('') || ''} */}
                                        {extractText(blog.description)}
                                </p>
                                <div className="flex justify-between items-center">
                                    <Link href={`/blog/${blog.slug}`} className='underline text-[#49BBBD]'>Read more</Link>
                                    <div className="flex items-center gap-x-[7.87px]">
                                        <img src='/images/eye.png' alt="vues"/>
                                        <p>{blog.vues}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-end items-center gap-4 mt-8">
                        <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
                            className={`w-10 h-10 rounded-[4px] flex items-center justify-center transition-colors ${currentPage === 0 ? 'bg-[#49BBBD]/50 cursor-not-allowed text-white' : 'bg-[#00a8b1] text-white hover:bg-[#00a8b1]/90'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1}
                            className={`w-10 h-10 rounded-[4px] flex items-center justify-center transition-colors ${currentPage === totalPages - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#00a8b1] text-white hover:bg-[#00a8b1]/90'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default RelatedBlogs