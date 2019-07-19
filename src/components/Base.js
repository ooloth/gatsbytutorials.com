function Base({ children }) {
  return (
    <>
      <Metadata />
      <CustomProperties />
      <Reset />
      <Header />
      {children}
      <Footer />
    </>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

import Metadata from './Metadata'
import Header from './Header'
import Footer from './Footer'
import { CustomProperties, Reset } from '../styles'

export default Base
