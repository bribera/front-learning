import React, { Suspense } from 'react'
import FullCalendar from '../../../../components/courses/FullCalendar'

const page = () => {
  return (
    <div>
      <Suspense>
        <FullCalendar />
      </Suspense>
    </div>
  )
}

export default page