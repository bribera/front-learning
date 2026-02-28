'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl, timeLeft } from '../../config/api-config'
import Link from 'next/link'
import qs from 'qs'
import Reviews from './Reviews'
import MarketingArticles from "../blog/MarketingArticles"
import OfferCard from './OfferCard'

const offers = [
    {
       id: 1,
       title: "FOR INSTRUCTORS",
       rate: "50%",
       text: "TOTC’s school management software helps traditional and online schools manage scheduling,"
    },
    {
       id: 2,
       title: "FOR INSTRUCTORS",
       rate: "50%",
       text: "TOTC’s school management software helps traditional and online schools manage scheduling,"
    },
    {
       id: 3,
       title: "FOR INSTRUCTORS",
       rate: "50%",
       text: "TOTC’s school management software helps traditional and online schools manage scheduling,"
    },
    {
       id: 4,
       title: "FOR INSTRUCTORS",
       rate: "50%",
       text: "TOTC’s school management software helps traditional and online schools manage scheduling,"
    },
]


const CourseDetail = () => {
    const {slug} = useParams()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const fetchCourse = async () => {
        try {
            setLoading(true)
            const query = qs.stringify({
                filters: {
                    slug: { $eq: slug }
                },
                populate: {
                    thumbnail: true,
                    instructor: true,
                    included: {
                        populate: ["icon"]
                    },
                    review: {          
                        populate: ["avatar"]
                    }
                }
            }, { encodeValuesOnly: true })
            const data = await fetchUrl(`/courses?${query}`)
            console.log(data, "detailPage")
            setCourse(data.data[0])
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (slug) fetchCourse()
    }, [slug])

    if (loading) return <p>Chargement...</p>
    if (error) return <p>Erreur : {error}</p>
    if (!course) return <p>Cours introuvable</p>

  return (
    // <div>
    //     <section className='min-h-[1903px] max-h-[5000px] 3xl:min-h-[1604px] mt-[143px] w-full h-full'>
    //         <div className="relative flex justify-center items-center h-[652px] w-full">
    //             <div className="absolute top-0 left-0 inset-0">
    //              <img src={optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))} alt="" className=' w-full h-full object-contain'/>
    //             </div>;
    //             <div className="w-full bg-black/20 absolute inset-0"></div>
    //             <div className="absolute top-[329px] inset-0">
    //                 <div className="relative flex flex-col  lg:block w-[100%] xl:h-[1272px]">
    //                     <div className="w-full lg:w-[64%] xl:w-[67%] pt-[59px] px-[40px] lg:px-[90px] xl:pl-[157px] xl:pr-[191px] block mt-[327px] lg:mt-0 lg:absolute inset-0 top-[327px] left-0">
    //                      <Reviews reviews={course.review || []}/>
    //                     </div>
    //                     <div className="hidden w-[35%] lg:block absolute  top-0 right-[40px] 3xl:right-[-124px]">
    //                         <div className=" bg-white  px-[29px] py-[30px] ">
    //                             <div className=" h-[250px]">
    //                                 <img src={optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))} alt="" className='h-full w-full'/>
    //                             </div>
    //                             <div className="px-[29px]">
    //                                 <div className="flex flex-col items-center border-b-1 border-b-[#696984]">
    //                                     <div className="flex items-center">
    //                                         <p className="lg:text-[30px] font-semibold tracking-[2%] 3xl:text-[45px]">${course.priceSale}</p>
    //                                         <p className="pl-[22px] pr-[23px] font-semibold lg:text-[18px] line-through text-black/50 xl:text-[26px]">${course.price}</p>
    //                                         <p className="lg:text-[16px] font-semibold text-black/50 tracking-[2%] xl:text-[28px]">50% Off</p>
    //                                     </div>
    //                                     <div className="pt-[30px]">
    //                                         <p className="text-[20px] font-semibold tracking-[2%] text-[#49BBBD]">{timeLeft(course.timeLeft)} left at this price</p>
    //                                     </div>
    //                                     <Link href="/" className='w-full py-[30.5px]'>
    //                                         <button className='pt-[17px] pb-[16px] bg-[#49BBBD] text-white font-bold text-[20px] w-full rounded-[12px]'>Buy Now</button>
    //                                     </Link>
    //                                 </div>
    //                                 <div className="my-[30.5px] border-b-1 border-b-[#696984]">
    //                                     <p className="pb-[34px] text-[20px] 3xl:text-[30px] tracking-[2%] font-semibold">This Course included</p>
    //                                     <ul className='flex flex-col gap-[11px] pb-[30.5px]'>
    //                                         {course.included.map((item) => (
    //                                             <li key={item.id} className='flex items-center'>
    //                                                 <img src={optimizeCloudinaryUrl(getStrapiMedia(item.icon.url))} alt="" />
    //                                                 <span className='pl-[9px] text-black/50 text-[14px] font-semibold tracking-[2%]'>{item.label}</span>
    //                                             </li>
    //                                         ))}
    //                                     </ul>
    //                                 </div>
    //                                 <div className="border-b-1 border-[#696984] pb-[30.5px]">
    //                                     <p className="pb-[34px] text-[20px] 3xl:text-[30px] tracking-[2%] font-semibold">Training 5 or more people</p>
    //                                     <p className="text-black/50 text-[14px] font-semibold tracking-[2%] leading-[180%]">Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
    //                                 </div>
    //                                 <div className="pt-[30.5px]">
    //                                     <p className="pb-[34px] text-[20px] 3xl:text-[30px] tracking-[2%] font-semibold">Share this course</p>
    //                                     <ul className='flex gap-[25px]'>
    //                                         <Link href={course.tweeter}>
    //                                         <li className='flex items-center w-[32px] h-[32px]'>
    //                                             <img src="/images/twitter.png" alt=" w-full h-full" />  
    //                                         </li>
    //                                         </Link>
    //                                         <Link href={course.facebook}>
    //                                             <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full text-white'>
    //                                                 <img src="/images/facebook.png" alt="" />
    //                                             </li>
    //                                         </Link>
    //                                         <Link href={course.youtube}>
    //                                             <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#FF0000] rounded-full text-white'>
    //                                                 <img src="/images/youtube.png" alt="" />
    //                                             </li>
    //                                         </Link>
    //                                         <Link href={course.instagram}>
    //                                             <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full text-white'>
    //                                                 <img src="/images/instagram.png" alt="" />
    //                                             </li>
    //                                         </Link>
    //                                         <Link href={course.telegram}>
    //                                             <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full text-white'>
    //                                                 <img src="/images/telegram.png" alt="" />
    //                                             </li>
    //                                         </Link>
    //                                         <Link href={course.whatsapp}>
    //                                             <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full text-white'>
    //                                                 <img src="/images/whatsapp.png" alt="" />
    //                                             </li>
    //                                         </Link>
    //                                     </ul>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>

    //     <section className="bg-[#9DCCFF]/20 px-[105px] py-[92px]">
    //         <div className="flex justify-between">
    //             <p className="text-[30px] text-black font-medium tracking-[2%]">Marketing Articles</p>
    //             <div className="text-[#49BBBD] font-bold text-[20px]">
    //                 <Link href="/blog">See all</Link>
    //             </div>
    //         </div>
    //         <div className="pt-[47px]">
    //             <MarketingArticles />
    //         </div>
    //     </section>

    //     {/* Everythings */}
    //   <section className="mb-[163px] px-[49px] 3xl:pl-[187px] 3xl:pr-[186px] h-full pt-[200px]">
    //     <div className="flex h-full flex-col lg:flex-row gap-[67px] pt-[44px]">
    //       <div className="flex-1 relative pt-[13px] px-[25px]">
    //         <div className="absolute -z-1 w-[73px] h-[73px] bg-[#33EFA0] rounded-full absolute top-0 left-0"></div>
    //         <div className="w-full">
    //           <h2 className="text-[32px] 3xl:text-[36px] font-medium leading-[160%] text-[#2F327D]">Everything you can do in a physical classroom, <span className="text-[#00CBB8]">you can do with TOTC</span></h2>
    //           <div className="relative my-[30px] text-[21px] 3xl:text-[24px] leading-[160%] 3xl:leading-[180%] text-[#696984] tracking-[2%] font-normal">
    //             TOTC’s school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
    //             <div className="absolute -z-1 w-[30px] h-[30px] bg-[#33EFA0] rounded-full absolute bottom-[69px] right-[9px]"></div>
    //           </div>
    //           <div>
    //             <Link href="/" className="text-[#696984] underline text-[22px] leading-[180%] font-normal">Learn more</Link>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex-1 p-[20px] relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:h-[512px]">
    //         <div className="hidden lg:block w-[138px] h-[138px] -z-1 top-0 left-0 bg-[#23BDEE] rounded-[20px] absolute "></div>
    //         <div className="3xl:w-auto h-[471.08px]  absolute top-[20px] left-[20px] right-[25px]">
    //           <img src="/images/everything.png" alt="Everything with TOTC" className="w-full rounded-[20px] h-full object-cover object-center" />
    //         </div>
    //         <div className="hidden lg:block w-[231px] h-[231px] -z-1 bottom-0 right-0 bg-[#33EFA0] rounded-[20px] absolute "></div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Top education */}

    //   <section className='pb-[313px]'>
    //     <div className=" px-10 lg:px-[90px] xl:pl-[174px] xl:pr-[88px] pt-[91px]">
    //         <div className="flex justify-between items-center pb-[67px]">
    //             <p className="text-[22px] lg:text-[26px] xl:text-[30px] font-medium tracking-[2%]">Top  Education offers and deals are listed here</p>
    //             <div className="text-[#49BBBD]  text-[20px] font-bold">
    //                 <Link href="/">See all</Link>
    //             </div>
    //         </div>
    //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[50px]">
    //             {
    //                 offers.map((offer) => (
    //                     <OfferCard key={offer.id} offer={offer}/>
    //                 ))
    //             }
    //         </div>                       
    //     </div>
    //   </section>
    // </div>
     <div>
        {/* ── Hero Image ── */}
        <section className='mt-[143px] w-full'>
            <div className="relative h-[652px] w-full">
                <img 
                    src={optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))} 
                    alt="" 
                    className='w-full h-full object-cover'
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* ── Contenu principal : Reviews (gauche) + Sidebar (droite) ── */}
            <div className="relative flex flex-col lg:flex-row gap-[40px] px-[40px] lg:pl-[90px] lg:pr-[40px] xl:pl-[120px] xl:pr-[60px] mt-[-298px]">
                
                {/* Gauche : Tabs + Reviews */}
                <div className="flex-1 p-[40px] mt-[358px]">
                    <Reviews reviews={course.review || []} course={course} />
                </div>

                {/* Droite : Sidebar achat */}
                <div className="w-full lg:w-[320px] xl:w-[360px] h-fit sticky top-[100px]">
                    <div className="bg-white rounded-[20px] overflow-hidden">
                        {/* Thumbnail */}
                        <div className="h-[268px] bg-white px-[29px] pt-[30px]">
                            <img 
                                src={optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))} 
                                alt="" 
                                className='h-full w-full object-cover'
                            />
                        </div>
                        <div className="px-[24px] pb-[30px]">
                            {/* Prix */}
                            <div className="flex justify-between items-center gap-[22px] pt-[20px] pb-[16px]">
                                <p className="text-[28px] font-bold text-black tracking-[2%]">${course.priceSale}</p>
                                <div className="flex items-center gap-[23px]">
                                    <p className="text-[18px] 3xl:text-[28px] font-semibold line-through tracking-[2%] text-black/50">${course.price}</p>
                                    <p className="text-[18px] 3xl:text-[28px] font-semibold text-black/50 tracking-[2%]">50% Off</p>
                                </div>
                            </div>
                            <p className="text-[14px] 3xl:text-[20px] text-center font-semibold text-[#49BBBD] pb-[16px]">
                                {timeLeft(course.timeLeft)} left at this price
                            </p>
                            <Link href="/" className='w-full'>
                                <button className='pt-[14px] pb-[13px] 3xl:pt-[17px] 3xl:pb-[16px] 3xl:pl-[177px] 3xl:pb-[176px] bg-[#49BBBD] text-white font-bold text-[18px] 3xl:text-[20px] w-full rounded-[12px] hover:bg-[#49BBBD]/90 transition-colors'>
                                    Buy Now
                                </button>
                            </Link>

                            {/* Divider */}
                            <div className="border-t border-[#696984] my-[24px]" />

                            {/* This course included */}
                            <p className="text-[18px] 3xl:text-[30px] font-semibold tracking-[2%] pb-[16px]">This Course included</p>
                            <ul className='flex flex-col gap-[10px]'>
                                {course.included?.map((item) => (
                                    <li key={item.id} className='flex items-center gap-[10px]'>
                                        <img src={optimizeCloudinaryUrl(getStrapiMedia(item.icon.url))} alt="" className="w-[20px] h-[20px]" />
                                        <span className='text-black/50 text-[14px] font-semibold tracking-[2%]'>{item.label}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Divider */}
                            <div className="border-t border-[#696984] my-[24px]" />

                            {/* Training */}
                            <p className="text-[18px] 3xl:text-[30px] font-semibold tracking-[2%] pb-[12px]">Training 5 or more people</p>
                            <p className="text-black/50 text-[14px] font-semibold tracking-[2%] leading-[180%]">
                                Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
                            </p>

                            {/* Divider */}
                            <div className="border-t border-[#696984 my-[24px]" />

                            {/* Share */}
                            <p className="text-[18px] 3xl:text-[30px] font-semibold tracking-[2%] pb-[16px]">Share this course</p>
                            <ul className='flex gap-[16px] items-center'>
                                <Link href={course.tweeter || '#'}>
                                    <li className='w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#49BBBD]/20 transition-colors'>
                                        <img src="/images/twitter.png" alt="twitter" className="" />
                                    </li>
                                </Link>
                                <Link href={course.facebook || '#'}>
                                    <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full hover:bg-[#49BBBD] transition-colors'>
                                        <img src="/images/facebook.png" alt="facebook" />
                                    </li>
                                </Link>
                                <Link href={course.youtube || '#'}>
                                    <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#FF0000] rounded-full hover:opacity-80 transition-opacity'>
                                        <img src="/images/youtube.png" alt="youtube" />
                                    </li>
                                </Link>
                                <Link href={course.instagram || '#'}>
                                    <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full hover:bg-[#49BBBD] transition-colors'>
                                        <img src="/images/instagram.png" alt="instagram" />
                                    </li>
                                </Link>
                                <Link href={course.telegram || '#'}>
                                    <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full hover:bg-[#49BBBD] transition-colors'>
                                        <img src="/images/telegram.png" alt="telegram" />
                                    </li>
                                </Link>
                                <Link href={course.whatsapp || '#'}>
                                    <li className='w-[32px] h-[32px] flex items-center justify-center bg-[#696984] rounded-full hover:bg-[#49BBBD] transition-colors'>
                                        <img src="/images/whatsapp.png" alt="whatsapp" />
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ── Marketing Articles ── */}
        <section className="bg-[#9DCCFF]/20 px-[40px] lg:px-[90px] xl:px-[105px] py-[92px] mt-[80px]">
            <div className="flex justify-between items-center pb-[47px]">
                <p className="text-[24px] lg:text-[30px] text-black font-medium tracking-[2%]">Marketing Articles</p>
                <Link href="/blog" className="text-[#49BBBD] font-bold text-[20px] hover:underline">See all</Link>
            </div>
            <MarketingArticles />
        </section>

        {/* ── Everything section ── */}
        <section className="px-[49px] 3xl:pl-[187px] 3xl:pr-[186px] py-[120px]">
            <div className="flex flex-col lg:flex-row gap-[67px]">
                <div className="flex-1 relative pt-[13px] px-[25px]">
                    <div className="absolute w-[73px] h-[73px] bg-[#33EFA0] rounded-full top-0 left-0 -z-10" />
                    <div className="w-full">
                        <h2 className="text-[32px] 3xl:text-[36px] font-medium leading-[160%] text-[#2F327D]">
                            Everything you can do in a physical classroom, <span className="text-[#00CBB8]">you can do with TOTC</span>
                        </h2>
                        <div className="relative my-[30px] text-[21px] 3xl:text-[24px] leading-[160%] text-[#696984] tracking-[2%] font-normal">
                            TOTC's school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
                            <div className="absolute w-[30px] h-[30px] bg-[#33EFA0] rounded-full bottom-[69px] right-[9px] -z-10" />
                        </div>
                        <Link href="/" className="text-[#696984] underline text-[22px] leading-[180%] font-normal">Learn more</Link>
                    </div>
                </div>
                <div className="flex-1 p-[20px] relative lg:h-[512px]">
                    <div className="hidden lg:block w-[138px] h-[138px] top-0 left-0 bg-[#23BDEE] rounded-[20px] absolute -z-10" />
                    <div className="h-[471px] absolute top-[20px] left-[20px] right-[25px]">
                        <img src="/images/everything.png" alt="Everything with TOTC" className="w-full rounded-[20px] h-full object-cover" />
                    </div>
                    <div className="hidden lg:block w-[231px] h-[231px] bottom-0 right-0 bg-[#33EFA0] rounded-[20px] absolute -z-10" />
                </div>
            </div>
        </section>

        {/* ── Top Education Offers ── */}
        <section className='pb-[120px] px-[40px] lg:px-[90px] xl:pl-[174px] xl:pr-[88px] pt-[60px]'>
            <div className="flex justify-between items-center pb-[67px]">
                <p className="text-[22px] lg:text-[30px] font-medium tracking-[2%]">
                    Top Education offers and deals are listed here
                </p>
                <Link href="/" className="text-[#49BBBD] text-[20px] font-bold hover:underline">See all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[50px]">
                {offers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                ))}
            </div>
        </section>
    </div>
  )
}

export default CourseDetail