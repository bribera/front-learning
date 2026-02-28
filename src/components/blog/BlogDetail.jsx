'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import RelatedBlogs from './Related'
import Link from 'next/link'

const BlogDetail = () => {
    const {slug} = useParams()
    
    const [blogArticles, setBlogArticles] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
  
   const fetchBlogArticles = async () => {
        try {
            const data = await fetchUrl(`/articles?populate=*&filters[slug][$eq]=${slug}`);
            const blog = data.data?.[0] || null;
            console.log("blog", blog)
            setBlogArticles(blog);  // ← set data d'abord
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);  // ← loading false EN DERNIER, dans le finally
        }
    }

    useEffect(() => {
          console.log('slug:', slug)  // ← vérifie ici
        if(!slug) return 
            fetchBlogArticles();
    }, [slug]);
    
    
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

    if (!blogArticles) {
        return <p>Blog Article introuvable.</p>
    }
  
    return (
    <div>
      <section>
        <div className="">
            <div className="w-full h-full">
                {/* <img src={optimizeCloudinaryUrl(getStrapiMedia(blogArticles.image?.url))} alt=""  className='w-full h-full object-center'/> */}
                <img src="/images/background.png" alt=""  className='w-full h-full object-center'/>
            </div>
            <div className="pt-[80px] pl-[120px] pr-[119px]">
                <p className="text-[44px] font-semibold text-[#2F327D] leading-[180%] pb-[20px]">{blogArticles.title}</p>
                <BlocksRenderer
                    content={blogArticles.content}
                    blocks={{
                        // Personnalisation optionnelle
                        paragraph: ({ children }) => <p className="  text-[#696984] text-[24px] leading-[180%] tracking-[2%] pb-[30px]">{children}</p>,
                    }}
                />
                {/* <p className="">{blogArticles.content}</p> */}
                {/* tags */}
                 <div className="flex gap-8 pt-[20px] border-b border-[#696984] pb-[31px]">
                    {blogArticles.tags?.map(tag => (
                        <span 
                            key={tag.id}
                            className="pl-[36px] pr-[39px] pt-[13px] pb-[12px] rounded-[36px] bg-[#49BBBD]/10 text-[#696984] text-[16px]"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>

                {/* Auteur */}
                <div className="pt-[40px] pb-[80px] flex justify-between items-center pr-[14px]">
                    <div className="flex items-center gap-4 ">
                        {blogArticles.image?.url && (
                            <img 
                                src={getStrapiMedia(blogArticles.image?.url)} 
                                alt={blogArticles.author}
                                className="w-[77px] h-[77px] rounded-[6px] bg-[#D9D9D9] object-cover"
                            />
                        )}
                        <div className='flex justify-between items-center '>
                            <div className=" ">
                                <p className="text-[12px] font-medium tracking-[2%] text-[#696984]">Written by</p>
                                <p className="text-[18px] font-medium text-black">{blogArticles.author}</p>
                            </div>
                        </div>
                    </div>
                    <Link href={blogArticles.link} className='w-fit'>
                        <p className="border border-[#49BBBD] text-[16px] font-bold pt-[12px] pb-[13px] pl-[91px] pr-[88px] text-[#49BBBD]">
                            Follow
                        </p>
                    </Link>
                </div>
            </div>
        </div>
      </section>
      <section className='bg-[#9DCCFF]/10'>
        <RelatedBlogs currentBlogId={blogArticles.id} />
      </section>
    </div>
  )
}

export default BlogDetail
