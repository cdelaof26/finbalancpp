import InvestmentEditor from "@/pages/screens/internal/investment_editor";
import {format_money} from "@/pages/screens/internal/e_preview_article";
import {format_date, get_date} from "@/pages/screens/debit_n_debt";
import Title from "@/pages/screens/internal/title_with_buttons";
import IconButton from "@/pages/screens/internal/icon_button";
import GetSVG from "@/pages/svg";
import {useEffect, useState} from "react";
import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import {callAPI, fetchData} from "@/api/host";

function investmentTimeHorizonToNumber(investmentTimeHorizon) {
    switch (investmentTimeHorizon.toLowerCase()) {
        case "mensual":
            return 60 * 60 * 24 * 30;
        case "semanal":
            return 60 * 60 * 24 * 7;
        case "diario":
            return 60 * 60 * 24;
        default: // anual
            return 60 * 60 * 24 * 365;
    }
}

export function date_form(n) {
    const d = new Date(Date.parse(n));
    return d.getFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate();
}

function addInvestmentTimeHorizonTo(d, ith) {
    const date = Math.round(new Date(d).getTime() / 1000);
    if (isNaN(date))
        return d;

    const newDate = new Date((date + investmentTimeHorizonToNumber(ith)) * 1000);
    return newDate.getFullYear() + "-" + (newDate.getUTCMonth() + 1) + "-" + newDate.getUTCDate();
}

function Article({
         caption = "", value = "", color = "",
         expectedValue = "", investmentDate = "", performance = "",
         investmentTimeHorizon = "", editable = false, setEditable = null,
         deleteAction = null
}) {

    // investmentTimeHorizon IS NOW investmentDateEnd

    const no_movement_expected = value === expectedValue;
    const increase_expected = Number(value) < Number(expectedValue);

    return (
        <article className="flex flex-col w-full p-3 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="flex self-center">
                        { caption.length === 0 ? "Inversión sin nombre" : caption }
                    </div>
                    <div className="flex self-center">
                        <label className="self-center">
                            { "Se invirtieron " + format_money(value) }
                        </label>
                    </div>
                </div>

                <div>
                    <div className="flex justify-center">
                        <GetSVG name={ no_movement_expected ? "arrows-right-left" : "arrow-trending-"  + (increase_expected ? "up" : "down")} classNameData={"w-6 h-6 " + (no_movement_expected ? "" : increase_expected ? "text-green-500" : "text-red-500")}></GetSVG>
                        <label className="ps-3 font-bold">
                            { format_money(expectedValue) }
                        </label>
                    </div>
                    <label className="flex justify-center font-bold uppercase text-sm text-accent-dim-0 dark:text-accent-dim-1">
                        { no_movement_expected ? "Sin movimiento" : increase_expected ? "crecimiento" : "decremento" } esperado para el { format_date(investmentTimeHorizon) }
                    </label>
                </div>

                <div className="flex justify-between">
                    <label className="self-center">
                        Rendimiento {performance + "%"}
                    </label>
                    <div className="flex">
                        <IconButton icon="trash" className="self-center mx-2 w-8 h-8" action={deleteAction}></IconButton>
                        <IconButton icon="pencil" className="self-center w-8 h-8" paintPressed={editable} action={setEditable}></IconButton>
                    </div>
                </div>
            </div>
        </article>
    );
}

function newArticle() {
    return {
        "caption": "", "investmentType": "", "performance": "0",
        "investmentTimeHorizon": get_date(), "investmentDate": get_date(), "value": "0", "expectedValue": "",
        "editable": true
    };
}

