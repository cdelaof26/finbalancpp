import GetSVG from "@/pages/svg";

function FormField({placeholder, inputType, svg, className}) {
    return (
        <div className={"relative w-72 " + className}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <GetSVG name={svg} classNameData="w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1"></GetSVG>
            </div>
            <input type={inputType} className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder={placeholder}/>
        </div>
    );
}

function LoginForm({submitAction}) {
    return (
        <>
            <form className="flex flex-col self-center w-max text-accent-fg-1">
                <h1 className="self-center text-3xl font-bold text-accent-fg-0 dark:text-accent-fg-1">
                    Iniciar sesión
                </h1>
                <FormField placeholder="Correo electrónico" type="text" svg="envelope" className="mt-6"></FormField>
                <FormField placeholder="Contraseña" type="password" svg="key" className="mt-6"></FormField>
            </form>
            <button onClick={submitAction} className="self-center w-72 h-8 rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 hover:border-accent-0 transition:[border] duration-300">
                Iniciar sesión
            </button>
        </>
    );
}

function SignupForm({submitAction}) {
    return (
        <>
            <form className="flex flex-col self-center w-max text-accent-fg-1">
                <h1 className="self-center text-3xl font-bold text-accent-fg-0 dark:text-accent-fg-1">
                    Registrarse
                </h1>
                <FormField placeholder="Nombre de usuario" type="text" svg="user-circle" className="mt-3"></FormField>
                <FormField placeholder="Correo electrónico" type="text" svg="envelope" className="mt-3"></FormField>
                <FormField placeholder="Contraseña" type="password" svg="key" className="mt-3"></FormField>
                <FormField placeholder="Confirmar contraseña" type="password" svg="key" className="mt-3"></FormField>
            </form>
            <button onClick={submitAction} className="self-center w-72 h-8 rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 hover:border-accent-0 transition:[border] duration-300">
                Registrarse
            </button>
        </>
    );
}

export default function UserPrompt(login_mode, container_func) {
    const submit_action = login_mode ? () => { container_func(false); } : null;

    return (
        <div className="flex flex-col justify-between w-96 h-96 p-8 self-center rounded-xl text-accent-fg-0 bg-primary-0 dark:bg-primary-1">
            { login_mode ? <LoginForm submitAction={submit_action}></LoginForm> : <SignupForm submitAction={submit_action}></SignupForm>}
        </div>
    );
}
