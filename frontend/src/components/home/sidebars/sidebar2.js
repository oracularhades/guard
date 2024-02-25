import ProfilePic from "@/components/user/profile_pic";
import "./css/sidebar2.css";
import SidebarButton1 from "./sidebar-buttons/sidebarbutton1";
import UserCard1 from "@/components/user/user_cards/user_card1";

export default function Sidebar2(props) {
    return (
        <div className="sidebar2">
            <ProfilePic hover={<UserCard1>
                <button>Logout</button>
            </UserCard1>}/>
            <SidebarButton1 href="/home" icon="/placeholders/home.svg"/>
            <SidebarButton1 href="/search" icon="/placeholders/search.svg"/>
            <SidebarButton1 href="/thermostat" icon="/placeholders/thermostat.svg"/>
            <SidebarButton1 href="/weather" icon="/placeholders/partly_cloudy_night.svg"/>
            <SidebarButton1 href="/database" icon="/placeholders/database.svg"/>
            <SidebarButton1 href="/satellite" icon="/placeholders/satellite.svg"/>
            <SidebarButton1 href="/files" icon="/placeholders/files.svg"/>
        </div>
    )
}