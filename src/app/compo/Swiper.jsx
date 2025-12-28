"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import VideoCompo from "./VideoCompo";
import "swiper/css";

export default function VideoSwiper({ videos, onEdit, onDelete }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel
      keyboard
      modules={[Mousewheel, Keyboard]}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="h-full w-full"
    >
      {videos.map((video, index) => (
        <SwiperSlide key={video._id} className="h-full">
          <VideoCompo
            video={video}
            isActive={index === activeIndex}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            onEdit={onEdit}        // ✅ PASSED
            onDelete={onDelete}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
