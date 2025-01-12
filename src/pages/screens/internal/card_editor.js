import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";
import GetSVG from "@/pages/svg";
import {useState} from "react";

export default function CardEditor({name = "", card_number = "", card_type = "0"}) {
    const [isDebt, setIsDebt] = useState(card_type === "1");

    return (
        <div className="flex flex-col h-full w-full p-4 mt-4 rounded-2xl bg-primary-0 dark:bg-primary-1">
            <input value={name} className="self-center w-full font-bold ps-3 p-1.5 rounded-lg text-2xl bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Titulo"/>
            <div className="flex justify-between mt-4">
                <label className="self-center text-lg">
                    Número de tarjeta
                </label>
                <input value={card_number} className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Número de tarjeta"/>
            </div>
            <div className="flex justify-between mt-4">
                <label className="self-center text-lg">
                    Tipo de tarjeta
                </label>
                <div className="flex justify-evenly w-1/2">
                    <button onClick={() => setIsDebt(false)} className={"flex flex-col justify-center w-28 h-28 rounded-2xl transition-colors duration-300 border-accent-fg-0 dark:border-accent-fg-1 " + (!isDebt ? "bg-accent-0" : "border")}>
                        <GetSVG name="credit-card" classNameData={"w-12 h-12 self-center " + (!isDebt ? "text-accent-fg-1" : "")}></GetSVG>
                        <label className={"self-center " + (!isDebt ? "font-bold text-accent-fg-1" : "")}>
                            Crédito
                        </label>
                    </button>
                    <button onClick={() => setIsDebt(true)} className={"flex flex-col justify-center w-28 h-28 rounded-2xl transition-colors duration-300 border-accent-fg-0 dark:border-accent-fg-1 " + (isDebt ? "bg-accent-0" : "border")}>
                        <GetSVG name="banknotes" classNameData={"w-12 h-12 self-center " + (isDebt ? "text-accent-fg-1" : "")}></GetSVG>
                        <label className={"self-center " + (isDebt ? "font-bold text-accent-fg-1" : "")}>
                            Débito
                        </label>
                    </button>
                </div>
            </div>
            <div className={"flex justify-between mt-4 " + (isDebt ? "hidden" : "")}>
                <label className="self-center text-lg">
                    Fecha de corte
                </label>
                <input className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Fecha de corte"/>
            </div>
            <div className={"flex justify-between mt-4 " + (isDebt ? "hidden" : "")}>
                <label className="self-center text-lg">
                    Límite de crédito
                </label>
                <input className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="$10,000"/>
            </div>
            <div className="flex flex-col mt-4">
                <label className="text-lg">
                    { !isDebt ? "Crédito utilizado" : "Fondos" }
                </label>
                <NumericValueEditor showAll={true}></NumericValueEditor>
            </div>
        </div>
    );
}
