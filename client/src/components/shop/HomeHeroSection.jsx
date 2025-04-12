import React from 'react'

const HomeHeroSection = () => {
  return (
    <div className="relative h-[60vh] z-[-1]">
    <div className="absolute inset-0">
      <video autoPlay loop muted className="w-full h-full object-cover ">
        <source src="https://res.cloudinary.com/ckndr/video/upload/v1744204636/hero1_aaletq.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="absolute bottom-[20%] right-[10%] text-right text-white ">
      <h1 className="font-rubik font-bold text-3xl mb-1">S N K R S</h1>
      <p className="font-fantasy text-lg font-normal">Explore the latest trends in sneakers</p>
      <p className="font-fantasy text-lg font-normal">Step into imagination</p>
      <button
        
        className="font-rubik font-bold text-lg px-4 py-2 bg-[rgba(0,255,255,0.456)] text-white rounded-lg transition-transform ease-in-out duration-300 hover:scale-110"
      >
        Explore Now
      </button>
    </div>
  </div>
  )
}

export default HomeHeroSection