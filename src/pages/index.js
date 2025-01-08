import LoginContainer from "@/pages/components/login_container";
import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";
import {useState} from "react";

export default function Home() {
    const [showLogin, setShowLogin] = useState(true);

    const [helpSectionOpen, setHelpSectionOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(true);

    const [earningsVisible, setEarningsVisible] = useState(false);
    const [cardNumberVisible, setCardNumberVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [subPage, setSubPage] = useState(0);
    let func = {
        "setLoginOpen": setLoginOpen,
        "setHelpSectionOpen": setHelpSectionOpen,

        "loadHome": () => { setSubPage(0); setCurrentPage(0); },
        "loadMyAccount": () => { setSubPage(0); setCurrentPage(1); },
        "loadEarningsNCards": (page) => { setSubPage(page); setCurrentPage(2 + page); },
        "loadCards": () => { setSubPage(0); setCurrentPage(4); },
        "loadDebitNDebt": () => { setSubPage(0); setCurrentPage(5); },
        "loadBudgets": () => { setSubPage(0); setCurrentPage(6) },
        "loadInvestments": () => { setSubPage(0); setCurrentPage(7) },
        "loadTips": () => { setSubPage(0); setCurrentPage(8) },

        "subPage": subPage,
        "earningsVisible": earningsVisible,
        "setEarningsVisible": setEarningsVisible,
        "cardNumberVisible": cardNumberVisible,
        "setCardNumberVisible": setCardNumberVisible
    };

    let login = <LoginContainer helpSectionOpen={helpSectionOpen} loginOpen={loginOpen} setShowLogin={setShowLogin}></LoginContainer>
    let sidebar_func = Sidebar(showLogin, func);
    func.setSidebarToggled = sidebar_func[1];

    let pages = [
        <AppContainer page_name={"home"} func={func}></AppContainer>,
        <AppContainer page_name={"myAccount"}></AppContainer>,
        <AppContainer page_name={"earningsNCards"} func={func}></AppContainer>,
        <AppContainer page_name={"earnings"} func={func}></AppContainer>,
        <AppContainer page_name={"cards"} func={func}></AppContainer>,
        <AppContainer page_name={"debitNDebt"} func={func}></AppContainer>,
        <AppContainer page_name={"budgets"} func={func}></AppContainer>,
        <AppContainer page_name={"investments"}></AppContainer>,
        <AppContainer page_name={"tips"}></AppContainer>
    ];

    return (
        <main className="flex w-full h-dvh">
            { showLogin ? login : pages[currentPage] }
            { sidebar_func[0] }
        </main>
    );
}
