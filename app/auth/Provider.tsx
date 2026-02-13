"use client"


import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren, use } from 'react'

const AuthProvider = ({ children } : PropsWithChildren) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProvider