import GetSVG from "@/pages/svg";
import { Input } from "postcss";
import { useRef, useState } from "react";
import User from "../../models/user.js";
import { handleLogin, handleRegistration } from "../../services/api.js";
import axios from "axios";
function createFormField(data, padding, handle_change) {
  let placeholder = data.placeholder;
  let type = data.type;
  let svg = data.svg;
  let name = data.name;
  return (
    <div className={"relative w-72 " + padding}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        {svg}
      </div>
      <input
        type={type}
        className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"
        placeholder={placeholder}
        name={name}
        onChange={handle_change}
      />
    </div>
  );
}

function LogForm(
  title,
  str_submit,
  form_data,
  padding,
  submit_action,
  handle_change
) {
  return (
    <>
      <form className="flex flex-col self-center w-max text-accent-fg-1">
        <h1 className="self-center text-3xl font-bold text-accent-fg-0 dark:text-accent-fg-1">
          {title}
        </h1>
        {form_data.map((d) => createFormField(d, padding, handle_change))}
      </form>
      <button
        onClick={submit_action}
        className="self-center w-72 h-8 rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 hover:border-accent-0 transition:[border] duration-300"
      >
        {str_submit}
      </button>
    </>
  );
}
export default function UserPrompt(login_mode, container_func) {
  let title = login_mode ? "Iniciar sesión" : "Registrarse";
  let form_elements;
  let padding = login_mode ? "mt-6" : "mt-3";
  const svg_style = "w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1";
  const [inputs, setInputs] = useState({});
  const handle_change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const submit_action = login_mode
    ? () => {
        // const prueba = new User(formValues);
        console.log(inputs);
        axios.post(
          "http://localhost:80/finbalancpp/src/backend/access/",
          inputs
        );
        // if (prueba.validateData(login_mode).isValid) {
        // container_func(false);
        // }
      }
    : () => {
        // if (prueba.validateData(login_mode).isValid)
        console.log(inputs);
        axios.post(
          "http://localhost:80/finbalancpp/src/backend/access/",
          inputs
        );
        // if (prueba.validateData(login_mode).isValid) {
        // }
        null;
      };

  if (login_mode)
    form_elements = [
      {
        placeholder: "Correo electrónico",
        type: "text",
        svg: GetSVG("envelope", svg_style),
        name: "email",
      },
      {
        placeholder: "Contraseña",
        type: "password",
        svg: GetSVG("key", svg_style),
        name: "password",
      },
    ];
  else
    form_elements = [
      {
        placeholder: "Nombre de usuario",
        type: "text",
        svg: GetSVG("user-circle", svg_style),
        name: "username",
      },
      {
        placeholder: "Correo electrónico",
        type: "text",
        svg: GetSVG("envelope", svg_style),
        name: "email",
      },
      {
        placeholder: "Contraseña",
        type: "password",
        svg: GetSVG("key", svg_style),
        name: "password",
      },
      {
        placeholder: "Confirmar contraseña",
        type: "password",
        svg: GetSVG("key", svg_style),
        name: "passwordConfirm",
      },
    ];

  return (
    <div className="flex flex-col justify-between w-96 h-96 p-8 self-center rounded-xl text-accent-fg-0 bg-primary-0 dark:bg-primary-1">
      {LogForm(
        title,
        title,
        form_elements,
        padding,
        submit_action,
        handle_change
      )}
    </div>
  );
}
