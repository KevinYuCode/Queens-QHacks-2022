import "@tensorflow/tfjs"; // Register tfjs kernels

import React, { useState, useRef, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import backend from "@hotg-ai/rune-tflite";
import Webcam from "react-webcam";
import {
  Parameters,
  useForge,
  registerBackend,
  OutputValue,
} from "@hotg-ai/forge";
import Nav from "../views/Nav";
import { NavLink } from "react-router-dom";
import "../styles/Index.css";
import "../styles/Image.css";
import Resizer from "react-image-file-resizer";
import ImageResize from "./ImageResizer";
import Compress from 'compress.js';

// Tell forge to use the tflite model handler
registerBackend(backend());
const compress = new Compress()

const forgeConfig: Parameters = {
  deploymentId: 15,
  apiKey: "79304708d95fa6cab067031a966ca54d9db0a01b",
  baseURL: "https://stg-forge.hotg.ai",
  telemetry: {
    baseURL: "https://stg-telemetry.hotg.ai",
  },
};

export default function App(props) {
  const [result, setResult] = useState<OutputValue[]>([]);
  const [image, setImage] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState(null);
  const forge = useForge(forgeConfig);

  async function resizeImageFn(file) {

    const resizedImage = await compress.compress([file], {
      size: 2, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 300, // the max width of the output image, defaults to 1920px
      maxHeight: 300, // the max height of the output image, defaults to 1920px
      resize: true // defaults to true, set false if you do not want to resize the image width and height
    })
    const img = resizedImage[0];
    const base64str = img.data
    const imgExt = img.ext
    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt)
    setSelectedImage(resizedFile);
  }

  // We want to re-run the prediction every time our image or the forge object
  // updates.

  useEffect(() => {
    if (image && forge.state === "loaded") {
      const img: HTMLImageElement = new Image(300, 400);

      img.onload = () => {
        try {
          const result = forge.predict({ image: [img] });
          setResult(result);
          const predict = result[0]
        } catch (error) {
          console.log(error);
        }
      };
      img.src = image;
    }
  }, [image, forge]);

  const predictions = result
    .flatMap((v) => [...v.elements])
    .map((p, i) => <li key={i}>{p}</li>);
    

  const storePrediction = (predictions) => {
    const predict = predictions[0]
  }

  return (
    <div>
      <div className="index-bg">
        <h1>Process: ({forge.state})</h1>
        <h1>Ingredient Detection</h1>
        <a href="\" className="index-back">
          Back
        </a>
        {selectedImage && (
          <div>
            <img
              // className="index-img"
              alt="not found"
               src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
            <button
              onClick={() => 
                setImage(URL.createObjectURL(selectedImage))}
            >
              Detect
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            console.log(event.target.files[0]);
            resizeImageFn(event.target.files[0]);
          }}
        />
        <h3>{predictions[0]}</h3>
        {/* <ul>{predictions[0]}</ul> */}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
