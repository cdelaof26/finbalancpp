import ColorEditor from "@/pages/screens/internal/color_editor";
import {get_date} from "@/pages/screens/debit_n_debt";

export default function InvestmentEditor({
        caption = "", setCaption = null, color = "", setColor = null,
        investmentType = "", setInvestmentType = null, performance = "", setPerformance = null,
        investmentTimeHorizon = "", setInvestmentTimeHorizon = null, investmentDate = get_date(), setInvestmentDate = null,
        value = "", setValue = null, render = true
}) {
    if (!render)
        return null;

    return (
        <div className="flex flex-col justify-between h-full w-full p-4 mt-4 rounded-2xl bg-primary-0 dark:bg-primary-1">
            <section className="flex flex-col">
                <div className="flex justify-between">
                    <div className="self-center w-8 h-8 rounded-full" style={{backgroundColor: color}}></div>
                    <input onChange={e => setCaption(e.target.value)} value={caption} className="self-center ml-3 w-[95%] font-bold ps-3 p-1.5 rounded-lg text-2xl bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Titulo"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Tipo de inversión
                    </label>
                    <input onChange={e => setInvestmentType(e.target.value)} value={investmentType} className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Criptomoneda"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Rendimiento
                    </label>
                    <input onChange={e => setPerformance(e.target.value)} value={performance} className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="6%"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Plazo
                    </label>
                    <input onChange={e => setInvestmentTimeHorizon(e.target.value)} value={investmentTimeHorizon} className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Anual"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Fecha de inversión
                    </label>
                    <input onChange={e => setInvestmentDate(e.target.value)} value={investmentDate} type="date" className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"/>
                </div>
                <div className="flex justify-between mt-4">
                    <label className="self-center text-lg">
                        Cantidad invertida
                    </label>
                    <input onChange={e => setValue(e.target.value)} value={value} className="self-center w-1/2 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="$100"/>
                </div>
                <div className="flex justify-evenly mt-4">
                    <button className="w-1/3 self-center text-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Guardar cambios
                    </button>
                    <button className="w-1/3 self-center text-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Descartar cambios
                    </button>
                </div>
            </section>
            <ColorEditor color={color} setColor={setColor}></ColorEditor>
        </div>
    );
}
