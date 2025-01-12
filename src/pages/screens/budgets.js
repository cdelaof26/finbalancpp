import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";
import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import EPreviewArticle, {format_money} from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";
import GetSVG from "@/pages/svg";
import {useState} from "react";
import {newColor} from "@/pages/screens/internal/color_editor";

function Recommendation({title = null, body = null, icon = null, deleteAction = null}) {
    if (title === null || body === null || icon === null)
        return <NothingToSee></NothingToSee>;

    return (
        <section className="flex flex-col p-4 mb-4 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                <GetSVG name={icon} classNameData={"w-8 h-8 mr-3 " + (icon === "shield-check" ? "text-blue-500" : "text-red-500")}></GetSVG>
                <Title title={title} icons={["x-mark"]} action={[deleteAction]}></Title>
            </div>
            <div>
                { body }
            </div>
        </section>
    );
}

function newArticle() {
    return {
        "caption": "", "value": "0", "editable": true, "color": newColor()
    };
}

export default function Budgets({func}) {
    // const [recommendations, setRecommendations] = useState([]);
    const [recommendations, setRecommendations] = useState([
        {"title": "Incrementar presupuesto para Hogar", "body": "Recommendation body", "icon": "exclamation-triangle"},
        {"title": "Has realizado 5 simulaciones finacieras", "body": "Congrats", "icon": "shield-check"}
    ]);

    const deleteRecommendation = (index) => {
        const newRecommendations = [...recommendations];
        newRecommendations.splice(index, 1);
        setRecommendations(newRecommendations);
    }

    const [articles, setArticles] = useState([]);

    const validateNewBudget = (index, newBudgetValue) => {
        let totalInBudgets = Number(newBudgetValue);
        for (let i = 0; i < articles.length; i++)
            if (i !== index)
                totalInBudgets += Number(articles[i].value);

        const earnings = Number(func.userEarnings);
        const e = totalInBudgets > earnings;
        if (e)
            func.setError("Ingresos insuficientes", "El valor acumulado " + format_money("" + totalInBudgets) + " excede la cantidad de ingresos por " + format_money("" + (totalInBudgets - earnings)));

        return !e; // if earnings > totalInBudgets -> proceed to set property
    };

    const setProperty = (value, property, index) => {
        const newArticles = [...articles];
        const a = newArticles[index];
        a[property] = value;
        newArticles[index] = a;
        setArticles(newArticles);
    };

    const createArticle = () => {
        const newArticles = [...articles];
        newArticles.push(newArticle());
        setArticles(newArticles);
    };

    const deleteArticle = (index) => {
        const newArticles = [...articles];
        newArticles.splice(index, 1);
        setArticles(newArticles);
    };

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-[40%] rounded-2xl">
                <Earnings showCards={false} func={func}></Earnings>
                <div className="flex overflow-y-auto flex-col h-full mt-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                    <Title title="Sugerencias"></Title>
                    { recommendations.map(r => <Recommendation title={r.title} body={r.body} icon={r.icon} deleteAction={deleteRecommendation}></Recommendation>) }
                </div>
            </div>
            <div className="flex overflow-y-auto flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Categorías" icons={["plus"]} action={[createArticle]}></Title>
                { articles.map((a, index) => <EPreviewArticle editableClassName="h-48" indicator="Limite en"
                    title={a.caption} setTitle={(v) => {setProperty(v, "caption", index)}}
                    color={a.color} setColor={(v) => {setProperty(v, "color", index)}}
                    editable={a.editable} setEditable={(v) => {setProperty(v, "editable", index)}}
                    value={a.value} deleteAction={() => deleteArticle(index)}
                    component={<NumericValueEditor setError={func.setError} initialValue={a.value} setValue={(v) => {if (validateNewBudget(index, v)) setProperty(v, "value", index)}} showModify={true}></NumericValueEditor>}></EPreviewArticle>)
                }
            </div>
        </div>
    );
}
