import CardEditor from "@/pages/screens/internal/card_editor";
import Earnings, {newCard} from "@/pages/screens/internal/earnings";
import {useState} from "react";

export default function Cards({func}) {
    if (func === null || func === undefined)
        return;

    const [card, setCard] = useState(newCard());
    func["loadCard"] = (card) => { setCard(card) };

    const validateProperty = (v, p) => {
        switch (p) {
            case "cardNumber":
                return /^[\d ]{0,19}$/g.test(v);
            case "cardType":
                return v === "0" || v === "1";
            default:
                return true;
        }
    };

    const setProperty = (value, property) => {
        if (!validateProperty(value, property))
            return;

        const c = JSON.parse(JSON.stringify(card));
        c[property] = value;
        func["setCardProperty"](value, property);
        setCard(c);
    }

    return (
        <div className="flex justify-center w-full">
            <Earnings func={func}></Earnings>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <h1 className="font-bold mb-4 text-2xl">
                    Tarjeta
                </h1>
                <CardEditor
                    name={card.name} setName={(v) => setProperty(v, "name")}
                    cardType={card.cardType} setCardType={(v) => setProperty(v, "cardType")}
                    cardNumber={card.cardNumber} setCardNumber={(v) => setProperty(v, "cardNumber")}
                    funds={card.funds} setFunds={(v) => setProperty(v, "funds")}
                    creditLimit={card.creditLimit} setCreditLimit={(v) => setProperty(v, "creditLimit")}
                    cardPaymentDueDate={card.cardPaymentDueDate} setCardPaymentDueDate={(v) => setProperty(v, "cardPaymentDueDate")}
                    setError={func.setError}
                ></CardEditor>
            </div>
        </div>
    );
}
