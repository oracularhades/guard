import './css/DropdownOption1.css';
import './../../global.css';
import check from '../../assets/check.svg';
import Image from 'next/image';

export default function DropdownOption1(props) {
    return (
        <option className={`DropdownOption1 hover ${props.className}`} style={props.style}>
            {props.checked == true && <Image src={check}/>}
            <div>
                {props.children}
            </div>
        </option>
    )
}