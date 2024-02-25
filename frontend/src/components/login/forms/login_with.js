import './css/login_with.css';
import './../../global.css';

export default function Login_With(props) {
    return (
        <a href={props.redirect} className='login_with'><button>
            <img src={props.icon}/>
            <p>Login with {props.service}</p>
        </button></a>
    )
}