import Header from '@/component/Header'
import Homepage from '@/component/Homepage'
import { GET_ALL_CARS } from '@/component/utils/routes'
import React from 'react'

const page = async ({ searchParams}) => {
  const currentPage = Number(searchParams?.page) || 1
  const sort = searchParams?.sort || ''
  const search = searchParams?.search || ''

  let filter = {}
  try {
    if (searchParams?.filter) {
      filter = JSON.parse(searchParams.filter)
    }
  } catch (error) {
    console.error('Invalid filter JSON:', error)
  }

  const res = await fetch(GET_ALL_CARS, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return (
    <div>
      <Header showSearch={true}/>
      <Homepage
        data={data}
        currentPage={currentPage}
        filter={filter}
        sort={sort}
        search={search}
      />
    </div>
  )
}

export default page
