import React, { Suspense } from 'react'
import Create1 from '../../../../../components/courses/Create1'

const page = () => {
  return (
    <div>
      <Suspense>
       <Create1 />
      </Suspense>
    </div>
  )
}

export default page