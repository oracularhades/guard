"use client"
import './css/login1.css';
import FormStyle_1 from '../forms/form_style1';

import Input_with_header from '@/components/input/input_with_header';
import Login_With from '@/components/login/forms/login_with';
import Or_Bar from '@/components/login/forms/or_bar';
import Frame_AestheticMetadataPanel from '@/components/miscellaneous/frame_aesthetic_metadata_panel';
import './../../global.css';
import Magiclink1 from './magiclink1';
import { useState } from 'react';
import { get_auth_url } from '@/global';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Login1() {
  const [magiclink, set_magiclink] = useState(false);
  const [email, set_email] = useState(null);
  const [show_captcha, set_show_captcha] = useState(false);

  // TODO: SET A STATE PARAM TO BLOCK CLICK-JACKING.
  let github_redirect = new URLSearchParams({
    client_id: "33dcb417e59baabfb1c2",
    redirect_uri: "https://auth.motionfans.com/oauth/github",
    scope: "user:email"
  });

  let microsoft_redirect = new URLSearchParams({
    client_id: "bfc94aca-fd29-4b90-be54-306cc673febb",
    redirect_uri: "https://auth.motionfans.com/oauth/microsoft",
    scope: "user.read",
    response_type: "code",
    response_mode: "query"
  });

  if (magiclink == true) {
    return (
      <Magiclink1 email={email}/>
    );
  }

  async function request_magiclink(captcha_token) {
    let return_url = null;
    let only_sign_in = false;

    await fetch(`${get_auth_url()}/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type":"application/json"
      },
      redirect: 'error', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ only_sign_in: only_sign_in, email: email, captcha_token: captcha_token })
    }).then(response => response.json())
    .then(async data => {
      if (data.ok == true) {
        set_magiclink(true);
        if (return_url) {
          await localStorage.setItem("login_return_url", return_url);
        }
        return;
      }
      if (data.lockout == true) {
        // localStorage.setItem("ineligible", JSON.stringify({ message: data.message }));
        return;
      }
      if (data.error == true) {
        return;
      }
    });
  }

  function on_login_start() {
    set_show_captcha(true);
  }

  return (
    <Frame_AestheticMetadataPanel>
      <FormStyle_1 header="Login / Signup">
        <div className='FormStyle_1_div'>
          <Input_with_header header="Email" placeholder={`name@${process.env.NEXT_PUBLIC_email_placeholder_domain}`} value={email} onChange={(e) => { set_email(e.target.value); }} onKeyPress={() => { on_login_start(); }}/>
          {show_captcha == false && <button className='FormStyle_1_div_login_button' onClick={() => { on_login_start(); }}>Login</button>}
          {show_captcha == true && <HCaptcha
            sitekey="9a1a8707-24b1-48f8-aa43-5f47f2a9e8cf"
            size="normal"
            onVerify={(token,ekey) => { request_magiclink(token); }}
          />}
        </div>

        <Or_Bar/>

        <div className='FormStyle_1_div'>
          <Login_With service="Microsoft" icon="https://www.microsoft.com/favicon.ico?v2" redirect={`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${microsoft_redirect.toString()}`}/>
          <Login_With service="Github" icon="https://github.com/favicon.ico" redirect={`https://github.com/login/oauth/authorize?${github_redirect.toString()}`}/>
        </div>

        <p className='you_agree_to'>By continuing or using MotionFans products/services, you agree to the <a className='greyText' href="https://motionfans.com/terms-of-service">Terms of Service</a> and <a className='greyText' href="https://motionfans.com/privacy">Privacy Policy</a></p>
      </FormStyle_1>
    </Frame_AestheticMetadataPanel>
  );
}
