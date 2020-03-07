import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import BBCodeTools from "../../utils/BBCodeTools";
import HtmlTools from "../../utils/HtmlTools";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './Home.css';
import Button from "react-bootstrap/Button";

class Home extends React.Component {

    canvasId = 'jpgPreview';
    fileName = 'bbcode2img.jpg';

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            config: '',
            customStyle: HtmlTools.getBaseStyle(),
            imageReady: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBBCodeChange = this.handleBBCodeChange.bind(this);
        this.handleConfigChange = this.handleConfigChange.bind(this);
        this.handleCustomStyleChange = this.handleCustomStyleChange.bind(this);
        this.createDownloadImage = this.createDownloadImage.bind(this);
    }

    /*
    ** HANDLE EVENT
    **/
    handleBBCodeChange(event) {
        this.setState({bbcode: event.target.value});
    }

    handleConfigChange(event) {
        this.setState({config: event.target.value});
    }

    handleCustomStyleChange(event) {
        this.setState({customStyle: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.config === 'custom' && this.state.customStyle.indexOf("<script") >= 0) {
            let input = document.getElementById('customStyleArea');
            input.classList.add("textAreaError");
            return;
        } else {
            let input = document.getElementById('customStyleArea');
            input.classList.remove("textAreaError");
        }

        let html = BBCodeTools.convertToHtml(this.state.bbcode);
        let finalHtml = HtmlTools.addStyling(html, this.state.config, this.state.customStyle);
        this.setState({htmlPreview: finalHtml});
        this.createHtmlPreview(finalHtml);
    }

    /*
    ** CREATE
    **/
    createHtmlPreview(html) {
        let parent = document.getElementById("react-tabs-3");
        HtmlTools.createCanvasPreview(parent, this.canvasId, html, function(success) {
            this.setState({imageReady: success});
        }.bind(this))
    }
    createDownloadImage() {
        let canvas = document.getElementById(this.canvasId);
        HtmlTools.generateDownloadImage(canvas, this.fileName);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <h1 className="center title">BBCode 2 Jpeg</h1>
                    </Row>
                    <Row>
                        <Col>
                            <form onSubmit={this.handleSubmit}>
                                <label className="form-bbcode">
                                    <span>BBCode:</span>
                                    <textarea value={this.state.bbcode}
                                              onChange={this.handleBBCodeChange}/>
                                </label>
                                <label className="form-conf">
                                    <span>Add configuration:</span>
                                    <select className="form-control" value={this.state.config} onChange={this.handleConfigChange}>
                                        <option value="">none</option>
                                        <option value="ogame">Forum</option>
                                        <option value="custom">custom</option>
                                    </select>
                                </label>
                                <label
                                    className={`form-customConf ${this.state.config === 'custom' ? null : 'hidden'}`}>
                                    Custom configuration:
                                    <textarea id="customStyleArea" value={this.state.customStyle} onChange={this.handleCustomStyleChange}/>
                                </label>
                                <input className="form-submit btn btn-secondary" type="submit" value="Generate Jpeg" disabled={!this.state.bbcode}/>
                            </form>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Tabs className="previewTab">
                                        <TabList>
                                            <Tab>HTML</Tab>
                                            <Tab>Jpeg preview</Tab>
                                        </TabList>
                                        <TabPanel>
                                            <textarea className="previewHtml" value={this.state.htmlPreview} readOnly/>
                                        </TabPanel>
                                        <TabPanel>
                                        </TabPanel>
                                    </Tabs>
                                </Col>
                                <Col>
                                    <Button variant="secondary" className="float-right" type="button"
                                            style={{visibility: this.state.imageReady ? 'visible' : 'hidden'}}
                                            onClick={this.createDownloadImage}>Download image</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;