import Base from "../base";
import Sidebar2 from "./sidebars/sidebar2";
import './../global.css';
import "./css/home.css"

export default function Home1(props) {
    return (
        <Base className="home1">
            <Sidebar2/>
            <div className="home1_children">
                {props.children}
            </div>
        </Base>
    )
}