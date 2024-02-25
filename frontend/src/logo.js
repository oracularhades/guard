import Link from 'next/link';
import './logo.css';

export default function Logo(props) {
    var motionLogoClass;
    if (props.greyStyle == true) {
        motionLogoClass = "motionlogoGreyed";
    } else {
        motionLogoClass = "motionlogo motionlogoanimation";
    }

    let motionLogoText = "MotionFans";
    if (props.pride == true) {
        motionLogoText = "🌈";
        motionLogoClass = "motionlogo";
    }
    if (props.logoText) {
        motionLogoText = props.logoText;
    }

    let motionLogoStyle = {
        ...props.style,
        display: 'flex',
        flexDirection: 'row',
        backgroundClip: 'text'
    }

    let dest = props.dest;
    if (!dest) {
        dest = "/home";
    }

    return (
        <div to={dest} className={`${motionLogoClass} motionlogoBackgroundClip disable-select`} style={motionLogoStyle}>
            <div className='motionlogoBackgroundClip'>
                <h1 className="motionlogoh1 disable-select">{motionLogoText}</h1>
            </div>
        </div>
    )
}