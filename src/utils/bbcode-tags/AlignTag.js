import React from 'react';
import {Tag} from "bbcode-to-react";

class AlignTag extends Tag {
    toReact() {
        const attributes = {
            align: this.params.align || null
        };
        return (
            <div className={attributes.align}>{this.getComponents()}</div>
        );
    }
}

export default AlignTag;