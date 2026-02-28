'use client'
import { useState, useEffect } from 'react'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Link from 'next/link'

const Testimonial = () => {
   const [testimonials, setTestimonials] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const data = await fetchUrl('/testimonials?populate[0]=avatar&populate[1]=socialLink.icon')
        console.log("testi", data)
        setTestimonials(data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  if (loading) return (
    <div className="animate-pulse bg-gray-100 rounded-2xl h-[300px] w-full" />
  )
  
  if (!testimonials.length) return null

  const active = testimonials[activeIndex]

    return (
     <div className="bg-white rounded-[20px] shadow-[0px_10px_60px_rgba(38,45,118,0.08)] px-[40px] py-[40px] flex items-center gap-[40px] relative overflow-hidden">
      
      {/* ── Formes décoratives derrière la photo ── */}
      <div className="relative flex-shrink-0 w-[522px] h-[512px]">
        {/* Cercle jaune */}
        <div className="absolute top-[10px] right-[50px] w-[80px] h-[80px] 2xl:w-[160px] 2xl:h-[160px] rounded-full bg-[#F0FF92] opacity-[69%]" />
        {/* Blob orange bas-gauche */}
        <div className="absolute bottom-[30px] right-[90px] w-[100px] h-[80px] 2xl:w-[150px] 2xl:h-[150px] rounded-full bg-[#FBBC82] opacity-[62%]" />
        {/* Cercle vert */}
        <div className="absolute bottom-[0px] left-[0px] w-[80px] h-[80px] 2xl:w-[240px] 2xl:h-[240px] rounded-full bg-[#88FFD4] opacity-[47%]" />
        {/* Photo principale */}
        <div className="absolute w-[240px] h-[240px] 2xl:w-[450px] 2xl:h-[450px] roundex-full inset-0 flex items-center justify-center">
          <img
            src={optimizeCloudinaryUrl(getStrapiMedia(active?.avatar?.url))}
            alt={active?.name}
            className=" object-cover object-center rounded-full w-full h-full"
          />
        </div>
      </div>

      {/* ── Contenu texte ── */}
      <div className="flex-1">
        {/* Nom */}
        <h3 className="text-[#252641] font-bold text-[30px] mb-[31px]">
          {active?.name}
        </h3>
        {/* Email */}
        <p className="text-[#252641] font-medium text-[24px] mb-[19px]">
          {active?.email}
        </p>
        {/* Commentaire */}
        {/* <p className="text-[#696984] text-[14px] leading-[1.8] mb-[24px] line-clamp-5">
          {active?.comment}
        </p> */}
        <BlocksRenderer
            content={active?.comment}
            blocks={{
                // Personnalisation optionnelle
                paragraph: ({ children }) => <p className=" text-[#696984] text-[18px] leading-[180%] tracking-[2%]">{children}</p>,
            }}
        />

        {/* Réseaux sociaux */}
        <div className="flex items-center gap-[12px] mt-[31px]">
          {active?.socialLink?.map((social) => (
            <Link
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[32px] h-[32px] rounded-full overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center bg-gray-100"
            >
              {social.icon?.url ? (
                <img
                  src={getStrapiMedia(social.icon.url)}
                  alt="social icon"
                  className="w-[20px] h-[20px] object-contain"
                />
              ) : (
                // fallback si pas d'icône
                <div className="w-[20px] h-[20px] rounded-full bg-[#49BBBD]" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Miniatures à droite ── */}
      <div className="flex flex-col gap-[12px] flex-shrink-0">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveIndex(i)}
            className={`w-[79px] h-[79px] rounded-full overflow-hidden border-[3px] transition-all duration-300 ${
              i === activeIndex
                ? 'border-[#49BBBD] scale-110 shadow-md'
                : 'border-transparent  hover:opacity-80'
            }`}
          >
            <img
              src={getStrapiMedia(t?.avatar?.url)}
              alt={t?.name}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}
      </div>

    </div>
  )
}

export default Testimonial
