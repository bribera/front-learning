import React from 'react'
import { getStrapiMedia } from '../../config/api-config'
import { formatDistanceStrict } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';



const CardMarketing = ({ article, publishedAt }) => {
    const timeAgo = formatDistanceStrict(new Date(publishedAt), new Date(), {
    locale: enUS,
  });
  return (
    <div className='bg-white pl-[20.97px] pb-[34.75px] pt-[20px] pr-[20.19px] shadow-[0px_10px_60px_rgba(38,45,118,0.08)]'>
        <div className="">
            <div className="pb-[20.34px] h-full">
             <img src={getStrapiMedia(article.image.url)} alt="" className='w-full h-full'/>
            </div>
            <div className="pl-[7px]">
                <div className="flex justify-between pb-[20px]">
                    <div className="flex items-center">
                        <img src="/images/field.png" alt="" />
                        <p className="pl-[10px] xl:text-[10px] 3xl:text-[14px] text-[14px] font-medium tracking-[2%] leading-[180%] text-[#696984]">{article.Field}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="/images/clock.png" alt="" />
                        <p className="pl-[10px] xl:text-[10px] 3xl:text-[14px] text-[14px] font-medium tracking-[2%] leading-[180%] text-[#696984]">{timeAgo}</p>
                    </div>
                </div>
                <div className="">
                    <p className=" pb-[21px] font-medium text-[24px] xl:text-[text-18px] 3xl:text-[24px] text-[#252641]">{article.title}</p>
                    <p className="pb-[17px] 3xl:text-[18px] font-normal tracking-[2%] leading-[180%] text-[#696984]">{article.content}</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={getStrapiMedia(article.imageAuthor.url)} alt="" className='bg-[#D9D9D9] rounded-full w-[44.37px] h-[44.25px]' />
                            <p className="pl-[17.78px] font-medium text-[18px] tracking-[2%]">{article.author}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-[18px] xl:text-[10px] 3xl:text-[18px] text-light italic line-through">${article.priceDefault}</p>
                            <p className="pl-[14px] xl:pl-[7px] 3xl:pl-[14px] font-bold text-[24px] xl:text-[15px] 3xl:text-[24px] tracking-[2%] text-[#49BBBD]">$ {article.priceReviews}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardMarketing