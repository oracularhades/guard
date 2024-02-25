"use client"
import './css/magiclink1.css';
import FormStyle_1 from '../forms/form_style1';

import Frame_AestheticMetadataPanel from '@/components/miscellaneous/frame_aesthetic_metadata_panel';
import './../../global.css';

export default function Magiclink1(props) {
  return (
    <Frame_AestheticMetadataPanel>
      <FormStyle_1 className="magiclink_form" header={false}>
        <img className='magiclink_img' src="/assets/magiclink.png"/>
        <h2 className='magiclink_checkyouremail'>Check your email</h2>
        <p className='magiclink_wesentalink'>We sent a link to login to {props.email}</p>
      </FormStyle_1>
    </Frame_AestheticMetadataPanel>
  );
}