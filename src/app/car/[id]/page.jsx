import CarDetails from '@/component/CarDetails'
import Header from '@/component/Header'
import { GET_ALL_CARS } from '@/component/utils/routes'
import React from 'react'

const page = async ({ params}) => {
  
  const res = await fetch(GET_ALL_CARS, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  const carDetails = data.find(item => Number(item?.id) === Number(params?.id))

  return (
    <div>
      <Header showSearch={false}/>
      <CarDetails
        carDetails={carDetails}
      />
    </div>
  )
}

export default page
