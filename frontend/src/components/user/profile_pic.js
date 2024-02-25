import HoverFrame from "../miscellaneous/hover_frame";
import "./css/profile_pic.css";
import './../global.css';

export default function ProfilePic(props) {
    return (
        <HoverFrame hover={props.hover}><button style={props.style} className={`profile_pic ${props.className}`}>
            <img src={}/>
            <div className="online_indicator"/>
        </button></HoverFrame>
    )
}