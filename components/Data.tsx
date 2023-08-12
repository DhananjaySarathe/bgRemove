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
        
        <div className='inp'>
            <p className='tgray font2'>Step 2</p>
            {/* <Input placeholder='Upload Product image' type='file' name="imageUpload" /> */}
            <label className="file-input-label">
  <span className="upload-icon">📁</span>
  Upload Image
  <input className="file-input" type="file" name="imageUpload"onChange={handleImageChange}  accept="image/*"/>
    </label>

        </div>

        <div className='inp'>
        <svg width="398" height="221" viewBox="0 0 298 121" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.804 12.144C3.34 12.144 2.928 12.096 2.568 12C2.208 11.896 1.896 11.756 1.632 11.58C1.368 11.396 1.152 11.196 0.984 10.98C0.816 10.756 0.692 10.52 0.612 10.272L1.584 9.936C1.704 10.288 1.944 10.596 2.304 10.86C2.672 11.116 3.12 11.244 3.648 11.244C4.296 11.244 4.804 11.116 5.172 10.86C5.54 10.604 5.724 10.264 5.724 9.84C5.724 9.448 5.56 9.132 5.232 8.892C4.904 8.644 4.472 8.452 3.936 8.316L3.012 8.076C2.636 7.98 2.288 7.84 1.968 7.656C1.656 7.464 1.404 7.224 1.212 6.936C1.028 6.64 0.936 6.288 0.936 5.88C0.936 5.12 1.18 4.528 1.668 4.104C2.164 3.672 2.876 3.456 3.804 3.456C4.356 3.456 4.832 3.548 5.232 3.732C5.632 3.908 5.956 4.136 6.204 4.416C6.46 4.688 6.64 4.984 6.744 5.304L5.784 5.64C5.632 5.24 5.376 4.928 5.016 4.704C4.656 4.472 4.22 4.356 3.708 4.356C3.172 4.356 2.744 4.488 2.424 4.752C2.112 5.008 1.956 5.36 1.956 5.808C1.956 6.192 2.08 6.488 2.328 6.696C2.576 6.896 2.9 7.044 3.3 7.14L4.224 7.368C5.04 7.56 5.664 7.88 6.096 8.328C6.536 8.768 6.756 9.244 6.756 9.756C6.756 10.196 6.644 10.6 6.42 10.968C6.196 11.328 5.864 11.616 5.424 11.832C4.992 12.04 4.452 12.144 3.804 12.144ZM10.4671 12.144C9.88309 12.144 9.43109 11.992 9.11109 11.688C8.79109 11.384 8.63109 10.956 8.63109 10.404V4.128H9.59109V10.308C9.59109 10.612 9.67109 10.848 9.83109 11.016C9.99909 11.176 10.2311 11.256 10.5271 11.256C10.6231 11.256 10.7151 11.244 10.8031 11.22C10.8991 11.188 11.0231 11.116 11.1751 11.004L11.5471 11.784C11.3391 11.92 11.1511 12.012 10.9831 12.06C10.8151 12.116 10.6431 12.144 10.4671 12.144ZM7.58709 6.852V6H11.3911V6.852H7.58709ZM15.3391 12.144C14.7551 12.144 14.2391 12.012 13.7911 11.748C13.3431 11.476 12.9911 11.104 12.7351 10.632C12.4871 10.16 12.3631 9.616 12.3631 9C12.3631 8.384 12.4871 7.84 12.7351 7.368C12.9911 6.896 13.3391 6.528 13.7791 6.264C14.2271 5.992 14.7391 5.856 15.3151 5.856C15.8751 5.856 16.3591 5.996 16.7671 6.276C17.1751 6.548 17.4911 6.932 17.7151 7.428C17.9391 7.924 18.0511 8.508 18.0511 9.18H13.0951L13.3351 8.976C13.3351 9.456 13.4191 9.868 13.5871 10.212C13.7631 10.556 14.0071 10.82 14.3191 11.004C14.6311 11.18 14.9871 11.268 15.3871 11.268C15.8111 11.268 16.1671 11.168 16.4551 10.968C16.7511 10.768 16.9791 10.504 17.1391 10.176L17.9671 10.596C17.8151 10.908 17.6111 11.18 17.3551 11.412C17.1071 11.644 16.8111 11.824 16.4671 11.952C16.1311 12.08 15.7551 12.144 15.3391 12.144ZM13.3951 8.568L13.1431 8.376H17.2831L17.0311 8.58C17.0311 8.196 16.9551 7.864 16.8031 7.584C16.6511 7.304 16.4471 7.088 16.1911 6.936C15.9351 6.784 15.6391 6.708 15.3031 6.708C14.9751 6.708 14.6631 6.784 14.3671 6.936C14.0791 7.088 13.8431 7.304 13.6591 7.584C13.4831 7.856 13.3951 8.184 13.3951 8.568ZM19.3219 14.4V6H20.2219L20.2819 7.104V14.4H19.3219ZM22.3099 12.144C21.8059 12.144 21.3619 12.012 20.9779 11.748C20.6019 11.484 20.3099 11.116 20.1019 10.644C19.8939 10.164 19.7899 9.616 19.7899 9C19.7899 8.376 19.8939 7.828 20.1019 7.356C20.3099 6.884 20.6019 6.516 20.9779 6.252C21.3619 5.988 21.8059 5.856 22.3099 5.856C22.8459 5.856 23.3179 5.988 23.7259 6.252C24.1339 6.516 24.4499 6.884 24.6739 7.356C24.9059 7.828 25.0219 8.376 25.0219 9C25.0219 9.616 24.9059 10.164 24.6739 10.644C24.4499 11.116 24.1339 11.484 23.7259 11.748C23.3179 12.012 22.8459 12.144 22.3099 12.144ZM22.0939 11.268C22.4699 11.268 22.8019 11.172 23.0899 10.98C23.3859 10.788 23.6179 10.52 23.7859 10.176C23.9619 9.832 24.0499 9.44 24.0499 9C24.0499 8.56 23.9659 8.168 23.7979 7.824C23.6379 7.48 23.4099 7.212 23.1139 7.02C22.8179 6.828 22.4819 6.732 22.1059 6.732C21.7539 6.732 21.4379 6.828 21.1579 7.02C20.8859 7.212 20.6699 7.48 20.5099 7.824C20.3579 8.168 20.2819 8.56 20.2819 9C20.2819 9.44 20.3579 9.832 20.5099 10.176C20.6699 10.52 20.8859 10.788 21.1579 10.98C21.4299 11.172 21.7419 11.268 22.0939 11.268ZM31.7046 12.144C31.2966 12.144 30.9246 12.084 30.5886 11.964C30.2606 11.836 29.9766 11.672 29.7366 11.472C29.5046 11.272 29.3206 11.06 29.1846 10.836L30.0246 10.368C30.1126 10.48 30.2206 10.608 30.3486 10.752C30.4846 10.888 30.6566 11.004 30.8646 11.1C31.0726 11.196 31.3286 11.244 31.6326 11.244C32.1766 11.244 32.6126 11.088 32.9406 10.776C33.2686 10.464 33.4326 10.072 33.4326 9.6C33.4326 9.24 33.3326 8.936 33.1326 8.688C32.9406 8.44 32.6606 8.252 32.2926 8.124C31.9246 7.996 31.4846 7.932 30.9726 7.932H30.7446V7.14H30.9486C31.4526 7.14 31.9166 7.196 32.3406 7.308C32.7646 7.42 33.1326 7.584 33.4446 7.8C33.7646 8.016 34.0086 8.28 34.1766 8.592C34.3526 8.904 34.4406 9.264 34.4406 9.672C34.4406 10.168 34.3166 10.604 34.0686 10.98C33.8286 11.348 33.5006 11.636 33.0846 11.844C32.6686 12.044 32.2086 12.144 31.7046 12.144ZM30.7446 7.848V7.068H30.9726C31.6606 7.068 32.2046 6.952 32.6046 6.72C33.0126 6.48 33.2166 6.14 33.2166 5.7C33.2166 5.46 33.1526 5.24 33.0246 5.04C32.8966 4.832 32.7086 4.668 32.4606 4.548C32.2206 4.42 31.9406 4.356 31.6206 4.356C31.4046 4.356 31.2006 4.388 31.0086 4.452C30.8246 4.508 30.6526 4.596 30.4926 4.716C30.3406 4.828 30.2006 4.972 30.0726 5.148L29.2806 4.692C29.4326 4.444 29.6246 4.228 29.8566 4.044C30.0966 3.86 30.3686 3.716 30.6726 3.612C30.9766 3.508 31.3086 3.456 31.6686 3.456C32.1566 3.456 32.5926 3.552 32.9766 3.744C33.3686 3.936 33.6766 4.2 33.9006 4.536C34.1246 4.864 34.2366 5.236 34.2366 5.652C34.2366 6.004 34.1526 6.316 33.9846 6.588C33.8166 6.86 33.5806 7.092 33.2766 7.284C32.9806 7.476 32.6326 7.62 32.2326 7.716C31.8406 7.804 31.4126 7.848 30.9486 7.848H30.7446Z" fill="#98A2B3"/>
