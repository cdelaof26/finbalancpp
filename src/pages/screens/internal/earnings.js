import IconButton from "@/pages/screens/internal/icon_button";
import GetSVG from "@/pages/svg";
import {useState} from "react";
import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";

const CardType = {
    0: "Crédito", 1: "Débito"
}

function Card(card_name, card_type, card_number, visible_card_number) {
    if (!visible_card_number)
        card_number = card_number.replaceAll(/\d{4} /g, "**** ")

    return (
        <article className="flex justify-between my-4 p-3 w-full rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                <div className="flex flex-col mx-4">
                    { GetSVG("credit-card", "w-12 h-12 self-center") }
                    <label className="self-center uppercase text-xs font-bold text-accent-dim-0 dark:text-accent-dim-1">
                        { CardType[card_type] }
                    </label>
                </div>
                <div className="flex flex-col justify-center">
                    <label className="text-2xl font-bold">
                        {card_name}
                    </label>
                    <label className="text-lg">
                        {card_number}
                    </label>
                </div>
            </div>
            { IconButton({"icon": "pencil", "className": "self-center w-12 h-12 m-3"}) }
        </article>
    );
}

function CardSection(card_details) {
    const [cardNumberVisible, setCardNumberVisible] = useState(false);
    const no_cards = card_details.length === 0;
    const cards = no_cards ? NothingToSee() : card_details.map((c) => Card(c.name, c.cardType, c.cardNumber, cardNumberVisible));

    return (
        <section className="flex h-[75%] flex-col">
            <div className="flex justify-between">
                <h1 className="self-center text-2xl font-bold">
                    Mis tarjetas
                </h1>
                <div className={no_cards ? "hidden" : ""}>
                    {IconButton({"icon": "eye", "toggleIcon": "eye-slash", "className": "w-9 h-9", "toggleVar": cardNumberVisible, "action": setCardNumberVisible})}
                </div>
            </div>
            <div className="overflow-y-auto scheme-dark">
                { cards }
            </div>
        </section>
    );
}

export default function Earnings(earnings, card_details, show_cards, new_card_mode) {
    const [earningsVisible, setEarningsVisible] = useState(false);

    let action_button = null;
    if (show_cards)
        action_button = (
            <button className="self-center w-full p-3 font-bold rounded-lg bg-primary-0 dark:bg-primary-1 text-accent-fg-0 dark:text-accent-fg-1">
                { new_card_mode ? "Nueva tarjeta" : card_details.length !== 0 ? "Ver todas las tarjetas" : "Crear nueva tarjeta"}
            </button>
        );

    return (
        <section className={"flex flex-col justify-between w-[40%] p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1 " + (show_cards ? "" : "h-max")}>
            <div className={show_cards ? "h-[90%]" : ""}>
                <section>
                    <div className="flex justify-between">
                        <h1 className="self-center text-2xl font-bold">
                            Ingresos disponibles
                        </h1>
                        <div>
                            { IconButton({"icon": "pencil", "className": "w-9 h-9"}) }
                            { IconButton({"icon": "eye", "toggleIcon": "eye-slash", "className": "w-9 h-9", "toggleVar": earningsVisible, "action": setEarningsVisible}) }
                        </div>
                    </div>
                    <div className="flex flex-col my-4 p-3 w-full rounded-xl bg-primary-0 dark:bg-primary-1">
                        <label className={"self-center text-3xl " + (earningsVisible ? "" : "font-bold")}>
                            { earningsVisible ? "$" + earnings : "****" }
                        </label>
                    </div>
                </section>
                { show_cards ? CardSection(card_details) : null }
            </div>
            { action_button }
        </section>
    );
}
