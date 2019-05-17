import React, {createRef} from 'react';
import Dropzone from 'react-dropzone';
import {withCookies} from "react-cookie";
import "../styles/image_uploader.css";
import "../styles/tag_images.css";
import axios, {post} from 'axios';


//Beginning of the React component ImageUploader
class TagImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            forms_data: [],
            images_src: []
        }
    }

    componentWillMount() {
        console.log("Pr", this.props.files)
        this.loadImages(this.props.files)

    }

    loadImages = (files) => {
        // Assuming only image
        let images_src = []
        for (let file of files) {
            images_src.push(URL.createObjectURL(file))
        }
        this.setState({
            files:files
        })
        this.setState({
            images_src: images_src
        })
    }
    onInputChange = () => {

    }
    handleSubmit=(e)=>{
        e.preventDefault();
        //Upload Files One by One
        let file_count = 0
        for (let file of this.state.files) {
            let file_description = this.state.image_descriptions[file_count]
            let file_location = this.state.image_locations[file_count]
            this.uploadDropfile(file,file_description,file_location).then((response) => {
                console.log(response);
            })
        }
    }
    uploadDropfile(file,file_description,file_location) {
        console.log("File", file)
        const url = 'http://127.0.0.1:5000/upload_file';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_description', file_description);
        formData.append('file_location', file_location);
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
        let forms_html = []
        let image_count = 0
        for (let form of this.state.images_src) {
            forms_html.push(<div className="col-md-4">
                <form>
                    <div className={"row"}>
                        <img height={"300"} width={"300"} src={form}/>
                    </div>
                    <div className={"row add-top-padding"}>

                        <div className="input-group ">
                            <div className="input-group-prepend">
                                <span style={{'color':'white'}} className="input-group-text input-text">Description</span>
                            </div>
                            <input className="basic-slide" id="tags" name={"tags_" + image_count.toString()} type="text"
                                   placeholder="Describe the image" onChange={this.onInputChange} />
                        </div>


                    </div>
                    <div className={"row add-top-padding"}>

                         <div className="input-group">
                            <div className="input-group-prepend">
                                <span style={{'color':'white'}}  className="input-group-text input-text">Location</span>
                            </div>
                           <input className="basic-slide" id="tags" name={"location_" + image_count.toString()} type="text"
                                   placeholder="Location of the image" onChange={this.onInputChange} />
                        </div>

                    </div>

                </form>
            </div>)
            image_count = image_count + 1
        }
        return (
            <div className="container tagzone-container">
                <div className="row">
                    {forms_html}
                </div>
                <a href="#" className="fancy-button bg-gradient1"
                   onClick={this.handleSubmit}><span>Finish Uploading</span></a>
            </div>
        );
    }
}

export default withCookies(TagImages);
