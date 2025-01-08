import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import InvestmentEditor from "@/pages/screens/internal/investment_editor";
import {format_money} from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import IconButton from "@/pages/screens/internal/icon_button";
import GetSVG from "@/pages/svg";
import {useState} from "react";

function Article({
         caption = null, value = null, color = null,
         expectedValue = null, inversionDate = null, performance = null
}) {
    if (caption === null || value === null || color === null
        || expectedValue === null || inversionDate === null || performance === null)
        return <NothingToSee></NothingToSee>

    const [editable, setEditable] = useState(false);

    const increase_expected = Number(value) < Number(expectedValue);

    return (
        <article className="flex flex-col w-full p-3 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="flex self-center">
                        <div className="self-center w-6 h-6 rounded-full" style={{backgroundColor: color}}></div>
                        <label className="ps-3 self-center">
                            { caption }
                        </label>
                    </div>
                    <div className="flex self-center">
                        <label className="self-center">
                            { "Se invirtieron " + format_money(value) }
                        </label>
                    </div>
                </div>

                <div>
                    <div className="flex justify-center">
                        <GetSVG name={"arrow-trending-"  + (increase_expected ? "up" : "down")} classNameData={"w-6 h-6 " + (increase_expected ? "text-green-500" : "text-red-500")}></GetSVG>
                        <label className="ps-3 font-bold">
                            { format_money(expectedValue) }
                        </label>
                    </div>
                    <label className="flex justify-center font-bold uppercase text-sm text-accent-dim-0 dark:text-accent-dim-1">
                        { increase_expected ? "crecimiento" : "decremento" } esperado para el { inversionDate }
                    </label>
                </div>

                <div className="flex justify-between">
                    <label className="self-center">
                        Rendimiento {performance}
                    </label>
                    <div className="flex">
                        <IconButton icon="trash" className="self-center mx-2 w-8 h-8"></IconButton>
                        <IconButton icon="pencil" className="self-center w-8 h-8" toggleBg={true} toggleVar={editable} action={setEditable}></IconButton>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function Investments() {
    const investments_examples = [
        {"caption": "CETES", "value": "300", "color": "#55D9D7",
            "expectedValue": "350", "inversionDate": "12/12/2025", "performance": "del 6% anual"},
        {"caption": "Nu", "value": "1000", "color": "#4422FF",
            "expectedValue": "1200", "inversionDate": "12/12/2025", "performance": "del 12% anual"},
        {"caption": "Monero", "value": "30", "color": "#DDDD11",
            "expectedValue": "10", "inversionDate": "12/12/2025", "performance": "volátil"}
    ];

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-[40%] p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Inversiones" icons={["plus"]}></Title>
                { investments_examples.map(i => <Article caption={i.caption} value={i.value} color={i.color} expectedValue={i.expectedValue} inversionDate={i.inversionDate} performance={i.performance}></Article>) }
            </div>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Detalles de la inversión"></Title>
                <InvestmentEditor></InvestmentEditor>
            </div>
        </div>
    );
}
