import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, Global } from './styles';

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const settings = {
        arrows: false,
        infinite: true,
        initialSlide: 0,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    console.log(images.length)

    return (
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn onClick={onClose} />
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        afterChange={(slide) => setCurrentSlide(slide)}
                        {...settings}
                    >
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                    {
                        <Indicator>
                            <div>
                                {currentSlide + 1}/{images.length}
                            </div>
                        </Indicator>
                    }
                </div>
            </SlickWrapper>
        </Overlay >
    )
}

export default ImagesZoom

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
}