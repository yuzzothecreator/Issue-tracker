"use client"

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";

import React, { PropsWithChildren } from 'react'

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  
    const queryClient = new QueryClient();

  
    return (
    <ReactQueryClientProvider client={queryClient}>
        {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider