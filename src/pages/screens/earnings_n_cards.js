import Earnings from "@/pages/screens/internal/earnings";
import GetSVG from "@/pages/svg";

export default function EarningsNCards({func}) {
    return (
        <div className="flex justify-center w-full">
            <Earnings earnings="16680" func={func}></Earnings>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <h1 className="font-bold text-2xl mb-2 indent-10">
                    Gestión de ingresos
                </h1>
                <div className="flex flex-col text-lg">
                    <aside>
                        En este apartado puedes registrar tus ingresos según distintas categorías que puedes definir.
                    </aside>
                    <aside className="flex justify-center">
                        <aside className="self-center">
                            Presiona en
                        </aside>
                        <GetSVG name="pencil" classNameData="self-center mx-1 w-6 h-6"></GetSVG>
                        <aside className="self-center">
                            para empezar.
                        </aside>
                    </aside>
                </div>
                <h1 className="font-bold text-2xl my-2 indent-10">
                    Gestión de tarjetas
                </h1>
                <aside className="flex flex-col text-lg">
                    Además de tus ingresos, también puedes manejar tus tarjetas de debito y crédito en un solo lugar.
                    <aside className="flex justify-center">
                        Presiona en
                        <aside className="font-bold mx-2">
                            Nueva tarjeta
                        </aside>
                        para empezar.
                    </aside>
                </aside>
            </div>
        </div>
    );
}
