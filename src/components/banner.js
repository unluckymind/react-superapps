import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'
import Axios from "axios";
import Token from "../../config/secure.json";
import Skeleton from 'react-skeleton-loader';



const Banner = () => {
  const baseStaticApiUrl = "https://dev.api.halosis.id/static/images/cms/"
  const [getBanner, setBanner] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    bannerAPI();
  }, []);

  const Ghosting = () => {
    const items = (
    <div style={bannerStyle.mainPage}>
      <div style={{width: "550px", height: "170px"}}>
        <Skeleton width="100%" height="250px"/>
      </div>
    </div>
    );
    return items
  }

  const bannerAPI = () => {
    const endPoint = "https://dev.api.halosis.id/v1/cms/banners";
    Axios.get(endPoint, {
      headers: {
        "Authorization": `Bearer ${Token.bearer}`
      }
    }).then(result => {setBanner(result.data.payload.data), setLoading(false)});
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === getBanner.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? getBanner.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = getBanner.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img src={baseStaticApiUrl + item.image} alt={baseStaticApiUrl + item.title} style={bannerStyle.imageCarousel} />
      </CarouselItem>
    );
  });
  return (
    isLoading ? Ghosting() : 
    <div style={bannerStyle.mainPage}>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        >
        <CarouselIndicators items={getBanner} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
      </div>
  );
};

const bannerStyle = {
  mainPage: {
    marginTop: "15px",
  },
  imageCarousel: {
    height: "160px",
    width: "100%",
    borderRadius: 8
  }
};

export default Banner;
