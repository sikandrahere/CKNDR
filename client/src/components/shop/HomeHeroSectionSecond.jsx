import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeHeroSectionSecond = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="relative h-[60%]">
                <div className="relative">
                    <video className="w-full h-[30vh] object-cover -z-[1]" src="https://res.cloudinary.com/ckndr/video/upload/v1743496582/hero2_pet5fa.mp4" autoPlay loop muted></video>
                </div>
                <div className="relative top-0 z-10 text-black text-center m-[40px]">
                    <h1 className="font-impact text-[30px]">"Ditch the discomfort, embrace professional sneakers "</h1>
                    <button
                        className="bg-black/30 font-sixtyfour rounded-md text-white p-[5px] transition-transform ease-[0.4s] hover:scale-110"
                        onClick={() => navigate('/explore')}
                    >
                        Product Portal
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeHeroSectionSecond