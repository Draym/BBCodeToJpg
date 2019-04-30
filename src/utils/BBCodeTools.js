import parser from 'bbcode-to-react';
import {renderToString} from 'react-dom/server';
import AlignTag from "./bbcode-tags/AlignTag";

const BBCodeTools = {
    getKeys() {
        return {'[': '#y-u-y-u#', ']': '#a-s-a-s#'};
    },
    correctBBCode(bbcode) {
        let regex = /\[\[(.*)]]/g;
        return bbcode.replace(regex, this.getKeys()['['] + "[$1]" + this.getKeys()[']']);
    },
    correctFinalString(value) {
        const keys = this.getKeys();
        for (let index in keys) {
            console.log(keys[index], index);
            value = value.replace(new RegExp(keys[index], 'g'), index);
        }
        return value;
    },
    convertToHtml(bbcode) {
        parser.registerTag('align', AlignTag);

        bbcode = this.correctBBCode(bbcode);
        let value = renderToString(parser.toReact(bbcode));
        return this.correctFinalString(value);
    }
};
export default BBCodeTools;