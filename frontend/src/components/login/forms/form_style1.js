import './css/form_style1.css';
import './../../global.css';

export default function FormStyle_1(props) {
    let header = "Login";
    if (props.header) {
        header = props.header;
    }

    let showHeader = false;
    if (!props.login || !props.header) {
        showHeader = true;
    }
    if (props.header == false) {
        showHeader = false;
    }

    return (
        <div className={`FormStyle_1 shade ${props.className}`} style={props.style}>
            {showHeader && <h1 className='FormStyle_1_header'>{header}</h1>}
            {props.logo && <div className='FormStyle_1_logo'>{props.logo}</div>}

            {props.children}
        </div>
    )
}