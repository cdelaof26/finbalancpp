import GetSVG from "@/pages/svg";
import {useState} from "react";

function createButton(svg_name, svg_style, selected, action) {
    let bg_style = selected ? "bg-accent-1 dark:bg-accent-2" : "";
    if (selected)
        svg_style += " text-accent-fg-1";

    return (
        <button onClick={action} className={"flex justify-center w-[70px] h-[70px] self-center " + bg_style}>
            { GetSVG(svg_name, svg_style) }
        </button>
    );
}

function toggleButton(amount, toggled) {
    let state = [];
    for (let i = 0; i < amount; i++)
        state[i] = toggled === i;
    return state;
}

export default function Sidebar(login_mode, container_func) {
    const svg_style = "w-full h-full p-4 self-center text-accent-fg-0 dark:text-accent-fg-1";
    let icons;

    const l = login_mode ? 3 : 7;
    const [buttonsState, setButtonsState] = useState(toggleButton(l, 1));

    if (login_mode) {
        icons = [
            {"svg": "question-mark-circle", "selected": buttonsState[0], "action": () => {
                container_func.setHelpSectionOpen(true);
                setButtonsState(toggleButton(3, 0));
            }},
            {"svg": "user-circle", "selected": buttonsState[1], "action": () => {
                container_func.setHelpSectionOpen(false);
                container_func.setLoginOpen(true);
                setButtonsState(toggleButton(3, 1));
            }},
            {"svg": "user-plus", "selected": buttonsState[2], "action": () => {
                container_func.setHelpSectionOpen(false);
                container_func.setLoginOpen(false);
                setButtonsState(toggleButton(3, 2));
            }},
        ];
    } else {
        icons = [
            {"svg": "user-circle", "selected": buttonsState[0], "action": () => {
                setButtonsState(toggleButton(7, 0));
                container_func.loadMyAccount();
            }},
            {"svg": "chart-pie", "selected": buttonsState[1], "action": () => {
                setButtonsState(toggleButton(7, 1));
                container_func.loadHome();
            }},
            {"svg": "inbox-arrow-down", "selected": buttonsState[2], "action": () => {
                setButtonsState(toggleButton(7, 2));
                container_func.loadEarningsNCards(0);
            }},
            {"svg": "banknotes", "selected": buttonsState[3], "action": () => {
                setButtonsState(toggleButton(7, 3));
                container_func.loadDebitNDebt();
            }},
            {"svg": "inbox-stack", "selected": buttonsState[4], "action": () => {
                setButtonsState(toggleButton(7, 4));
            }},
            {"svg": "arrow-trending-up", "selected": buttonsState[5], "action": () => {
                setButtonsState(toggleButton(7, 5));
            }},
            {"svg": "currency-dollar", "selected": buttonsState[6], "action": () => {
                setButtonsState(toggleButton(7, 6));
            }},
        ];
    }

    const component = (
        <nav className={"flex flex-col justify-between w-[70px] " + (login_mode ? "bg-primary-0 dark:bg-primary-1" : "bg-secondary-0 dark:bg-secondary-1")}>
            <div>
                { icons.map((i) => createButton(i.svg, svg_style, i.selected, i.action)) }
            </div>

            { createButton("arrow-right-end-on-rectangle", svg_style, false) }
        </nav>
    );

    return [component, (id) => { setButtonsState(toggleButton(l, id)) }];
}
