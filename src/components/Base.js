function Base({ children }) {
  return (
    <>
      <Metadata />
      <Header />
      {children}
      <Footer />
    </>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

import Metadata from '../components/Metadata'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/index.css'

export default Base
