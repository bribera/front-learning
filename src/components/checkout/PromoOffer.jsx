"use client"
import React from 'react'
import { getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'



const PromoOffer = ({offers = []}) => {
    if (offers.length === 0) return (
        <p className="">Aucun offre disponible pour l'instant</p>
    )
  return (
     <section className="py-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:flex  gap-6">
        {offers.map((item) => {

          return (
            <div
              key={item.id}
              className="relative overflow-hidden shrink-0  rounded-2xl cursor-pointer group w-[509.11px] 2xl:h-[500px]"
              // style={{ height: '500px' }}
            >
              {/* Image de fond */}
              <img
                src={optimizeCloudinaryUrl(getStrapiMedia(item.bg_order))}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-black/40 " />

                <div className="absolute top-0 left-0 inset-0 pl-[45.82px] pr-[103.86px] pt-[45px]">

                    {/* Badge % en haut à gauche */}
                    {item.rate_prom > 0 && (
                        <div className=" ">
                          <div className="bg-[#49BBBD] text-white font-bold text-[22px] w-[64px] h-[64px] 2xl:text-[50px] 2xl:w-[126.26px] 2xl:h-[124px] rounded-[10px] flex items-center justify-center ">
                              {item.rate_prom}%
                          </div>
                        </div>
                    )}

                    {/* Contenu texte en bas */}
                    <div className=" pt-[28px]  ">
                        <h3 className="text-white font-bold text-[18px] leading-auto 2xl:text-[28px]  mb-2.25 line-clamp-1">
                        {item.title}
                        </h3>
                        <BlocksRenderer
                            content={item.description}
                            blocks={{
                                // Personnalisation optionnelle
                                paragraph: ({ children }) => <p className="  text-white text-[20px] leading-[180%] tracking-[2%] font-medium overflow-hidden ">{children}</p>,
                            }}
                        />
                    </div>
                </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PromoOffer