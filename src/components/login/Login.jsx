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
    <div className="flex flex-col gap-[12px]">
      {label && <label className="text-black text-[16px] ">{label}</label>}
      <div className="relative">
        <input
          type={isPwd ? (showPwd ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-[16px] py-[12px] rounded-[40px] text-[14px] text-[#252641] placeholder:font-light placeholder:text-[15px] outline-none border transition-all duration-200 placeholder:text-[#ACACAC]
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

// ─── Login Page ───────────────────────────────────────────────

const Login = () => {
    const router = useRouter()
    const [form, setForm] = useState({ username: '', password: '', remember: false })
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')
    const [loading, setLoading] = useState(false)

    // const validate = () => {
    //     const e = {}
    //     if (!form.email) e.email = 'Email is required'
    //     else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    //     if (!form.password) e.password = 'Password is required'
    //     setErrors(e)
    //     return !Object.keys(e).length
    // }

    // ── Validation ──
    const validate = () => {
        const e = {}
        if (!form.username) e.username = 'Username is required'  // ✅ plus d'email
        if (!form.password) e.password = 'Password is required'
        setErrors(e)
        return !Object.keys(e).length
    }

     const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        setApiError('')
        try {
            const data = await fetchUrl('/auth/local', {
                method: 'POST',
                body: JSON.stringify({ 
                    // identifier: form.email,
                    identifier: form.username, 
                    password: form.password }),
            })

            const storage = form.remember ? localStorage : sessionStorage
            storage.setItem('token', data.jwt)
            storage.setItem('user', JSON.stringify(data.user))
            document.cookie = `token=${data.jwt}; path=/; max-age=${form.remember ? 2592000 : ''}`

            router.push('/')
        } catch (err) {
        setApiError(err.message)
        } finally {
        setLoading(false)
        }
    }

  return (
    <div className='min-h-screen flex items-center gap-[111px] pt-[38px] pl-[41px] pb-[37px] pr-[97px]'>
      <div className="hidden lg:block flex-1 h-full">
        <img src="/images/login.png" alt="" className='w-full h-full' />
      </div>
      <div className="flex-1">
        {/* ── Formulaire ── */}
        <div className="pb-[24px]">
            <p className="text-[16px] text-black text-center">Welcome to lorem..!</p>
        </div>
        <div className="flex-1 flex flex-col px-[44px]">

          {/* Tabs */}
          <div className="flex justify-center mb-[52px]">
            <div className="flex bg-[#49BBBD]/60 rounded-[33px] pt-[10px] pb-[9px] pr-[12px] pl-[13px]  gap-[45px]">
              <div className="px-[52px] py-[8px] rounded-[26px] text-[16px] font-medium bg-[#49BBBD] text-white shadow-sm">
                Login
              </div>
              <Link
                href="/register"
                className="px-[28px] py-[9px] rounded-[26px] text-[16px] text-white hover:text-[#252641] transition-colors"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Titre */}
          <div className="text-start mb-[42px]">
            {/* <h1 className="text-[#252641] font-bold text-[20px] mb-[8px]">
              Welcome back !
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
          <form onSubmit={handleSubmit} noValidate className="flex flex-col w-full">
            {/* <Input
              label="Email adress"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              error={errors.email}
            /> */}
            <div className="flex flex-col gap-[30px]">
                <Input
                    label="User name"
                    type="text"                          // ← plus "email"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    placeholder="Enter your User name"
                    error={errors.username}
                />
                <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                error={errors.password}
                />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between pt-[22px]">
              <label className="flex items-center gap-[7px] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm({ ...form, remember: e.target.checked })}
                  className="w-[15px] h-[15px] accent-[#49BBBD] cursor-pointer"
                />
                <span className="text-[#696984] text-[12px]">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-black text-[12px] font-light hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Bouton */}
            <div className="w-full flex justify-end items-end">
                <button
                type="submit"
                disabled={loading}
                className="w-fit pl-[94px] pr-[95px] pt-[13px] pb-[12px] flex justify-center mt-[62px] bg-[#49BBBD] text-white py-[13px] rounded-[36px] text-[15px] hover:bg-[#3aa9ab] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed "
                >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Logging in...
                    </span>
                ) : 'Login'}
                </button>
            </div>

            {/* <p className="text-center text-[12px] text-[#696984] mt-[2px]">
              No account?{' '}
              <Link href="/register" className="text-[#49BBBD] font-semibold hover:underline">
                Register
              </Link>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
