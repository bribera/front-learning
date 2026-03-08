
const OfferCard = ({offer}) => {
  return (
    <div className='relative h-[350px] 3xl:h-[481px] rounded-[20px]'>
        <div className=" w-full h-full">
            <img src="/images/bg-offer.png" alt="" className="w-full h-full object-center object-" />
        </div>
      <div className="absolute inset-0 rounded-[20px] bg-[#171B41]/50"></div>
      <div className="absolute inset-0 text-white px-[25px]  3xl:pl-[50px] 3xl:pr-[51px] pt-[40px]">
        <div className="bg-[#FF0000]/60 w-[60px] h-[60px] 3xl:w-[100px] 3xl:h-[100px] flex justify-center items-center rounded-[12px]">
            <p className="text-[16px] 3xl:text-[24px] font-bold text-white">{offer.rate}</p>
        </div>
        <p className="3xl:pt-[29px] py-[18px] 3xl:pb-[26px] text-[20px] 3xl:text-[32px] font-semibold">{offer.title}</p>
        <p className="text-[16px] 3xl:text-[24px] leading-[180%] tracking-[2%]">{offer.text}</p>
      </div>
    </div>
  )
}

export default OfferCard
