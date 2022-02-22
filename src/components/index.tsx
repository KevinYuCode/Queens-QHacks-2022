import "@tensorflow/tfjs"; // Register tfjs kernels

import React, { useState, useRef, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import backend from "@hotg-ai/rune-tflite";
import Webcam from "react-webcam";
import { auth, db } from "../firebase/firebase";
import { updateDoc, arrayUnion, setDoc, doc, getDoc } from "firebase/firestore";
import {
  Parameters,
  useForge,
  registerBackend,
  OutputValue,
} from "@hotg-ai/forge";
import Nav from "../views/Nav";
import { NavLink } from "react-router-dom";
import "../styles/Index.css";
import Compress from "compress.js";
import tempImage from "../assets/placeholder.jpg";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FaTrashAlt } from "react-icons/fa";
import { userQuery } from "./userIngredients";

type Anchor = "right";
let tempArray = [];

// Tell forge to use the tflite model handler
registerBackend(backend());
const compress = new Compress();

const forgeConfig: Parameters = {
  deploymentId: "1e246f96-64db-4fb9-a420-7166e46068ec",
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
  const [ingredientList, setIngredientList] = useState([]);
  const [result, setResult] = useState<OutputValue[]>([]);
  const [image, setImage] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState(null);
  const [rerender, setRerender] = useState(0);
  const [userIngredients, setUserIngredients] = useState([]);
  const forge = useForge(forgeConfig);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  async function saveIngredients() {
    userQuery("OVERWRITE", auth.currentUser.email, ingredientList);
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Ingredients"].map((text) => (
          <ListItem>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {ingredientList.map((text, i) => (
          <ListItem key={i}>
            {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
            <button
              onClick={() => {
                //Add a delete function here!!!!
                tempArray = tempArray.filter((item) => tempArray[i] !== item);

                setIngredientList(tempArray);
              }}
            >
              Delete
            </button>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <div className="index-closepos">
        <button
          className="save-ingredients-btn"
          onClick={() => {
            saveIngredients();
          }}
        >
          Save
        </button>

        <List>
          <div className="index-close" onClick={toggleDrawer(anchor, false)}>
            Close
          </div>
        </List>
      </div>
    </Box>
  );

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

  const updatePost = async () => {
    const docRef = doc(db, "users", auth.currentUser.email);
    await getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setUserIngredients(docSnap.data().ingredients);
      } else {
        console.log("No such document!");
      }
    });
  };

  // We want to re-run the prediction every time our image or the forge object
  // updates.
  useEffect(() => {
    updatePost();
    // console.log(userIngredients);
  }, []);

  useEffect(() => {
    console.log(userIngredients);
    // tempArray.push(userIngredients);
    tempArray = userIngredients;
    setIngredientList(tempArray);
  }, [userIngredients]);

  useEffect(() => {
    if (image && forge.state === "loaded") {
      const img: HTMLImageElement = new Image(300, 300);

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

  async function storeLocal() {
    console.log(tempArray);
    console.log(predictions[0].props.children);
    tempArray.push(predictions[0].props.children);
    setIngredientList(tempArray);
    setRerender(rerender + 1);
  }

  return (
    <>
      <div className="index-bg">
        <div>
          {(["right"] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <div className="index-panelbutton">
                <Button onClick={toggleDrawer(anchor, true)}>
                  Ingredients
                </Button>
              </div>
              <Drawer
                anchor={anchor}
                variant="persistent"
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>

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
                disabled={selectedImage == null}
                onClick={() => {
                  setImage(URL.createObjectURL(selectedImage));
                }}
              >
                Detect
              </button>
            </div>
            <div>
              <div className="index-remove" onClick={() => updateImage()}>
                Remove
              </div>
            </div>
            {/* <ul>{predictions[0]}</ul> */}
            {predictions[0] != null && (
              <>
                <div className="index-predict">
                  <p className="index-display">Ingredient: </p>{" "}
                  <p className="index-predictdisplay">{predictions[0]}</p>
                </div>
                <div>
                  <button
                    className="index-add"
                    disabled={selectedImage == null}
                    onClick={() => {
                      storeLocal();
                    }}
                  >
                    Add Ingredient
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
