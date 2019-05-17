import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import axios, {post} from 'axios';


//Beginning of the React component ImageUploader
class TagImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    render() {

        return (
            <div className="container-fluid">

            </div>
        );
    }
}

export default withCookies(TagImages);
