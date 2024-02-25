import Base from '../base';
import AestheticMetadataPanel from './aesthetic_metadata_panel';
import './css/frame_aesthetic_metadata_panel.css';
import './css/aesthetic_metadata_panel.css';
import './../global.css';

export default function Frame_AestheticMetadataPanel(props) {
    return (
        <Base className={`aesthetic_metadata_panel_frame`}>
          <AestheticMetadataPanel/>
          
          <div className='line'>.</div>
    
          <div className='aesthetic_metadata_panel_right'>
            {props.children}
          </div>
        </Base>
      );
}