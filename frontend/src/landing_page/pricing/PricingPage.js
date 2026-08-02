import React from 'react'
import OpenAccount from '../OpenAccount';
import Hero from './Hero'
import Brokerage from '../pricing/Brokerage'

const PricingPage = () => {
  return (
    <>
      <Hero />
      <Brokerage />
      <OpenAccount />
    </>
  )
}

export default PricingPage