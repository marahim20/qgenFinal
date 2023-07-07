import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading() {
    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
        </div>
    )
}