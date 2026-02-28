'use client'
import React, { useEffect, useState } from 'react'
import {usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { getStrapiMedia, optimizeCloudinaryUrl } from '../config/api-config'

const menu = [
    {
        link: "Home",
        path: "/",
    },
    {
        link: "Courses",
        path: "/courses",
    },
    {
        link: "Careers",
        path: "/careers",
    },
    {
        link: "Blog",
        path: "/blog",
    },
    {
        link: "About Us",
        path: "/about",
    },
]

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname()
    const router = useRouter()

    const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulated authentication state
    const [user, setUser] = useState(null); // Simulated user role (e.g., 'admin', 'teacher', 'student')
    
    const isHomePage = pathname === '/';

    // ✅ Lit le user depuis localStorage au montage (persistance entre pages)
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
        setIsAuthenticated(true)
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [])

    const headerClasses = isHomePage 
    ? 'absolute top-0 left-0 right-0 z-20 px-[20px] py-[20px] md:px-[40px] md:py-[40px] lg:px-[90px] xl:pl-[121px] xl:pr-[126px] xl:py-[30px] bg-transparent text-white'
    : 'absolute top-0 left-0 right-0 z-30 px-[20px] py-[20px] md:px-[40px] md:py-[40px] lg:px-[90px] xl:pl-[121px] xl:pr-[126px] bg-white text-[#5B5B5B]' 

 
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    }

    const handleLogout = async () => {
        // Simulate logout
        // await fetch('/api/auth/logout', { method: 'POST' })
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        document.cookie = 'token=; path=/; max-age=0'  // ✅ efface le cookie
        
        setIsAuthenticated(false)
        setUser(null)
        setIsUserMenuOpen(false)
        router.push('/')
        router.refresh()
    }

    // Menu user dropdown
    const userMenuItems = [
        { label: 'Profile', path: '/profile', icon: "👤" },
        { label: "My Courses", path: "/my-courses", icon: "📚" },
        { label: 'Settings', path: '/settings', icon: "⚙️" },
        { label: "Facturation", path: "/billing", icon: "💳" },
        ...(user?.role === 'admin' ? [{ label: 'Admin Dashboard', path: '/admin' }] : []),
        // { label: 'Logout', action: handleLogout }
    ];
  
    return (
    <header className={headerClasses}>
        <div className="">
            <div className='flex gap-x-[51px] xl:gap-0 justify-between items-center'>
                {/* logo */}
                <Link href="/" >
                    <div className="w-[64px] xl:w-[114px] xl:h-[83px]">
                        <img src={`${isHomePage ? "/images/logo.svg" : "/images/logo-white.png"}`} alt="Logo" className="object-contain w-full h-full" />
                    </div>
                </Link>
                {/*menu desktop */}
                <div className="flex justify-between gap-[81px]">
                    <ul className='hidden lg:flex justify-between items-center font-normal gap-10 xl:gap-[80px]'>
                        {menu.map((item, index) => (
                            <li key={index} className="text-[15px] xl:text-[22px] tracking-[2%] leading-auto font-normal">
                                <Link href={item.path} className={pathname === item.path ? `${isHomePage? "text-[#a3edf0]" : "text-[#30c2c7]"}` : `${isHomePage? "text-white" : "text-[#5B5B5B]"}  hover:text-[#00A8B1]`}>
                                    {item.link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* buttons desktop */}
                    <div className="hidden lg:flex items-center space-x-[26px]">
                    {!isAuthenticated ? (
                        // Buttons de connexion avec menu déroulant
                        <div className="flex items-center gap-4">
                            <Link href="/login">                   
                                <button className={`${isHomePage ? "bg-white text-[#5B5B5B]" : "bg-[#00A8B1] text-white"} font-medium text-[15px] xl:text-[22px] leading-auto tracking-[2%] px-10 py-3 xl:pt-[13px] xl:pb-[14px] xl:pl-[50px] xl:pr-[49px] hover:bg-[#00a8b1] rounded-[81px]`}>
                                Login
                                </button>
                            </Link>
                            <Link href="/register">                        
                                <button className={`${isHomePage ? "bg-[#FFFFFF]/30 text-white" : "bg-[#00A8B1]/30 text-black"} font-medium text-[15px] xl:text-[22px] leading-auto tracking-[2%] px-8 py-3 xl:pt-[12px] xl:pb-[15px] xl:pl-[39px] xl:pr-[34px] hover:bg-[#00a8b1]/30 rounded-[81px]`}>
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                        ) : (
                        // Menu utilisateur connecté
                        <div className="relative">
                            <button onClick={toggleUserMenu} className="flex items-center gap-2  text-[#5B5B5B] font-medium text-[16px] xl:text-[22px] leading-auto tracking-[2%] px-4 py-2 rounded-full hover:bg-[#00a8b1]">
                                <div className="w-12 h-12 xl:w-[w-[63px] xl:h-[63px] rounded-full overflow-hidden border-2 border-white/30">
                                    {
                                        user.avatar?.url ?
                                        (

                                            <img 
                                                src={optimizeCloudinaryUrl(getStrapiMedia(user.avatar?.url))} 
                                                alt={user.username}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://ui-avatars.com/api/?name=.../48x48/00a8b1/ffffff?text=" + user.username.charAt(0)
                                                }}
                                            />
                                        )
                                        :(
                                            <div className="w-full h-full bg-[#00a8b1] flex items-center justify-center">
                                                <p className={`${isHomePage ? "text-white" : "text-[#5B5B5B]"}  font-bold text-[18px]`}>
                                                    {user?.username?.charAt(0)?.toUpperCase()}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="text-left">
                                    <p className={`${isHomePage ? "text-white" : "text-black"}  font-medium text-[16px] xl:text-[18px]`}>{user.username}</p>
                                    {/* <p className="text-white/70 text-[12px] xl:text-[14px]">{user.email}</p> */}
                                </div>
                               
                                {isHomePage ? (
                                    <img src="/images/down.png" alt="" />
                                ) : (
                                    <img src="/images/down.png" alt="" />
                                )}
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-54 bg-white rounded-md shadow-lg py-2 z-20">
                                <div className="p-4 bg-gradient-to-r from-[#00a8b1] to-[#00CBB8]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                                                {
                                                    user.avatar?.url ?
                                                    (

                                                        <img 
                                                            src={optimizeCloudinaryUrl(getStrapiMedia(user.avatar?.url))} 
                                                            alt={user.username}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = "https://ui-avatars.com/api/?name=.../48x48/00a8b1/ffffff?text=" + user.username.charAt(0)
                                                            }}
                                                        />
                                                    )
                                                    :(
                                                        <div className="w-full h-full xl:w-auto xl:h-auto bg-[#00a8b1] flex items-center justify-center">
                                                            <p className="text-white font-bold text-[18px]">
                                                                {user?.username?.charAt(0)?.toUpperCase()}
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-[16px]">{user.username}</p>
                                                <p className="text-white/90 text-[13px]">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        {userMenuItems.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={item.path}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <span className="text-[20px]">{item.icon}</span>
                                                <span className="text-[#2F327D] font-medium text-[15px]">{item.label}</span>
                                            </Link>
                                        ))}
                                        
                                        <hr className="my-2 border-gray-200" />
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                                        >
                                            <span className="text-[20px]">🚪</span>
                                            <span className="text-red-600 font-medium text-[15px]">Déconnexion</span>
                                        </button>
                                        
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    </div>
                </div>

                {/* hamburger menu button */}
                <button className="lg:hidden" onClick={toggleMenu} aria-label='Toggle-meenu'>
                    <div className="w-6 h-6 relative">
                        <div className={`absolute top-0 left-0 w-full h-1  transition-all duration-300 ${isHomePage ? "bg-white": "bg-[#00A8B1]"} ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                        <div className={`absolute top-2 left-0 w-full h-1  transition-all duration-300 ${isHomePage ? "bg-white": "bg-[#00A8B1]"} ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`absolute top-4 left-0 w-full h-1  transition-all duration-300 ${isHomePage ? "bg-white": "bg-[#00A8B1]"} ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                    </div>
                </button>
            </div>
            {/* mobile and tablet menu */}
            {isMenuOpen && (
                <div className={`absolute top-full left-0 right-0 bg-[#252641] py-4 px-6 flex flex-col items-center gap-4 z-20  transition-transform duration-300 ${isMenuOpen ? 'translate-y-0 duration-700 ease-in-out delay-500' : '-translate-y-full duration-300 ease-in-out delay-700'}`}>
                   {/* Profil mobile (si connecté) */}
                   {
                    isAuthenticated && (
                        <div className="w-full pb-4 border-b border-white/20">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                                    {
                                        user.avatar?.url ?
                                        (

                                            <img 
                                                src={optimizeCloudinaryUrl(getStrapiMedia(user.avatar?.url))} 
                                                alt={user.username}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://ui-avatars.com/api/?name=.../48x48/00a8b1/ffffff?text=" + user.username.charAt(0)
                                                }}
                                            />
                                        )
                                        :(
                                            <div className="w-full h-full bg-[#00a8b1] flex items-center justify-center">
                                                <p className="text-white font-bold text-[18px]">
                                                    {user?.username?.charAt(0)?.toUpperCase()}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-[16px]">{user.username}</p>
                                    <p className="text-white/70 text-[13px]">{user.email}</p>
                                </div>
                            </div>
                            {/* Menu items mobile */}
                            {userMenuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.path}
                                    className="flex items-center gap-3 py-2 text-white/90 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{item.icon}</span>
                                    <span className="text-[15px]">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Menu de navigation */}
                    {menu.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`text-[18px] text-white font-medium tracking-[2%] leading-auto ${pathname === item.path ? "text-[#dbf9f7]" : "hover:text-[#dbf9f7]"}`}
                            onClick={() => setIsMenuOpen(false)} // Ferme le menu après la sélection
                        >
                            {item.link}
                        </Link>
                    ))}
                       
                    {/* Buttons mobile */}
                    {!isAuthenticated ? (
                        <div className="flex flex-col items-center space-y-4 mt-4">
                            <Link href='/login'>                         
                                <button className="bg-white text-[#5B5B5B] font-medium text-[18px] leading-auto tracking-[2%] px-10 py-3 hover:bg-[#00a8b1] rounded-[81px] w-full">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">                     
                                <button className="bg-[#FFFFFF]/30 font-medium text-white text-[18px] leading-auto tracking-[2%] px-8 py-3 hover:bg-[#00a8b1]/30 rounded-[81px] w-full">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    ):(
                        <button
                            onClick={handleLogout}
                            className="w-full mt-4 bg-red-500/20 text-red-400 font-medium text-[16px] px-6 py-3 hover:bg-red-500/30 rounded-[81px]"
                        >
                            🚪 Déconnexion
                        </button>
                    )}
                </div>
            )}
        </div>
        {/* Overlay pour fermer le dropdown en cliquant à l'extérieur */}
        {isUserMenuOpen && (
            <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsUserMenuOpen(false)}
            ></div>
        )}
    </header>
  )
}

export default Navbar
