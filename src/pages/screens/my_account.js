import GetSVG from "@/pages/svg";
import IconButton from "@/pages/screens/internal/icon_button";
import {useState} from "react";

function DataField({isTitle = false, icon, value, setFunc, editable, placeholder}) {
    const label_style = "p-1 self-center " + (isTitle ? "text-4xl ml-10 font-bold" : "text-2xl ps-3");
    let input_style = label_style + " p-0.5 w-[90%] rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0";

    let field;
    if (!editable)
        field = isTitle ? <h1 className={label_style}>{ value }</h1> : <label className={label_style}>{ value }</label>
    else
        field = <input className={input_style} value={value} placeholder={placeholder} onChange={e => setFunc(e.target.value)}/>

    if (isTitle) {
        return (
            <div className="flex justify-between mb-8">
                { field }
            </div>
        );
    }

    return (
        <div className="flex my-2">
            <GetSVG name={icon} classNameData="self-center w-10 h-10"></GetSVG>
            { field }
        </div>
    );
}

export default function MyAccount() {
    const [accountDataEditable, setAccountDataEditable] = useState(false);

    const [userName, setUserName] = useState("Usuario");
    const [phoneNumber, setPhoneNumber] = useState("Número");
    const [mail, setMail] = useState("Correo");
    const [currency, setCurrency] = useState("Divisa");

    const svg_style = "w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1";

    return (
        <div className="flex flex-col w-full p-10 rounded-2xl dark:text-accent-fg-1">
            <section className="flex w-full mb-4">
                <div className="flex justify-center w-72 h-72 m-4 rounded-full border-8 border-primary-1 dark:border-primary-0">
                    <GetSVG name="photo" classNameData="self-center w-16 h-16"></GetSVG>
                </div>
                <div>
                    <IconButton icon="pencil" className="absolute right-32 self-center w-12 h-12" toggleBg={true} toggleVar={accountDataEditable} action={setAccountDataEditable}></IconButton>
                    <DataField isTitle={true} icon="pencil" value={userName} setFunc={setUserName} editable={accountDataEditable} placeholder="Nombre de usuario"></DataField>
                    <DataField icon="device-phone-mobile" value={phoneNumber} setFunc={setPhoneNumber} editable={accountDataEditable} placeholder="Número de teléfono"></DataField>
                    <DataField icon="envelope" value={mail} setFunc={setMail} editable={accountDataEditable} placeholder="Correo electrónico"></DataField>
                    <DataField icon="currency-dollar" value={currency} setFunc={setCurrency} editable={accountDataEditable} placeholder="Divisa"></DataField>
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold">
                    Cambiar contraseña
                </h2>
                <div className="flex justify-between my-4">
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <GetSVG name="lock-closed" classNameData={svg_style}></GetSVG>
                        </div>
                        <input type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Contraseña actual"/>
                    </div>
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <GetSVG name="key" classNameData={svg_style}></GetSVG>
                        </div>
                        <input type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Nueva contraseña"/>
                    </div>
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <GetSVG name="key" classNameData={svg_style}></GetSVG>
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
