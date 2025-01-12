import LoginContainer from "@/pages/components/login_container";
import IconButton from "@/pages/screens/internal/icon_button";
import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";
import {useState} from "react";

export default function Home() {
    const [showLogin, setShowLogin] = useState(true);

    const [helpSectionOpen, setHelpSectionOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(true);

    const [userEarnings, setUserEarnings] = useState("0");
    const [earningsVisible, setEarningsVisible] = useState(false);
    const [cardNumberVisible, setCardNumberVisible] = useState(false);

    const [errorMsgVisible, setErrorMsgVisible] = useState(false);
    const [errorTitle, setErrorTitle] = useState("Error title");
    const [errorData, setErrorData] = useState("Error data");

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
        "getCurrentPage": () => currentPage,

        "subPage": subPage,
        "userEarnings": userEarnings,
        "setUserEarnings": setUserEarnings,
        "earningsVisible": earningsVisible,
        "setEarningsVisible": setEarningsVisible,
        "cardNumberVisible": cardNumberVisible,
        "setCardNumberVisible": setCardNumberVisible,
        "setError": (title, body) => { setErrorTitle(title); setErrorData(body); setErrorMsgVisible(true) }
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
            <div className={"absolute flex w-1/3 h-24 rounded-xl p-4 bottom-4 right-4 bg-red-800 text-white " + (errorMsgVisible ? "" : "hidden")}>
                <IconButton icon="x-mark" className="w-12 h-12 text-white self-center" toggleIcon={false} action={() => {setErrorMsgVisible(false)}}></IconButton>
                <div className="self-center ml-2 ps-3 h-full border-l">
                    <h5 className="font-bold uppercase text-xs">
                        { errorTitle }
                    </h5>
                    <p>
                        { errorData }
                    </p>
                </div>
            </div>
        </main>
    );
}
