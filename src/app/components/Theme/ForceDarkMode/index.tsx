'use client'
import { useTheme } from 'next-themes'
import { Fragment, useEffect } from 'react'

const ForceDarkMode = () => {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])
  return <Fragment />
}

export default ForceDarkMode
