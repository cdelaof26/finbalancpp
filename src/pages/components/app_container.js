import EarningsNCards from "@/pages/screens/earnings_n_cards";
import MyAccount from "@/pages/screens/my_account";
import HomePage from "@/pages/screens/home";
import EarningsEditor from "@/pages/screens/earnings_editor";
import Cards from "@/pages/screens/cards";
import DebitNDebt from "@/pages/screens/debit_n_debt";
import Budgets from "@/pages/screens/budgets";
import Investments from "@/pages/screens/investments";
import Tips from "@/pages/screens/tips";

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
            page = Cards(func);
        break;
        case "debitNDebt":
            titleText = "Mis adeudos y deudas";
            page = DebitNDebt();
        break;
        case "budgets":
            titleText = "Mis presupuestos";
            page = Budgets(func);
        break;
        case "investments":
            titleText = "Mis inversiones";
            page = Investments();
        break;
        case "tips":
            titleText = "Tips";
            page = Tips();
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
