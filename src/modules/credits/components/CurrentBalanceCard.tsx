import React from 'react'

const CurrentBalanceCard: React.FC = () => {
  return (
    <div className='bg-card-background w-full px-2 py-4 flex flex-col rounded-md h-40 shadow-sm justify-center items-center'>
        <h2 className='text-lg'>Current Balance</h2>
        <p className='font-bold text-2xl'>XXXXXX</p>
    </div>
  )
}

export default CurrentBalanceCard