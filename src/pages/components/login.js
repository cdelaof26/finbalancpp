import {pyHost} from "@/api/host";
import GetSVG from "@/pages/svg";
import {use, useState} from "react";

function FormField({placeholder, inputType, svg, className, name, setField, submitAction}) {
    return (
        <div className={"relative w-72 " + className}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <GetSVG name={svg} classNameData="w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1"></GetSVG>
            </div>
            <input onKeyUp={({ key }) => { if (key === "Enter") submitAction() }}  onChange={e => setField(e.target.value)} name={name} type={inputType} className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder={placeholder}/>
        </div>
    );
}

function isDataValid(userName, password, func, loginMode) {
    if (!loginMode && userName.trim() === "") {
        func.setError("Campos incompletos", "Se requiere un nombre de usuario");
        return false;
    }
    if (func.mail.trim() === "" || func.pass.trim() === "") {
        func.setError("Campos incompletos", "Se requiere un correo y contraseña");
        return false;
    }
    if (!/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.test(func.mail)) {
        func.setError("Correo inválido", "El correo no es válido");
        return false;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/.test(func.pass)) {
        func.setError("Contraseña inválida", "La contraseña debe tener al menos un número, una letra minúscula, una mayúscula, un carácter especial y al menos 8 caracteres.");
        return false;
    }
    if (!loginMode && func.pass !== password) {
        func.setError("Contraseña inválida", "Las contraseñas no coinciden");
        return false;
    }

    return true;
}

async function login(mail, pass) {
    try {
        const response = await fetch(pyHost + "authUser", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "mail": mail, "password": pass })
        });

        const data = await response.json();
        return [response.status === 200, data.userId];
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [false, null];
    }
}


function LoginForm({func}) {
    const submitAction = async () => {
        if (!isDataValid(null, null, func, true))
            return;

        const response = await login(func.mail, func.pass);
        if (response[0] === false) {
            func.setError("Error de Inicio de sesión", "No se encontró el usuario o el servicio no esta disponible");
            return;
        }

        func.setUserId(response[1]);
        func.setShowLogin(false);
        func.setSidebarToggled(1);
        func.loadHome();
    };

    return (
        <>
            <div className="flex flex-col self-center w-max text-accent-fg-1">
                <h1 className="self-center text-3xl font-bold text-accent-fg-0 dark:text-accent-fg-1">
                    Iniciar sesión
                </h1>
                <FormField submitAction={submitAction} setField={func.setMail} placeholder="Correo electrónico" inputType="text" svg="envelope" className="mt-6" name="email"></FormField>
                <FormField submitAction={submitAction} setField={func.setPass} placeholder="Contraseña" inputType="password" svg="key" className="mt-6" name="password"></FormField>
            </div>
            <button onClick={submitAction} className="self-center w-72 h-8 rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 hover:border-accent-0 transition:[border] duration-300">
                Iniciar sesión
            </button>
        </>
    );
}

async function signup(userName, mail, pass) {
    try {
        const response = await fetch(pyHost + "register", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "userName": userName, "mail": mail, "password": pass })
        });

        return response.status === 200;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return false;
    }
}

function SignupForm({func}) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const submitAction = async () => {
        if (!isDataValid(userName, password, func, false))
            return;

        const response = await signup(userName, func.mail, func.pass);
        if (response === false) {
            func.setError("Error de registro", "Ocurrio un error desconocido");
            return;
        }

        func.setLoginOpen(true);
        func.setMsg("Éxito", "Usuario registrado");
    };

    return (
        <>
            <div className="flex flex-col self-center w-max text-accent-fg-1">
                <h1 className="self-center text-3xl font-bold text-accent-fg-0 dark:text-accent-fg-1">
                    Registrarse
                </h1>
                <FormField submitAction={submitAction} setField={setUserName} placeholder="Nombre de usuario" inputType="text" svg="user-circle" className="mt-3" name="username"></FormField>
                <FormField submitAction={submitAction} setField={func.setMail} placeholder="Correo electrónico" inputType="text" svg="envelope" className="mt-3" name="email"></FormField>
                <FormField submitAction={submitAction} setField={func.setPass} placeholder="Contraseña" inputType="password" svg="key" className="mt-3" name="password"></FormField>
                <FormField submitAction={submitAction} setField={setPassword} placeholder="Confirmar contraseña" inputType="password" svg="key" className="mt-3" name="confirmPassword"></FormField>
            </div>
            <button onKeyUp={({ key }) => { if (key === "Enter") submitAction() }} onClick={submitAction} className="self-center w-72 h-8 rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 hover:border-accent-0 transition:[border] duration-300">
                Registrarse
            </button>
        </>
    );
}

export default function UserPrompt(login_mode, func) {
    if (func === null || func === undefined)
        return;

    return (
        <div className="flex flex-col justify-between w-96 h-96 p-8 self-center rounded-xl text-accent-fg-0 bg-primary-0 dark:bg-primary-1">
            { login_mode ? <LoginForm func={func}></LoginForm> : <SignupForm func={func}></SignupForm>}
        </div>
    );
}
