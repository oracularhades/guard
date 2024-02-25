import DropdownOption1 from "@/components/dropdown/options/DropdownOption1";
import Home1 from "@/components/home/home";
import Layout_Topbar from "@/components/layout/layout_topbar";
import Switcher from "@/components/miscellaneous/switcher";

export default function Home() {
    return (
        <div style={{ width: "100%", height: "100vh", overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
            <Home1>
                <Layout_Topbar>
                    <Switcher header={"Example dropdown"}>
                        <DropdownOption1 checked={true}>ok</DropdownOption1>
                    </Switcher>
                </Layout_Topbar>
            </Home1>
        </div>
    )
}