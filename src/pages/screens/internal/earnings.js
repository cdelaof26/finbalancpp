import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import {format_money} from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import IconButton from "@/pages/screens/internal/icon_button";
import GetSVG from "@/pages/svg";
import {useState} from "react";
import {get_date} from "@/pages/screens/debit_n_debt";

function Card({cardName, cardType, cardNumber, visibleCardNumber, editable = false, visibleDeleteIcon, editAction, deleteAction}) {
    if (!visibleCardNumber)
        cardNumber = cardNumber.replaceAll(/\d{4} /g, "**** ")

    return (
        <article className="flex justify-between my-4 p-3 w-full rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                <div className="flex flex-col mx-4">
                    <GetSVG name="credit-card" classNameData="w-12 h-12 self-center"></GetSVG>
                    <label className="self-center uppercase text-xs font-bold text-accent-dim-0 dark:text-accent-dim-1">
                        { cardType === "0" ? "Crédito" : "Débito"}
                    </label>
                </div>
                <div className="flex flex-col justify-center">
                    <label className="text-2xl font-bold">
                        { cardName.length === 0 ? "Tarjeta sin nombre" : cardName }
                    </label>
                    <label className={!visibleCardNumber ? "text-lg" : ""}>
                        { cardNumber.length === 0 ? "Sin número" : cardNumber }
                    </label>
                </div>
            </div>
            <div className="flex">
                <IconButton action={editAction} icon="pencil" className={"self-center " + (visibleDeleteIcon ? "w-10 h-10 mx-1 my-4" : "w-12 h-12 m-3")} paintPressed={editable}></IconButton>
                <IconButton action={deleteAction} icon="trash" className={"self-center " + (visibleDeleteIcon ? "w-10 h-10 m-1" : "hidden")}></IconButton>
            </div>
        </article>
    );
}

function CardSection({cardDetails, cardNumberVisible, setCardNumberVisible, canDeleteCards, editAction, deleteAction}) {
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
                    cardDetails.map((c, index) => <Card
                        cardName={c.name} cardType={c.cardType} cardNumber={c.cardNumber}
                        editable={c.editable} visibleCardNumber={cardNumberVisible} visibleDeleteIcon={canDeleteCards}
                        editAction={() => editAction(index)} deleteAction={() => deleteAction(index)}
                    ></Card>)
                }
            </div>
        </section>
    );
}

export function newCard() {
    return {
        "name": "", "cardType": "0", "cardNumber": "", "editable": true,
        "funds": "0", "creditLimit": "0", "cardPaymentDueDate": get_date()
    };
}

export default function Earnings({
         showCards = true, canPaintEditAsPressed = false,
         func, canDeleteCards = true
}) {
    if (func === undefined || func === null)
        return;

    const [cardDetails, setCardDetails] = useState([]);
    const [loadedCardIndex, setLoadedCardIndex] = useState(-1);

    const createCard = () => {
        const newCards = [...cardDetails];
        const c = newCard();
        newCards.push(c);
        func.loadCard(c);
        setCardDetails(newCards);
        setLoadedCardIndex(cardDetails.length);
    };

    const saveCard = (index) => {
        // Save, then load earnings and cards section
        
        const newCards = [...cardDetails];
        const c = newCards[index];
        c["editable"] = false;
        newCards[index] = c;
        setCardDetails(newCards);

        func.loadEarningsNCards(0);
    }

    const deleteCard = (index) => {
        const newCards = [...cardDetails];
        newCards.splice(index, 1);
        setCardDetails(newCards);
        if (index === newCards.length) {
            func.loadCard(newCards[cardDetails.length]);
            setLoadedCardIndex(cardDetails.length);
        }
    }

    const setProperty = (value, property, index) => {
        if (loadedCardIndex === -1 || cardDetails.length < index)
            return;

        const newCards = [...cardDetails];
        const c = newCards[index];
        c[property] = value;
        newCards[index] = c;
        setCardDetails(newCards);
    }
    func["setCardProperty"] = (v, p) => setProperty(v, p, loadedCardIndex);

    let action_button = null;
    if (showCards)
        action_button = (
            <button onClick={() => { func.setSidebarToggled(2); if (func.getCurrentPage() !== 4) func.loadCards(); else createCard() }} className="self-center w-full p-3 font-bold rounded-lg bg-primary-0 dark:bg-primary-1 text-accent-fg-0 dark:text-accent-fg-1">
                { func.getCurrentPage() !== 4 ? "Ver todas las tarjetas" : "Nueva tarjeta" }
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
                { showCards ? <CardSection
                    cardDetails={cardDetails} cardNumberVisible={func.cardNumberVisible} setCardNumberVisible={func.setCardNumberVisible}
                    canDeleteCards={canDeleteCards} editAction={saveCard} deleteAction={deleteCard}
                ></CardSection> : null }
            </div>
            { action_button }
        </div>
    );
}
