import ToolTip from '@/components/miscellaneous/tooltip';
import './css/sidebarbutton1.css';

export default function SidebarButton1(props) {
    return (
        <ToolTip text="lol"><a href={props.href} className="Sidebarbutton">
            <button>
                <img src={props.icon}/>
                {props.children && props.children}
            </button>
        </a></ToolTip>
    )
}