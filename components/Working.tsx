"use client"
import React, { useEffect ,useState } from 'react'
import { ImgCard } from '.'
import { database } from '@/utils/firebase'
import { getDocs } from "firebase/firestore";


interface ImageData {
  date:string;
  name: string;
  imageUrl: string;
}

const Working = ({selectedImage}:any) => {

  const [imageFiles, setImageFiles] = useState<ImageData[]>([]);
  const [effect, seteffect] = useState<ImageData[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(database.images);
        var fetchedImageFiles = querySnapshot.docs.map(doc => doc.data());
        setImageFiles(fetchedImageFiles);
        seteffect(fetchedImageFiles);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
  
    fetchData();
    // seteffect(selectedImage.imageUrl)
  }, [effect]);
  

    
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
    {imageFiles.map((e, index) => (
    <ImgCard key={index} element={e} />
  ))}
    </div>

    </div>
  )
}

export default Working