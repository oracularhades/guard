import './css/switcher.css';
import expand_more from '../assets/expand_more.svg';
import Image from 'next/image';
import HoverFrame from './hover_frame';
import './../global.css';

export default function Switcher(props) {
    return (
        <HoverFrame className="switcher_hoverframe" hover={props.children}><button className='switcher hover'>
            <Image src={expand_more}/>
            <h2 className='layout_Topbar_header'>{props.header}</h2>
        </button></HoverFrame>
    )
}