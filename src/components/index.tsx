import "@tensorflow/tfjs"; // Register tfjs kernels

import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import backend from "@hotg-ai/rune-tflite";
import Webcam from "react-webcam";
import { Parameters, useForge, registerBackend, OutputValue } from "@hotg-ai/forge";
import Nav from '../views/Nav'
import { NavLink } from 'react-router-dom'
import "../styles/Index.css"

// Tell forge to use the tflite model handler
registerBackend(backend());

const forgeConfig: Parameters = {
    deploymentId: 15,
                apiKey: "79304708d95fa6cab067031a966ca54d9db0a01b",
                baseURL: "https://stg-forge.hotg.ai",
                telemetry: {
                  baseURL: "https://stg-telemetry.hotg.ai",
            }
};

export default function App() {
    const [result, setResult] = useState<OutputValue[]>([]);
    const [image, setImage] = useState<string | undefined>();
    const forge = useForge(forgeConfig);
    const webcamRef = useRef<Webcam | null>(null);

    // We want to re-run the prediction every time our image or the forge object
    // updates.
    useEffect(() => {
        if (image && forge.state === "loaded") {
            const img: HTMLImageElement = new Image();

            img.onload = () => {
                try {
                    const result = forge.predict({ image: [img] });
                    setResult(result);
                } catch (error) {
                    console.log(error);
                }
            }
            img.src = image;
        }
    }, [image, forge]);

    const videoConstraints = {
        width: 400,
        height: 300,
        facingMode: "user",
    };

    // A callback that gets fired whenever the webcam's <video> element fires
    // its "timeupdate" event - roughly every 15-250ms. This is about as close
    // to a "onnextframe" event as we can get.
    // https://stackoverflow.com/questions/17044567/get-frame-change-in-video-html5
    const onTimeUpdated = () => {
        if (forge.state != "loaded") {
            return;
        }
        const screenshot = webcamRef.current?.getCanvas();

        if (screenshot) {
            setImage(screenshot.toDataURL("image/jpeg"));
        }
    };

    const predictions = result.flatMap(v => [...v.elements])
        .map((p, i) => (<li key={i}>{p}</li>));

    return (
        <div >
            
        <div className="index-bg">
            {/* <h1>Process: ({forge.state})</h1> */}
            <h1>Ingredient Detection</h1>
            <a href='\' className="index-back"> 
                Back
             </a>
            <Webcam className="index-webcam"
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onTimeUpdate={onTimeUpdated}
            />
            <ul>{predictions}</ul>
        </div>
             
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));