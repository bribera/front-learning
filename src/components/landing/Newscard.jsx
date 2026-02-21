import Image from 'next/image';
import { getStrapiMedia, optimizeCloudinaryUrl } from "@/src/config/api-config";
import Link from 'next/link';

export default function NewsCard({ article, variant = 'small' }) {
  // Utiliser les fonctions utilitaires pour les images
  const imageUrl = getStrapiMedia(article.image?.url);
  const optimizedImageUrl = imageUrl && imageUrl.includes('cloudinary') 
    ? optimizeCloudinaryUrl(imageUrl, variant === 'large' ? 800 : 400)
    : imageUrl;

  const category = article.category?.name || 'News';
  const title = article.title || '';
  
  // Tronquer le contenu pour l'affichage
  const truncateContent = (text, maxLength) => {
    if (!text) return '';
    // Enlever les balises HTML si présentes
    const plainText = text.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  };
  
  const description = truncateContent(article.content, variant === 'large' ? 150 : 100);
  const link = article.slug ? `/news/${article.slug}` : '#';
  const imageAlt = article.image?.alternativeText || title;

  if (variant === 'large') {
    return (

      <Link href={`/blog/${article.slug}`}>
        <article className=" overflow-hidden flex flex-col h-full">
          <div className="relative w-full h-72 lg:w-[350px] lg:h-auto 3xl:w-[640px] 3xl:h-[360px] rounded-[20px] overflow-hidden group">
            {optimizedImageUrl ? (
              <img
                src={optimizedImageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover rounded-[20px]"
                sizes="(max-width: 768px) 100vw, 50vw)"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700"></div>
            )}
          </div>
          
          <div className="pt-[40px] flex flex-col flex-grow">
            <div className="mb-[20px] bg-[#49BBBD] text-white px-4 py-2 rounded-[80px] text-[20px] font-semibold uppercase tracking-wider w-fit">
              {category}
            </div>
            <h3 className="text-[22px] xl:text-[26px] font-medium text-[#252641] mb-5 leading-[180%] line-clamp-3 3xl:line-clamp-none">
              {title}
            </h3>
            <p className="text-[#696984] text-[18px] xl:text-[20px] leading-[180%] mb-[28px] flex-grow tracking-[2%] line-clamp-3">
              {description}
            </p>
            <Link 
              href={link} 
              className="text-[#696984] underline font-normal text-sm md:text-[20px] leading-[180%] tracking-[2%] inline-flex items-center group/link"
            >
              Read more
            </Link>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link className={`/blog/${article.slug}`}>   
      <article className=" overflow-hidden ">
        <div className="flex gap-4 ">
          <div className="relative items-stretch w-36 h-[150px] 3xl:w-[280px] lg:w-[121px] lg:h-auto xl:h-[200px] flex-shrink-0 rounded-[20px] overflow-hidden group">
            {optimizedImageUrl ? (
              <img
                src={optimizedImageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover rounded-[20px]"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700"></div>
            )}
            <span className="absolute bottom-[20px] right-[20px] bg-[#49BBBD] text-white px-3 pt-1 pb-[3px] rounded-full text-[10px] font-semibold uppercase tracking-wide">
              {category}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base lg:text-[18px] 3xl:text-[22px] font-medium text-[#252641] mb-2 leading-[180%]">
              {title}
            </h3>
            <p className="text-[#696984] tracking-[2%] text-sm lg:text-[16px] 3xl:text-[20px] leading-[180%] line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}