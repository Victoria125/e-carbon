import type { FC } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import type { Language, LanguageConfig } from '@/types/language'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Autoplay, EffectCards, EffectCoverflow, Keyboard, Navigation, Pagination } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface CarouselProps {
  languages: LanguageConfig[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
  onLanguageSelect: (langCode: Language) => void
  onStartClick: () => void
}

export const CardCarousel: FC<CarouselProps> = ({
  languages,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  onLanguageSelect,
  onStartClick
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType>(null)

  const handleCardClick = (language: LanguageConfig, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    onLanguageSelect(language.code)
    onStartClick()
  }

  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 25px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    width: 300px;
    cursor: pointer;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    pointer-events: none;
  }

  .swiper-pagination {
    display: flex;
    justify-content: center;
    position: relative;
    gap: 10px;
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background-color: white;
    border: 1px solid white;
  }

  .swiper-pagination-bullet:hover {
    cursor: pointer;
  }

  .swiper-pagination-bullet-active {
    width: 12px;
    height: 12px;
    background-color: white;
  }

  .swiper-button-next {
    width: 40px;
    height: 40px ;
    right: -100px;
    margin-top: -55px;
    color: white;
    padding: 40px;
    border-radius: 50%;
  }

  .swiper-button-prev {
    width: 40px;
    height: 40px;
    left: -100px;
    margin-top: -55px;
    color: white;
    padding: 40px;
    border-radius: 50%;
  }

  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }

  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `

  return (
    <section className="select-none">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-4xl rounded-[24px] p-2 md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] p-2 md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
          <div className="flex items-center justify-center w-full gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={10}
                effect="cards"
                grabCursor={true}
                slideToClickedSlide={true}
                slidesPerView="auto"
                loop={false}
                loopAdditionalSlides={0}
                rewind={true}
                allowTouchMove={true}
                followFinger={true}
                keyboard={true}
                pagination={false}
                initialSlide={0}
                navigation={showNavigation && { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                modules={[EffectCoverflow, EffectCards, Autoplay, Pagination, Navigation, Keyboard]}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true
                }}
                cardsEffect={{
                  perSlideOffset: 20,
                  perSlideRotate: 10,
                  rotate: true,
                  slideShadows: false
                }}
                coverflowEffect={{
                  rotate: -10.25,
                  stretch: 0,
                  depth: 50,
                  modifier: 2
                }}
                onSwiper={(swiper) => { swiperRef.current = swiper }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
                {languages.map((language, _index) => (
                  <SwiperSlide
                    key={language.code}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleCardClick(language, e)
                    }}>
                    <motion.div
                      whileHover={{ scale: 1.025 }}
                      whileTap={{ scale: 0.925 }}
                      className="my-4 cursor-pointer size-full h-96 rounded-4xl"
                      onClick={(e) => handleCardClick(language, e)}>
                      <motion.img
                        src={language.flag.src}
                        width={500}
                        height={500}
                        className="pointer-events-none size-full rounded-4xl"
                        alt={language.flag.alt} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className="swiper-button-prev">
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className="swiper-button-next">
              </motion.div>

              {showPagination && (
                <div className="items-center mt-4 space-x-2 swiper-pagination">
                  {languages.map((language, index) => (
                    <motion.span
                      key={language.code}
                      drag
                      dragDirectionLock
                      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
                      dragElastic={0.2}
                      whileDrag={{ cursor: 'grabbing' }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className={`
                        swiper-pagination-bullet
                        ${activeIndex === index && 'swiper-pagination-bullet-active'}
                      `}
                      onClick={() => swiperRef.current?.slideToLoop(index)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
