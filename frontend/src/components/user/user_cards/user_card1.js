import './../../global.css';
import "./css/user_card1.css";
import UserDetailsRow from "./user_details_row";

export default function UserCard1(props) {
    return (
        <div className="UserCard1">
            <UserDetailsRow/>
            {props.children}
        </div>
    )
}