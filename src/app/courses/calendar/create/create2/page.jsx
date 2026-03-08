import React, { Suspense } from 'react'
import Create2 from '../../../../../components/courses/Create2'

const page = () => {
  return (
    <div>
      <Suspense>
        <Create2 />
      </Suspense>
    </div>
  )
}

export default page