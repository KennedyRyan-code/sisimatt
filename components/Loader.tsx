import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500' />
        {/* <div className='absolute text-blue-500 text-2xl font-bold'>Loading...</div> */}
    </div>
  )
}

export default Loader