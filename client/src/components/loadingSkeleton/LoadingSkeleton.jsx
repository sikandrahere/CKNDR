import React from 'react'
import { Skeleton } from '../ui/skeleton'

const LoadingSkeleton = () => {
    return (
       <div>
         <div className='flex justify-around'>
            <Skeleton className="w-[90vw] h-[8vh] bg-[#a19b9b2a] mt-5" />
            
        </div>
        <div className='flex justify-around'>
            <Skeleton className="w-[90vw] h-[30vh] bg-[#a19b9b2a] mt-10" />
        </div>
        <div className='flex justify-around'>
            <Skeleton className="w-[40vw] h-[40vh] bg-[#a19b9b2a] mt-10" />
            <Skeleton className="w-[40vw] h-[40vh] bg-[#a19b9b2a] mt-10" />
        </div>
       </div>
        
    )
}

export default LoadingSkeleton