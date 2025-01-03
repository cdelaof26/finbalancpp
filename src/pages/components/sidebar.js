import GetSVG from "@/pages/svg";
import {useState} from "react";


function createButton(svg_name, svg_style, selected, action) {
    let bg_style = selected ? "bg-sky-500 dark:bg-sky-800" : "";
    if (selected)
        svg_style += " text-white";

    return (
        <button onClick={action} className={"flex justify-center w-[70px] h-[70px] self-center rounded-xl " + bg_style}>
            { GetSVG(svg_name, svg_style) }
        </button>
    );
}


export default function Sidebar(login_mode, container_func) {
    const svg_style = "w-full h-full p-4 self-center text-black dark:text-white";
    let icons;

    if (true || login_mode) {
        const [buttonsState, setButtonsState] = useState([false, true, false]);
        icons = [
            {"svg": "question-mark-circle", "selected": buttonsState[0], "action": () => {
                container_func.setHelpSectionOpen(true);
                setButtonsState([true, false, false]);
            }},
            {"svg": "user-circle", "selected": buttonsState[1], "action": () => {
                container_func.setHelpSectionOpen(false);
                container_func.setLoginOpen(true);
                setButtonsState([false, true, false]);
            }},
            {"svg": "user-plus", "selected": buttonsState[2], "action": () => {
                container_func.setHelpSectionOpen(false);
                container_func.setLoginOpen(false);
                    setButtonsState([false, false, true]);
            }},
        ];
    }

    return (
        <nav className="flex flex-col justify-between w-[70px] bg-white dark:bg-black">
            <div>
                { icons.map((i) => createButton(i.svg, svg_style, i.selected, i.action)) }
            </div>

            { createButton("arrow-right-end-on-rectangle", svg_style, false) }
        </nav>
    );
}
