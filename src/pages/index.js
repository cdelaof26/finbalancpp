import LoginContainer from "@/pages/components/login_container";
import IconButton from "@/pages/screens/internal/icon_button";
import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";
import {useState} from "react";

export default function Home() {
    const [showLogin, setShowLogin] = useState(true);

    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [userId, setUserId] = useState(-1);

    const [helpSectionOpen, setHelpSectionOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(true);

    const [userEarnings, setUserEarnings] = useState("0");
    const [earningsVisible, setEarningsVisible] = useState(false);
    const [cardNumberVisible, setCardNumberVisible] = useState(false);

    const [errorMsgVisible, setErrorMsgVisible] = useState(false);
    const [errorTitle, setErrorTitle] = useState("Error title");
    const [errorData, setErrorData] = useState("Error data");

    const [successMsgVisible, setSuccessMsgVisible] = useState(false);
    const [successTitle, setSuccessTitle] = useState("Success title");
    const [successData, setSuccessData] = useState("Success data");

    const [currentPage, setCurrentPage] = useState(0);
    const [subPage, setSubPage] = useState(0);
    let func = {
        "mail": mail,
        "setMail": setMail,
        "pass": pass,
        "setPass": setPass,
        "userId": userId,
        "setUserId": setUserId,

        "setLoginOpen": setLoginOpen,
        "setShowLogin": setShowLogin,
        "setHelpSectionOpen": setHelpSectionOpen,

        "loadHome": () => { setSubPage(0); setCurrentPage(0); },
        "loadMyAccount": () => { setSubPage(0); setCurrentPage(1); },
        "loadEarningsNCards": (page) => { setSubPage(page); setCurrentPage(2 + page); },
        "loadCards": (cardToEdit) => { setSubPage(cardToEdit); setCurrentPage(4); },
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
        "setError": (title, body) => { setErrorTitle(title); setErrorData(body); setErrorMsgVisible(true) },
        "setMsg": (title, body) => { setSuccessTitle(title); setSuccessData(body); setSuccessMsgVisible(true) }
    };

    let login = <LoginContainer helpSectionOpen={helpSectionOpen} loginOpen={loginOpen} func={func}></LoginContainer>
    let sidebar_func = Sidebar(showLogin, func);
    func.setSidebarToggled = sidebar_func[1];

    let pages = [
        <AppContainer page_name={"home"} func={func}></AppContainer>,
        <AppContainer page_name={"myAccount"} func={func}></AppContainer>,
        <AppContainer page_name={"earningsNCards"} func={func}></AppContainer>,
        <AppContainer page_name={"earnings"} func={func}></AppContainer>,
        <AppContainer page_name={"cards"} func={func}></AppContainer>,
        <AppContainer page_name={"debitNDebt"} func={func}></AppContainer>,
        <AppContainer page_name={"budgets"} func={func}></AppContainer>,
        <AppContainer page_name={"investments"} func={func}></AppContainer>,
        <AppContainer page_name={"tips"} func={func}></AppContainer>
    ];

    let counter = 0;
    setInterval(() => {
        if (counter === 10) {
            setErrorMsgVisible(false);
            setSuccessMsgVisible(false);
            counter = 0;
        }
        if (errorMsgVisible || successMsgVisible) counter++;
        },
    1000);

    return (
        <main className="flex w-full h-dvh">
            { showLogin ? login : pages[currentPage] }
            { sidebar_func[0] }
            <div className={"absolute flex w-1/2 xl:w-1/3 h-24 rounded-xl p-4 top-4 right-4 bg-blue-600 text-white " + (successMsgVisible ? "" : "hidden")}>
                <IconButton onlyDarkIcon={true} icon="x-mark" className="w-12 h-12 text-white self-center" toggleIcon={false} action={() => {setSuccessMsgVisible(false); counter = 0}}></IconButton>
                <div className="self-center ml-2 ps-3 h-full border-l">
                    <h5 className="font-bold uppercase text-xs">
                        { successTitle }
                    </h5>
                    <p>
                        { successData }
                    </p>
                </div>
            </div>
            <div className={"absolute flex w-1/2 xl:w-1/3 h-24 rounded-xl p-4 bottom-4 right-4 bg-red-800 text-white " + (errorMsgVisible ? "" : "hidden")}>
                <IconButton onlyDarkIcon={true} icon="x-mark" className="w-12 h-12 text-white self-center" toggleIcon={false} action={() => {setErrorMsgVisible(false); counter = 0}}></IconButton>
                <div className="self-center ml-2 ps-3 h-full border-l">
                    <h5 className="font-bold uppercase text-xs">
                        { errorTitle }
                    </h5>
                    <p className={errorData.length > 30 ? "text-sm" : ""}>
                        { errorData }
                    </p>
                </div>
            </div>
        </main>
    );
}
