"use client"
import React from 'react'
import { Select } from '@chakra-ui/react'

const Header = () => {
  return (
    <div className='header'>
        <div className="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.28333 0.00333602H2.84C2.08333 0.00333602 1.37 0.300003 0.833334 0.833336C0.296667 1.36667 0 2.08667 0 2.84334V8.28667H3.10667V3.11334H8.28L8.28333 0.00333602Z" fill="url(#paint0_linear_1_55)"/>
<path d="M23.9967 21.1633V15.72H20.8867V20.89H15.71V24H21.16C21.9167 24 22.63 23.7033 23.1667 23.17C23.7033 22.6333 23.9967 21.92 23.9967 21.1633Z" fill="url(#paint1_linear_1_55)"/>
<path d="M3.11 20.89V17.37L6.33333 14.1467L9.90667 17.72C11.16 18.9733 13.1933 18.9733 14.4467 17.72L18.08 14.0867L23.79 8.28667C23.8533 8.17333 23.9033 8.05333 23.9367 7.93C23.97 7.80667 23.99 7.68333 23.9933 7.55667C23.9933 7.54 23.9933 7.52333 23.9933 7.50333V2.83667C23.9933 2.08 23.6967 1.36667 23.16 0.833333C22.6233 0.296667 21.9133 0 21.1567 0H15.71V3.11H20.8867V6.63333L18.03 9.49L14.4533 5.91333C14.22 5.68 13.9567 5.49 13.6767 5.34C12.4633 4.70333 10.93 4.89667 9.91333 5.91333L0.473333 15.3533C0.363333 15.4633 0.273333 15.5833 0.2 15.7167C0.15 15.8067 0.11 15.9033 0.08 16L0.07 15.99L0.06 16.0167C0.03 16.1067 0.01 16.1967 0 16.29V21.16C0 21.9167 0.296667 22.63 0.83 23.1633C1.36667 23.7 2.07667 23.9967 2.83333 23.9967H8.28V20.89H3.10667H3.11ZM12.18 9.09667L14.9033 11.82L12.18 14.5433L9.45667 11.82L12.18 9.09667Z" fill="url(#paint2_linear_1_55)"/>
<defs>
<linearGradient id="paint0_linear_1_55" x1="3.71948" y1="25.2004" x2="23.9567" y2="0.00388958" gradientUnits="userSpaceOnUse">
<stop stop-color="#9801ED"/>
<stop offset="1" stop-color="#E063E6"/>
</linearGradient>
<linearGradient id="paint1_linear_1_55" x1="3.71948" y1="25.2004" x2="23.9567" y2="0.00388958" gradientUnits="userSpaceOnUse">
<stop stop-color="#9801ED"/>
<stop offset="1" stop-color="#E063E6"/>
</linearGradient>
<linearGradient id="paint2_linear_1_55" x1="3.71948" y1="25.2004" x2="23.9567" y2="0.00388958" gradientUnits="userSpaceOnUse">
<stop stop-color="#9801ED"/>
<stop offset="1" stop-color="#E063E6"/>
</linearGradient>
</defs>
</svg>
        <div className='title'>
        <h3>Your Projects</h3>
        </div>
        </div>

        <div className='headend'>
            <div> <span className='tgray'>Photos left:</span> 960 </div>
            <div> <span className='tgray zoom'>Zoom level</span> </div>
            <div className='optns'>
            <Select placeholder='90%'>
  <option value='option1'>1</option>
  <option value='option2'>2</option>
  <option value='option3'>3</option>
</Select>
            </div>
         <div className='optns'>
         <Select placeholder='Nitin M'>
  <option value='option1'>1</option>
  <option value='option2'>2</option>
  <option value='option3'>3</option>
</Select>
         </div>
        </div>

   </div>
  )
}

export default Header