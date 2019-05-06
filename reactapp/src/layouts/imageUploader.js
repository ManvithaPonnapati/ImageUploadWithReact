import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import axios, {post} from 'axios';

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
            files: []
        }
    }

    //Method called when a new file is dropped or selected using the upload section
    //files is an array of File objects  = https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    onDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    }
    //Method called upload button is submitted. 
    //e is the input event that is automatically passed for this ui event
    handleSubmit = (e) => {
        e.preventDefault() // Stop form submit
        //Iterate through to submit all files
        console.log(this.state.files)
        //upload the first file from the list of smiles(remember state.files is the only you can access the files 
        //from onDrop outside of that method. (example of state functioning like a global variable)
        this.uploadDropfile(this.state.files[0]).then((response) => {
            console.log(response);
        })
    }
    
    //Method for uploading the file to a flask url
    uploadDropfile(file) {
        console.log("File",file)
        const url = 'http://127.0.0.1:5000/upload_file';
        const formData = new FormData();
        formData.append('file', file);
        //Use below if multiple files
        //formData.append('file[]', files[0])
        //formData.append('file[]', files[1])
        
        //Set some headers, Acess controll allow origin allows you to upload files from loclahost:3000 (where react runs) to
        //http://127.0.0.1:5000 where flask is running.
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }
        //axios is a request library used for react to perform HTTP POST/GET requests easily.
        //url - is the post url
        //formData - is the data you wanted to post
        //config is http headers of a http request. 
        //in .then method , the response object is the response from your flask url
        return axios.post(url, formData, config).then(response => {

        })
    }

    render() {

        return (
            <div className="wrapper">
                <Dropzone className="dropzone-container" ref={dropzoneRef} accept="image/png, image/jpg"
                          onDrop={this.onDrop} noClick noKeyboard>
                    {({getRootProps, getInputProps, acceptedFiles}) => {
                        return (
                            <div className="container">
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop the file here</p>
                                    <p className="smallP">(Only *.jpeg and *.png images will be accepted)</p>
                                    <button
                                        type="button"
                                        onClick={openDialog}
                                    >
                                        Click to select file
                                    </button>
                                </div>
                                <div className="row filesRow">
                                    <div className="col-sm-1"></div>
                                    <div className="col-md-11">
                                        <h4>Files being uploaded</h4>
                                        <ul>
                                            {acceptedFiles.map(file => (
                                                <li key={file.path}>
                                                    {file.path} - {file.size} bytes

                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Dropzone>
                <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
            </div>
        );
    }
}

export default withCookies(ImageUploader);
