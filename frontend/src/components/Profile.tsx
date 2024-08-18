'use client'
import Protected from '@/hooks/useProtected'
import React, { FC } from 'react'

type Props = {}

const  Profile: FC<Props> = (props) => {
  return (
    <div>
        <Protected>
           <p>Profile Page</p>
        </Protected>
    </div>
  )
}

export default Profile
