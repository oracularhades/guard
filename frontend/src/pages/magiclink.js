"use client"
import './../components/login/pages/css/magiclink1.css';
import Base from "@/components/base";
import FormStyle_1 from "@/components/login/forms/form_style1";
import { generatePublicPrivateKey, get_auth_url, handle_new, is_motionfans_site } from '@/global';
import { useEffect, useRef, useState } from 'react';

export default function Magiclink(props) {
    const [error, set_error] = useState(null);

    // TODO: ADD STATE PARAMS TO BLOCK CLICKJACKING!

    const shouldSend = useRef(true);

    async function send_magiclink(code_input, params) {
        let code = code_input;
        let error = false;

        if (props.type == "microsoft") {
            await fetch(`${get_auth_url()}/code-exchange/microsoft`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: code,
                    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`
                }),
                redirect: 'error', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            }).then(response => response.json())
            .then(async data => {
                if (data.invalidOrExpired) {
                    alert(data.message);
                    return;
                }
                if (data.ok == true) {
                    // await localStorage.setItem("ms_access_token", data.access_token);
                    code = data.access_token;
                }
                if (data.error == true) {
                    set_error(data.message);
                    error = true;
                }
            });
        }

        if (error == true) {
            return;
        }
        
        const keys = await generatePublicPrivateKey();

        await fetch(`${get_auth_url()}/magiclink`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                public_key: keys.publicKeyNaked,
                code: code,
                type: props.type
            }),
            redirect: 'error', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then(response => response.json())
        .then(async data => {
            if (data.invalidOrExpired) {
                alert(data.message);
                return;
            }
            if (data.ok == true) {
                await handle_new(data.deviceID, keys.privateKeyNaked);
                alert("done");

                const return_url = await localStorage.getItem("return_url");
                if (return_url) {
                    try {
                        new URL(return_url);
                    } catch (error) {
                        alert("return_url is invalid");
                        return;
                    }

                    if (is_motionfans_site(return_url) != true) {
                        alert("return_url is not a valid motionfans site.");
                        return;
                    }

                    window.location.href = return_url;
                }
            }
            if (data.error == true) {
                set_error(data.message);
            }
        });
    }

    useEffect(() => {
        if (shouldSend.current != true) { return; }
        shouldSend.current = false;

        const params = new URLSearchParams(document.location.search);
        const code = params.get("code");

        send_magiclink(code, params);
    });
    
    return (
        <Base style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
            {error == null && <FormStyle_1 header={false} className="magiclink_form" style={{ rowGap: 5 }}>
                <img className='magiclink_img' src="/assets/crystalball.png"/>
                <h2 className='magiclink_checkyouremail'>Opening the portal...</h2>
                <p className='magiclink_wesentalink'>Logging you in, just a moment.</p>
            </FormStyle_1>}

            {error && <FormStyle_1 header={false} className="magiclink_form" style={{ rowGap: 5 }}>
                <img className='magiclink_img' src="/assets/warningsign.png"/>
                <h2 className='magiclink_checkyouremail'>Invalid Magiclink</h2>
                <p className='magiclink_wesentalink greyText'>{error}</p>
            </FormStyle_1>}
        </Base>
    )
}