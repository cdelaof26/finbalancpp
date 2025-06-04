import {sumValues} from "@/pages/screens/earnings_editor";
import Earnings from "@/pages/screens/internal/earnings";
import PreviewWidget from "@/pages/screens/internal/preview_widget";
import {useEffect, useState} from "react";
import {fetchData, fetchDataGET} from "@/api/host";

export default function HomePage({func}) {
    /*const debt_example = [
        { "color": "#E7473D", "caption": "Pagar tarjeta Liverpool", "value": "12/12/2025" },
        { "color": "#F59D05", "caption": "Devolver dinero a María", "value": "12/12/2025" },
        { "color": "#A5AA05", "caption": "Pagar seguro", "value": "12/12/2025" },
        { "color": "#E44F8F", "caption": "Pagar agua", "value": "12/12/2025" },
    ];*/

    const debt_options = {
        "className": "mb-2",
        "data": [],
        "buttonCaption": "Ver todos los adeudos y deudas",
        "buttonAction": () => { func.setSidebarToggled(3); func.loadDebitNDebt() }
    };
    const [debOptions, setDebOptions] = useState(debt_options);
    const updateDeb = (data) => {
        const newDebOptions = debt_options;
        newDebOptions["data"] = data;
        setDebOptions(newDebOptions);
    }

    const budgets_data = {
        "className": "mt-2",
        "buttonCaption": "Ver todos los presupuestos",
        "buttonAction": () => { func.setSidebarToggled(4); func.loadBudgets() }
    }
    const [budgetsOptions, setBudgetsOptions] = useState(budgets_data);
    const updateBudgets = (data) => {
        const newBudgetsOptions = budgets_data;
        newBudgetsOptions["data"] = data;
        setBudgetsOptions(newBudgetsOptions);
    }

    const investments_options = {
        "className": "mt-2",
        "buttonCaption": "Ver mis inversiones",
        "buttonAction": () => { func.setSidebarToggled(5); func.loadInvestments() }
    }
    const [investmentOptions, setInvestmentOptions] = useState(budgets_data);
    const updateInvestment = (data) => {
        const newInvestmentOptions = investments_options;
        newInvestmentOptions["data"] = data;
        setInvestmentOptions(newInvestmentOptions);
    }

    const tips_options = {
        "className": "mb-2",
        "data": [],
        "maxItems": 1,
        "buttonCaption": "Ver más tips",
        "buttonAction": () => { func.setSidebarToggled(6); func.loadTips() }
    };
    const [tipsOptions, setTipsOptions] = useState(tips_options);
    const updateTips = (data) => {
        for (let d of data) {
            d["captionClassName"] = "font-bold";
            d["articleClassName"] = "my-2 p-4";
        }

        const newTipsOptions = tips_options;
        newTipsOptions["data"] = data;
        setTipsOptions(newTipsOptions);
    }

    useEffect(() => {
        fetchData("earnings", func.userId).then((v) => { sumValues(v, func.setUserEarnings) }).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", "Categorías no disponibles"); });
        fetchData("previewDeb", func.userId).then(updateDeb).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", "Deudas y adeudos no disponibles"); });
        fetchData("previewBudgets", func.userId).then(updateBudgets).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", "Presupuestos no disponibles"); });
        fetchData("previewInvestments", func.userId).then(updateInvestment).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", "Inversiones no disponibles"); });
        fetchDataGET("previewTips").then(updateTips).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al cargar tips", "Tips no disponibles"); });
    }, []);

    return (
        <div className="flex justify-center w-full">
            <Earnings func={func} canDeleteCards={false}></Earnings>
            <div className="flex flex-col w-[40%] mx-4">
                <PreviewWidget title="Adeudos y deudas próximas" data={debOptions}></PreviewWidget>
                <PreviewWidget title="Presupuestos" data={budgetsOptions}></PreviewWidget>
            </div>
            <div className="flex flex-col w-[20%]">
                <PreviewWidget title="Tips" data={tipsOptions}></PreviewWidget>
                <PreviewWidget title="Inversiones" data={investmentOptions}></PreviewWidget>
            </div>
        </div>
    );
}
