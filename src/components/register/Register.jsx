'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { fetchUrl } from '../../config/api-config'


// ─── Input ────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, error }) {
  const [showPwd, setShowPwd] = useState(false)
  const isPwd = type === 'password'

  return (
    <div className="flex flex-col gap-[6px]">
      {label && <label className="text-black text-[16px]">{label}</label>}
      <div className="relative">
        <input
          type={isPwd ? (showPwd ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-[16px] py-[12px] rounded-[40px] text-[14px] text-[#252641] outline-none border transition-all duration-200 placeholder:text-[#83839A]/50
            ${error
              ? 'border-red-400 bg-red-50'
              : 'border-[#49BBBD] bg-white focus:border-[#49BBBD] focus:shadow-[0_0_0_3px_rgba(73,187,189,0.1)]'
            }`}
        />
        {isPwd && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#83839A] hover:text-[#49BBBD] transition-colors"
          >
            {showPwd ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-[11px]">{error}</p>}
    </div>
  )
}

// ─── Register Page ────────────────────────────────────────────
const Register = () => {

    const router = useRouter()
    const [form, setForm] = useState({ email: '', username: '', password: '' })
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')
    const [loading, setLoading] = useState(false)

    // const validate = () => {
    //     const e = {}
    //     if (!form.email) e.email = 'Email is required'
    //     else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    //     if (!form.firstName) e.firstName = 'Required'
    //     if (!form.lastName) e.lastName = 'Required'
    //     if (!form.password) e.password = 'Password is required'
    //     else if (form.password.length < 6) e.password = 'Min 6 characters'
    //     setErrors(e)
    //     return !Object.keys(e).length
    // }


    const validate = () => {
        const e = {}
        if (!form.email) e.email = 'Email is required'
            else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
            if (!form.username) e.username = 'Username is required'
            if (!form.password) e.password = 'Password is required'
            else if (form.password.length < 6) e.password = 'Min 6 characters'
            setErrors(e)
            return !Object.keys(e).length
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        setApiError('')
        try {
            const data = await fetchUrl('/auth/local/register', {
            method: 'POST',
            body: JSON.stringify({
                username: form.username,  // ✅ direct, plus de firstName+lastName
                email: form.email,
                password: form.password,
            }),
            })
            localStorage.setItem('token', data.jwt)
            localStorage.setItem('user', JSON.stringify(data.user))
            document.cookie = `token=${data.jwt}; path=/; max-age=2592000`
            router.push('/')
        } catch (err) {
            setApiError(err.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div>
       <div className="min-h-screen flex items-center justify-center gap-[117px] pl-[41px] pr-[97px] px-4">
            {/* <div className="w-full  shadow-[0px_10px_60px_rgba(38,45,118,0.1)] flex"> */}

                {/* ── Image gauche ── */}
                <div className=" hidden lg:block flex-1 h-full">
                    <img
                        src="/images/register.png"
                        alt="Learning is simply"
                        className="w-full h-full object-cover object-center"
                    />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#252641]/65 via-transparent to-transparent" />
                <div className="absolute bottom-[36px] left-[32px] right-[32px]">
                    <p className="text-white font-bold text-[26px] leading-[1.3]">
                    Learning is <span className="text-[#49BBBD]">simply</span>
                    </p>
                </div> */}
                </div>

                {/* ── Formulaire ── */}
                <div className="flex-1 flex flex-col justify-center px-[44px] py-[44px]">
                    <div className="pb-[24px]">
                        <p className="text-[16px] text-black text-center">Welcome to lorem..!</p>
                    </div>
                    {/* Tabs */}
                    <div className="flex justify-center mb-[53px]">
                        <div className="flex bg-[#49BBBD]/60 gap-[45px] rounded-[30px] p-[4px]">
                            <Link
                                href="/login"
                                className="px-[28px] py-[9px] rounded-[26px] text-[14px] font-semibold text-white hover:text-[#252641] transition-colors"
                            >
                                Login
                            </Link>
                            <div className="px-[52px] py-[8px] rounded-[26px] text-[14px] font-semibold bg-[#49BBBD] text-white shadow-sm">
                                Register
                            </div>
                        </div>
                    </div>

                    {/* Titre */}
                    <div className=" mb-[32px]">
                        {/* <h1 className="text-[#252641] font-bold text-[20px] mb-[8px]">
                        Register to join !
                        </h1> */}
                        <p className="text-[#5B5B5B] text-[16px]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.                    
                        </p>
                    </div>

                    {/* Erreur API */}
                    {apiError && (
                        <div className="bg-red-50 border border-red-200 rounded-[8px] px-[14px] py-[10px] mb-[14px] text-red-600 text-[12px]">
                        ⚠️ {apiError}
                        </div>
                    )}

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[14px]">
                        <div className="flex flex-col gap-[30px]">
                            <Input
                            label="Email address"
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="Enter your email"
                            error={errors.email}
                            />
                            <Input
                                label="User name"
                                type="text"                          // ← plus "email"
                                value={form.username}
                                onChange={e => setForm({ ...form, username: e.target.value })}
                                placeholder="Enter your User name"
                                error={errors.username}
                            />
                            {/* <div className="grid grid-cols-2 gap-[10px]">
                                <Input
                                    label="First name"
                                    value={form.firstName}
                                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                                    placeholder="First name"
                                    error={errors.firstName}
                                />
                                <Input
                                    label="Last name"
                                    value={form.lastName}
                                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                                    placeholder="Last name"
                                    error={errors.lastName}
                                />
                            </div> */}
                            <Input
                            label="Password"
                            type="password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            placeholder="Create a password (min 6 chars)"
                            error={errors.password}
                            />
                        </div>

                        <div className="flex justify-end items-end">                     
                            {/* Bouton */}
                            <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#49BBBD] text-white font-bold py-[13px] rounded-[8px] text-[15px] hover:bg-[#3aa9ab] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-[4px]"
                            >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                Creating account...
                                </span>
                            ) : 'Register'}
                            </button>
                        </div>

                        <p className="text-center text-[12px] text-[#696984] mt-[2px]">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#49BBBD] font-semibold hover:underline">
                            Login
                        </Link>
                        </p>
                    </form>
                </div>
            {/* </div> */}
        </div>
    </div>
  )
}

export default Register
