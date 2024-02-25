import ProfilePic from '../profile_pic';
import './css/user_details_row.css';
import './../../global.css';

export default function UserDetailsRow(props) {
    return (
        <div className='user_details_row'>
            <ProfilePic/>
            <div className='user_details_row_user_details'>
                <p className='user_details_row_user_details_name'>Josh</p>
                <p className='user_details_row_user_details_subtext greyText'>josh@{process.env.NEXT_PUBLIC_email_placeholder_domain}</p>
            </div>
        </div>
    )
}