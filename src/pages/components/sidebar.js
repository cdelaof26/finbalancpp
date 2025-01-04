import GetSVG from "@/pages/svg";
import {useState} from "react";


function createButton(svg_name, svg_style, selected, action) {
    let bg_style = selected ? "bg-sky-500 dark:bg-sky-800" : "";
    if (selected)
        svg_style += " text-accent-fg-1";

    return (
        <button onClick={action} className={"flex justify-center w-[70px] h-[70px] self-center " + bg_style}>
            { GetSVG(svg_name, svg_style) }
        </button>
    );
}


export default function Sidebar(login_mode, container_func) {
    const svg_style = "w-full h-full p-4 self-center text-accent-fg-0 dark:text-accent-fg-1";
    let icons;

    if (login_mode) {
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
    } else {
        const [buttonsState, setButtonsState] = useState([false, true, false, false, false, false, false]);
        icons = [
            {"svg": "user-circle", "selected": buttonsState[0], "action": () => {
                setButtonsState([true, false, false, false, false, false, false]);
            }},
            {"svg": "chart-pie", "selected": buttonsState[1], "action": () => {
                setButtonsState([false, true, false, false, false, false, false]);
            }},
            {"svg": "inbox-arrow-down", "selected": buttonsState[2], "action": () => {
                setButtonsState([false, false,true, false, false, false, false]);
            }},
            {"svg": "banknotes", "selected": buttonsState[3], "action": () => {
                setButtonsState([false, false, false, true, false, false, false]);
            }},
            {"svg": "inbox-stack", "selected": buttonsState[4], "action": () => {
                setButtonsState([false, false, false, false, true, false, false]);
            }},
            {"svg": "arrow-trending-up", "selected": buttonsState[5], "action": () => {
                setButtonsState([false, false, false, false, false, true, false]);
            }},
            {"svg": "currency-dollar", "selected": buttonsState[6], "action": () => {
                setButtonsState([false, false, false, false, false, false, true]);
            }},
        ];
    }

    return (
        <nav className={"flex flex-col justify-between w-[70px] " + (login_mode ? "bg-primary-0 dark:bg-primary-1" : "bg-secondary-0 dark:bg-secondary-1")}>
            <div>
                { icons.map((i) => createButton(i.svg, svg_style, i.selected, i.action)) }
            </div>

            { createButton("arrow-right-end-on-rectangle", svg_style, false) }
        </nav>
    );
}
