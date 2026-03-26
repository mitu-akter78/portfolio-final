"use client";

import { useState } from 'react'
// import Loading from './components/loading-page/loading'
import Nav from './components/nav/nav'
import Hero from './components/hero/hero'
import Skills from './components/skills/skills'
import Projects from './components/projects/projects'
import About from './components/about/about'
import Footer from './components/footer/footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* {isLoading && <Loading onComplete={() => setIsLoading(false)} />} */}
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}