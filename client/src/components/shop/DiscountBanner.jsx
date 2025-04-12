import React from 'react'
import { useNavigate } from 'react-router-dom'

const DiscountBanner = () => {
    const token=localStorage.getItem('token')
    const navigate = useNavigate()
    return (
        <div className="h-[20vh] w-[90vw] flex justify-around items-center bg-[#1d478a] p-[10px] m-[30px]">
            <h1 className="text-[15px] font-bold text-white md:text-[30px]"> GET UP TO 30% OFF </h1>
            <button
                className="w-[100px] h-[20px] font-semibold text-[10px] rounded-md cursor-pointer bg-white md:w-[200px] md:h-[50px] md:text-[25px]"
                onClick={() => navigate('/login')}
            >
                {token ? 'Buy Now' : 'Register'}
            </button>
        </div>
    )
}

export default DiscountBanner