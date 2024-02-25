'use client'
import { useState } from "react";
import "./css/hover_frame.css";
import './../global.css';

export default function HoverFrame(props) {
    if (!props.hover || props.disabled == true) {
        return (
            props.children
        )
    };

    const [showing, set_showing] = useState(false);

    return (
        <div key={props.tkey} style={props.style} className={`hoverframe ${props.className}`}>
            <div onClick={() => { set_showing(!showing); }}>{props.children}</div>
            {showing == true && <span style={props.innerToolTipStyle} class="hoverframetext supershade">{props.hover}</span>}
        </div>
    )
}