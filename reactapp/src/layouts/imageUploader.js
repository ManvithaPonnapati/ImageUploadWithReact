import React, {createRef} from 'react';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import {post} from 'axios';
import UploadImages from "../components/UploadImages";
import TagImages from "../components/tagImages";
//Setup for dropzone component. createRef is for creating access/reference to the HTML page's DOM
const dropzoneRef = createRef();
//Define a function openDialog, that can open the file picker when you click the button to select files 
//from a folder to upload
const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
        dropzoneRef.current.open()
    }
};
//CSS Style that can be used if you want to build a preview image component in the page
const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
};

//Beginning of the React component ImageUploader
class ImageUploader extends React.Component {
    //This is a section to initialize any variables/state of the react app
    //props attributes that can be set to initialize a class. FOr example if I was calling a react component called <card> inside
    //some other react component, and i wanted the card to be 100px long, then in <card width="100px"/> , width is a prop. width
    //will be present in this.props in the card react component
    //state variable is essentially a global variable that is initialized in the constructor and can be used to make the 
    //react page dynamic
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            images_uploaded:false
        }
    }


    getAttachedFiles=(files)=>{
        this.setState({
            files: files
        },()=>{
            this.setState({images_uploaded: true})
        })

    }


    render() {

        return (
            <div className="container-fluid">
                <div className="row drag-drop-row">
                    {this.state.images_uploaded == false? <UploadImages fileLoader={this.getAttachedFiles}/>:<TagImages files={this.state.files}/>}
                </div>
                {this.state.images_uploaded == false?
                <div className="row about-row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        <div className="row about-us">
                            <h2> Who are we ? </h2>
                            <p className="bigP">
                                The CCAI project is an interdisciplinary project aimed at creating images of accurate,
                                vivid, and personalized outcomes of climate change. Our goal is to use cutting-edge
                                machine learning techniques to produce images of how neighborhoods and houses will look
                                like following the effects of global warming. By creating a more visceral understanding
                                of the effects of climate change, we aim to strengthen public support for necessary
                                actions and motivate people to make impactful decisions. As a prototype, we first focus
                                on modeling flood consequences on homes.


                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                    </div>

                </div>:<div></div>}
                {this.state.images_uploaded == false?
                <div className="row drag-drop-row">
                </div>:<div></div>}
                {this.state.images_uploaded == false?
                <div className="row about-row">
                </div>:<div></div>}
            </div>


        );
    }
}

export default withCookies(ImageUploader);
