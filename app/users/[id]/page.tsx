import React from 'react'

interface Props {
    params: {id: number; photoId: number;}
}

const UserDetailPage = ({params: {id, photoId}}: Props) => {
  return (
    <div>UserDetailPage {id} {photoId} </div>
  )
}

export default UserDetailPage