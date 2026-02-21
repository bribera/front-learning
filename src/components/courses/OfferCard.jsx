import React from 'react'

const OfferCard = ({offer}) => {
  return (
    <div className='relative rounded-[20px]'>
        <div className="w-full h-full">
            <img src="/images/bg-offer.png" alt="" className="w-full h-full object-contain" />
        </div>
      <div className="absolute inset-0 rounded-[20px] bg-[#171B41]/50"></div>
      <div className="absolute inset-0 text-white  pl-[50px] pr-[51px] pt-[40px]">
        <div className="bg-[#FF0000]/60 w-[60px] h-[60px] xl:w-[100px] flex justify-center items-center xl:h-[100px] rounded-[12px]">
            <p className="text-[18px] 3xl:text-[24px] font-bold text-white">{offer.rate}</p>
        </div>
        <p className="pt-[29px] pb-[26px] text-[24px] 3xl:text-[32px] font-semibold">{offer.title}</p>
        <p className="text-[18px] 3xl:text-[24px] leading-[180%] tracking-[2%]">{offer.text}</p>
      </div>
    </div>
  )
}

export default OfferCard
