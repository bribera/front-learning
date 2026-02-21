import React from 'react'

const Category = ({category}) => {
  return (
    <div>
        <div className="bg-white px-[32px] pb-[59px] flex flex-col items-center rounded-[20px] shadow-[0px_10px_60px_rgba(38,45,118,0.08)]">
           <div className={`${category.style} mt-[30px] flex items-center justify-center w-[90px] h-[90px] rounded-[4px]`}>
                <img src={category.image} alt="" />
            </div>  
            <p className="text-[24px] xl:text-[20px] 3xl:text-[30px] font-semibold tracking-[2%] pt-[20px]">{category.title}</p>
            <p className="text-center pt-[25px] text-[16px] 3xl:text-[18px] tracking-[2%] text-[#696984]">{category.description}</p>
        </div>
    </div>
  )
}

export default Category