import React, { Component } from "react";
import "../styles/DisplayImage.css"

class DisplayImage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: null
      };
  
      this.onImageChange = this.onImageChange.bind(this);
    }
  
    onImageChange = event => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          image: URL.createObjectURL(img)
        });
      }
    };
  
    render() {
      return (
        <div>
          <div>
            <div>
              <div>
              <img   className="DisplayImage-image" src={this.state.image} />
              </div>
              <h1>Select Image</h1>
              <input  type="file" name="myImage" onChange={this.onImageChange} />
            </div>
          </div>
        </div>
      );
    }
  }
  export default DisplayImage;