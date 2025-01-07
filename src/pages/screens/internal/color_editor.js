
const HEX_VALUES = "0123456789ABCDEF";

function newColor() {
    let colors = [];
    for (let i = 0; i < 6; i++)
        colors[i] = HEX_VALUES.charAt(Math.trunc(16 * Math.random()));
    return "#" + colors.join("");
}

export default function ColorEditor(color, setColor) {
    return (
        <div className="flex justify-between">
            <div className="flex self-center">
                <div className="self-center w-6 h-6 rounded-lg" style={{backgroundColor: color}}></div>
                <span className="ps-3 pe-3 self-center">
                    Color #
                </span>
                <input onChange={(e) => setColor("#" + e.target.value)} type="text" value={color.replace("#", "")} className="self-center w-1/3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Código hex"/>
            </div>
            <button onClick={() => setColor(newColor())} className="self-center w-1/3 text-sm p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                Nuevo color
            </button>
        </div>
    );
}
