import Login1 from '@/components/login/pages/login1'
import "../../styles/global.css";
import { useEffect, useRef } from 'react';

export default function Login() {
  const shouldSend = useRef(true);

  async function return_url_logic(return_url) {
    // logic to verify this return_url is a valid motionfans site will be done in magiclink.js

    // remove the return_url when a new login window is open, so it's unlikely there a hidden return_url un-related to this login. It's possible to get a random return_url if you were to previous try to login with a return_url, close the tab, request a magiclink from another device, and then open that magiclink on the origina device, but there's literally nothing that can be done to stop that.
    await localStorage.removeItem("return_url");
    if (return_url) {
      try {
        new URL(return_url);
        await localStorage.setItem("return_url");
      } catch (error) {
        alert("Invalid return URL.");
        return;
      }
    }
  }

  useEffect(() => {
    if (shouldSend.current != true) { return; }
    shouldSend.current = false;

    const params = new URLSearchParams(document.location.search);
    const return_url = params.get("return_url");

    return_url_logic(return_url);
  });

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
      <Login1/>
    </div>
  )
}