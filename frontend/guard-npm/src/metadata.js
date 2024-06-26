import { Guard, getCreds } from "./index.js";

import general from "./general.js";
import { getGuardApiURL } from "./routing.js";

async function get(hostname) {
    const response = await Guard(await getCreds()).fetch_wrapper(`${getGuardApiURL()}/metadata?${general().objectToParams({ hostname })}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'error', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    
    const data = response.json();
    
    return data;
}

async function get_authentication_methods(hostname) {
    const response = await Guard(await getCreds()).fetch_wrapper(`${getGuardApiURL()}/metadata/get-authentication-methods?${general().objectToParams({ hostname })}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'error', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    
    const data = response.json();
    
    return data;
}

const metadata = { get, get_authentication_methods };
export default metadata;