import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";
import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";
import GetSVG from "@/pages/svg";

function Recommendation({title = null, body = null, icon = null}) {
    if (title === null || body === null || icon === null)
        return <NothingToSee></NothingToSee>;

    return (
        <section className="flex flex-col p-4 mb-4 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                <GetSVG name={icon} classNameData={"w-8 h-8 mr-3 " + (icon === "shield-check" ? "text-blue-500" : "text-red-500")}></GetSVG>
                <Title title={title} icons={["x-mark"]}></Title>
            </div>
            <div>
                { body }
            </div>
        </section>
    );
}

export default function Budgets({func}) {
    const recommendations = [
        {"title": "Incrementar presupuesto para Hogar", "body": "Recommendation body", "icon": "exclamation-triangle"},
        {"title": "Has realizado 5 simulaciones finacieras", "body": "Congrats", "icon": "shield-check"}
    ];

    const category_examples = [
        {"caption": "Hogar", "value": "700", "indicator": "Limite en",
            "color": "#67D62B", "editableClassName": "h-48", "component": <NumericValueEditor showModify={true}></NumericValueEditor>},
        {"caption": "Videojuegos", "value": "6900", "indicator": "Limite en",
            "color": "#FFD62B", "editableClassName": "h-48", "component": <NumericValueEditor showModify={true}></NumericValueEditor>},
    ];

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-[40%] rounded-2xl">
                <Earnings showCards={false} func={func}></Earnings>
                <div className="flex overflow-y-auto flex-col h-full mt-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                    <Title title="Sugerencias"></Title>
                    { recommendations.map(r => <Recommendation title={r.title} body={r.body} icon={r.icon}></Recommendation>) }
                </div>
            </div>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Categorías" icons={["plus"]}></Title>
                { category_examples.map(e => <EPreviewArticle title={e.caption} value={e.value} indicator={e.indicator} color={e.color} editableClassName={e.editableClassName} component={e.component}></EPreviewArticle>) }
            </div>
        </div>
    );
}
