"use client"
import { useState } from 'react';

const defaultTestimonials = [
  {
    id: 1,
    name: 'Sarah Ross',
    text: '"These are in truth the "true" positive feelings. Some of the students were greatly inspired to the "likings."',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    reviews: '15'
  },
  {
    id: 2,
    name: 'John Smith',
    text: '"Amazing experience! The service was exceptional and the team was very professional. Highly recommended for everyone.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
    reviews: '12'
  },
  {
    id: 3,
    name: 'Emma Johnson',
    text: '"Outstanding quality and attention to detail. I was impressed with the level of care and dedication shown throughout."',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 4,
    reviews: '8'
  }
];

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newTestimonial, setNewTestimonial] = useState('');

// Navigation infinie - seulement next
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (newTestimonial.trim()) {
      const testimonial = {
        id: testimonials.length + 1,
        name: 'Anonymous',
        text: newTestimonial,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        rating: 5,
        date: 'Just now'
      };
      setTestimonials([...testimonials, testimonial]);
      setNewTestimonial('');
      setCurrentIndex(testimonials.length);
    }
  };

  const current = testimonials[currentIndex];

  return (
    <section className="w-full lg:w-[400px] 3xl:w-[560px] h-full">
      <div className="w-full h-full">
        {/* Colonne droite - Carrousel */}
        <div className="flex items-center w-full animate-in fade-in slide-in-from-right-4 duration-600">
          <div className="relative w-full h-[769px] flex flex-col gap-8">
            
            {/* Image avec navigation */}
            <div className="absolute w-full h-full top-0 left-0 flex h-80">
              <div className="relative w-full lg:w-3/4 h-full">
                {/* Conteneur image */}
                <div className=" w-full 3xl:w-[560px] h-[700px] rounded-2xl overflow-hidden shadow-2xl ">                                     
                    {/* Image */}
                    <img
                    key={current.id}
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover animate-in fade-in duration-500"
                    />
                </div>

                {/* Bouton Next - Chevron unique */}
                <button
                  onClick={handleNext}
                  className="absolute -right-8 top-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-white shadow-[0px_15px_44px_rgba(13,15,28,0.12)] flex items-center justify-center text-slate-700 hover:bg-sky-400 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 z-20"
                  aria-label="Next testimonial"
                >
                  <img 
                    src="/images/chevron.png" 
                    alt="Next testimonial" 
                    className="w-[12px] h-[20px]" 
                  />
                </button>
              </div>
            </div>

            {/* Contenu du témoignage */}
            <div
              key={current.id}
              className="absolute z-20 bottom-0 left-[40px] 3xl:left-[69px] lg:w-full w-[350px] md:w-[500px]  flex flex-col gap-6 px-8 3xl:pl-[55px] 3xl:pr-[42px] pt-[41px] pb-[29px] bg-white rounded-[20px] shadow-[0px_15px_44px_rgba(13,15,28,0.12)] animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
                {/* Barre d'accent rouge */}
                <div className="absolute left-0 top-0 bottom-0 rounded-l-[20px] w-[14px] bg-[#F67766] z-10"></div>

              <div className=" border-l border-l-[#BDBDD1] text-sm lg:text-[22px] text-[#5F5F7E] nunito font-normal tracking-[2%] leading-[180%]">
                <p className='pl-8'>{current.text}</p> 
              </div>

              <div className="flex justify-between items-end gap-4 pt-4">
                <div className="">
                  <p className="text-sm nunito lg:text-[24px] font-semibold leading-[180%] text-[#5F5F7E]">
                    {current.name}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                    {/* Étoiles de notation */}
                    <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <img
                        key={i}
                        src="/images/star.png"
                            alt={i < current.rating ? 'Filled star' : 'Empty star'}
                            className={i < current.rating ? 'w-4 lg:w-5' : 'w-4 lg:w-5 opacity-30'}
                        />
                    ))}
                    </div>
                    <div className="">
                        <p className="text-sm nunito lg:text-[18px] tracking-[2%] leading-[180%] text-[#80819A] mt-[12.02px]">{current.reviews} reviews at Yelp</p>
                    </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
