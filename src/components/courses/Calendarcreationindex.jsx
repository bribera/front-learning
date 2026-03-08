'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchUrl, getStrapiMedia, optimizeCloudinaryUrl } from '../../config/api-config'

// ── Icônes ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
)
const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
)
const PlusIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
)
const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
)
const UsersIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
)
const GridIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
)
const ListIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
)

// ── Badge statut ──────────────────────────────────────────────────────────────
const StatusBadge = ({ hasEvents }) => (
    <span className={`text-[10px] font-semibold px-[8px] py-[3px] rounded-full ${
        hasEvents
            ? 'bg-[#49BBBD]/10 text-[#49BBBD]'
            : 'bg-[#F5A623]/10 text-[#F5A623]'
    }`}>
        {hasEvents ? 'Planifié' : 'Non planifié'}
    </span>
)

// ── Card cours (vue grille) ───────────────────────────────────────────────────
const CourseCard = ({ course, onCreateEvent }) => {
    const thumbnail = course?.thumbnail?.url
        ? optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))
        : null
    const lessonsCount = course?.lessons?.length || 0
    const hasEvents = lessonsCount > 0

    return (
        <div className="bg-white rounded-[16px] overflow-hidden shadow-[0px_2px_16px_rgba(38,45,118,0.06)] hover:shadow-[0px_8px_30px_rgba(38,45,118,0.12)] transition-all duration-300 group">

            {/* Thumbnail */}
            <div className="relative h-[140px] overflow-hidden bg-[#9DCCFF]/20">
                {thumbnail ? (
                    <img src={thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#49BBBD]/20 to-[#2F327D]/20">
                        <CalendarIcon />
                    </div>
                )}
                <div className="absolute top-[10px] right-[10px]">
                    <StatusBadge hasEvents={hasEvents} />
                </div>
            </div>

            {/* Contenu */}
            <div className="p-[16px]">
                <h3 className="text-[13px] font-bold text-[#252641] line-clamp-2 mb-[8px] leading-[140%]">
                    {course.title}
                </h3>

                <div className="flex items-center gap-[12px] mb-[14px]">
                    <div className="flex items-center gap-[4px] text-[#696984]">
                        <ClockIcon />
                        <span className="text-[10px]">{course.duration || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-[4px] text-[#696984]">
                        <UsersIcon />
                        <span className="text-[10px]">{lessonsCount} lesson{lessonsCount > 1 ? 's' : ''}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-[8px]">
                    <button
                        onClick={() => onCreateEvent(course)}
                        className="flex-1 flex items-center justify-center gap-[5px] bg-[#49BBBD] text-white text-[11px] font-bold py-[8px] rounded-[8px] hover:bg-[#49BBBD]/90 transition-colors shadow-[0px_4px_12px_rgba(73,187,189,0.25)]"
                    >
                        <PlusIcon />
                        Créer un événement
                    </button>
                    <button
                        onClick={() => onCreateEvent(course)}
                        className="w-[34px] h-[34px] flex items-center justify-center border border-[#E8E8F0] rounded-[8px] hover:bg-[#F5F7FF] transition-colors"
                    >
                        <CalendarIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Row cours (vue liste) ─────────────────────────────────────────────────────
const CourseRow = ({ course, onCreateEvent }) => {
    const thumbnail = course?.thumbnail?.url
        ? optimizeCloudinaryUrl(getStrapiMedia(course.thumbnail.url))
        : null
    const lessonsCount = course?.lessons?.length || 0
    const hasEvents = lessonsCount > 0

    return (
        <div className="bg-white rounded-[12px] px-[16px] py-[14px] flex items-center gap-[14px] shadow-[0px_2px_8px_rgba(38,45,118,0.05)] hover:shadow-[0px_4px_16px_rgba(38,45,118,0.10)] transition-all duration-200">

            {/* Thumbnail */}
            <div className="w-[56px] h-[56px] rounded-[10px] overflow-hidden flex-shrink-0 bg-[#9DCCFF]/20">
                {thumbnail ? (
                    <img src={thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#49BBBD]/20 to-[#2F327D]/20">
                        <CalendarIcon />
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[8px] mb-[3px]">
                    <h3 className="text-[13px] font-bold text-[#252641] truncate">{course.title}</h3>
                    <StatusBadge hasEvents={hasEvents} />
                </div>
                <div className="flex items-center gap-[12px]">
                    <div className="flex items-center gap-[4px] text-[#696984]">
                        <ClockIcon />
                        <span className="text-[10px]">{course.duration || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-[4px] text-[#696984]">
                        <UsersIcon />
                        <span className="text-[10px]">{lessonsCount} lesson{lessonsCount > 1 ? 's' : ''}</span>
                    </div>
                    {course.level && (
                        <span className="text-[10px] text-[#696984] capitalize">{course.level}</span>
                    )}
                </div>
            </div>

            {/* Prix */}
            <div className="text-right flex-shrink-0">
                <p className="text-[13px] font-bold text-[#252641]">
                    {course.priceSale ? `$${course.priceSale}` : course.price ? `$${course.price}` : 'Gratuit'}
                </p>
            </div>

            {/* Bouton */}
            <button
                onClick={() => onCreateEvent(course)}
                className="flex items-center gap-[5px] bg-[#49BBBD] text-white text-[11px] font-bold px-[14px] py-[8px] rounded-[8px] hover:bg-[#49BBBD]/90 transition-colors shadow-[0px_4px_12px_rgba(73,187,189,0.20)] flex-shrink-0"
            >
                <PlusIcon />
                Créer
            </button>
        </div>
    )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function CalendarCreateIndex() {
    const router = useRouter()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all') // all | planned | unplanned
    const [viewMode, setViewMode] = useState('grid') // grid | list
    const [page, setPage] = useState(1)
    const PER_PAGE = 9

    // ── Fetch tous les cours ──────────────────────────────────────────────────
    useEffect(() => {
        fetchUrl(`/courses?populate[thumbnail]=true&populate[lessons]=true&pagination[limit]=100&sort=createdAt:desc`)
            .then(data => setCourses(data.data || []))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    // ── Filtres ───────────────────────────────────────────────────────────────
    const filtered = courses.filter(c => {
        const matchSearch = c.title?.toLowerCase().includes(search.toLowerCase())
        const hasEvents = (c.lessons?.length || 0) > 0
        const matchFilter =
            filter === 'all' ? true :
            filter === 'planned' ? hasEvents :
            !hasEvents
        return matchSearch && matchFilter
    })

    const totalPages = Math.ceil(filtered.length / PER_PAGE)
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    const handleCreateEvent = (course) => {
        router.push(`/courses/calendar/create/create1?courseId=${course.documentId}`)
    }

    const counts = {
        all: courses.length,
        planned: courses.filter(c => (c.lessons?.length || 0) > 0).length,
        unplanned: courses.filter(c => (c.lessons?.length || 0) === 0).length,
    }

    return (
        <div className="min-h-screen pt-[143px] bg-[#F5F7FF]">

            {/* ── Header ── */}
            <div className="bg-white border-b border-[#E8E8F0] px-[40px] py-[20px]">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[22px] font-bold text-[#252641]">Calendrier des cours</h1>
                        <p className="text-[13px] text-[#696984] mt-[2px]">
                            Gérez et planifiez les événements de vos cours
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/courses/calendar/create/newcours/')}
                        className="flex items-center gap-[6px] bg-[#2F327D] text-white text-[12px] font-bold px-[18px] py-[10px] rounded-[10px] hover:bg-[#252060] transition-colors shadow-[0px_4px_14px_rgba(47,50,125,0.3)]"
                    >
                        <PlusIcon />
                        Nouveau cours
                    </button>
                </div>

                {/* Stats rapides */}
                <div className="flex items-center gap-[24px] mt-[16px]">
                    {[
                        { label: 'Total cours', value: counts.all, color: 'text-[#252641]' },
                        { label: 'Planifiés', value: counts.planned, color: 'text-[#49BBBD]' },
                        { label: 'Non planifiés', value: counts.unplanned, color: 'text-[#F5A623]' },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-[6px]">
                            <span className={`text-[18px] font-bold ${stat.color}`}>{stat.value}</span>
                            <span className="text-[11px] text-[#696984]">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Toolbar ── */}
            <div className="px-[40px] py-[20px] flex items-center gap-[12px] flex-wrap">

                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-[320px]">
                    <div className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#696984]">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher un cours..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1) }}
                        className="w-full bg-white border border-[#E8E8F0] rounded-[10px] pl-[36px] pr-[12px] py-[9px] text-[12px] focus:outline-none focus:border-[#49BBBD] transition-colors"
                    />
                </div>

                {/* Filtres */}
                <div className="flex items-center bg-white border border-[#E8E8F0] rounded-[10px] overflow-hidden">
                    {[
                        { key: 'all', label: 'Tous' },
                        { key: 'planned', label: 'Planifiés' },
                        { key: 'unplanned', label: 'Non planifiés' },
                    ].map(f => (
                        <button key={f.key}
                            onClick={() => { setFilter(f.key); setPage(1) }}
                            className={`px-[14px] py-[9px] text-[11px] font-semibold transition-colors ${
                                filter === f.key
                                    ? 'bg-[#49BBBD] text-white'
                                    : 'text-[#696984] hover:bg-[#F5F7FF]'
                            }`}>
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Vue grid/list */}
                <div className="flex items-center bg-white border border-[#E8E8F0] rounded-[10px] overflow-hidden ml-auto">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`w-[36px] h-[36px] flex items-center justify-center transition-colors ${
                            viewMode === 'grid' ? 'bg-[#49BBBD] text-white' : 'text-[#696984] hover:bg-[#F5F7FF]'
                        }`}>
                        <GridIcon />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`w-[36px] h-[36px] flex items-center justify-center transition-colors ${
                            viewMode === 'list' ? 'bg-[#49BBBD] text-white' : 'text-[#696984] hover:bg-[#F5F7FF]'
                        }`}>
                        <ListIcon />
                    </button>
                </div>
            </div>

            {/* ── Contenu ── */}
            <div className="px-[40px] pb-[40px]">
                {loading ? (
                    <div className="flex items-center justify-center py-[80px]">
                        <div className="w-10 h-10 border-4 border-[#E8E8F0] border-t-[#49BBBD] rounded-full animate-spin" />
                    </div>
                ) : paginated.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-[80px] gap-[12px]">
                        <div className="w-[56px] h-[56px] rounded-full bg-[#49BBBD]/10 flex items-center justify-center">
                            <CalendarIcon />
                        </div>
                        <p className="text-[14px] font-semibold text-[#252641]">Aucun cours trouvé</p>
                        <p className="text-[12px] text-[#696984]">Essayez de modifier votre recherche</p>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        {paginated.map(course => (
                            <CourseCard key={course.id} course={course} onCreateEvent={handleCreateEvent} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-[10px]">
                        {paginated.map(course => (
                            <CourseRow key={course.id} course={course} onCreateEvent={handleCreateEvent} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-[8px] mt-[32px]">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-[34px] h-[34px] rounded-[8px] border border-[#E8E8F0] bg-white flex items-center justify-center text-[#696984] hover:bg-[#F5F7FF] disabled:opacity-40 transition-colors">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button key={p} onClick={() => setPage(p)}
                                className={`w-[34px] h-[34px] rounded-[8px] text-[12px] font-semibold transition-colors ${
                                    page === p
                                        ? 'bg-[#49BBBD] text-white shadow-[0px_4px_12px_rgba(73,187,189,0.3)]'
                                        : 'border border-[#E8E8F0] bg-white text-[#696984] hover:bg-[#F5F7FF]'
                                }`}>
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-[34px] h-[34px] rounded-[8px] border border-[#E8E8F0] bg-white flex items-center justify-center text-[#696984] hover:bg-[#F5F7FF] disabled:opacity-40 transition-colors">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}