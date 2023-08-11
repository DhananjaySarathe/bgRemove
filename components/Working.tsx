import React from 'react'
import { ImgCard } from '.'

const Working = () => {
  return (
    <div>
        <div className='workingup'>
        <h2>Your recent projects</h2>
        <p className='tgray font2'>Select and browse your project image and start experimenting</p>
        </div>

        <div className='imgCont'>
            <img src="/img.png" alt="image" className='bgimage' />
        </div>

    <div className='imgcard'>
        <ImgCard />
        <ImgCard />
        <ImgCard />

    </div>

    </div>
  )
}

export default Working