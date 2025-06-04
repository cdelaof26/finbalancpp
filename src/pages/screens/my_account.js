import GetSVG from "@/pages/svg";
import IconButton from "@/pages/screens/internal/icon_button";
import {useEffect, useState} from "react";
import {callAPI, fetchData} from "@/api/host";

function DataField({isTitle = false, icon, value, setFunc, editable, placeholder}) {
    const label_style = "p-1 self-center " + (isTitle ? "text-4xl ml-10 font-bold" : "text-2xl ps-3");
    let input_style = label_style + " p-0.5 w-[90%] rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0";

    let field;
    if (!editable)
        field = isTitle ? <h1 className={label_style}>{ value }</h1> : <label className={label_style}>{ value }</label>
    else
        field = <input className={input_style} value={value} placeholder={placeholder} onChange={e => { if (setFunc !== null) setFunc(e.target.value) }}/>

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

export default function MyAccount({func}) {
    const [accountDataEditable, setAccountDataEditable] = useState(false);

    const [userName, setUserName] = useState("Usuario");
    const [phoneNumber, setPhoneNumber] = useState("Número");
    const [mail, setMail] = useState("Correo");
    const [currency, setCurrency] = useState("Divisa");

    const [oldPass, setOldPass] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");

    const updateField = (property, value) => {
        const update = () => {
            if (property === "userName")
                setUserName(value);
            if (property === "mail")
                setMail(value);
        }

        callAPI("editUser", func.userId, {"property": property, "value": value}, "POST").then(update).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al modificar usuario", "Usuario no disponibles"); });
    };

    useEffect(() => {
        fetchData("user", func.userId).then((d) => { setUserName(d.userName); setMail(d.mail) }).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", "Datos de usuario no disponibles"); });
    }, []);

    const validate = () => {
        if (pass !== confPass) {
            func.setError("Contraseñas inválidas", "Las contraseñas no coinciden")
            return;
        }

        if (oldPass !== func.pass) {
            func.setError("Contraseña inválida", "Las contraseña anterior no coincide")
            return;
        }

        const up = () => {
            setOldPass("");
            setPass("");
            setConfPass("");
            func.setPass(pass);
            func.setMsg("Actualización éxitosa", "Se ha cambiado la contraseña");
        }

        callAPI("editUser", func.userId, {"property": "pass", "value": pass}, "POST").then(up).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al editar usuario", "Usuario no disponibles"); });
    }

    const svg_style = "w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1";

    return (
        <div className="flex flex-col w-full p-10 rounded-2xl dark:text-accent-fg-1">
            <section className="flex w-full mb-4">
                <div className="flex justify-center w-72 h-72 m-4 rounded-full border-8 border-primary-1 dark:border-primary-0 hidden">
                    <GetSVG name="photo" classNameData="self-center w-16 h-16"></GetSVG>
                </div>
                <div>
                    <IconButton icon="pencil" className="absolute right-32 self-center w-12 h-12" toggleBg={true} toggleVar={accountDataEditable} action={setAccountDataEditable}></IconButton>
                    <DataField isTitle={true} icon="pencil" value={userName} setFunc={(v) => updateField("userName", v)} editable={accountDataEditable} placeholder="Nombre de usuario"></DataField>
                    {/*<DataField icon="device-phone-mobile" value={phoneNumber} setFunc={null} editable={accountDataEditable} placeholder="Número de teléfono"></DataField>*/}
                    <DataField icon="envelope" value={mail} setFunc={(v) => updateField("mail", v)} editable={accountDataEditable} placeholder="Correo electrónico"></DataField>
                    {/*<DataField icon="currency-dollar" value={currency} setFunc={null} editable={accountDataEditable} placeholder="Divisa"></DataField>*/}
                </div>
            </section>
            <section className="my-4">
                <h2 className="text-2xl font-bold">
                    Cambiar contraseña
                </h2>
                <div className="flex justify-between my-4">
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <GetSVG name="lock-closed" classNameData={svg_style}></GetSVG>
                        </div>
                        <input value={oldPass} onChange={e => setOldPass(e.target.value)} type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Contraseña actual"/>
                    </div>
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <GetSVG name="key" classNameData={svg_style}></GetSVG>
                        </div>
                        <input value={pass} onChange={e => setPass(e.target.value)} type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Nueva contraseña"/>
                    </div>
                    <div className="relative w-[25%]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <GetSVG name="key" classNameData={svg_style}></GetSVG>
                        </div>
                        <input value={confPass} onChange={e => setConfPass(e.target.value)} type="password" className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Confirmar contraseña"/>
                    </div>
                </div>
                <button onClick={validate} className="self-center w-[25%] p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                    Cambiar contraseña
                </button>
            </section>
        </div>
    );
}
