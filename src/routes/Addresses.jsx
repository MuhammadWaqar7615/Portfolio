// import "./Routes.scss"
import FeaturedProj from "../Components/featProjects/FeatProjects"
import Contact from "../Components/contact/Contact"
import Cursor from "../Components/cursor/Cursor"
import Hero from "../Components/hero/Hero"
import Navbar from "../Components/navbar/Navbar"
import PracticeProjects from "../Components/projects/Projects"
import Sidebar from "../Components/sidebar/Sidebar"
import Skills from "../Skills"
const Addresses = () => {
  return (
    <div>
      <Cursor />
      <section id="Homepage">
        <Navbar />
        <Hero />
      </section>
      <Sidebar />
      
      <section id="FeaturedProj"><FeaturedProj /></section>
      <section id="PracticeProjects"><PracticeProjects /></section>
      <section id="Skills"><Skills /></section>
      <section id="Contact"><Contact/></section>
    </div>
  )
}

export default Addresses
