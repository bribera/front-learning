'use client'
// hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { fetchUrl } from '../config/api-config'


const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const AuthContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token')
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user')

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))

      // Rafraîchit le profil depuis Strapi
      fetch(`${STRAPI_URL}/api/users/me?populate=*`, {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then(res => res.json())
        .then(userData => {
          if (!userData?.error) {
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
          }
        })
        .catch(console.error)
    }
    setLoading(false)
  }, [])

  const login = async (email, password, remember = false) => {
   const data = await fetchUrl(`/auth/local`, { 
      method: 'POST',
      body: JSON.stringify({ identifier: email, password }),
    })

    setToken(data.jwt); setUser(data.user)
    const s = remember ? localStorage : sessionStorage
    s.setItem('token', data.jwt); s.setItem('user', JSON.stringify(data.user))
    document.cookie = `token=${data.jwt}; path=/; max-age=${remember ? 2592000 : ''}`
    return data
  }

  const register = async (username, email, password) => {
    const data = await fetchUrl(`/auth/local/register`, { 
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    })
    setToken(data.jwt); setUser(data.user)
    localStorage.setItem('token', data.jwt); localStorage.setItem('user', JSON.stringify(data.user))
    document.cookie = `token=${data.jwt}; path=/; max-age=2592000`
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    document.cookie = 'token=; path=/; max-age=0'
  }

  const authFetch = async (url, options = {}) => {
    const res = await fetch(`${STRAPI_URL}/api${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...options.headers },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error?.message || 'Request failed')
    return data
  }

  // ✅ Fetch profil user connecté
  const fetchCurrentUser = async () => {
    const savedToken = token || localStorage.getItem('token')
    if (!savedToken) return null
    const res = await fetch(`${STRAPI_URL}/api/users/me?populate=*`, {
      headers: { Authorization: `Bearer ${savedToken}` }
    })
    const userData = await res.json()
    if (!userData?.error) {
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    }
    return userData
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!token,
      login,
      register,
      logout,
      authFetch,
      fetchCurrentUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// ─── HOC Route protégée ───────────────────────────────────────
export function withAuth(Component) {
  return function Protected(props) {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()
    useEffect(() => {
      if (!loading && !isAuthenticated) router.push('/login')
    }, [isAuthenticated, loading])
    if (loading) return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#49BBBD] border-t-transparent rounded-full animate-spin" />
      </div>
    )
    if (!isAuthenticated) return null
    return <Component {...props} />
  }
}
