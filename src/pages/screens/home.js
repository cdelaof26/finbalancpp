import Earnings from "@/pages/screens/internal/earnings";
import PreviewWidget from "@/pages/screens/internal/preview_widget";

export default function HomePage() {
    const debt_example = [
        { "color": "#E7473D", "caption": "Pagar tarjeta Liverpool", "value": "12/12/2025" },
        { "color": "#F59D05", "caption": "Devolver dinero a María", "value": "12/12/2025" },
        { "color": "#A5AA05", "caption": "Pagar seguro", "value": "12/12/2025" },
        { "color": "#E44F8F", "caption": "Pagar agua", "value": "12/12/2025" },
    ];

    let debt_options = {
        "className": "mb-2",
        "data": debt_example,
        "buttonCaption": "Ver todos los adeudos y deudas"
    };

    return (
        <div className="flex justify-center w-full">
            { Earnings("16,680", true, false) }
            <div className="flex flex-col w-[40%] mx-4">
                { PreviewWidget("Adeudos y deudas próximas", debt_options) }
                { PreviewWidget("Presupuestos", {"className": "mt-2", "hideButton": true, "buttonCaption": "Ver todos los presupuestos"}) }
            </div>
            <div className="flex flex-col w-[20%]">
                { PreviewWidget("Tips", {"className": "mb-2", "buttonCaption": "Ver más tips"}) }
                { PreviewWidget("Inversiones", {"className": "mt-2", "buttonCaption": "Ver mis inversiones"}) }
            </div>
        </div>
    );
}
