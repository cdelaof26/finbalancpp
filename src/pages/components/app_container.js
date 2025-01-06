import EarningsNCards from "@/pages/screens/earnings_n_cards";
import MyAccount from "@/pages/screens/my_account";
import HomePage from "@/pages/screens/home";
import EarningsEditor from "@/pages/screens/earnings_editor";

export default function AppContainer(page_name, func) {
    let page;
    let titleText;
    switch (page_name) {
        case "myAccount":
            titleText = "Mi cuenta";
            page = MyAccount();
        break;
        case "earningsNCards":
            titleText = "Mis ingresos y tarjetas";
            page = EarningsNCards(func);
        break;
        case "earnings":
            titleText = "Mis ingresos";
            page = EarningsEditor(func);
        break;
        case "cards":
            titleText = "Mis tarjetas";
        break;
        default: // home
            titleText = "FinbalanC++";
            page = HomePage(func);
        break;
    }

    return (
        <div className="w-full h-full p-6 bg-primary-0 dark:bg-primary-1">
            <div>
                <h2 className="text-3xl font-bold mb-6 text-accent-fg-0 dark:text-accent-fg-1">
                    { titleText }
                </h2>
            </div>
            <div className="flex h-[92%]">
                { page }
            </div>
        </div>
    );
}
