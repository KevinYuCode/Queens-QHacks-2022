import React, { useState } from "react";
import Resizer from "react-image-file-resizer"

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imageResize = (file) => 
    new Promise((resolve) => {

    Resizer.imageFileResizer(
      file,
      400, //width
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
        setSelectedImage(file)
      },
      "base64",
      400,
      300
    );

  });

  const Resize = async (photo) => {
    try {
      const file = photo;
      const image = imageResize(file);
      console.log(image);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Upload and Display Image</h1>
      {selectedImage && (
        <div>
        <img alt="not fount" src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          
          console.log(event.target.files[0]);
          Resize(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;