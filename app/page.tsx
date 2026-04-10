"use client";

import { useState } from 'react'
// import Loading from './components/loading-page/loading'
import Nav from './components/nav/nav'
import Hero from './components/hero/hero'
import ScrollCards from './components/skills/scrollcards'

import Projects from './components/projects/projects'
import About from './components/about/about'
import Contact from './components/contact/contact'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* {isLoading && <Loading onComplete={() => setIsLoading(false)} />} */}
      <Nav />
      <Hero />
      <About />
      <ScrollCards />
      <Projects />
      <Contact />
    </>
  );
}