import React from 'react'
import ScootersMap from './components/ScootersMap'

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col pt-4 gap-y-4'>
      <ScootersMap />
    </div>
  )
}

export default HomePage