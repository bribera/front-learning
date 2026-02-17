import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#252641] pt-[74px] pb-[40px] flex flex-col items-center justify-center gap-4 py-8 text-center text-sm text-gray-500 mx-auto px-10 lg:px-auto'>
      <div className="flex items-center pb-[95px]">
        <div className="w-[110px] h-[83px] flex items-center justify-center">
            <img src="/images/logo.svg" alt="" />
        </div>
        <div className="ml-[77px] mr-[41px] border-r-[3px] border-[#626381] h-[83px]"></div>
        <p className="w-[40.21%] text-start h-[56px] font-semibold text-[16px] md:text-[22px] tracking-[4px] text-white">Virtual Class for Zoom</p>
      </div>
      <div className="">
        <p className="text-[#B2B3CF] text-[18px] md:text-[26px] font-medium tracking-[4px]">Subscribe to get our Newsletter</p>
        <div className="flex items-center justify-center mt-5 gap-5">
          <input type="email" placeholder="Your Email" className="bg-none text-[#83839A] text-[20px] placeholder:text-[20px] placeholder:text-[#83839A] px-[30px] py-[15px] rounded-[80px] focus:outline-none w-[350px] md:w-[400px] h-[60px] border border-[#83839A]" />
          <button className="bg-[#49BBBD] text-white font-medium text-[22px] px-[34px] pt-[14px] pb-[13px] rounded-[60px] hover:bg-[#00a89c]">Subscribe</button>
        </div>
      </div>
      <div className="pt-[96px]">
        <ul className='flex items-center gap-[40px] text-[#B2B3CF] text-[16px] md:text-[22px] hover:text-white tracking-[4%] font-normal'>
            <li className="inline-block mx-4  cursor-pointer">
                <Link href="/careers">Careers</Link>
            </li>
            <li className="inline-block mx-4  cursor-pointer">
                <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="inline-block mx-4  cursor-pointer">
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </li>
        </ul>
      </div>
      <div className="pt-5">
        <p className="text-[#B2B3CF] text-[16px] md:text-[22px] tracking-[4px]">© 2021 Class Technologies Inc.</p>
      </div>
    </div>
  )
}

export default Footer
