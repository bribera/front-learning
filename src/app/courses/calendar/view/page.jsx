import React, { Suspense } from 'react'
import ViewCalendar from '../../../../components/courses/ViewCalendar'

const page = () => {
  return (
    <div>
      <Suspense>
        <ViewCalendar />
      </Suspense>
    </div>
  )
}

export default page