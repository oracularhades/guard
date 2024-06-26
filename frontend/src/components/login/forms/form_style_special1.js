import './css/form_style1.css';
import './../../global.css';
import Input_with_header from '@/components/input/input_with_header';
import Login_With from '@/components/login/forms/login_with';
import Magiclink from '@/pages/magiclink';
import { useEffect, useRef, useState } from 'react';
import { Guard } from '@oracularhades/guard';
import Or_Bar from './or_bar';
import FormStyle_1 from './form_style1';
import LoadingSpinner from '@/components/miscellaneous/loadingspinner';
import { get_routing_host, auth_init_params } from '@/global';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function FormStyle_special_1(props) {
    const should_run = useRef(true);
    const metadata = props.metadata;
    const [magiclink, set_magiclink] = useState(false);
    const [email, set_email] = useState(null);
    const [authentication_methods, set_authentication_methods] = useState([]);
    const [state, set_state] = useState(null);
    const [error, set_error] = useState(null);
    const [loading, set_loading] = useState(false);

    async function get_authentication_methods() {
        let routing_host = get_routing_host(window);

        const authentication_methods_v = await Guard().metadata.get_authentication_methods(routing_host.host);
        set_authentication_methods(authentication_methods_v.data);
    }

    useEffect(() => {
        if (should_run.current != true) { return; }
        should_run.current = false;

        get_authentication_methods();
    })

    let header = props.header;
    if (props.header) {
        header = props.header;
    }

    let showHeader = false;
    if (props.header) {
        showHeader = true;
    }
    if (magiclink == true) {
        return (
            <Magiclink email={email}/>
        );
    }

    let email_placeholder = null;
    if (metadata) {
        email_placeholder = `${metadata.username_placeholder}@${metadata.domain_placeholder}`;
    }

    async function start_email_authentication(authentication_method, request_data) {
        set_loading(true);
        set_error(null);

        const auth_init_params_v = await auth_init_params(authentication_method.id, window);
        request_data.state = auth_init_params_v.state;

        let routing_host = get_routing_host(window);
        try {
            const response = await Guard().auth.request(routing_host.host, authentication_method, request_data);
            if (response.ok == true) {
                set_state("check_your_email");
                return;
            }
        } catch (error) {
            set_error(error.message);
        }

        set_loading(false);
    }

    let email_method = null;

    const methods_ul = authentication_methods.map((data) => {
        if (!email_method && data.method_type == "email") {
            email_method = data;
            return;
        }

        return (
            <Login_With authentication_method={data}/>
        )
    });

    const Check_your_email = (() => {
        return (
            <FormStyle_1 header={false} className="magiclink_form" style={{ rowGap: 5 }}>
                <img className='magiclink_img' src="/guard/frontend/assets/magiclink.png"/>
                <h2 className='magiclink_checkyouremail'>Check your email</h2>
                <p className='magiclink_wesentalink'>We've sent you a Magiclink to authenticate with. <b>Remember to check your junk/spam folder.</b></p>
            </FormStyle_1>
        )
    });

    if (state == "check_your_email") {
        return <Check_your_email/>
    } else if (state == "show_captcha") {
        return (
            <div className={`FormStyle_1 shade ${props.className}`} style={props.style}>
                <div className='FormStyle_1_div'>
                    <HCaptcha
                        sitekey="9a1a8707-24b1-48f8-aa43-5f47f2a9e8cf"
                        size="normal"
                        onVerify={(token,ekey) => {  }}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className={`FormStyle_1 shade ${props.className}`} style={props.style}>
                {showHeader && <h1 className='FormStyle_1_header'>{header}</h1>}
                {props.logo && <div className='FormStyle_1_logo'>{props.logo}</div>}

                {loading == false && <div className='FormStyle_1_div'>
                    {error != null && <p className='FormStyle_1_div_error'>Error: {error}</p>}
                    {email_method && <div className='FormStyle_1_div_email'>
                        <Input_with_header header="Email" placeholder={email_placeholder} value={email} onChange={(e) => { set_email(e.target.value); }} autoCapitalize="off"/>
                        <button className='FormStyle_1_div_login_button' onClick={() => { start_email_authentication(email_method.id, { email: email }); }}>Login</button>
                    </div>}
                    {methods_ul.length > 1 && <Or_Bar/>}
                    {methods_ul}
                    {/* {show_captcha == true && <HCaptcha
                        sitekey="9a1a8707-24b1-48f8-aa43-5f47f2a9e8cf"
                        size="normal"
                        onVerify={(token,ekey) => { request_magiclink(token); }}
                    />} */}
                </div>}
                {loading == true && <LoadingSpinner speed="600ms" style={{ width: 15, height: 15, alignSelf: "center" }}/>}

                {/* <Or_Bar/> */}

                {/* <div className='FormStyle_1_div'>
                <Login_With service="Microsoft" icon="https://www.microsoft.com/favicon.ico?v2" redirect={`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${microsoft_redirect.toString()}`}/>
                <Login_With service="Github" icon="https://github.com/favicon.ico" redirect={`https://github.com/login/oauth/authorize?${github_redirect.toString()}`}/>
                </div> */}

                {metadata && metadata.form && metadata.form.bottom_text && <p style={{ fontSize: metadata.form.bottom_text_fontsize }} className='you_agree_to'>{metadata.form.bottom_text}</p>}
            </div>
        )
    }
}