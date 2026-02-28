export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}

export const getStrapiMedia = (url) => {
  if (!url) return null;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL || '';
  const mediaUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : url;
  return mediaUrl;
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).replace(/(\w+)\s(\d{4})/, '$1, $2');
}

export function formatDateAgenda(dateString) {
  const d = new Date(dateString);
  if (isNaN(d)) return "";
  const day = String(d.getDate()).padStart(2, "0"); 
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase(); 
  const year = d.getFullYear(); 
  return `${day} ${month} ${year}`; 
}

export function timeLeft(dateStr) {
  if (!dateStr) return ''


  const now = new Date()
  const target = new Date(dateStr)
  const diffMs = target - now

if (diffMs <= 0) return new Date(dateStr).toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

  // Date déjà passée
  if (diffMs <= 0) return 'Offre expirée'

  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours   = Math.floor(diffMinutes / 60)
  const diffDays    = Math.floor(diffHours / 24)
  const diffMonths  = Math.floor(diffDays / 30)
  const diffYears   = Math.floor(diffDays / 365)

  if (diffYears >= 1)   return `${diffYears} year${diffYears > 1 ? 's' : ''} `
  if (diffMonths >= 1)  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} `
  if (diffDays >= 1)    return `${diffDays} day${diffDays > 1 ? 's' : ''} `
  if (diffHours >= 1)   return `${diffHours} hour${diffHours > 1 ? 's' : ''} `
  if (diffMinutes >= 1) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} `

  return 'Moins d\'une minute left'
}

export function timeAgo(dateStr) {
  if (!dateStr) return ''

  const now = new Date()
  const past = new Date(dateStr)
  const diffMs = now - past  // ✅ inversé : now - past

  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours   = Math.floor(diffMinutes / 60)
  const diffDays    = Math.floor(diffHours / 24)
  const diffMonths  = Math.floor(diffDays / 30)
  const diffYears   = Math.floor(diffDays / 365)

  if (diffYears >= 1)   return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
  if (diffMonths >= 1)  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
  if (diffDays >= 1)    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  if (diffHours >= 1)   return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffMinutes >= 1) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`

  return 'Just now'
}

export async function fetchUrl(path, options = {}) {
  try {
    const isGet = !options.method || options.method === 'GET'
    // Merge default and user options
    const mergedOptions = {
     // ✅ next.revalidate uniquement pour les GET
      ...(isGet ? { next: { revalidate: 60 } } : {}),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Build request URL
    const requestUrl = getStrapiURL(`${path}`);

    // Call API
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// export function optimizeCloudinaryUrl(url, width = 800, quality = 'auto:best') {
//   return url.replace('/upload/', `/upload/q_${quality},f_auto,w_${width}/`);
// }

export function optimizeCloudinaryUrl(url, width = 800, quality = 'auto:best') {
  if (!url || typeof url !== 'string') return null;
  return url.replace('/upload/', `/upload/q_${quality},f_auto,w_${width}/`);
}