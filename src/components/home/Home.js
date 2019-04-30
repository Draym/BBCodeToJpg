import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import './Home.css';
import BBCodeTools from "../../utils/BBCodeTools";
import HtmlTools from "../../utils/HtmlTools";
import * as rasterizeHTML from "rasterizehtml";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            config: '',
            customStyle: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handleConfigChange = this.handleConfigChange.bind(this);
        this.handleCustomStyleChange = this.handleCustomStyleChange.bind(this);
    }

    handleAreaChange(event) {
        this.setState({value: event.target.value});
    }

    handleConfigChange(event) {
        this.setState({config: event.target.value});
    }

    handleCustomStyleChange(event) {
        this.setState({customStyle: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let html = BBCodeTools.convertToHtml(this.state.value);
        let finalHtml = HtmlTools.addStyling(html, this.state.config, this.state.customStyle);
        this.createHtmlPreview(finalHtml);
    }

    createHtmlPreview(html) {
        let canvas = document.getElementById("canvas");
        // clear
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log(html);
        rasterizeHTML.drawHTML(html).then(function (renderResult) {
            canvas.width = renderResult.image.width;
            canvas.height = renderResult.image.height;
            console.log(renderResult.image.width, renderResult.image.height);
            context.drawImage(renderResult.image, 0, 0);
        });
    }

    createDownloadImage() {
        let canvas = document.getElementById("canvas");

        let imageData = HtmlTools.convertToJpg(canvas);

        // create temporary link
        let tmpLink = document.createElement( 'a' );
        tmpLink.download = 'bbcode2img.jpg';
        tmpLink.href = imageData;

        console.log("hein");
        // temporarily add link to body and initiate the download
        document.body.appendChild( tmpLink );
        tmpLink.click();
        document.body.removeChild( tmpLink );
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="bbcodeArea">
                                    BBCode:
                                    <textarea id="bbcodeArea" value={this.state.value}
                                              onChange={this.handleAreaChange}/>
                                </label>
                                <label>
                                    Add configuration:
                                    <select value={this.state.config} onChange={this.handleConfigChange}>
                                        <option value="">none</option>
                                        <option value="ogame">Ogame RC</option>
                                        <option value="custom">custom</option>
                                    </select>
                                </label>
                                <label style={{visibility: this.state.config === 'custom' ? 'visible' : 'hidden'}}>
                                    Custom configuration:
                                    <textarea value={this.state.customStyle} onChange={this.handleCustomStyleChange}/>
                                </label>
                                <input type="submit" value="submit"/>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="preview">
                                <canvas id="canvas"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <input type="button" value="Download img" onClick={this.createDownloadImage}/>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;