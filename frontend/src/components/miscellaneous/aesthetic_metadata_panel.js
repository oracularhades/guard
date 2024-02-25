import './css/aesthetic_metadata_panel.css';
import './../global.css';
import Logo from '@/logo';

export default function AestheticMetadataPanel(props) {
    // We're going right into CSS here. Just some safety from bad inputs, we need to verify this is a real link.
    let link = null;
    try {
        link = new URL(process.env.NEXT_PUBLIC_login_background).href;
    } catch (error) {
        // Invalid link, ignore.
    }
    
    return (
        <div style={{ backgroundImage: `url(${link})` }} className='aesthetic_metadata_panel_left'>
            <div className='aesthetic_metadata_panel_left_div'>
                {/* {process.env.NEXT_PUBLIC_logo && <img className='aesthetic_metadata_panel_left_logo' src={process.env.NEXT_PUBLIC_logo}/>} */}
                <Logo/>
                {/* {process.env.NEXT_PUBLIC_dashboard_name && <h2 className='aesthetic_metadata_panel_left_header'>{process.env.NEXT_PUBLIC_dashboard_name}</h2>} */}
                <p>We need to verify your identity, please login.</p>
            </div>
        </div>
    )
}