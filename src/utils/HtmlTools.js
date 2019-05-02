import * as rasterizeHTML from "rasterizehtml";

const structure = `
<head>
<style>
{{style}}
</style>
<title>bbcode2html</title>
</head>
<body>
{{value}}
</body>
`;
const styles = {
    base: `/* Custom */
    body {
    }
    
    /* Default styling */
    html, body, div, canvas {
      margin: 0;
      padding: 0;
    }
    .center {
    margin: auto;
    text-align: center;
    }
    .left {
    float: left;
    text-align: center;
    }
    .right {
    float: right;
    text-align: center;
    }`,
    ogame: `body {
    background-color: #102131;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.28;}`
};

const HtmlTools = {
    addStyling(html, config, customStyle) {
        //let regex = /<br\/>(.*?)<br\/>/g;
        let htmlValue = html
            .replace(/(?:\r\n|\r|\n)/g, '<br/>');
        //.replace(regex, "<br/><span>$1</span><br/>")
        //.replace(/<span><\/span>/g, "");


        let style = styles['base'];

        if (config === 'custom') {
            style += "\n" + customStyle;
        } else if (config && config !== "" && styles[config]) {
            style += "\n" + styles[config];
        }
        return structure.replace("{{style}}", style).replace("{{value}}", htmlValue);
    },
    getBaseStyle() {
        return styles['base'];
    },
    convertToJpg(canvas) {
        return canvas.toDataURL("image/jpg");
    },
    /*
    * parent: DOM element
    * canvasId: id of the canvas DOM element
    * html: html value to render in the canvas
    * callback: action to execute
    **/
    createCanvasPreview(parent, canvasId, html, callback) {
        let canvas = this.generatePreviewCanvas(parent, canvasId);
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log(html);
        rasterizeHTML.drawHTML(html).then(function (renderResult) {
            canvas.width = renderResult.image.width;
            canvas.height = renderResult.image.height;
            console.log(renderResult.image.width, renderResult.image.height);
            context.drawImage(renderResult.image, 0, 0);
            callback(true);
        });
    },
    /*
    * parent: DOM element
    * canvasId: id of the canvas DOM element
    **/
    generatePreviewCanvas(parent, canvasId) {
        let canvas = document.createElement("canvas");

        canvas.id = canvasId;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        parent.appendChild(canvas);
        return canvas;
    },
    /*
    * canvas: DOM element
    * fileName: download file's name
    **/
    generateDownloadImage(canvas, fileName) {
        let imageData = HtmlTools.convertToJpg(canvas);
        // create temporary link
        let tmpLink = document.createElement('a');
        tmpLink.download = fileName;
        tmpLink.href = imageData;
        // temporarily add link to body and initiate the download
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
    }
};
export default HtmlTools;