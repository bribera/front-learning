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

export async function fetchUrl(path, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
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
    throw new Error(
        `Veuillez vérifier si votre serveur est en cours d'exécution et que vous avez configuré tous les jetons requis.`
    );
  }
}

// export function optimizeCloudinaryUrl(url, width = 800, quality = 'auto:best') {
//   return url.replace('/upload/', `/upload/q_${quality},f_auto,w_${width}/`);
// }

export function optimizeCloudinaryUrl(url, width = 800, quality = 'auto:best') {
  if (!url || typeof url !== 'string') return null;
  return url.replace('/upload/', `/upload/q_${quality},f_auto,w_${width}/`);
}