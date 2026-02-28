
'use client'

const PAYMENT_METHODS = [
  { id: 'paypal', label: 'PayPal', image: "/images/paypal.svg" },
  { id: 'amex',   label: 'American Express', image: "/images/amex.svg" },
  { id: 'visa',   label: 'Visa', image: "/images/visa.svg" },
  { id: 'mastercard', label: 'Mastercard', image: "/images/mastercard.svg" },
]
const PaymentMethodSelector = ({selected, onChange}) => {
  return (
    <div className="flex flex-wrap gap-2 xl:gap-5">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method.id}
          type="button"
          title={method.label}
          onClick={() => onChange(method.id)}
          className={`
            flex items-center justify-center  rounded-[20px] border-1
            transition-all duration-200 
            ${selected === method.id
              ? 'border-[#49BBBD]  shadow-sm'
              : 'border-[#D9D9D9] bg-white hover:border-neutral-300'
            }
          `}
        >
            {/* <img src={method.image} alt="" /> */}
          <span className={`text-xs font-bold tracking-tight ${selected === method.id ? 'text-brand-700' : 'text-neutral-600'}`}>
            {method.id === 'paypal' && (
              <span className="flex items-center gap-0.5 pl-[26.85px] pr-[27.65px] py-[3.95px]">
                <img src={method.image} alt="" />
              </span>
            )}
            {method.id === 'visa' && (
              <span className="flex items-center gap-0.5">
                <img src={method.image} alt="" />
              </span>
            )}
            {method.id === 'amex' && (
              <span className="flex items-center gap-0.5">
                    <img src={method.image} alt="" />
                </span>
            )}
            {method.id === 'mastercard' && (
              <span className="flex items-center gap-0.5 pt-[27px] pb-[30px] pl-[56px] pr-[57px]">
                    <img src={method.image} alt="" className="w-[57px] h-[35px]" />
                </span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}

export default PaymentMethodSelector