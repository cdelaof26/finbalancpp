import HomePage from "@/pages/screens/home";
import {useState} from "react";


export default function AppContainer() {
    const [titleText, setTitleText] = useState("FinBalanC++");
    const [currentPage, setCurrentPage] = useState("")

    let func = {
        "loadHome": () => { setCurrentPage(""); }
    };

    let page;
    switch (currentPage) {
        default:
            page = HomePage();
        break;
    }

    let container = (
        <div className="w-full h-full p-6 bg-primary-0 dark:bg-primary-1">
            <div>
                <h2 className="text-3xl font-bold mb-6 text-accent-fg-0 dark:text-accent-fg-1">
                    {titleText}
                </h2>
            </div>
            <div className="flex h-[92%]">
                { page }
            </div>
        </div>
    );

    return [container, func];
}
