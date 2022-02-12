import React, { useState } from "react";
import ImageResize from "./ImageResizer";

function App() {
  const [imageToResize, setImageToResize] = useState(undefined);
  const [resizedImage, setResizedImage] = useState(undefined);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageToResize(event.target.files[0]);
    }
  };

  return (
    <div className="app">
      <h1>Image Resizer</h1>
      <p>
        Please, upload an image and it will be showed both original and resized
        by 50%
      </p>
      <input type="file" accept="image/*" onChange={onUploadFile} />
      <div>
        <ImageResize
          imageToResize={imageToResize}
          onImageResized={(croppedImage) => setResizedImage(croppedImage)}
        />
      </div>
      {resizedImage && (
        <div>
          <h2>Resized Image</h2>
          <img alt="Resize Img" src={resizedImage} />
        </div>
      )}
    </div>
  );
}

export default App;
