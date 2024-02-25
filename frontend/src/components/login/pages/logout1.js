"use client"
import './css/logout1.css';
import FormStyle_1 from '../forms/form_style1';
import './../../global.css';
import { credentials_object, logout } from '@/global';
import Frame_AestheticMetadataPanel from '@/components/miscellaneous/frame_aesthetic_metadata_panel';
import { useEffect, useRef, useState } from 'react';

export default function Logout1() {
  const [loading, set_loading] = useState(true);
  const shouldRun = useRef(true);

  async function checkLoggedIn() {
    let credentials = await credentials_object();
    if (!credentials || !credentials.deviceid) {
      window.location.href = "/login";
    } else {
      set_loading(false);
    }
  }

  useEffect(() => {
    if (shouldRun.current != true) { return; }
    shouldRun.current = false;

    checkLoggedIn();
  })

  return (
    <Frame_AestheticMetadataPanel>
      {loading == false && <FormStyle_1 header="Logout">
        <div className='FormStyle_1_div'>
          <button onClick={() => { logout(); }} className='FormStyle_1_div_login_button'>Yes</button>
          <button onClick={() => { window.close(); }} className='FormStyle_1_div_login_button'>No</button>
        </div>
      </FormStyle_1>}
    </Frame_AestheticMetadataPanel>
  );
}
