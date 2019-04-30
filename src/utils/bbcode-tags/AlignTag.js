import React from 'react';
import {Tag} from "bbcode-to-react";

class AlignTag extends Tag {
    toReact() {
        return (
            <div className="center">{this.getComponents()}</div>
        );
    }
}

export default AlignTag;