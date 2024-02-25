import "./css/tooltip.css";
import './../global.css';

export default function ToolTip(props) {
    if (props.disabled == true) {
        return (
            props.children
        )
    }
    return (
        <div key={props.tkey} style={props.style} className={`tooltip ${props.className}`}>
            {props.children}
            <span style={props.innerToolTipStyle} class="tooltiptext supershade">{props.text}</span>
        </div>
    )
}