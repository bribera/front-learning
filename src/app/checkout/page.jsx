import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchUrl } from '../../config/api-config'
import qs from 'qs'
import CheckoutForm from '../../components/checkout/CheckoutForm'
import OrderSummarysidebar from '../../components/checkout/OrderSummarysidebar'
import PromoOffer from '../../components/checkout/PromoOffer'
import Link from 'next/link'

// ── Récupère le user connecté via le token ──────────────────
async function getCurrentUser(token) {
  try {
    const res = await fetch(`${STRAPI_URL}/users/me?populate=*`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}


async function getPurchasedMarketingItems (token) {
    try {
        const params = qs.stringify({
            filters: {
                paid: { $eq: true },
            },
            populate: ['image'],
            pagination: { limit: 100 },
        }, { encodeValuesOnly: true })

        const json = await fetchUrl(`/articles?${params}`)

        // console.log('json', json)
        return json.data.map((entry) => {
            const imageUrl = entry.image?.url ?? null

            return {
                id:          entry.id,
                title:        entry.title        ?? entry.title   ?? 'Article Marketing',
                description: entry.description ?? entry.excerpt ?? 'Lorem ipsum dollar...',
                discount: entry.discount ?? 0,
                price:       entry.priceReviews      ?? 0,
                image:       imageUrl
                ? (imageUrl.startsWith('http')
                    ? imageUrl
                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`)
                : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=140&fit=crop',
            }
        })
    }catch(error) {
        console.error('Fetch error:', error)
        return []
    }
}
async function getEducationPromoOffer () {
    try {
        const query = qs.stringify({
            populate: ['bg_order', 'rate_prom'],
            pagination: { limit: 3 },
        }, { encodeValuesOnly: true })

        const resp = await fetchUrl(`/promo-offers?${query}`)

            console.log('promo entry exemple:', JSON.stringify(resp.data?.[0], null, 2))

        return (resp.data ?? []).map((entry) => {
            return {
                id:          entry.id,
                title:        entry.title        ?? entry.title   ?? 'Offre',
                description: entry.description ?? entry.excerpt ?? 'Lorem ipsum dollar...',
                rate_prom: entry.rate_prom?.rate ?? 0,
                bg_order:    entry.bg_order?.url ?? null,
            }
        })
    }catch(error) {
        console.error('Fetch error:', error)
        return []
    }
}

export default async function CheckoutPage() {
    const cookieStore = await cookies()  // await obligatoire
    const token = cookieStore.get('token')?.value  // .value pour récupérer la string

    if (!token) {
        redirect('/login?redirect=/checkout')
    }

    // ✅ Vérifie que le token est valide
    const currentUser = await getCurrentUser(token)
    if (!currentUser) {
        redirect('/login?redirect=/checkout')
    }
    
    // console.log('TOKEN VALUE:', token)
    // console.log('ALL COOKIES:', cookieStore.getAll())
    
    // console.log('TOKEN:', token ?? 'non connecté — mode public')
    
    
    
    // ✅ Charge les données en parallèle
    const [items, offers] = await Promise.all([
        getPurchasedMarketingItems(),
        getEducationPromoOffer(),
    ])

   
  return (
    <div className='pt-[143px] px-10 lg:px-[90px] xl:pl-[120px] xl:pr-[124px]'>
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[52px] pb-[158px]">
                <div className="">
                    <CheckoutForm user={currentUser} token={token}/>
                </div>
                <div className="w-full">
                    <OrderSummarysidebar items={items}/>
                </div>
            </div>
        </section>
        <section>
            <div className="flex justify-between">
                <p className="text-[30px] text-black font-medium tracking-[2%]">Top Education offers and deals are listed here</p>
                <div className="text-[#49BBBD] font-bold text-[20px]">
                    <Link href="/blog">See all</Link>
                </div>
            </div>
            <div className="">
                <PromoOffer offers={offers}/>
            </div>
        </section>
    </div>
  )
}