export default function Investments({func}) {
    const [investments, setInvestments] = useState([]);
    const [loadedInvestment, setLoadedInvestment] = useState(-1);

    useEffect(() => {
        const set = (articles) => {
            for (let a of articles)
                a["expectedValue"] = calculateFinalBalance("" + a["value"], "" + a["performance"], "anual");
            setInvestments(articles);
        }

        fetchData("investments", func.userId).then(set).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", "Inversiones no disponibles"); });
    }, []);

    const createArticle = () => {
        const a = newArticle();

        const push = ({ id }) => {
            a["id"] = id;
            const newInvestments = [...investments];
            newInvestments.push(a);
            if (loadedInvestment !== -1) {
                const aold = newInvestments[loadedInvestment];
                aold["editable"] = false;
                newInvestments[loadedInvestment] = aold;
            }

            setInvestments(newInvestments);
            setLoadedInvestment(investments.length);
        }

        callAPI("createInvestment", func.userId, a, "POST").then(push).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al crear inversión", "Inversiones no disponibles"); });
    }

    const calculateFinalBalance = (initialBalance, performance, timeHorizon) => {
        // A = P(1 + r/n)^(nt)
        // A = final balance
        // P = principal (initial investment amount)
        // r = annual interest rate (as a decimal)
        // n = number of times interest is compounded per year
        // t = time period (in years)
        if (!timeHorizon.toLowerCase().includes("anua"))
            return initialBalance;

        if (performance.includes("%"))
            performance = performance.replaceAll("%", "");

        if (!/^\d+$/g.test(performance))
            return;

        performance = Number(performance) / 100;
        return "" + (Number(initialBalance) * Math.pow(1 + performance / 1, 1 * 1));
    }

    const day = 60 * 60 * 24;
    function compareDate(d1, d2) {
        const date1 = Math.round(new Date(d1).getTime() / 1000);
        const date2 = Math.round(new Date(d2).getTime() / 1000);
        return date1 > date2 + day * 2;
    }

    let previousCall = "";
    const setProperty = (value, property, index) => {
        if (index === -1 || investments.length < index)
            return;

        const a = investments[index];

        if (property === "investmentDate")
            if (compareDate(value, a["investmentTimeHorizon"])) {
                func.setError("Fecha inválida", "La fecha de inicio no puede ser mayor a la fecha de termino");
                return;
            }

        if (property === "investmentTimeHorizon")
            if (compareDate(a["investmentDate"], value)) {
                func.setError("Fecha inválida", "La fecha de inicio no puede ser mayor a la fecha de termino");
                return;
            }

        const mod = () => {
            const newInvestments = [...investments];

            a[property] = value;
            if (property === "value" || property === "performance" || property === "investmentTimeHorizon")
                a["expectedValue"] = calculateFinalBalance("" + a["value"], "" + a["performance"], "anual");

            newInvestments[index] = a;
            setInvestments(newInvestments);
            setLoadedInvestment(index);
        }

        if (previousCall === property && previousCall === "date")
            return;
        previousCall = property;

        const numeric = property === "performance" || property === "value";
        const is_date = property === "investmentDate" || property === "investmentTimeHorizon";

        if (property !== "editable" && value !== "")
            callAPI("editInvestment", func.userId, {"id": a.id, "property": property, "value": numeric && value === "" ? "0" : is_date && value === "" ? get_date() : value}, "POST").then(mod).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al modificar inversión", "Inversiones no disponibles"); });
        else
            mod();
    }

    const deleteArticle = (index) => {
        const a = investments[index];

        const del = () => {
            const newInvestments = [...investments];
            newInvestments.splice(index, 1);
            setInvestments(newInvestments);
            setLoadedInvestment(newInvestments.length !== 0 ? newInvestments.length - 1 : -1);
        }

        callAPI("deleteInvestment", func.userId, {"id": a.id}, "POST").then(del).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al eliminar inversión", "Inversiones no disponibles"); });
    }

    const loadInvestment = (index) => {
        const newInvestments = [...investments];
        if (loadedInvestment !== -1) {
            const a = newInvestments[loadedInvestment];
            a["editable"] = false;
            newInvestments[loadedInvestment] = a;
        }

        const b = newInvestments[index];
        b["editable"] = true;
        newInvestments[index] = b;

        setInvestments(newInvestments);
        setLoadedInvestment(index);
    }

    let a = loadedInvestment !== -1 ? investments[loadedInvestment] : {};

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-[40%] p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Inversiones" icons={["plus"]} action={[createArticle]}></Title>
                { investments.length === 0 ? <NothingToSee></NothingToSee> : investments.map((a, index) => <Article
                    caption={a.caption} value={a.value} color={a.color}
                    expectedValue={a.expectedValue} investmentDate={a.investmentDate} performance={a.performance}
                    investmentTimeHorizon={a.investmentTimeHorizon} editable={a.editable}
                    setEditable={() => loadInvestment(index)} deleteAction={() => deleteArticle(index)}
                ></Article>) }
            </div>
            <div className={"flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1 " + (investments.length === 0 ? "justify-end" : "")}>
                <Title title={investments.length !== 0 ? "Detalles de la inversión" : ""}></Title>
                <InvestmentEditor
                    caption={a.caption} setCaption={(v) => setProperty(v, "caption", loadedInvestment)}
                    investmentType={a.investmentType} setInvestmentType={(v) => setProperty(v, "investmentType", loadedInvestment)}
                    performance={a.performance} setPerformance={(v) => setProperty(v, "performance", loadedInvestment)}
                    investmentTimeHorizon={a.investmentTimeHorizon} setInvestmentTimeHorizon={(v) => setProperty(v, "investmentTimeHorizon", loadedInvestment)}
                    investmentDate={a.investmentDate} setInvestmentDate={(v) => setProperty(v, "investmentDate", loadedInvestment)}
                    value={a.value} setValue={(v) => setProperty(v, "value", loadedInvestment)}
                    expectedValue={a.expectedValue} setExpectedValue={(v) => setProperty(v, "expectedValue", loadedInvestment)}
                    render={investments.length !== 0}
                ></InvestmentEditor>
                <div className={"m-2 text-right text-accent-dim-0 dark:text-accent-dim-1 " + (investments.length === 0 ? "" : "hidden")}>
                    Presiona sobre + para empezar
                </div>
            </div>
        </div>
    );
}
