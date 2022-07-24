import { useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './BreedsSlider.module.scss'

type PropsType = {
    elements: any[]
} & React.HTMLAttributes<HTMLDivElement>

export const BreedsSlider: React.FC<PropsType> = ({ elements, className, ...props }) => {

    const [paginationEl, paginationRef] = useState<HTMLElement | null>(null)

    return (
        <div className={[styles.container, className].join(' ')} {...props}>
            <Swiper
                slidesPerView={1}
                autoHeight={true}

                modules={[Pagination]}
                observer={true}
                observeParents={true}
                observeSlideChildren={true}
                spaceBetween={20}
                speed={800}

                loop={true}
                loopAdditionalSlides={5}

                pagination={{
                    type: 'bullets',
                    clickable: true,
                    el: paginationEl,
                    bulletClass: styles.bullet,
                    bulletActiveClass: styles.bulletActive
                }}
            >
                {elements.map((el, i) => <SwiperSlide key={i} className={styles.slide}>{el}</SwiperSlide>)}
            </Swiper >
            <div ref={paginationRef} className={styles.pagination}></div>
        </div>
    )
}