<rect x="0.5" y="20.5" width="297" height="100" rx="7.5" fill="white"/>
<path d="M62.914 75.21C62.1767 75.21 61.5233 75.056 60.954 74.748C60.394 74.4307 59.9553 73.9967 59.638 73.446C59.3207 72.886 59.162 72.242 59.162 71.514V65.2H60.352V71.514C60.352 72.0273 60.4593 72.4847 60.674 72.886C60.898 73.278 61.206 73.586 61.598 73.81C61.99 74.0247 62.438 74.132 62.942 74.132C63.4553 74.132 63.908 74.0247 64.3 73.81C64.7013 73.586 65.0093 73.278 65.224 72.886C65.448 72.4847 65.56 72.0273 65.56 71.514V65.2H66.736V71.514C66.736 72.242 66.5773 72.886 66.26 73.446C65.9427 73.9967 65.4947 74.4307 64.916 74.748C64.3373 75.056 63.67 75.21 62.914 75.21ZM68.9484 77.8V68H69.9984L70.0684 69.288V77.8H68.9484ZM72.4344 75.168C71.8464 75.168 71.3284 75.014 70.8804 74.706C70.4418 74.398 70.1011 73.9687 69.8584 73.418C69.6158 72.858 69.4944 72.2187 69.4944 71.5C69.4944 70.772 69.6158 70.1327 69.8584 69.582C70.1011 69.0313 70.4418 68.602 70.8804 68.294C71.3284 67.986 71.8464 67.832 72.4344 67.832C73.0598 67.832 73.6104 67.986 74.0864 68.294C74.5624 68.602 74.9311 69.0313 75.1924 69.582C75.4631 70.1327 75.5984 70.772 75.5984 71.5C75.5984 72.2187 75.4631 72.858 75.1924 73.418C74.9311 73.9687 74.5624 74.398 74.0864 74.706C73.6104 75.014 73.0598 75.168 72.4344 75.168ZM72.1824 74.146C72.6211 74.146 73.0084 74.034 73.3444 73.81C73.6898 73.586 73.9604 73.2733 74.1564 72.872C74.3618 72.4707 74.4644 72.0133 74.4644 71.5C74.4644 70.9867 74.3664 70.5293 74.1704 70.128C73.9838 69.7267 73.7178 69.414 73.3724 69.19C73.0271 68.966 72.6351 68.854 72.1964 68.854C71.7858 68.854 71.4171 68.966 71.0904 69.19C70.7731 69.414 70.5211 69.7267 70.3344 70.128C70.1571 70.5293 70.0684 70.9867 70.0684 71.5C70.0684 72.0133 70.1571 72.4707 70.3344 72.872C70.5211 73.2733 70.7731 73.586 71.0904 73.81C71.4078 74.034 71.7718 74.146 72.1824 74.146ZM77.1499 75V65.2H78.2699V75H77.1499ZM83.3201 75.168C82.6388 75.168 82.0321 75.014 81.5001 74.706C80.9774 74.3887 80.5668 73.9547 80.2681 73.404C79.9694 72.8533 79.8201 72.2187 79.8201 71.5C79.8201 70.7813 79.9648 70.1467 80.2541 69.596C80.5528 69.0453 80.9634 68.616 81.4861 68.308C82.0181 67.9907 82.6201 67.832 83.2921 67.832C83.9828 67.832 84.5894 67.9907 85.1121 68.308C85.6441 68.616 86.0548 69.0453 86.3441 69.596C86.6428 70.1467 86.7921 70.7813 86.7921 71.5C86.7921 72.2187 86.6428 72.8533 86.3441 73.404C86.0548 73.9547 85.6488 74.3887 85.1261 74.706C84.6034 75.014 84.0014 75.168 83.3201 75.168ZM83.3201 74.132C83.7868 74.132 84.1928 74.02 84.5381 73.796C84.8834 73.572 85.1541 73.264 85.3501 72.872C85.5554 72.48 85.6581 72.0227 85.6581 71.5C85.6581 70.9773 85.5554 70.52 85.3501 70.128C85.1541 69.736 84.8788 69.428 84.5241 69.204C84.1694 68.98 83.7588 68.868 83.2921 68.868C82.8348 68.868 82.4288 68.98 82.0741 69.204C81.7288 69.428 81.4534 69.736 81.2481 70.128C81.0521 70.52 80.9541 70.9773 80.9541 71.5C80.9541 72.0133 81.0521 72.4707 81.2481 72.872C81.4534 73.264 81.7334 73.572 82.0881 73.796C82.4521 74.02 82.8628 74.132 83.3201 74.132ZM92.6592 75L92.6032 73.852V71.304C92.6032 70.7533 92.5425 70.3007 92.4212 69.946C92.2999 69.582 92.1085 69.3067 91.8472 69.12C91.5859 68.9333 91.2452 68.84 90.8252 68.84C90.4425 68.84 90.1112 68.9193 89.8312 69.078C89.5605 69.2273 89.3365 69.47 89.1592 69.806L88.1512 69.414C88.3285 69.0873 88.5432 68.8073 88.7952 68.574C89.0472 68.3313 89.3412 68.1493 89.6772 68.028C90.0132 67.8973 90.3959 67.832 90.8252 67.832C91.4785 67.832 92.0152 67.9627 92.4352 68.224C92.8645 68.476 93.1865 68.854 93.4012 69.358C93.6159 69.8527 93.7185 70.4687 93.7092 71.206L93.6952 75H92.6592ZM90.5592 75.168C89.7379 75.168 89.0939 74.9813 88.6272 74.608C88.1699 74.2253 87.9412 73.698 87.9412 73.026C87.9412 72.3167 88.1745 71.7753 88.6412 71.402C89.1172 71.0193 89.7799 70.828 90.6292 70.828H92.6312V71.766H90.8812C90.2279 71.766 89.7612 71.8733 89.4812 72.088C89.2105 72.3027 89.0752 72.6107 89.0752 73.012C89.0752 73.376 89.2105 73.6653 89.4812 73.88C89.7519 74.0853 90.1299 74.188 90.6152 74.188C91.0165 74.188 91.3665 74.104 91.6652 73.936C91.9639 73.7587 92.1925 73.5113 92.3512 73.194C92.5192 72.8673 92.6032 72.4847 92.6032 72.046H93.0792C93.0792 72.998 92.8645 73.7587 92.4352 74.328C92.0059 74.888 91.3805 75.168 90.5592 75.168ZM100.664 75L100.608 73.698V65.2H101.728V75H100.664ZM98.2419 75.168C97.6166 75.168 97.0659 75.014 96.5899 74.706C96.1139 74.398 95.7406 73.9687 95.4699 73.418C95.2086 72.858 95.0779 72.2187 95.0779 71.5C95.0779 70.772 95.2086 70.1327 95.4699 69.582C95.7406 69.0313 96.1139 68.602 96.5899 68.294C97.0659 67.986 97.6166 67.832 98.2419 67.832C98.8299 67.832 99.3432 67.986 99.7819 68.294C100.23 68.602 100.575 69.0313 100.818 69.582C101.061 70.1327 101.182 70.772 101.182 71.5C101.182 72.2187 101.061 72.858 100.818 73.418C100.575 73.9687 100.23 74.398 99.7819 74.706C99.3432 75.014 98.8299 75.168 98.2419 75.168ZM98.4939 74.146C98.9046 74.146 99.2686 74.034 99.5859 73.81C99.9032 73.586 100.151 73.2733 100.328 72.872C100.515 72.4707 100.608 72.0133 100.608 71.5C100.608 70.9867 100.515 70.5293 100.328 70.128C100.151 69.7267 99.9032 69.414 99.5859 69.19C99.2686 68.966 98.8999 68.854 98.4799 68.854C98.0412 68.854 97.6492 68.966 97.3039 69.19C96.9679 69.414 96.7019 69.7267 96.5059 70.128C96.3099 70.5293 96.2119 70.9867 96.2119 71.5C96.2119 72.0133 96.3099 72.4707 96.5059 72.872C96.7019 73.2733 96.9726 73.586 97.3179 73.81C97.6632 74.034 98.0552 74.146 98.4939 74.146ZM107.776 77.968C107.599 77.968 107.393 77.9307 107.16 77.856C106.927 77.7907 106.679 77.702 106.418 77.59L106.838 76.652C107.053 76.7453 107.239 76.8153 107.398 76.862C107.566 76.9087 107.697 76.932 107.79 76.932C108.042 76.932 108.247 76.862 108.406 76.722C108.574 76.5913 108.714 76.4 108.826 76.148L109.624 74.244L112.214 68H113.418L110.058 75.98C109.881 76.3907 109.694 76.7453 109.498 77.044C109.311 77.3427 109.083 77.5713 108.812 77.73C108.541 77.8887 108.196 77.968 107.776 77.968ZM109.316 75L106.292 68H107.482L110.086 74.23L110.422 75H109.316ZM117.445 75.168C116.764 75.168 116.157 75.014 115.625 74.706C115.102 74.3887 114.692 73.9547 114.393 73.404C114.094 72.8533 113.945 72.2187 113.945 71.5C113.945 70.7813 114.09 70.1467 114.379 69.596C114.678 69.0453 115.088 68.616 115.611 68.308C116.143 67.9907 116.745 67.832 117.417 67.832C118.108 67.832 118.714 67.9907 119.237 68.308C119.769 68.616 120.18 69.0453 120.469 69.596C120.768 70.1467 120.917 70.7813 120.917 71.5C120.917 72.2187 120.768 72.8533 120.469 73.404C120.18 73.9547 119.774 74.3887 119.251 74.706C118.728 75.014 118.126 75.168 117.445 75.168ZM117.445 74.132C117.912 74.132 118.318 74.02 118.663 73.796C119.008 73.572 119.279 73.264 119.475 72.872C119.68 72.48 119.783 72.0227 119.783 71.5C119.783 70.9773 119.68 70.52 119.475 70.128C119.279 69.736 119.004 69.428 118.649 69.204C118.294 68.98 117.884 68.868 117.417 68.868C116.96 68.868 116.554 68.98 116.199 69.204C115.854 69.428 115.578 69.736 115.373 70.128C115.177 70.52 115.079 70.9773 115.079 71.5C115.079 72.0133 115.177 72.4707 115.373 72.872C115.578 73.264 115.858 73.572 116.213 73.796C116.577 74.02 116.988 74.132 117.445 74.132ZM127.274 75L127.204 73.712V68H128.324V75H127.274ZM122.29 71.584V68H123.41V71.584H122.29ZM123.41 71.584C123.41 72.2747 123.49 72.802 123.648 73.166C123.807 73.53 124.026 73.782 124.306 73.922C124.596 74.0527 124.918 74.118 125.272 74.118C125.879 74.118 126.35 73.8987 126.686 73.46C127.032 73.0213 127.204 72.41 127.204 71.626H127.75C127.75 72.3633 127.643 72.998 127.428 73.53C127.214 74.062 126.901 74.468 126.49 74.748C126.089 75.028 125.594 75.168 125.006 75.168C124.465 75.168 123.989 75.0607 123.578 74.846C123.168 74.622 122.85 74.272 122.626 73.796C122.402 73.3107 122.29 72.6853 122.29 71.92V71.584H123.41ZM130.895 71.206C130.895 70.45 131.039 69.8387 131.329 69.372C131.618 68.896 131.987 68.546 132.435 68.322C132.892 68.0887 133.373 67.972 133.877 67.972V69.022C133.466 69.022 133.069 69.092 132.687 69.232C132.313 69.3627 132.005 69.582 131.763 69.89C131.52 70.198 131.399 70.618 131.399 71.15L130.895 71.206ZM130.279 75V68H131.399V75H130.279ZM139.084 71.206C139.084 70.45 139.229 69.8387 139.518 69.372C139.808 68.896 140.176 68.546 140.624 68.322C141.082 68.0887 141.562 67.972 142.066 67.972V69.022C141.656 69.022 141.259 69.092 140.876 69.232C140.503 69.3627 140.195 69.582 139.952 69.89C139.71 70.198 139.588 70.618 139.588 71.15L139.084 71.206ZM138.468 75V68H139.588V75H138.468ZM146.265 75.168C145.583 75.168 144.981 75.014 144.459 74.706C143.936 74.3887 143.525 73.9547 143.227 73.404C142.937 72.8533 142.793 72.2187 142.793 71.5C142.793 70.7813 142.937 70.1467 143.227 69.596C143.525 69.0453 143.931 68.616 144.445 68.308C144.967 67.9907 145.565 67.832 146.237 67.832C146.89 67.832 147.455 67.9953 147.931 68.322C148.407 68.6393 148.775 69.0873 149.037 69.666C149.298 70.2447 149.429 70.926 149.429 71.71H143.647L143.927 71.472C143.927 72.032 144.025 72.5127 144.221 72.914C144.426 73.3153 144.711 73.6233 145.075 73.838C145.439 74.0433 145.854 74.146 146.321 74.146C146.815 74.146 147.231 74.0293 147.567 73.796C147.912 73.5627 148.178 73.2547 148.365 72.872L149.331 73.362C149.153 73.726 148.915 74.0433 148.617 74.314C148.327 74.5847 147.982 74.7947 147.581 74.944C147.189 75.0933 146.75 75.168 146.265 75.168ZM143.997 70.996L143.703 70.772H148.533L148.239 71.01C148.239 70.562 148.15 70.1747 147.973 69.848C147.795 69.5213 147.557 69.2693 147.259 69.092C146.96 68.9147 146.615 68.826 146.223 68.826C145.84 68.826 145.476 68.9147 145.131 69.092C144.795 69.2693 144.519 69.5213 144.305 69.848C144.099 70.1653 143.997 70.548 143.997 70.996ZM151.541 75V67.202C151.541 66.474 151.709 65.928 152.045 65.564C152.391 65.1907 152.913 65.004 153.613 65.004C153.8 65.004 154.01 65.0367 154.243 65.102C154.477 65.1673 154.724 65.2607 154.985 65.382L154.565 66.264C154.351 66.18 154.169 66.1147 154.019 66.068C153.87 66.0213 153.744 65.998 153.641 65.998C153.315 65.998 153.067 66.1053 152.899 66.32C152.741 66.5253 152.661 66.8473 152.661 67.286V75H151.541ZM150.253 68.966V68H154.691V68.966H150.253ZM159.034 75.168C158.353 75.168 157.751 75.014 157.228 74.706C156.706 74.3887 156.295 73.9547 155.996 73.404C155.707 72.8533 155.562 72.2187 155.562 71.5C155.562 70.7813 155.707 70.1467 155.996 69.596C156.295 69.0453 156.701 68.616 157.214 68.308C157.737 67.9907 158.334 67.832 159.006 67.832C159.66 67.832 160.224 67.9953 160.7 68.322C161.176 68.6393 161.545 69.0873 161.806 69.666C162.068 70.2447 162.198 70.926 162.198 71.71H156.416L156.696 71.472C156.696 72.032 156.794 72.5127 156.99 72.914C157.196 73.3153 157.48 73.6233 157.844 73.838C158.208 74.0433 158.624 74.146 159.09 74.146C159.585 74.146 160 74.0293 160.336 73.796C160.682 73.5627 160.948 73.2547 161.134 72.872L162.1 73.362C161.923 73.726 161.685 74.0433 161.386 74.314C161.097 74.5847 160.752 74.7947 160.35 74.944C159.958 75.0933 159.52 75.168 159.034 75.168ZM156.766 70.996L156.472 70.772H161.302L161.008 71.01C161.008 70.562 160.92 70.1747 160.742 69.848C160.565 69.5213 160.327 69.2693 160.028 69.092C159.73 68.9147 159.384 68.826 158.992 68.826C158.61 68.826 158.246 68.9147 157.9 69.092C157.564 69.2693 157.289 69.5213 157.074 69.848C156.869 70.1653 156.766 70.548 156.766 70.996ZM164.227 71.206C164.227 70.45 164.372 69.8387 164.661 69.372C164.95 68.896 165.319 68.546 165.767 68.322C166.224 68.0887 166.705 67.972 167.209 67.972V69.022C166.798 69.022 166.402 69.092 166.019 69.232C165.646 69.3627 165.338 69.582 165.095 69.89C164.852 70.198 164.731 70.618 164.731 71.15L164.227 71.206ZM163.611 75V68H164.731V75H163.611ZM171.407 75.168C170.726 75.168 170.124 75.014 169.601 74.706C169.079 74.3887 168.668 73.9547 168.369 73.404C168.08 72.8533 167.935 72.2187 167.935 71.5C167.935 70.7813 168.08 70.1467 168.369 69.596C168.668 69.0453 169.074 68.616 169.587 68.308C170.11 67.9907 170.707 67.832 171.379 67.832C172.033 67.832 172.597 67.9953 173.073 68.322C173.549 68.6393 173.918 69.0873 174.179 69.666C174.441 70.2447 174.571 70.926 174.571 71.71H168.789L169.069 71.472C169.069 72.032 169.167 72.5127 169.363 72.914C169.569 73.3153 169.853 73.6233 170.217 73.838C170.581 74.0433 170.997 74.146 171.463 74.146C171.958 74.146 172.373 74.0293 172.709 73.796C173.055 73.5627 173.321 73.2547 173.507 72.872L174.473 73.362C174.296 73.726 174.058 74.0433 173.759 74.314C173.47 74.5847 173.125 74.7947 172.723 74.944C172.331 75.0933 171.893 75.168 171.407 75.168ZM169.139 70.996L168.845 70.772H173.675L173.381 71.01C173.381 70.562 173.293 70.1747 173.115 69.848C172.938 69.5213 172.7 69.2693 172.401 69.092C172.103 68.9147 171.757 68.826 171.365 68.826C170.983 68.826 170.619 68.9147 170.273 69.092C169.937 69.2693 169.662 69.5213 169.447 69.848C169.242 70.1653 169.139 70.548 169.139 70.996ZM175.984 75V68H177.034L177.104 69.288V75H175.984ZM180.898 75V71.416H182.018V75H180.898ZM180.898 71.416C180.898 70.7253 180.819 70.198 180.66 69.834C180.501 69.47 180.282 69.2227 180.002 69.092C179.722 68.952 179.405 68.882 179.05 68.882C178.434 68.882 177.953 69.1013 177.608 69.54C177.272 69.9693 177.104 70.5807 177.104 71.374H176.558C176.558 70.6367 176.665 70.002 176.88 69.47C177.095 68.938 177.407 68.532 177.818 68.252C178.229 67.972 178.723 67.832 179.302 67.832C179.853 67.832 180.329 67.944 180.73 68.168C181.141 68.3827 181.458 68.728 181.682 69.204C181.915 69.68 182.027 70.3053 182.018 71.08V71.416H180.898ZM186.913 75.168C186.222 75.168 185.611 75.014 185.079 74.706C184.547 74.3887 184.131 73.9547 183.833 73.404C183.534 72.8533 183.385 72.2187 183.385 71.5C183.385 70.7813 183.529 70.1467 183.819 69.596C184.117 69.0453 184.533 68.616 185.065 68.308C185.597 67.9907 186.203 67.832 186.885 67.832C187.557 67.832 188.159 67.986 188.691 68.294C189.223 68.602 189.629 69.036 189.909 69.596L188.887 70.058C188.7 69.6847 188.429 69.3953 188.075 69.19C187.72 68.9753 187.314 68.868 186.857 68.868C186.399 68.868 185.993 68.98 185.639 69.204C185.293 69.428 185.018 69.7407 184.813 70.142C184.617 70.534 184.519 70.9867 184.519 71.5C184.519 72.0133 184.617 72.4707 184.813 72.872C185.018 73.264 185.298 73.572 185.653 73.796C186.017 74.02 186.427 74.132 186.885 74.132C187.342 74.132 187.748 74.0153 188.103 73.782C188.467 73.5487 188.742 73.222 188.929 72.802L189.951 73.264C189.671 73.8613 189.265 74.328 188.733 74.664C188.201 75 187.594 75.168 186.913 75.168ZM194.431 75.168C193.749 75.168 193.147 75.014 192.625 74.706C192.102 74.3887 191.691 73.9547 191.393 73.404C191.103 72.8533 190.959 72.2187 190.959 71.5C190.959 70.7813 191.103 70.1467 191.393 69.596C191.691 69.0453 192.097 68.616 192.611 68.308C193.133 67.9907 193.731 67.832 194.403 67.832C195.056 67.832 195.621 67.9953 196.097 68.322C196.573 68.6393 196.941 69.0873 197.203 69.666C197.464 70.2447 197.595 70.926 197.595 71.71H191.813L192.093 71.472C192.093 72.032 192.191 72.5127 192.387 72.914C192.592 73.3153 192.877 73.6233 193.241 73.838C193.605 74.0433 194.02 74.146 194.487 74.146C194.981 74.146 195.397 74.0293 195.733 73.796C196.078 73.5627 196.344 73.2547 196.531 72.872L197.497 73.362C197.319 73.726 197.081 74.0433 196.783 74.314C196.493 74.5847 196.148 74.7947 195.747 74.944C195.355 75.0933 194.916 75.168 194.431 75.168ZM192.163 70.996L191.869 70.772H196.699L196.405 71.01C196.405 70.562 196.316 70.1747 196.139 69.848C195.961 69.5213 195.723 69.2693 195.425 69.092C195.126 68.9147 194.781 68.826 194.389 68.826C194.006 68.826 193.642 68.9147 193.297 69.092C192.961 69.2693 192.685 69.5213 192.471 69.848C192.265 70.1653 192.163 70.548 192.163 70.996ZM202.536 75V68H203.656V75H202.536ZM203.11 66.376C202.924 66.376 202.76 66.306 202.62 66.166C202.48 66.026 202.41 65.8627 202.41 65.676C202.41 65.48 202.48 65.3167 202.62 65.186C202.76 65.046 202.924 64.976 203.11 64.976C203.306 64.976 203.47 65.046 203.6 65.186C203.74 65.3167 203.81 65.48 203.81 65.676C203.81 65.8627 203.74 66.026 203.6 66.166C203.47 66.306 203.306 66.376 203.11 66.376ZM205.72 75V68H206.77L206.826 68.98C207.041 68.6067 207.316 68.322 207.652 68.126C207.988 67.93 208.38 67.832 208.828 67.832C209.388 67.832 209.864 67.9627 210.256 68.224C210.658 68.4853 210.947 68.882 211.124 69.414C211.32 68.9007 211.605 68.5087 211.978 68.238C212.361 67.9673 212.814 67.832 213.336 67.832C214.12 67.832 214.736 68.0933 215.184 68.616C215.642 69.1387 215.866 69.932 215.856 70.996V75H214.736V71.416C214.736 70.7253 214.662 70.198 214.512 69.834C214.372 69.47 214.181 69.2227 213.938 69.092C213.696 68.952 213.416 68.882 213.098 68.882C212.548 68.882 212.118 69.1013 211.81 69.54C211.502 69.9693 211.348 70.5807 211.348 71.374V75H210.228V71.416C210.228 70.7253 210.154 70.198 210.004 69.834C209.864 69.47 209.668 69.2227 209.416 69.092C209.174 68.952 208.894 68.882 208.576 68.882C208.035 68.882 207.61 69.1013 207.302 69.54C206.994 69.9693 206.84 70.5807 206.84 71.374V75H205.72ZM221.94 75L221.884 73.852V71.304C221.884 70.7533 221.824 70.3007 221.702 69.946C221.581 69.582 221.39 69.3067 221.128 69.12C220.867 68.9333 220.526 68.84 220.106 68.84C219.724 68.84 219.392 68.9193 219.112 69.078C218.842 69.2273 218.618 69.47 218.44 69.806L217.432 69.414C217.61 69.0873 217.824 68.8073 218.076 68.574C218.328 68.3313 218.622 68.1493 218.958 68.028C219.294 67.8973 219.677 67.832 220.106 67.832C220.76 67.832 221.296 67.9627 221.716 68.224C222.146 68.476 222.468 68.854 222.682 69.358C222.897 69.8527 223 70.4687 222.99 71.206L222.976 75H221.94ZM219.84 75.168C219.019 75.168 218.375 74.9813 217.908 74.608C217.451 74.2253 217.222 73.698 217.222 73.026C217.222 72.3167 217.456 71.7753 217.922 71.402C218.398 71.0193 219.061 70.828 219.91 70.828H221.912V71.766H220.162C219.509 71.766 219.042 71.8733 218.762 72.088C218.492 72.3027 218.356 72.6107 218.356 73.012C218.356 73.376 218.492 73.6653 218.762 73.88C219.033 74.0853 219.411 74.188 219.896 74.188C220.298 74.188 220.648 74.104 220.946 73.936C221.245 73.7587 221.474 73.5113 221.632 73.194C221.8 72.8673 221.884 72.4847 221.884 72.046H222.36C222.36 72.998 222.146 73.7587 221.716 74.328C221.287 74.888 220.662 75.168 219.84 75.168ZM227.565 77.968C227.117 77.968 226.706 77.9213 226.333 77.828C225.969 77.744 225.656 77.646 225.395 77.534C225.143 77.4313 224.961 77.3427 224.849 77.268L225.269 76.358C225.39 76.4233 225.563 76.5027 225.787 76.596C226.011 76.6987 226.272 76.7827 226.571 76.848C226.879 76.9227 227.206 76.96 227.551 76.96C227.999 76.96 228.4 76.8667 228.755 76.68C229.119 76.5027 229.399 76.218 229.595 75.826C229.8 75.4433 229.903 74.9487 229.903 74.342V68H231.023V74.328C231.023 75.1307 230.874 75.8027 230.575 76.344C230.276 76.8853 229.866 77.2913 229.343 77.562C228.82 77.8327 228.228 77.968 227.565 77.968ZM227.523 74.944C226.898 74.944 226.347 74.7947 225.871 74.496C225.395 74.1973 225.022 73.782 224.751 73.25C224.49 72.7087 224.359 72.0927 224.359 71.402C224.359 70.6927 224.49 70.072 224.751 69.54C225.022 68.9987 225.395 68.5787 225.871 68.28C226.347 67.9813 226.898 67.832 227.523 67.832C228.111 67.832 228.624 67.9813 229.063 68.28C229.502 68.5787 229.842 68.9987 230.085 69.54C230.337 70.072 230.463 70.6927 230.463 71.402C230.463 72.102 230.337 72.718 230.085 73.25C229.842 73.782 229.502 74.1973 229.063 74.496C228.624 74.7947 228.111 74.944 227.523 74.944ZM227.789 73.978C228.2 73.978 228.564 73.866 228.881 73.642C229.198 73.418 229.446 73.1147 229.623 72.732C229.8 72.34 229.889 71.8873 229.889 71.374C229.889 70.8793 229.796 70.4407 229.609 70.058C229.432 69.666 229.184 69.3627 228.867 69.148C228.559 68.924 228.195 68.812 227.775 68.812C227.336 68.812 226.944 68.924 226.599 69.148C226.263 69.3627 225.997 69.666 225.801 70.058C225.614 70.4407 225.521 70.8793 225.521 71.374C225.521 71.8873 225.619 72.34 225.815 72.732C226.011 73.1147 226.277 73.418 226.613 73.642C226.958 73.866 227.35 73.978 227.789 73.978ZM236.048 75.168C235.367 75.168 234.765 75.014 234.242 74.706C233.719 74.3887 233.309 73.9547 233.01 73.404C232.721 72.8533 232.576 72.2187 232.576 71.5C232.576 70.7813 232.721 70.1467 233.01 69.596C233.309 69.0453 233.715 68.616 234.228 68.308C234.751 67.9907 235.348 67.832 236.02 67.832C236.673 67.832 237.238 67.9953 237.714 68.322C238.19 68.6393 238.559 69.0873 238.82 69.666C239.081 70.2447 239.212 70.926 239.212 71.71H233.43L233.71 71.472C233.71 72.032 233.808 72.5127 234.004 72.914C234.209 73.3153 234.494 73.6233 234.858 73.838C235.222 74.0433 235.637 74.146 236.104 74.146C236.599 74.146 237.014 74.0293 237.35 73.796C237.695 73.5627 237.961 73.2547 238.148 72.872L239.114 73.362C238.937 73.726 238.699 74.0433 238.4 74.314C238.111 74.5847 237.765 74.7947 237.364 74.944C236.972 75.0933 236.533 75.168 236.048 75.168ZM233.78 70.996L233.486 70.772H238.316L238.022 71.01C238.022 70.562 237.933 70.1747 237.756 69.848C237.579 69.5213 237.341 69.2693 237.042 69.092C236.743 68.9147 236.398 68.826 236.006 68.826C235.623 68.826 235.259 68.9147 234.914 69.092C234.578 69.2693 234.303 69.5213 234.088 69.848C233.883 70.1653 233.78 70.548 233.78 70.996Z" fill="#98A2B3"/>
<rect x="0.5" y="20.5" width="297" height="100" rx="7.5" stroke="#B123EB" stroke-dasharray="10 10"/>
</svg>
        </div>

        <div className='inp'>
        <Button className='btn' onClick={updateAll} colorScheme='purple'>Create new project</Button>
        </div>

    </div>
  )
}

export default Data