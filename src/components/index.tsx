import "@tensorflow/tfjs"; // Register tfjs kernels

import React, { useState, useRef, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import backend from "@hotg-ai/rune-tflite";
import Webcam from "react-webcam";
import { auth, db } from "../firebase/firebase";
import {
  Parameters,
  useForge,
  registerBackend,
  OutputValue,
} from "@hotg-ai/forge";
import { FaTrashAlt } from "react-icons/fa";
import Nav from "../views/Nav";
import { NavLink } from "react-router-dom";
import "../styles/Index.css";
import Compress from "compress.js";
import tempImage from "../assets/placeholder.jpg";

// Tell forge to use the tflite model handler
registerBackend(backend());
const compress = new Compress();

const forgeConfig: Parameters = {
  deploymentId: 33,
  apiKey: "c89fdacf03f97949523a62c6afbb851abd9380a1",
  baseURL: "https://prd-us-east-1-forge.hotg.ai",
  telemetry: {
    baseURL: "https://prd-us-east-1-telemetry.hotg.ai",
  },
};

// deploymentId: 34,
//                 apiKey: "c89fdacf03f97949523a62c6afbb851abd9380a1",
//                 baseURL: "https://prd-us-east-1-forge.hotg.ai",
//                 telemetry: {
//                   baseURL: "https://prd-us-east-1-telemetry.hotg.ai",
//                 },

// deploymentId: 15,
//   apiKey: "79304708d95fa6cab067031a966ca54d9db0a01b",
//   baseURL: "https://stg-forge.hotg.ai",
//   telemetry: {
//     baseURL: "https://stg-telemetry.hotg.ai",
//   },

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
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    });
    const img = resizedImage[0];
    const base64str = img.data;
    const imgExt = img.ext;
    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
    setSelectedImage(resizedFile);
  }

async function updateImage() {
  setSelectedImage(null);
  predictions[0] = null;
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
          const predict = result[0];
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


  return (
    <>
      <div className="index-bg">
        <div className="index-container">
          <div className="index-content">
            <h5>{forge.state}</h5>
            <h1>Ingredient Detection</h1>
            {forge.state == "loaded" && (

              <input
                className="index-input"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  resizeImageFn(event.target.files[0]);
                }}
              />
            )}

            {selectedImage ? (
              <div className="index-extra">
                <img
                  className="index-img"
                  alt="not found"
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />

                
              </div>
            ) : (
              <div>
                <img
                  className="index-placeholder"
                  alt="not found"
                  src={tempImage}
                />
              </div>
            )}
            <div>
                  <button
                    className="index-detect"
                    disabled = {selectedImage == null}
                    onClick={() => setImage(URL.createObjectURL(selectedImage))}
                  >
                    Detect
                  </button>
                </div>
                <div>
                  <div
                    className="index-remove"
                    onClick={() => updateImage()}
                  >
                    Remove
                  </div>
                </div>
            <div className="index-predict">{predictions[0]}</div>
            {/* <ul>{predictions[0]}</ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
