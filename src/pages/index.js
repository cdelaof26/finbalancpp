import LoginContainer from "@/pages/components/login_container";
import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";
import {useState} from "react";

export default function Home() {
    const [showLogin, setShowLogin] = useState(true);
    // const [showLogin, setShowLogin] = useState(false); // debug

    const [currentPage, setCurrentPage] = useState(0);
    let func = {
        "loadHome": () => { setCurrentPage(0); },
        "loadMyAccount": () => { setCurrentPage(1); }
    };

    let login_container_func = LoginContainer(setShowLogin);
    let sidebar = Sidebar(showLogin, showLogin ? login_container_func[1] : func);

    let pages = [
        AppContainer("home"), AppContainer("myAccount")
    ];

    return (
        <main className="flex w-full h-dvh">
            { showLogin ? login_container_func[0] : pages[currentPage] }
            { sidebar }
        </main>
    );
}
