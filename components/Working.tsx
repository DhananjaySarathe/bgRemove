"use client"
import React from 'react'
import { ImgCard } from '.'

const Working = ({selectedImage}:any) => {
    
    
  return (
    <div>
        <div className='workingup'>
        <h2>Your recent projects</h2>
        <p className='tgray font2'>Select and browse your project image and start experimenting</p>
        </div>

        <div className='imgCont'>
            {selectedImage?(
                <img className="bgImg" src={URL.createObjectURL(selectedImage)} alt="image" />
                ):(
                    <img src="/img.png" alt="image" className='bgImg2' />
            )}
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