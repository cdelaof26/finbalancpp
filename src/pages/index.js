import LoginContainer from "@/pages/components/login_container";
import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";
import {useState} from "react";

export default function Home() {
    const [showLogin, setShowLogin] = useState(true);
    // const [showLogin, setShowLogin] = useState(false); // debug

    let login_container_func = LoginContainer(setShowLogin);
    let app_container_func = AppContainer();
    let sidebar = Sidebar(showLogin, showLogin ? login_container_func[1] : app_container_func[1]);

    return (
        <main className="flex w-full h-dvh">
            { showLogin ? login_container_func[0] : app_container_func[0] }
            {sidebar}
        </main>
    );
}
