'use client'
import { useState } from 'react'

const TAX    = 5


export default function OrderSummarysidebar ({items = []}) {

    const [articlesPaid] = useState(items)

  const subtotal = articlesPaid.reduce((acc, item) => acc + item.price, 0)
  const couponDiscount = articlesPaid.reduce((acc, item) => acc + (item.discount ?? 0), 0)
//    Subtotal après déduction des discounts
  const discountedSubtotal = subtotal - couponDiscount
  // TAX 5% appliquée sur le montant après discount
  const tax   = discountedSubtotal * (TAX/100)
   // Total final
  const total = discountedSubtotal + tax

  const fmt = (n) => `$${Number(n).toFixed(2)}`

  if (articlesPaid.length === 0) {
    return (
      <div className="bg-[#9DCCFF]/20 rounded-[20px] p-5 w-full">
        <h2 className=" text-[24px] mb-[50px] text-[#252641]">Summary</h2>
        <p className=" text-sm">
          Aucun article Marketing acheté pour le moment.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#9DCCFF]/20 rounded-[20px] pl-7.5 pr-9 w-full pb-[25px] pt-[30px]">

      {/* ── Title ── */}
      <h2 className="text-[#252641] text-[24px] mb-[50px]">
        Summary
      </h2>

      {/* ── Items ── */}
      <div>
        {articlesPaid.map((item, idx) => (
          <div key={item.id}>
            <div className="flex gap-[22px] items-start items-stretch">
              {/* Thumbnail */}
                <div className="w-[160px] h-[107px]">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full  rounded-[20px] object-cover"
                    />
                </div>
              {/* Info */}
              <div className="flex-1 h-full">
                <p className="text-black lowercase text-[18px] lg:text-[15px] xl:text-[18x] leading-[180%] tracking-[2%] mb-[2px] line-clamp-1">
                  {item.title}
                </p>
                <p className="text-[#5B5B5B] text-[18px] lg:text-[15px] xl:text-[18px] leading-[180%] tracking-[2%] line-clamp-2">
                  {item.description}
                </p>
                <p className="text-black text-[24px] xl:text-[24px] leading-[180%] tracking-[2%]">
                  {fmt(item.price)}
                </p>
              </div>
            </div>

            {/* Separator between items */}
            {idx < articlesPaid.length - 1 && (
              <div className="h-px bg-[#5B5B5B] my-[20px]" />
            )}
          </div>
        ))}
      </div>

      {/* Separator before totals */}
      <div className="h-px bg-[#5B5B5B] mt-5" />

      {/* ── Totals ── */}
      <Row label="Subtotal"        value={fmt(subtotal)} />
      <Row label="Coupon Discount" value={couponDiscount > 0 ? `-${fmt(couponDiscount)}` : '0'} />
      <Row label={`TAX`} value={`${TAX}`}  last />

      {/* Separator before Total */}
      <div className="h-px bg-[#5B5B5B]" />

      {/* ── Total ── */}
      <div className="flex items-center justify-between pt-3">
        <span className="text-black text-[20px] font-semibold leading-[180%] tracking-[2%]">Total</span>
        <span className="text-black text-[20px] font-semibold leading-[180%] tracking-[2%]">{fmt(total)}</span>
      </div>

    </div>
  )
}

function Row({ label, value, last }) {
  return (
    <div className={`flex items-center justify-between py-[11px] ${!last ? 'border-b border-[#5B5B5B]' : ''}`}>
      <span className="text-[#5B5B5B] text-[20px] font-semibold leading-[180%] tracking-[2%]">{label}</span>
      <span className="text-[#5B5B5B] text-[20px] font-semibold leading-[180%] tracking-[2%]">{value}</span>
    </div>
  )
}
