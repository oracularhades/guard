import './css/layout_topbar.css';
import './../global.css';

export default function Layout_Topbar(props) {
    return (
        <div className='Layout_Topbar'>
            {props.children}
        </div>
    )
}