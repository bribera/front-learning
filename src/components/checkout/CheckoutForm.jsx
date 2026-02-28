'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PaymentMethodSelector from './PaymentMethodSelector'


const schema = z.object({
  cardName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, 'Le numéro de carte doit contenir entre 13 et 19 chiffres'),
  expirationDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, 'Format invalide (MM/YY)'),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, 'Le CVC doit contenir 3 ou 4 chiffres'),
  saveInfo: z.boolean().optional(),
  paymentMethod: z.enum(['paypal', 'amex', 'visa', 'mastercard']),
})

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="text-xs text-red-500 mt-1">{msg}</p>
}




const CheckoutForm = ({ onSubmit, isLoading}) => {

    const [paymentMethod, setPaymentMethod] = useState('visa')

    const {register, handleSubmit, setValue, formState: {errors},} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            paymentMethod: 'visa',
            saveInfo: false,
        },
        mode: 'onBlur',
    })

    const handleFormSubmit = async (data) => {
        await onSubmit({...data, paymentMethod})
    }

    const handlePaymentChange = (method) => {
        setPaymentMethod(method)
        setValue('paymentMethod', method)
    }

  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleFormSubmit)}
        className='card'
        >
            <div className="">
                <h1 className="text-[26px] xl:text-[36px] font-semibold text-[#252641] mb-2">Checkout</h1>
                <p className="text-[15px] xl:text-[18px] font-semibold text-[#5B5B5B] mb-2">Cart Type</p>

            </div>
            {/* Payment method */}
            <div className='pb-[84.6px]'>
                <PaymentMethodSelector selected={paymentMethod} onChange={handlePaymentChange} />
            </div>
            <div className="flex flex-col">
                {/* Name on the Card */}
                <div className="pt-[30px]">
                    <label htmlFor='cardName' className="text-[15px] xl:text-[18px] font-semibold text-[#5B5B5B]" >Name on Card</label>
                    <input {...register('cardName')} placeholder="Enter name on the Card" className="input-field mt-2.5" />
                    <FieldError msg={errors.cardName?.message} />
                </div>
                {/* Number Card */}
                <div className="pt-[30px]">
                    <label htmlFor='cardNumber' className="text-[15px] xl:text-[18px] font-semibold text-[#5B5B5B]">Card Number</label>
                    <input {...register('cardNumber')} placeholder="Enter Card Number" className="input-field mt-2.5" />
                    <FieldError msg={errors.cardNumber?.message} />
                </div>
                {/* expiration and cvc */}
                <div className="pt-[30px] pb-[10px] grid grid-cols-2 gap-[36px] ">
                    <div className="">
                        <label htmlFor='expirationDate' className="text-[15px] xl:text-[18px] font-semibold text-[#5B5B5B]">Expiration Date (MM/YY)</label>
                        <input {...register('expirationDate')} placeholder="Enter Expiration Date" className="input-field mt-2.5" />
                        <FieldError msg={errors.expirationDate?.message} />
                    </div>
                    <div className="">
                        <label htmlFor='cvc' className="text-[15px] xl:text-[18px] font-semibold text-[#5B5B5B] ">CVC</label>
                        <input {...register('cvc')} placeholder="Enter CVC" type='password' className="input-field mt-2.5" />
                        <FieldError msg={errors.cvc?.message} />
                    </div>
                </div>
            </div>
            <div className="">
                <input type="checkbox" name="" id="saveInfo" {...register('saveInfo')}/>
                <label htmlFor="" className='text-[#9D9B9B] xl:text-[18px] pl-[7px]'>Save my information for faster checkout</label>
            </div>
            <div className="mt-[50px]">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#49BBBD] text-white rounded-[12px] w-full flex items-center justify-center text-center text-[18px] xl:text-[26px] pt-[14px] pb-[19px]"
                >
                    {isLoading ? (
                    <>
                        Traitement en cours...
                    </>
                    ) : (
                    <> Confirm Payment</>
                    )}
                </button>
            </div>
      </form>
    </div>
  )
} 

export default CheckoutForm
