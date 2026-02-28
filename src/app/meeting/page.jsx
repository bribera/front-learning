import React from 'react'
import Meeting from '../../components/meeting/Meeting'

const page = ({searchParams}) => {
  return (
    <div className='pt-[30px] 3xl:pt-[97px] bg-[#9DCCFF]/20'>
      <Meeting searchParams={searchParams}/>
    </div>
  )
}

export default page
