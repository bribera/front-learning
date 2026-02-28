import React from 'react'
import { getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'

const CreatorCard = ({ creator }) => {
  return (
   <div className="h-[441px] relative overflow-hidden  flex flex-col items-center ">
      
      {/* Photo */}
      <div className="  w-[278px] h-[277px] bg-transparent overflow-hidden">
        <img
          src={optimizeCloudinaryUrl(getStrapiMedia(creator.avatar.url))}
          alt={creator.name}
          className="w-full h-full object-cover object-top"
        />
      </div>


      {/* Bloc bleu description */}
      <div className="absolute h-[330px] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.25)] bottom-0  px-[14px] py-[12px] 2xl:px-[69px] 2xl:pb-[30px] 2xl:pt-[161px] flex flex-col">
        {/* Nom */}
        <p className="text-center text-[#252641] pt-[21px] font-semibold text-[16px]">
            {creator.name}
        </p>
        <p className="text-[#696984] text-[13px] 2xl:text-[18px] leading-[180%] tracking-[2%] pt-[22px]">
          {creator.description}
        </p>
      </div>

    </div>

  )
}

export default CreatorCard
