'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const CheckIcon = ({ color }) => (
    <div 
        className="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color }}
    >
        <svg width="22.4" height="22.4" viewBox="0 0 24 24" fill="none">
            <polyline 
                points="6 12 10 16 18 8" 
                stroke="black" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
        </svg>
    </div>
)

const PricingCard = ({ plan })=> {
    const  features = plan.features || []

    return (
        <div className={`relative flex flex-col rounded-[20px] p-[32px] transition-all duration-300 ${
            plan.featured
                ? 'bg-white drop-shadow-[0px_8px_8px_rgba(38,50,56,0.12)] '
                : ''
        }`}>
            <div className="flex items-center justify-between gap-[8px] mb-[16px]">
                <div className="flex items-center">
                    {plan.icon && (
                        <span className="text-[18px] mr-1">{plan.icon}</span>
                    )}
                    <p className={`text-[14px] lg:text-[18px] font-bold leading-[32px] tracking-[0.2px] text-[#49BBBD] '}`}>
                        {plan.badge}
                    </p>
                </div>
                {plan.bestValue && (
                    <div className="text-[12px] font-extrabold p-2 w-[90px] h-[32px] flex items-center justify-center tracking-[2.5px] uppercase border border-[#6C5CE7] rounded-full">
                        BEST!
                    </div>
                )}
            </div>
            <div className="mb-[24px]">
                {plan.price === 0 ? (
                    <div className='flex items-end gap-[4px]'>
                        <p className="text-[48px] font-bold text-[#2D3436]  leading-[56px] tracking-[-1px]">Free</p>
                        <p className="text-[12px] font-extrabold text-[#2D3436]  tracking-[2.5px] mb-[8px] leading-auto">/ FOREVER</p>
                    </div>
                ) : (
                    <div className="flex items-end gap-[4px]">
                        <p className="text-[48px] font-bold text-[#2D3436] leading-[56px] tracking-[-1px]">${plan.price}</p>
                        <p className="text-[12px] font-extrabold text-[#2D3436]  tracking-[2.5px] mb-[8px]">{plan.period}</p>
                    </div>
                )}
            </div>
            <ul className="flex flex-col gap-[14px] mb-[40px] flex-grow">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-[10px]">
                        <CheckIcon color={plan.checkcolor}/>
                        {/* Si c'est un component Strapi avec champ "label" */}
                        <span className="text-[14px] lg:tex-[18px] leading-[32px] text-[#2D3436] font-medium">
                            {feature.label || feature}
                        </span>
                    </li>
                ))}
            </ul>
            {
                plan.price === 0 ? (
                    <button className={`mt-[46px] w-full py-[14px] rounded-[12px] font-bold transition-all duration-200 ${
                        plan.buttonStyle === 'filled'
                            ? 'bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90 text-[24px] leading-[36px] tracking-[0.25px]'
                            : 'border border-[#ADADAD] text-[#49BBBD] text-[18px] bg-white leading-[32px] tracking-[0.2px] hover:bg-[#49BBBD]/10'
                    }`}>
                        {plan.buttonLabel}
                    </button>
                ) : (

                    <button className={`w-full py-[14px] rounded-[12px] font-bold transition-all duration-200 ${
                        plan.buttonStyle === 'filled'
                            ? 'bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90 text-[24px] leading-[36px] tracking-[0.25px]'
                            : 'border border-[#ADADAD] text-[#49BBBD] text-[18px] bg-white leading-[32px] tracking-[0.2px] hover:bg-[#49BBBD]/10'
                    }`}>
                        {plan.buttonLabel}
                    </button>
                )
            }
        </div>
    )
}


