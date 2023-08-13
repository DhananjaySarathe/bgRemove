"use client"
import React, { ChangeEvent,useState } from 'react'
import { Input } from '@chakra-ui/react'
import { database } from '@/utils/firebase'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { addDoc, serverTimestamp } from "firebase/firestore"; // Import additional Firestore functions

type YourComponentProps = {
    selectedImage: File | null;
    setSelectedImage: (image: File | null ) => void;
    effect:number;
    seteffect: (value: React.SetStateAction<number>) => void;
  };

const Data = ({selectedImage,setSelectedImage,effect,seteffect}:YourComponentProps) => {

    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    // const [selectedImage, setSelectedImage] = useState<File | null>(null);


    async function updateAll(){
      const months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const today: Date = new Date();
      const currentDay: number = today.getDate();
      const currentMonth: string = months[today.getMonth()];
      
      const formattedDate: string = `${currentDay} ${currentMonth}`;
      
      console.log(`Today's Date: ${formattedDate}`);
      
      const uploadData = new FormData()
      uploadData.append('file', selectedImage as Blob)
      uploadData.append("upload_preset","imageupload")
      uploadData.append("cloud_name","dbum1emnc")
     

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dbum1emnc/image/upload', {
          method: "post",
          body: uploadData,
        });
      
        if (!response.ok) {
          throw new Error("Image upload failed");
        }
      
        const data = await response.json();
        var image_Url = data.secure_url;
        console.log(image_Url);
        effect++;
        seteffect(effect+1);
        setImageUrl(image_Url);
      } catch (err) {
        console.log(err);
      }
        

      try {
        // Insert data into Firestore
        const docRef = await addDoc(database.images, {
          name,
          imageUrl: image_Url, // Assuming you have the image URL here
          date: formattedDate,
          createdAt: serverTimestamp()
        });
    
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const imageFile = e.target.files?.[0]; //proceedonly when there is some file.
        if (imageFile) {
          setSelectedImage(imageFile);
        }
      }
      

    function updateName(e:ChangeEvent<HTMLInputElement>){
        // console.log(e)
        setName(e.target.value);
    }

  return (
    <div className='datain'>
        <div className='dataup'>
        <h2>Start a new Project</h2>
        <p className='tgray'>Select and browse your product image and start <br/> experimenting</p>
        </div>

        <div className='inp'>
            <p className='tgray font2'>Step 1</p>
            <Input placeholder='Your Project name' onChange={updateName} autoComplete='off' name='name' />
        </div>
        
        <div className='inp inp2'>
    <p className='tgray font2'>Step 2</p>
    <label className="custom-file-label">
        Upload Product Image
        <input className="file-input" placeholder='Upload Product Image' type="file" name="imageUpload" onChange={handleImageChange} accept="image/*"/>
    </label>
</div>


<div className='inp inp2 spcase'>
    <p className='tgray font2'>Step 3</p>
    <div className='blueBox'>
    <label className="custom-file-label custom-file-label2">
        Upload your reference image
        <input className="file-input" type="file" name="imageUpload" onChange={handleImageChange} accept="image/*"/>
    </label>
    </div>
</div>

        <div className='inp'>
        <Button className='btn' onClick={updateAll} >Create new project</Button>
        </div>

    </div>
  )
}

export default Data