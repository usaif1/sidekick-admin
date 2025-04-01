import React from 'react'
import CurrentBalanceCard from './components/CurrentBalanceCard'

const Credits: React.FC = () => {
  return (
    <div className='flex flex-col'>
        <CurrentBalanceCard />
        <div className='flex justify-end'></div>
    </div>
  )
}

export default Credits