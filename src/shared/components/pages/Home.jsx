import ProjectsList from "../../../features/projects/components/ProjectList";
import Hero from "../widgets/Hero";

export default function Home(){
  return (
    <>
      <Hero />
      <ProjectsList max="4" title={'Favorite Projects'} favorites={true}/>
    </>
  )
}