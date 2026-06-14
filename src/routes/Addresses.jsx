// import "./Routes.scss"
import FeaturedProj from "../Components/featProjects/FeatProjects"
import Contact from "../Components/contact/Contact"
import Cursor from "../Components/cursor/Cursor"
import Hero from "../Components/hero/Hero"
import PracticeProjects from "../Components/projects/Projects"
import Skills from "../Skills"
import Experience from "../Experience"
const Addresses = () => {
  return (
    <div>
      <Cursor />
      <Hero />
      
      <section id="FeaturedProj"><FeaturedProj /></section>
      <section id="PracticeProjects"><PracticeProjects /></section>
      <section id="Skills"><Skills /></section>
      <section id="Experience"><Experience /></section>
      <section id="Contact"><Contact/></section>
    </div>
  )
}

export default Addresses
