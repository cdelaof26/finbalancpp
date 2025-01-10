import LoginContainer from "@/pages/components/login_container";
import AppContainer from "@/pages/components/app_container";
import Sidebar from "@/pages/components/sidebar";
import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);
  //  const [showLogin, setShowLogin] = useState(false); // debug

  const [earningsVisible, setEarningsVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [subPage, setSubPage] = useState(0);
  let func = {
    loadHome: () => {
      setSubPage(0);
      setCurrentPage(0);
    },
    loadMyAccount: () => {
      setSubPage(0);
      setCurrentPage(1);
    },
    loadEarningsNCards: (page) => {
      setSubPage(page);
      setCurrentPage(2 + page);
    },
    loadCards: () => {
      setSubPage(0);
      setCurrentPage(4);
    },
    loadDebitNDebt: () => {
      setSubPage(0);
      setCurrentPage(5);
    },
    loadBudgets: () => {
      setSubPage(0);
      setCurrentPage(6);
    },
    loadInvestments: () => {
      setSubPage(0);
      setCurrentPage(7);
    },
    loadTips: () => {
      setSubPage(0);
      setCurrentPage(8);
    },

    subPage: subPage,
    earningsVisible: earningsVisible,
    setEarningsVisible: setEarningsVisible,
  };

  let login_container_func = LoginContainer(setShowLogin);
  let sidebar_func = Sidebar(
    showLogin,
    showLogin ? login_container_func[1] : func,
  );
  func.setSidebarToggled = sidebar_func[1];

  let pages = [
    AppContainer("home", func),
    AppContainer("myAccount"),
    AppContainer("earningsNCards", func),
    AppContainer("earnings", func),
    AppContainer("cards", func),
    AppContainer("debitNDebt"),
    AppContainer("budgets", func),
    AppContainer("investments"),
    AppContainer("tips"),
  ];

  return (
    <main className="flex w-full h-dvh">
      {showLogin ? login_container_func[0] : pages[currentPage]}
      {sidebar_func[0]}
    </main>
  );
}
