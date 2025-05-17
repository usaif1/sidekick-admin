import React from 'react'

type Props = {
  walletData: any
}

const CurrentBalanceCard: React.FC<Props> = ({ walletData }) => {
  return (
    <div className='bg-card-background w-full px-2 py-4 flex flex-col rounded-md h-40 shadow-sm justify-center items-center'>
        <h2 className='text-lg'>Current Balance</h2>
        <p className='font-bold text-2xl'>{walletData?.balance}</p>
    </div>
  )
}

export default CurrentBalanceCard