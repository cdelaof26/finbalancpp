import LoginContainer from "@/pages/components/login_container";
import IconButton from "@/pages/screens/internal/icon_button";
import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";
import { useState } from "react";
import User from "@/models/user";
import { getCard } from "@/models/cards";
import { getEarnings, sumEarnings } from "@/models/earnings";
export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

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
  const [profileSession, setProfileData] = useState({});
  const [card, setCard] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const user = new User({});
  const responseCard = async () => {
    try {
      const response = await getCard();
      setCard(response);
    } catch (error) {}
  };

  const responseEarn = async () => {
    try {
      const response = await getEarnings();
      setEarnings(response);
    } catch (error) {}
  };
  const sum = async () => {
    try {
      const response = await sumEarnings();
      console.log(response);
      setUserEarnings(response.totalIngresos);
    } catch (error) {}
  };
  let func = {
    setLoginOpen: setLoginOpen,
    setHelpSectionOpen: setHelpSectionOpen,

    loadHome: async () => {
      sum();
      responseCard();
      setSubPage(0);
      setCurrentPage(0);
    },
    loadMyAccount: async () => {
      try {
        const response = await user.getProfile();
        setProfileData(response);
      } catch (error) {}
      setSubPage(0);
      setCurrentPage(1);
    },
    loadEarningsNCards: async (page) => {
      responseCard();
      responseEarn();
      setSubPage(page);
      setCurrentPage(2 + page);
    },
    loadCards: async () => {
      responseCard();
      setSubPage(0);
      setCurrentPage(4);
    },
    loadDebitNDebt: async () => {
      setSubPage(0);
      setCurrentPage(5);
    },
    loadBudgets: async () => {
      setSubPage(0);
      setCurrentPage(6);
    },
    loadInvestments: async () => {
      setSubPage(0);
      setCurrentPage(7);
    },
    loadTips: async () => {
      setSubPage(0);
      setCurrentPage(8);
    },
    getCurrentPage: () => currentPage,

    subPage: subPage,
    userEarnings: userEarnings,
    setUserEarnings: setUserEarnings,
    earningsVisible: earningsVisible,
    setEarningsVisible: setEarningsVisible,
    cardNumberVisible: cardNumberVisible,
    setCardNumberVisible: setCardNumberVisible,
    setError: (title, body) => {
      setErrorTitle(title);
      setErrorData(body);
      setErrorMsgVisible(true);
    },
  };

  let login = (
    <LoginContainer
      helpSectionOpen={helpSectionOpen}
      loginOpen={loginOpen}
      setShowLogin={() => {
        setShowLogin(true);
        func.loadHome();
      }}
    ></LoginContainer>
  );
  let sidebar_func = Sidebar(showLogin, func);
  func.setSidebarToggled = sidebar_func[1];

  let pages = [
    <AppContainer
      key="home"
      page_name={"home"}
      func={func}
      data={card}
    ></AppContainer>,
    <AppContainer
      key="myAccount"
      page_name={"myAccount"}
      data={profileSession}
    ></AppContainer>,
    <AppContainer
      key="earningsNCards"
      page_name={"earningsNCards"}
      func={func}
      data={card}
    ></AppContainer>,
    <AppContainer
      key="earnings"
      page_name={"earnings"}
      func={func}
      data={card}
      eranD={earnings}
    ></AppContainer>,
    <AppContainer
      key="cards"
      page_name={"cards"}
      func={func}
      data={card}
    ></AppContainer>,
    <AppContainer
      key="debitNDebt"
      page_name={"debitNDebt"}
      func={func}
    ></AppContainer>,
    <AppContainer
      key="budgets"
      page_name={"budgets"}
      func={func}
    ></AppContainer>,
    <AppContainer key="investments" page_name={"investments"}></AppContainer>,
    <AppContainer key="tips" page_name={"tips"}></AppContainer>,
  ];

  return (
    <main className="flex w-full h-dvh">
      {showLogin ? login : pages[currentPage]}
      {sidebar_func[0]}
      <div
        className={
          "absolute flex w-1/3 h-24 rounded-xl p-4 bottom-4 right-4 bg-red-800 text-white " +
          (errorMsgVisible ? "" : "hidden")
        }
      >
        <IconButton
          icon="x-mark"
          className="w-12 h-12 text-white self-center"
          toggleIcon={false}
          action={() => {
            setErrorMsgVisible(false);
          }}
        ></IconButton>
        <div className="self-center ml-2 ps-3 h-full border-l">
          <h5 className="font-bold uppercase text-xs">{errorTitle}</h5>
          <p>{errorData}</p>
        </div>
      </div>
    </main>
  );
}
