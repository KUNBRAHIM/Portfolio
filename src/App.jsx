import HeroSection from './sections/Hero'
import { Experience } from './sections/Experience'
import Skills from './sections/Skills'
import AboutSection from './sections/About'
import ProjectsSection from './sections/Projects'
import ContactSection from './sections/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MovingSphere from './components/MovingSphere'
import { ExperienceProvider } from './context/ExperienceContext'

const App = () => {
  return (
    <ExperienceProvider>
      <Navbar />
      <MovingSphere />
      <HeroSection />
      <Experience />
      <Skills />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </ExperienceProvider>
  )
}

export default App