const MemberShip = () => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [faqs, setFaqs] = useState([])
    const [openId, setOpenId] = useState(null)
    const [start, setStart] = useState(0)
    const [testimonials, setTestimonials] = useState([])

    const VISIBLE = 4

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await fetchUrl('/plans?populate=*&sort=rank:asc')
                setPlans(data.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        const fetchFaq = async () =>{
            try {
                const resp = await fetchUrl('/faqs?sort=order:asc')
                setFaqs(resp.data || [])
                if (resp.data?.length > 0) setOpenId(resp.data[3].id)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        const fetchTestimonial = async () => {
            try {
                const testi = await fetchUrl('/testimonials?populate=avatar')
                setTestimonials(testi.data || [])
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchPlans()
        fetchFaq()
        fetchTestimonial()
    }, [])

    const visible = testimonials.slice(start, start + VISIBLE)
    const canPrev = start > 0
    const canNext = start + VISIBLE < testimonials.length

    if(loading) return (
        <section className="py-[80px] flex justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#49BBBD] rounded-full animate-spin" />
        </section>
    )

  return (
    <div>
        <section className="pt-[143px] mb-[197px] mx-auto flex flex-col justify-center items-center">
            <p className="text-[#49BBBD] text-[32px] xl:text-[64px] text-center font-extrabold tracking-[-1px] mb-[77px]">Affordable pricing</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] items-start ">
                {
                    plans.map((plan) => (
                        <PricingCard key={plan.id} plan={plan}/>
                    ))
                }
            </div>
        </section>
        {/* online */}
        <section className='pl-[120px] pr-[118px] mb-[77px]'>
            <div className="bg-[#252641] text-white rounded-[37px] flex flex-col justify-center text-center items-center pt-[70px] pb-[83px] mx-auto px-[70px]">
                <p className="text-[28px] lg:text-[36px] font-semibold">Online coaching lessons for remote learning.</p>
                <p className="pt-[30px] pb-[73px] text-[18px] lg-[24px] leading-[180%] tracking-[2%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                <Link href='/courses'>
                    <button className="bg-[#49BBBD] rounded-[12px] text-[16px] font-bold px-[40px] pb-[12px] pt-[20px]">
                        Start learning now
                    </button>
                </Link>
            </div>
        </section>
        {/* faq */}
        <section className='lg:px-[100px] xl:px-[200px] pb-[80px]'>
            <h2 className="text-[28px] lg:text-[36px] font-semibold text-[#2D3436] text-center mb-[83px]">
                Online coaching lessons for remote learning
            </h2>
            <div className="flex flex-col">
                {
                    faqs.map((faq) => (
                        <div key={faq.id} className="border-b border-[#696984]">
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full flex items-center justify-between py-[15px] hover:bg-[#F5F9FF] transition-colors"
                            >
                                <div className="flex items-center gap-[12px]">
                                    <div className="w-[20px] h-[20px] rounded-full bg-[#55EFC4] flex-shrink-0" />
                                    <span className="text-[18px] inter text-[#2D3436] text-left leading-[32px]" >
                                        {faq.question}
                                    </span>
                                </div>
                               
                                {
                                    openId ? (
                                        <div className="">
                                            <img src="/images/downfaq.png" alt="" />
                                        </div>
                                    ) : (
                                        <div className="">
                                            <img src="/images/up.png" alt="" />
                                        </div>
                                    )
                                }
                            </button>
                            {openId === faq.id && faq.answer && (
                                <div className="pl-[38px] pb-[15px]">
                                    {/* <p className="text-[14px] text-[#696984] leading-[180%]">{faq.answer}</p> */}
                                    <BlocksRenderer
                                        content={faq?.answer}
                                        blocks={{
                                            // Personnalisation optionnelle
                                            paragraph: ({ children }) => <p className=" text-[14px] text-[#696984] leading-[180%] tracking-[2%]">{children}</p>,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </section>
        {/* students say */}
        <section className='relative bg-[#9DCCFF]/20 pl-[121px] pt-[80px] pr-[125px]'>
            <div className="pb-[197px]">
                <p className="text-[28px] pb-[50px] lg:text-[36px] font-semibold text-[#2D3436] text-center mb-[50px]">What our students have to say</p>
                <div className="relative flex items-center gap-[20px]">
                    <button
                        onClick={() => canPrev && setStart(s => s - 1)}
                        disabled={!canPrev}
                        className={`absolute left-[-28px] w-[50px] h-[50px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            canPrev
                                ? 'bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90'
                                : 'bg-[#49BBBD] text-white cursor-not-allowed'
                        }`}
                    >
                       <img src="/images/left.png" alt="" />
                    </button>
                    {/* Cards */}
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-[16px]">
                        {visible.map((t) => (
                            <div key={t.id} className="bg-white rounded-[16px] p-[20px] shadow-[0px_4px_20px_rgba(38,45,118,0.08)] flex flex-col items-center text-center">
                                {t.avatar?.url ? (
                                    <img
                                        src={optimizeCloudinaryUrl(getStrapiMedia(t.avatar.url))}
                                        alt={t.name}
                                        className="w-[70px] h-[70px] object-cover mb-[20px]"
                                    />
                                ) : (
                                    <div className="w-[70px] h-[70px] bg-[#49BBBD]/20 flex items-center justify-center mb-[20px]">
                                        <span className="text-[24px] font-bold text-[#49BBBD]">
                                            {(t.name || 'A').charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <p className="text-[15px] font-semibold text-[#252641] mb-[19px]">{t.name}</p>
                                <BlocksRenderer
                                    content={t?.description}
                                    blocks={{
                                        // Personnalisation optionnelle
                                        paragraph: ({ children }) => <p className=" text-[18px] text-[#696984] tracking-[2%]">{children}</p>,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Next */}
                    <button
                        onClick={() => canNext && setStart(s => s + 1)}
                        disabled={!canNext}
                        className={`absolute right-[-28px] w-[50px] h-[50px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            canNext
                                ? 'bg-[#49BBBD] text-white hover:bg-[#49BBBD]/90'
                                : 'bg-[#E8E8E8] text-[#696984] cursor-not-allowed'
                        }`}
                    >
                       <img src="/images/right.png" alt="" />
                    </button>
            </div>
            </div>
            <div className="absolute bottom-[-95px] bg-[#252641] text-white rounded-[37px] flex flex-col lg:flex-row justify-between text-center items-center pt-[71px] pb-[84px] mx-auto pr-[88px] pl-[100px] w-[83%]">
                <p className="text-[28px] lg:text-[36px] font-semibold">APP is available for free</p>
                <div className="flex gap-[24px]">
                    <button className='bg-[#29B9E7] text-white rounded-[12px] flex justify-between items-center pt-[14px] pb-[13px] px-[26px]'>
                        <img src="/images/android.png" alt="" />
                        <p className="text-[24px] font-semibold pl-[17px]">Android APP</p>
                    </button>
                    <button className='bg-[#49BBBD] text-white rounded-[12px] flex justify-between items-center pt-[14px] pb-[13px] px-[26px]'>
                        <img src="/images/apple.png" alt="" />
                        <p className="text-[24px] font-semibold pl-[17px]">IOS APP</p>
                    </button>
                </div>
            </div>
        </section>
            {/* Become Teacher / Counselor */}
         <section className="pb-[233px] pt-[175px] px-[120px]">
             <div className=" ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[108px]">
                    {[
                        {
                            title: 'Become a Teacher',
                            image: '/images/instructor.png',
                            text: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...',
                            buttonLabel: 'Apply a Teacher',
                            href: '/apply-teacher'
                        },
                        {
                            title: 'Become a Counselor',
                            image: '/images/student.png',
                            text: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...',
                            buttonLabel: 'Apply a Counselor',
                            href: '/apply-counselor'
                        }
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-[20px] overflow-hidden shadow-[0px_10px_40px_rgba(38,45,118,0.08)]">
                            <div className="h-[383.5px] overflow-hidden">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-[28px]">
                                <h3 className="text-[20px] lg:text-[26px] font-medium text-[#252641] mb-[13px] leading-[180%]">{card.title}</h3>
                                <p className="text-[14px] lg:text-[20px] text-[#696984] leading-[180%] tracking-[2%] mb-[48px]">{card.text}</p>
                                <Link href={card.href}>
                                    <button className="bg-[#49BBBD] text-white font-bold text-[14px] px-[24px] py-[10px] rounded-[8px] hover:bg-[#49BBBD]/90 transition-colors">
                                        {card.buttonLabel}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  )
}

export default MemberShip