'use client'
import React from 'react'
import { getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'
import Link from 'next/link';

const CardCourses = ({course}) => {


    const progress = Math.round((course.currentLesson / course.totalLessons) * 100);
 
  return (
    <Link href={`/courses/${course.slug}`}>    
      <div className='pr-[21px] pl-[20.73px] pt-[19.6px] pb-[12px] bg-white rounded-[20px] shadow-[0px_10px_60px_rgba(38,45,118,0.08)]'>
        <div className=" pb-[12.03px]">
          <img src={optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))} className=''/>
        </div>
        <div className="">
          <p className="text-[#252641] text-[18px] xl:text-[24px] font-medium leading-[180%]">{course.title}</p>
          <div className="mt-[10px] flex items-center">
              <img src={optimizeCloudinaryUrl(getStrapiMedia(course.instructor?.avatar.url))} alt="" className='bg-[#D9D9D9] w-[42px] h-[42px] rounded-full'/>
              <p className=" pl-[15px] text-[18px] text-black font-medium tracking-[2%]">{course.instructor?.name}</p>
          </div>
            {/* Barre de progression */}
          <div className="mt-[25px] bg-[#D9D9D9] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-[#49BBBD] rounded-[2px] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="pt-[12px] text-xs xl:text-[14px] tracking-[2%] font-semibold text-black/50 text-right">
            Lesson {course.currentLesson} of {course.totalLessons}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CardCourses
