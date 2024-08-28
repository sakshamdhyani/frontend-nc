
import { useEffect } from 'react'
import EmblaCarousel from '../../Components/ManagementCarousel/EmblaCarousel'
import './embla.css'

const OPTIONS = { align: 'start', loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Management = () => {

  useEffect(() => {
    window.scroll
  },[])
  
  return(
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
  )

}



export default Management 