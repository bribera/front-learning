'use client'
import React, { useState } from 'react'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl, timeAgo, } from '../../config/api-config'
import qs from 'qs'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import OnlineTab from './Onligne';

    function StarIcon({ filled, size = 16 }) {
        return (
            <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "#f59e0b" : "none"}
            stroke={filled ? "#f59e0b" : "#d1d5db"}
            strokeWidth="2"
            >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        );
    }

    function StarRating({ rating, size = 16 }) {
        return (
            <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} filled={s <= rating} size={size} />
            ))}
            </div>
        );
    }

    function formatReviewDate(dateStr) {
        if (!dateStr) return ''
        const date = new Date(dateStr)
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    // ── Calcul note moyenne ───────────────────────────────────────────────────────
    function computeAverage(reviews) {
        if (!reviews.length) return 0
        const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0)
        return Math.round(sum / reviews.length)
    }

const Reviews = ( {reviews: reviewList = [], course }) => {

    const tabs = ["Overview", "Curriculum", "Instructors", "Online", "Reviews" ]
    const REVIEWS_TAB_INDEX = tabs.length - 1  // = 4
    
    const [activeTab, setActiveTab] = useState(0)
    // activeTab === REVIEWS_TAB_INDEX
    
    const displayReviews = (reviewList.length > 0 ? reviewList : STATIC_REVIEWS).slice(0, 2)
    
    const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
        stars: star,
        count: displayReviews.filter((r) => r.rating === star).length || 0,
    }))

    const maxCount = Math.max(...ratingBreakdown.map((r) => r.count));
  const averageRating = computeAverage(displayReviews)

  return (
    <div>
        <div className="w-full ">
        {/* Tabs */}
        <div className="flex flex-wrap gap-[25px] 3xl:gap-[50px] mb-[83px]">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-[20px] 3xl:px-[50px] pt-[17px] pb-[16px] rounded-[12px] text-[14px] xl:text-[20px] font-bold  ${
                activeTab === i
                  ? "bg-[#49BBBD] text-white shadow-md"
                  : "bg-black/10 text-black/50  hover:border-teal-300 hover:text-teal-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Card */}
        {/* online */}
          {activeTab === 3 && <OnlineTab course={course} />}
        {/* reviews */}
        {
            activeTab === REVIEWS_TAB_INDEX && (
                <div className="bg-[#9DCCFF]/30 rounded-2xl pt-[50px] pl-[47.35px] pr-[50px] pb-[53px] w-full">
                {/* Rating Summary */}
                <div className="flex gap-8 mb-8 ">
                    {/* Score */}
                    <div className="flex flex-col bg-white items-center justify-center min-w-[100px]">
                        <div className="text-black/50 text-[30px] mb-[28px] font-semibold px-[48px] tracking-[2%]">
                            <span className="">{averageRating}</span>
                            <span className=" mb-1"> out of 5</span>
                        </div>
                        <StarRating rating={averageRating} size={14} />
                        <span className="text-[20px] tracking-[2%] text-black/50 mt-[28px]">Top Rating</span>
                    </div>

                    {/* Bars */}
                    <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    {ratingBreakdown.map(({ stars, count }) => (
                        <div key={stars} className="flex items-center gap-[45px]">
                            <div className="text-[20px] tracking-[2%] flex text-black/50  text-right">
                               <p>{stars}<span> Stars</span></p>  
                            </div>
                            <div className="flex-1 h-2 bg-[#D9D9D9] rounded-[2px] overflow-hidden">
                                <div
                                className="h-full rounded-full bg-[#49BBBD] transition-all duration-700"
                                style={{ width: `${(count / maxCount) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="bg-[#9DCCFF]/30 rounded-[20px]  pl-[47.35px] pr-[50px]" />

                {/* Reviews */}
                <div className="flex flex-col gap-5">
                    {displayReviews.map((review) => (
                        <div key={review.id} className="flex flex-col pt-[24px]">
                            <div className="flex gap-[9.81px] items-center pb-[23.16px]">                         
                                <img
                                src={optimizeCloudinaryUrl(getStrapiMedia(review.avatar.url))}
                                alt={review.name}
                                className="w-[70.84px] h-[70.84px] bg-[#D9D9D9] rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="font-medium text-[18px] text-black">
                                        {review.name}
                                        </span>
                                        <div className="flex items-center">
                                            <img src="/images/clock.png" alt="" />
                                            <span className="pl-[10px] text-[14px] tracking-[2%] font-medium text-[#696984]">{timeAgo(review.date)}</span>
                                        </div>
                                    </div>
                                    <StarRating rating={review.rating} size={13} />
                                </div>
                            </div>
                            <BlocksRenderer
                                content={review.text}
                                blocks={{
                                    // Personnalisation optionnelle
                                    paragraph: ({ children }) => <p className=" pt-[24px] text-[#696984] text-[20px] leading-[180%] tracking-[2%] line-clamp-2 overflow-hidden ">{children}</p>,
                                }}
                            />
                        </div>
                    ))}
                </div>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default Reviews