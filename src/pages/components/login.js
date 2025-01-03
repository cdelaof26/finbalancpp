import GetSVG from "@/pages/svg";

function createFormField(data, padding) {
    let placeholder = data.placeholder;
    let type = data.type;
    let svg = data.svg;

    return (
        <div className={"relative w-72 " + padding}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                { svg }
            </div>
            <input type={type} className="w-full ps-10 p-2.5 rounded-lg text-sm bg-slate-100 dark:bg-black border border-slate-300 dark:border-gray-600 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}/>
        </div>
    );
}

function LogForm(title, str_submit, form_data, padding) {
    return (
        <>
            <form className="flex flex-col self-center w-max text-white">
                <h1 className="self-center text-3xl font-bold text-black dark:text-white">{title}</h1>
                { form_data.map((d) => createFormField(d, padding)) }
            </form>
            <button className="w-72 h-8 self-center rounded-lg bg-slate-100 dark:bg-black dark:text-white">{str_submit}</button>
        </>
    );
}

export default function UserPrompt(login_mode) {
    let title = login_mode ? "Iniciar sesión" : "Registrarse";
    let form_elements;
    let padding = login_mode ? "mt-6" : "mt-3";
    const svg_style = "w-4 h-4 text-gray-500 dark:text-gray-400";

    if (login_mode)
        form_elements = [
            { "placeholder": "Correo electrónico", "type": "text", "svg": GetSVG("envelope", svg_style) },
            { "placeholder": "Contraseña", "type": "password", "svg": GetSVG("key", svg_style) }
        ];
    else
        form_elements = [
            { "placeholder": "Nombre de usuario", "type": "text", "svg": GetSVG("user-circle", svg_style) },
            { "placeholder": "Correo electrónico", "type": "text", "svg": GetSVG("envelope", svg_style) },
            { "placeholder": "Contraseña", "type": "password", "svg": GetSVG("key", svg_style) },
            { "placeholder": "Confirmar contraseña", "type": "password", "svg": GetSVG("key", svg_style) }
        ];

    return (
        <div className="flex flex-col justify-between w-96 h-96 p-8 self-center rounded-xl text-black bg-white dark:bg-slate-900">
            { LogForm(title, title, form_elements, padding) }
        </div>
    );
}
