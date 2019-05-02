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
    }
};
export default HtmlTools;