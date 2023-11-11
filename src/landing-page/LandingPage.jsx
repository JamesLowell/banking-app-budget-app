import React from 'react'
import NavbarTop from './landing-page-components/NavbarTop'
import HomePage from './landing-page-components/HomePage'
import Feature from './landing-page-components/Feature'
import Contacts from './landing-page-components/Contacts'
import Feedback from './landing-page-components/Feedback'
import { Link, Route, Routes } from 'react-router-dom'

const LandingPage = () => {
  return (
    <>
        <NavbarTop />
        <HomePage />
        <Feature />
        <Feedback />
        <Contacts />
    </>
  )
}

export default LandingPage