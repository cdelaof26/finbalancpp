import GetSVG from "@/pages/svg";
import IconButton from "@/pages/screens/internal/icon_button";
import {useState} from "react";

function DataField(func, icon, value_set, editable, placeholder) {
    // TODO: Gotta fix all this junk code
    const is_title = func !== null;
    const label_style = "p-1 self-center " + (is_title ? "text-4xl ml-10 font-bold" : "text-2xl ps-3");
    let input_style = label_style + " p-0.5 w-full rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0";

    let field;
    if (!editable)
        field = is_title ? <h1 className={label_style}>{ value_set.value }</h1> : <label className={label_style}>{ value_set.value }</label>
    else
        field = <input className={input_style} value={value_set.value} placeholder={placeholder} onChange={e => value_set.set(e.target.value)}/>

    if (is_title) {
        return (
            <div className="flex justify-between mb-8">
                { field }
            </div>
        );
    }

    return (
        <div className="flex my-2">
            { GetSVG(icon, "self-center w-10 h-10") }
            { field }
        </div>
    );
}

export default function MyAccount() {
    const [accountDataEditable, setAccountDataEditable] = useState(false);

    const [userName, setUserName] = useState("NOMBRE_DE_USUARIO");
    const [phoneNumber, setPhoneNumber] = useState("55 1234 5678");
    const [mail, setMail] = useState("mail@gmail.com");
    const [currency, setCurrency] = useState("MXN");

    const svg_style = "w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1";

    return (
        <div className="flex flex-col w-full p-10 rounded-2xl dark:text-accent-fg-1">
            <section className="flex w-full mb-4">
                <div className="flex justify-center w-72 h-72 m-4 rounded-full border-8 border-primary-1 dark:border-primary-0">
                    { GetSVG("photo", "self-center w-16 h-16") }
                </div>
                <div>
                    { IconButton({"icon": "pencil", "className": "absolute right-32 self-center w-12 h-12", "toggleBg": true, "toggleVar": accountDataEditable, "action": setAccountDataEditable}) }
                    { DataField(true, "pencil", {"value": userName, "set": setUserName}, accountDataEditable, "Nombre de usuario") }
                    { DataField(null, "device-phone-mobile", {"value": phoneNumber, "set": setPhoneNumber}, accountDataEditable, "Número de teléfono") }
                    { DataField(null, "envelope", {"value": mail, "set": setMail}, accountDataEditable, "Correo electrónico") }
                    { DataField(null, "currency-dollar", {"value": currency, "set": setCurrency}, accountDataEditable, "Divisa") }
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold">
                    Cambiar contraseña
                </h2>
                <div className="flex justify-between my-4">
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            { GetSVG("lock-closed", svg_style) }
                        </div>
                        <input type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Contraseña actual"/>
                    </div>
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            { GetSVG("key", svg_style) }
                        </div>
                        <input type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Nueva contraseña"/>
                    </div>
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            { GetSVG("key", svg_style) }
                        </div>
                        <input type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Confirmar contraseña"/>
                    </div>
                </div>
                <button className="self-center w-[25%] p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                    Cambiar contraseña
                </button>
            </section>
        </div>
    );
}
