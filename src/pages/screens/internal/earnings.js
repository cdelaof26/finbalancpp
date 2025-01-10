import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import {format_money} from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import IconButton from "@/pages/screens/internal/icon_button";
import GetSVG from "@/pages/svg";
import {useState} from "react";

const CardType = {
    0: "Crédito", 1: "Débito"
}

function Card({cardName, cardType, cardNumber, visibleCardNumber}) {
    if (!visibleCardNumber)
        cardNumber = cardNumber.replaceAll(/\d{4} /g, "**** ")

    return (
        <article className="flex justify-between my-4 p-3 w-full rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                <div className="flex flex-col mx-4">
                    <GetSVG name="credit-card" classNameData="w-12 h-12 self-center"></GetSVG>
                    <label className="self-center uppercase text-xs font-bold text-accent-dim-0 dark:text-accent-dim-1">
                        { CardType[cardType] }
                    </label>
                </div>
                <div className="flex flex-col justify-center">
                    <label className="text-2xl font-bold">
                        { cardName }
                    </label>
                    <label className={!visibleCardNumber ? "text-lg" : ""}>
                        { cardNumber }
                    </label>
                </div>
            </div>
            <IconButton icon="pencil" className="self-center w-12 h-12 m-3"></IconButton>
        </article>
    );
}

function CardSection({cardDetails, cardNumberVisible, setCardNumberVisible}) {
    const no_cards = cardDetails.length === 0;

    return (
        <section className="flex h-[75%] flex-col">
            <div className="flex justify-between">
                <h1 className="self-center text-2xl font-bold">
                    Mis tarjetas
                </h1>
                <div className={no_cards ? "hidden" : ""}>
                    <IconButton icon="eye" toggleIcon="eye-slash" className="w-9 h-9" toggleVar={cardNumberVisible} action={setCardNumberVisible}></IconButton>
                </div>
            </div>
            <div className="overflow-y-auto scheme-dark">
                { no_cards ? <NothingToSee></NothingToSee> :
                    cardDetails.map((c) => <Card cardName={c.name} cardType={c.cardType} cardNumber={c.cardNumber} visibleCardNumber={cardNumberVisible}></Card>)
                }
            </div>
        </section>
    );
}

export default function Earnings({
         cardDetails = [], showCards = true, canPaintEditAsPressed = false,
         func
}) {
    if (func === undefined || func === null)
        return;

    let action_button = null;
    if (showCards)
        action_button = (
            <button onClick={() => { func.setSidebarToggled(2); func.loadCards() }} className="self-center w-full p-3 font-bold rounded-lg bg-primary-0 dark:bg-primary-1 text-accent-fg-0 dark:text-accent-fg-1">
                Nueva tarjeta
            </button>
        );

    let title = <Title
        title="Ingresos disponibles" icons={["pencil", "eye"]} toggleIcon={[null, "eye-slash"]}
        paintPressed={[func.subPage === 1 && canPaintEditAsPressed, false]} toggleVar={[null, func.earningsVisible]}
        action={[() => { func.setSidebarToggled(2); func.loadEarningsNCards(func.subPage === 1 ? 0 : 1) }, func.setEarningsVisible]}>
    </Title>

    return (
        <div className={"flex flex-col justify-between p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1 " + (showCards ? "w-[40%]" : "h-max")}>
            <div className={showCards ? "h-[90%]" : ""}>
                <div>
                    { title }
                    <div className="flex flex-col my-4 p-3 w-full rounded-xl bg-primary-0 dark:bg-primary-1">
                        <label className={"self-center text-3xl " + (func.earningsVisible ? "" : "font-bold")}>
                            { func.earningsVisible ? format_money(func.userEarnings) : "****" }
                        </label>
                    </div>
                </div>
                { showCards ? <CardSection cardDetails={cardDetails} cardNumberVisible={func.cardNumberVisible} setCardNumberVisible={func.setCardNumberVisible}></CardSection> : null }
            </div>
            { action_button }
        </div>
    );
}
