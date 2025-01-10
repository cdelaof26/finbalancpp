import GetSVG from "@/pages/svg";
import User from "@/models/user";
import { useState } from "react";

function FormField({placeholder, inputType, svg, className, name, changeHandler}) {
    return (
        <div className={"relative w-72 " + className}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <GetSVG name={svg} classNameData="w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1"></GetSVG>
            </div>
            <input onChange={changeHandler} name={name} type={inputType} className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder={placeholder}/>
        </div>
    );
}

function LoginForm({submitAction, handleChange}) {
    return (
        <>
            <form className="flex flex-col self-center w-max text-accent-fg-1">
                <h1 className="self-center text-3xl font-bold text-accent-fg-0 dark:text-accent-fg-1">
                    Iniciar sesión
                </h1>
                <FormField changeHandler={handleChange} placeholder="Correo electrónico" type="text" svg="envelope" className="mt-6" name="email"></FormField>
                <FormField changeHandler={handleChange} placeholder="Contraseña" type="password" svg="key" className="mt-6" name="password"></FormField>
            </form>
            <button onClick={submitAction} className="self-center w-72 h-8 rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 hover:border-accent-0 transition:[border] duration-300">
                Iniciar sesión
            </button>
        </>
    );
}

function SignupForm({submitAction, handleChange}) {
    return (
        <>
            <form className="flex flex-col self-center w-max text-accent-fg-1">
                <h1 className="self-center text-3xl font-bold text-accent-fg-0 dark:text-accent-fg-1">
                    Registrarse
                </h1>
                <FormField changeHandler={handleChange} placeholder="Nombre de usuario" type="text" svg="user-circle" className="mt-3" name="username"></FormField>
                <FormField changeHandler={handleChange} placeholder="Correo electrónico" type="text" svg="envelope" className="mt-3" name="email"></FormField>
                <FormField changeHandler={handleChange} placeholder="Contraseña" type="password" svg="key" className="mt-3" name="password"></FormField>
                <FormField changeHandler={handleChange} placeholder="Confirmar contraseña" type="password" svg="key" className="mt-3" name="confirmPassword"></FormField>
            </form>
            <button onClick={submitAction} className="self-center w-72 h-8 rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 hover:border-accent-0 transition:[border] duration-300">
                Registrarse
            </button>
        </>
    );
}

export default function UserPrompt(login_mode, container_func) {
    const [inputs, setInputs] = useState({});
    const user = new User({});

    let submit_action;
    if (login_mode)
        submit_action = async () => {
            // const prueba = new User(formValues);
            console.log(inputs);
            user.setData(inputs, "login");
            if (user.validateData(login_mode).isValid) {
                try {
                    const result = await user.exist();
                    console.log(result);
                    if (result.status !== 0)
                        container_func(false);
                } catch (error) {
                    console.error("Error durante el registro del usuario:", error);
                }
            } else {
                const err = user.validateData(login_mode); //Datos incorrecctos en json
                console.log(err);
            }
        }
    else
        submit_action = async () => {
            user.setData(inputs, "register");
            if (user.validateData(login_mode).isValid) {
                try {
                    const result = await user.register();
                    console.log(result);
                } catch (error) {
                    console.error("Error durante el registro del usuario:", error);
                }
            } else {
                const err = user.validateData(login_mode); //Datos incorrecctos en json
                console.log(err);
            }
        };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);
        setInputs((values) => ({ ...values, [name]: value }));
    };

    return (
        <div className="flex flex-col justify-between w-96 h-96 p-8 self-center rounded-xl text-accent-fg-0 bg-primary-0 dark:bg-primary-1">
            { login_mode ? <LoginForm submitAction={submit_action} handleChange={handleChange}></LoginForm> : <SignupForm submitAction={submit_action} handleChange={handleChange}></SignupForm>}
        </div>
    );
}
