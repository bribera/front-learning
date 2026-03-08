'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchUrl, getStrapiMedia } from '../../config/api-config'

const LEVELS = ['beginner', 'intermediate', 'advanced']

const STEPS = [
    { label: 'Infos de base', icon: '📝' },
    { label: 'Détails', icon: '📋' },
    { label: 'Médias', icon: '🎬' },
    { label: 'Prix', icon: '💰' },
    { label: 'Réseaux', icon: '🔗' },
]

const STRAPIURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export default function CreateCourse() {
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [thumbnailPreview, setThumbnailPreview] = useState(null)

    const [form, setForm] = useState({
        // Infos de base
        title: '',
        subtitle: '',
        slug: '',
        description: '',
        // Détails
        level: 'beginner',
        language: '',
        duration: '',
        forWho: '',
        achievable: '',
        // Médias
        videoUrl: '',
        // Prix
        price: '',
        priceSale: '',
        // Réseaux
        facebook: '',
        tweeter: '',
        instagram: '',
        youtube: '',
        telegram: '',
        whatsapp: '',
    })

    const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
    }

    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setThumbnailFile(file)
        setThumbnailPreview(URL.createObjectURL(file))
    }

    const uploadThumbnail = async () => {
        if (!thumbnailFile) return null
        const formData = new FormData()
        formData.append('files', thumbnailFile)
        const res = await fetch(`${STRAPIURL}/api/upload`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        return data[0]?.id || null
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        try {
            // Upload thumbnail si présent
            const thumbnailId = await uploadThumbnail()

            // Parse forWho en JSON array
            const forWhoArray = form.forWho
                ? form.forWho.split('\n').map(s => s.trim()).filter(Boolean)
                : []

            const payload = {
                data: {
                    title: form.title,
                    subtitle: form.subtitle,
                    slug: form.slug || generateSlug(form.title),
                    description: form.description ? [
                        { type: 'paragraph', children: [{ type: 'text', text: form.description }] }
                    ] : undefined,
                    level: form.level,
                    language: form.language || undefined,
                    duration: form.duration || undefined,
                    forWho: forWhoArray.length > 0 ? forWhoArray : undefined,
                    achievable: form.achievable || undefined,
                    price: form.price ? parseFloat(form.price) : undefined,
                    priceSale: form.priceSale ? parseFloat(form.priceSale) : undefined,
                    facebook: form.facebook || undefined,
                    tweeter: form.tweeter || undefined,
                    instagram: form.instagram || undefined,
                    youtube: form.youtube || undefined,
                    telegram: form.telegram || undefined,
                    whatsapp: form.whatsapp || undefined,
                    ...(thumbnailId && { thumbnail: thumbnailId }),
                }
            }

            const res = await fetch(`${STRAPIURL}/api/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err?.error?.message || 'Erreur lors de la création')
            }

            const data = await res.json()
            setSuccess(true)
            setTimeout(() => {
                router.push(`/courses/${data.data.slug || data.data.documentId}`)
            }, 1500)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const canNext = () => {
        if (step === 0) return form.title.trim().length > 0
        return true
    }

    // ── Input helpers ────────────────────────────────────────────────────────
    const Field = ({ label, children, required }) => (
        <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-semibold text-[#252641]">
                {label} {required && <span className="text-[#E05C5C]">*</span>}
            </label>
            {children}
        </div>
    )

    const Input = ({ field, placeholder, type = 'text', ...props }) => (
        <input
            type={type}
            value={form[field]}
            onChange={e => update(field, e.target.value)}
            placeholder={placeholder}
            className="w-full px-[14px] py-[11px] rounded-[10px] border border-[#E8E8F0] text-[13px] text-[#252641] placeholder-[#B0B0C8] focus:outline-none focus:border-[#49BBBD] focus:ring-1 focus:ring-[#49BBBD]/30 transition-all bg-white"
            {...props}
        />
    )

    const Textarea = ({ field, placeholder, rows = 4 }) => (
        <textarea
            value={form[field]}
            onChange={e => update(field, e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-[14px] py-[11px] rounded-[10px] border border-[#E8E8F0] text-[13px] text-[#252641] placeholder-[#B0B0C8] focus:outline-none focus:border-[#49BBBD] focus:ring-1 focus:ring-[#49BBBD]/30 transition-all bg-white resize-none"
        />
    )

    const SocialInput = ({ field, placeholder, icon }) => (
        <div className="flex items-center gap-[10px] w-full px-[14px] py-[11px] rounded-[10px] border border-[#E8E8F0] bg-white focus-within:border-[#49BBBD] focus-within:ring-1 focus-within:ring-[#49BBBD]/30 transition-all">
            <span className="text-[16px] flex-shrink-0">{icon}</span>
            <input
                type="text"
                value={form[field]}
                onChange={e => update(field, e.target.value)}
                placeholder={placeholder}
                className="flex-1 text-[13px] text-[#252641] placeholder-[#B0B0C8] focus:outline-none bg-transparent"
            />
        </div>
    )

    return (
        <div className="min-h-screen bg-[#F0F2F9] flex items-start justify-center py-[40px] px-[16px]">
            <div className="w-full max-w-[760px]">

                {/* Header */}
                <div className="mb-[32px]">
                    <h1 className="text-[28px] font-bold text-[#252641]">Créer un cours</h1>
                    <p className="text-[13px] text-[#696984] mt-[4px]">Remplissez les informations pour publier votre cours.</p>
                </div>

                {/* Step indicators */}
                <div className="flex items-center gap-0 mb-[32px]">
                    {STEPS.map((s, i) => (
                        <div key={i} className="flex items-center flex-1 last:flex-none">
                            <button
                                onClick={() => i < step && setStep(i)}
                                className="flex flex-col items-center gap-[4px] group"
                            >
                                <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[14px] font-bold transition-all ${
                                    i === step
                                        ? 'bg-[#49BBBD] text-white shadow-[0px_4px_12px_rgba(73,187,189,0.35)]'
                                        : i < step
                                        ? 'bg-[#49BBBD]/20 text-[#49BBBD]'
                                        : 'bg-white text-[#B0B0C8] border border-[#E8E8F0]'
                                }`}>
                                    {i < step ? '✓' : i + 1}
                                </div>
                                <span className={`text-[10px] font-medium whitespace-nowrap ${
                                    i === step ? 'text-[#49BBBD]' : 'text-[#B0B0C8]'
                                }`}>{s.label}</span>
                            </button>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-[2px] mx-[6px] mb-[16px] rounded-full transition-all ${
                                    i < step ? 'bg-[#49BBBD]/40' : 'bg-[#E8E8F0]'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-white rounded-[20px] shadow-[0px_4px_24px_rgba(38,45,118,0.08)] p-[36px]">

                    {/* ── Step 0 : Infos de base ── */}
                    {step === 0 && (
                        <div className="flex flex-col gap-[20px]">
                            <h2 className="text-[18px] font-bold text-[#252641] mb-[4px]">📝 Informations de base</h2>

                            <Field label="Titre du cours" required>
                                <Input
                                    field="title"
                                    placeholder="ex: Maîtriser Adobe XD en 30 jours"
                                    onChange={e => {
                                        update('title', e.target.value)
                                        update('slug', generateSlug(e.target.value))
                                    }}
                                />
                            </Field>

                            <Field label="Sous-titre">
                                <Input field="subtitle" placeholder="ex: Introduction complète au design UI/UX" />
                            </Field>

                            <Field label="Slug (URL)">
                                <div className="flex items-center gap-[8px]">
                                    <span className="text-[12px] text-[#696984] bg-[#F5F7FF] px-[10px] py-[12px] rounded-l-[10px] border border-r-0 border-[#E8E8F0] whitespace-nowrap">/courses/</span>
                                    <input
                                        type="text"
                                        value={form.slug}
                                        onChange={e => update('slug', e.target.value)}
                                        placeholder="maitriser-adobe-xd"
                                        className="flex-1 px-[14px] py-[11px] rounded-r-[10px] border border-[#E8E8F0] text-[13px] text-[#252641] placeholder-[#B0B0C8] focus:outline-none focus:border-[#49BBBD] transition-all"
                                    />
                                </div>
                            </Field>

                            <Field label="Description">
                                <Textarea field="description" placeholder="Décrivez le contenu et les objectifs du cours..." rows={5} />
                            </Field>
                        </div>
                    )}

                    {/* ── Step 1 : Détails ── */}
                    {step === 1 && (
                        <div className="flex flex-col gap-[20px]">
                            <h2 className="text-[18px] font-bold text-[#252641] mb-[4px]">📋 Détails du cours</h2>

                            <div className="grid grid-cols-2 gap-[16px]">
                                <Field label="Niveau">
                                    <select
                                        value={form.level}
                                        onChange={e => update('level', e.target.value)}
                                        className="w-full px-[14px] py-[11px] rounded-[10px] border border-[#E8E8F0] text-[13px] text-[#252641] focus:outline-none focus:border-[#49BBBD] bg-white transition-all"
                                    >
                                        {LEVELS.map(l => (
                                            <option key={l} value={l}>
                                                {l === 'beginner' ? '🟢 Débutant' : l === 'intermediate' ? '🟡 Intermédiaire' : '🔴 Avancé'}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Langue">
                                    <Input field="language" placeholder="ex: Français, English" />
                                </Field>
                            </div>

                            <Field label="Durée totale">
                                <Input field="duration" placeholder="ex: 12 heures, 3 semaines" />
                            </Field>

                            <Field label="Pour qui est ce cours ? (une ligne par profil)">
                                <Textarea
                                    field="forWho"
                                    placeholder={"Débutants qui veulent apprendre le design\nDéveloppeurs frontend\nChefs de projet"}
                                    rows={4}
                                />
                                <p className="text-[11px] text-[#B0B0C8]">Une entrée par ligne — sera sauvegardé en JSON array</p>
                            </Field>

                            <Field label="Ce que l'apprenant va acquérir (Achievable)">
                                <Textarea field="achievable" placeholder="Décrivez les compétences et acquis du cours..." rows={3} />
                            </Field>
                        </div>
                    )}

                    {/* ── Step 2 : Médias ── */}
                    {step === 2 && (
                        <div className="flex flex-col gap-[20px]">
                            <h2 className="text-[18px] font-bold text-[#252641] mb-[4px]">🎬 Médias</h2>

                            <Field label="Thumbnail (image de couverture)">
                                <div
                                    onClick={() => document.getElementById('thumb-input').click()}
                                    className="w-full h-[200px] rounded-[12px] border-2 border-dashed border-[#E8E8F0] hover:border-[#49BBBD] transition-all cursor-pointer flex items-center justify-center overflow-hidden bg-[#F5F7FF] relative"
                                >
                                    {thumbnailPreview ? (
                                        <img src={thumbnailPreview} alt="preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-[8px] text-[#B0B0C8]">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                                                <polyline points="21 15 16 10 5 21"/>
                                            </svg>
                                            <p className="text-[13px]">Cliquez pour uploader une image</p>
                                            <p className="text-[11px]">PNG, JPG — max 5MB</p>
                                        </div>
                                    )}
                                    {thumbnailPreview && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-[13px] font-bold">Changer l'image</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="thumb-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleThumbnail}
                                />
                            </Field>

                            <Field label="URL Vidéo YouTube (première leçon)">
                                <Input field="videoUrl" placeholder="https://www.youtube.com/watch?v=..." />
                                <p className="text-[11px] text-[#B0B0C8]">Formats acceptés : watch?v=, youtu.be/, shorts/</p>
                            </Field>
                        </div>
                    )}

                    {/* ── Step 3 : Prix ── */}
                    {step === 3 && (
                        <div className="flex flex-col gap-[20px]">
                            <h2 className="text-[18px] font-bold text-[#252641] mb-[4px]">💰 Prix</h2>

                            <div className="grid grid-cols-2 gap-[16px]">
                                <Field label="Prix original ($)">
                                    <div className="relative">
                                        <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#696984] text-[13px]">$</span>
                                        <input
                                            type="number"
                                            value={form.price}
                                            onChange={e => update('price', e.target.value)}
                                            placeholder="99"
                                            min="0"
                                            className="w-full pl-[28px] pr-[14px] py-[11px] rounded-[10px] border border-[#E8E8F0] text-[13px] text-[#252641] placeholder-[#B0B0C8] focus:outline-none focus:border-[#49BBBD] transition-all"
                                        />
                                    </div>
                                </Field>

                                <Field label="Prix promo ($)">
                                    <div className="relative">
                                        <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#696984] text-[13px]">$</span>
                                        <input
                                            type="number"
                                            value={form.priceSale}
                                            onChange={e => update('priceSale', e.target.value)}
                                            placeholder="49"
                                            min="0"
                                            className="w-full pl-[28px] pr-[14px] py-[11px] rounded-[10px] border border-[#E8E8F0] text-[13px] text-[#252641] placeholder-[#B0B0C8] focus:outline-none focus:border-[#49BBBD] transition-all"
                                        />
                                    </div>
                                </Field>
                            </div>

                            {/* Preview prix */}
                            {(form.price || form.priceSale) && (
                                <div className="bg-[#F5F7FF] rounded-[12px] p-[16px] flex items-center gap-[16px]">
                                    <span className="text-[13px] text-[#696984]">Aperçu :</span>
                                    {form.priceSale && form.price && (
                                        <span className="text-[14px] text-[#696984] line-through">${form.price}</span>
                                    )}
                                    {(form.priceSale || form.price) && (
                                        <span className="text-[20px] font-bold text-[#49BBBD]">
                                            ${form.priceSale || form.price}
                                        </span>
                                    )}
                                    {form.priceSale && form.price && (
                                        <span className="bg-[#FDE8E8] text-[#E05C5C] text-[11px] font-bold px-[8px] py-[3px] rounded-[6px]">
                                            -{Math.round((1 - form.priceSale / form.price) * 100)}%
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Step 4 : Réseaux sociaux ── */}
                    {step === 4 && (
                        <div className="flex flex-col gap-[16px]">
                            <h2 className="text-[18px] font-bold text-[#252641] mb-[4px]">🔗 Réseaux sociaux</h2>
                            <p className="text-[12px] text-[#696984] -mt-[8px] mb-[4px]">Ces liens apparaîtront sur la page de partage du cours.</p>

                            <Field label="Facebook">
                                <SocialInput field="facebook" placeholder="https://facebook.com/..." icon="📘" />
                            </Field>
                            <Field label="Twitter / X">
                                <SocialInput field="tweeter" placeholder="https://twitter.com/..." icon="🐦" />
                            </Field>
                            <Field label="Instagram">
                                <SocialInput field="instagram" placeholder="https://instagram.com/..." icon="📸" />
                            </Field>
                            <Field label="YouTube">
                                <SocialInput field="youtube" placeholder="https://youtube.com/..." icon="▶️" />
                            </Field>
                            <Field label="Telegram">
                                <SocialInput field="telegram" placeholder="https://t.me/..." icon="✈️" />
                            </Field>
                            <Field label="WhatsApp">
                                <SocialInput field="whatsapp" placeholder="https://wa.me/..." icon="💬" />
                            </Field>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mt-[16px] bg-[#FDE8E8] border border-[#E05C5C]/30 rounded-[10px] px-[14px] py-[10px]">
                            <p className="text-[12px] text-[#E05C5C] font-medium">❌ {error}</p>
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="mt-[16px] bg-[#E8F8F8] border border-[#49BBBD]/30 rounded-[10px] px-[14px] py-[10px]">
                            <p className="text-[12px] text-[#49BBBD] font-medium">✅ Cours créé avec succès ! Redirection...</p>
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between mt-[32px] pt-[24px] border-t border-[#F0F0F8]">
                        <button
                            onClick={() => setStep(s => Math.max(0, s - 1))}
                            disabled={step === 0}
                            className="px-[24px] py-[10px] rounded-[10px] border border-[#E8E8F0] text-[13px] font-semibold text-[#696984] hover:bg-[#F5F7FF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            ← Précédent
                        </button>

                        <div className="flex items-center gap-[8px]">
                            {STEPS.map((_, i) => (
                                <div key={i} className={`w-[6px] h-[6px] rounded-full transition-all ${
                                    i === step ? 'bg-[#49BBBD] w-[20px]' : i < step ? 'bg-[#49BBBD]/40' : 'bg-[#E8E8F0]'
                                }`} />
                            ))}
                        </div>

                        {step < STEPS.length - 1 ? (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                disabled={!canNext()}
                                className="px-[24px] py-[10px] rounded-[10px] bg-[#49BBBD] text-white text-[13px] font-bold hover:bg-[#3da8aa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-[0px_4px_12px_rgba(73,187,189,0.30)]"
                            >
                                Suivant →
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading || success}
                                className="px-[28px] py-[10px] rounded-[10px] bg-[#2F327D] text-white text-[13px] font-bold hover:bg-[#252060] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0px_4px_12px_rgba(47,50,125,0.30)] flex items-center gap-[8px]"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-[14px] h-[14px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Création...
                                    </>
                                ) : '🚀 Publier le cours'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}