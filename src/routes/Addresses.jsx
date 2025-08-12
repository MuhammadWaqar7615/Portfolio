// import "./Routes.scss"
import About from "../Components/about/About"
import Contact from "../Components/contact/Contact"
import Cursor from "../Components/cursor/Cursor"
import Hero from "../Components/hero/Hero"
import Navbar from "../Components/navbar/Navbar"
import Projects from "../Components/projects/Projects"
import Sidebar from "../Components/sidebar/Sidebar"
const Addresses = () => {
  return (
    <div>
      <Cursor />
      <section id="Homepage">
        <Navbar />
        <Hero />
      </section>
      <Sidebar />
      
      <section id="About"><About /></section>
      <section id="Projects"><Projects /></section>
      <section id="Contact"><Contact/></section>
    </div>
  )
}

export default Addresses
