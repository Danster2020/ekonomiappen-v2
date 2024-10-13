import React from 'react'


export const Spinner = () => {
    return (
        <div className='relative animate-spin h-32 w-32 border-blue-100 border-[1rem] rounded-full'>
            <div className='absolute left-0 right-0 w-4 h-4 bg-blue-500 rounded-full'></div>
        </div>
    )
}


