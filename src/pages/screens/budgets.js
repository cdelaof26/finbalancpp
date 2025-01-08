import Earnings from "@/pages/screens/internal/earnings";
import GetSVG from "@/pages/svg";
import Title from "@/pages/screens/internal/title_with_buttons";
import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";

function Recommendation(data) {
    if (!("title" in data) || !("body" in data) || !("icon" in data))
        return NothingToSee();

    return (
        <section className="flex flex-col p-4 mb-4 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                { GetSVG(data.icon, "w-8 h-8 mr-3 " + (data.icon === "shield-check" ? "text-blue-500" : "text-red-500")) }
                { Title({"title": data.title, "icons": ["x-mark"]}) }
            </div>
            <div>
                { data.body }
            </div>
        </section>
    );
}

export default function Budgets(func) {
    const recommendations = [
        {"title": "Incrementar presupuesto para Hogar", "body": "Recommendation body", "icon": "exclamation-triangle"},
        {"title": "Has realizado 5 simulaciones finacieras", "body": "Congrats", "icon": "shield-check"}
    ];

    const category_example = {
        "caption": "Hogar", "value": "700", "indicator": "Limite en",
        "color": "#67D62B", "editableClassName": "h-48", "component": NumericValueEditor({"showModify": true})
    };

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-[40%] rounded-2xl">
                { Earnings("16,680", [], false, false,  func, false) }
                <div className="flex flex-col h-full mt-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                    { Title({"title": "Sugerencias"}) }
                    { recommendations.map(r => Recommendation(r)) }
                </div>
            </div>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                { Title({"title": "Categorías", "icons": ["plus"]}) }
                { EPreviewArticle(category_example) }
            </div>
        </div>
    );
}
