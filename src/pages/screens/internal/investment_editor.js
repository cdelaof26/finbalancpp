import ColorEditor from "@/pages/screens/internal/color_editor";
import {useState} from "react";

export default function InvestmentEditor(data) {
    if (!("caption" in data))
        data.caption = null;

    if (!("value" in data))
        data.value = null;

    if (!("color" in data))
        data.color = "#4422FF";

    const [color, setColor] = useState(data.color);

    return (
        <div className="flex flex-col justify-between h-full w-full p-4 mt-4 rounded-2xl bg-primary-0 dark:bg-primary-1">
            <form className="flex flex-col">
                <div className="flex justify-between">
                    <div className="self-center w-8 h-8 rounded-full" style={{backgroundColor: color}}></div>
                    <input value={data.caption} className="self-center ml-3 w-[95%] font-bold ps-3 p-1.5 rounded-lg text-2xl bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Titulo"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Tipo de inversión
                    </label>
                    <input className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Rendimiento
                    </label>
                    <input className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Plazo
                    </label>
                    <input className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Cantidad invertida
                    </label>
                    <input value={data.value} className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"/>
                </div>
                <div className="flex justify-evenly mt-4 hidden">
                    <button className="w-1/3 self-center text-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Guardar cambios
                    </button>
                    <button className="w-1/3 self-center text-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Descartar cambios
                    </button>
                </div>
            </form>
            { ColorEditor(color, setColor) }
        </div>
    );
}
