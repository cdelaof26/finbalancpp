import Earnings from "@/pages/screens/internal/earnings";
import PreviewWidget from "@/pages/screens/internal/preview_widget";

export default function HomePage({func}) {
    const card_details = [
        {"name": "BBVA", "cardType": "0", "cardNumber": "0123 0123 0123 0123"},
        {"name": "Liverpool", "cardType": "1", "cardNumber": "0123 0123 0123 0123"},
        {"name": "Soriana", "cardType": "1", "cardNumber": "0123 0123 0123 0123"}
    ];

    const debt_example = [
        { "color": "#E7473D", "caption": "Pagar tarjeta Liverpool", "value": "12/12/2025" },
        { "color": "#F59D05", "caption": "Devolver dinero a María", "value": "12/12/2025" },
        { "color": "#A5AA05", "caption": "Pagar seguro", "value": "12/12/2025" },
        { "color": "#E44F8F", "caption": "Pagar agua", "value": "12/12/2025" },
    ];

    const debt_data = {
        "className": "mb-2",
        "data": debt_example,
        "buttonCaption": "Ver todos los adeudos y deudas",
        "buttonAction": () => { func.setSidebarToggled(3); func.loadDebitNDebt() }
    };

    const tips_example = [
        { "caption": "Aprende a invertir en bitcoin", "captionClassName": "font-bold", "articleClassName": "my-2 p-4" },
        { "caption": "¡No te dejes engañar! Bitcoin y las estafas online", "captionClassName": "font-bold", "articleClassName": "my-2 p-4" },
        { "caption": "Otro Tip que no aparecerá", "captionClassName": "font-bold", "articleClassName": "my-2 p-4" }
    ];

    const tips_options = {
        "className": "mb-2",
        "data": tips_example,
        "maxItems": 1,
        "buttonCaption": "Ver más tips",
        "buttonAction": () => { func.setSidebarToggled(6); func.loadTips() }
    };

    return (
        <div className="flex justify-center w-full">
            <Earnings earnings={"16680"} cardDetails={card_details} func={func}></Earnings>
            <div className="flex flex-col w-[40%] mx-4">
                <PreviewWidget title="Adeudos y deudas próximas" data={debt_data}></PreviewWidget>
                <PreviewWidget title="Presupuestos" data={ {"className": "mt-2", "icons": ["eye-slash"], "buttonCaption": "Ver todos los presupuestos", "buttonAction": () => { func.setSidebarToggled(4); func.loadBudgets() } } }></PreviewWidget>
            </div>
            <div className="flex flex-col w-[20%]">
                <PreviewWidget title="Tips" data={tips_options}></PreviewWidget>
                <PreviewWidget title="Inversiones" data={ {"className": "mt-2", "buttonCaption": "Ver mis inversiones", "buttonAction": () => { func.setSidebarToggled(5); func.loadInvestments() } } }></PreviewWidget>
            </div>
        </div>
    );
}
