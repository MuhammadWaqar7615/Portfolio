// import "./Routes.scss"
import FeaturedProj from "../Components/featProjects/FeatProjects"
import Contact from "../Components/contact/Contact"
import Cursor from "../Components/cursor/Cursor"
import Hero from "../Components/hero/Hero"
import PracticeProjects from "../Components/projects/Projects"
import Skills from "../Components/skills/Skills"
import Experience from "../Components/Experience/Experience"
import AiSkills from "../Components/skills/AiSkills"
import Education from "../Components/education/Education"
import Goals from "../Components/goals&vision/Goals"
import About from "../Components/about/About"
// import Goals from "../Components/goals/Goals"
const Addresses = () => {
  return (
    <div>
      <Cursor />
      <section id="Homepage"><Hero /></section>
      <section id="About"><About /></section>
      <section id="FeaturedProj"><FeaturedProj /></section>
      <section id="PracticeProjects"><PracticeProjects /></section>
      <section id="Skills"><Skills /></section>
      <section id="AiSkills"><AiSkills /></section>
      <section id="Education"><Education /></section>
      <section id="Experience"><Experience /></section>
      <section id="Goals"><Goals /></section>
      <section id="Contact"><Contact/></section>
    </div>
  )
}

export default Addresses
