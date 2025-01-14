import GetSVG from "@/pages/svg";
import IconButton from "@/pages/screens/internal/icon_button";
import { useState } from "react";
import User from "@/models/user";
import { useEffect } from "react";
import { setRequestMeta } from "next/dist/server/request-meta";
function DataField({
  isTitle = false,
  icon,
  value,
  setFunc,
  editable,
  placeholder,
}) {
  const label_style =
    "p-1 self-center " +
    (isTitle ? "text-4xl ml-10 font-bold" : "text-2xl ps-3");
  let input_style =
    label_style +
    " p-0.5 w-[90%] rounded-lg bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0";

  let field;
  if (!editable)
    field = isTitle ? (
      <h1 className={label_style}>{value}</h1>
    ) : (
      <label className={label_style}>{value}</label>
    );
  else
    field = (
      <input
        className={input_style}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setFunc(e.target.value)}
      />
    );

  if (isTitle) {
    return <div className="flex justify-between mb-8">{field}</div>;
  }

  return (
    <div className="flex my-2">
      <GetSVG name={icon} classNameData="self-center w-10 h-10"></GetSVG>
      {field}
    </div>
  );
}

export default function MyAccount({ data }) {
  if (data === undefined || data === null) return;
  const [accountDataEditable, setAccountDataEditable] = useState(false);

  const [userName, setUserName] = useState(data.user.name);
  const [phoneNumber, setPhoneNumber] = useState("Número");
  const [mail, setMail] = useState(data.user.email);
  const [currency, setCurrency] = useState("Divisa");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const svg_style = "w-4 h-4 text-accent-dim-0 dark:text-accent-dim-1";
  const handleUpdateProfile = async () => {
    const user = new User({
      email: mail,
      name: userName,
      phone: phoneNumber,
      diviza: currency,
    });

    const validation = user.validateDataProfile();
    if (!validation.isValid) {
      console.error("Errores de validación:", validation.errors);
      alert("Errores de validación: " + validation.errors.join(", "));
      return;
    }

    try {
      const result = await user.updateProfile();
      console.log("Perfil actualizado:", result);
      alert("Perfil actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.message);
      alert("Error al actualizar el perfil: " + error.message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    }

    const user = new User({
      email: mail,
      password: currentPassword,
    });

    try {
      const result = await user.updatePassword(newPassword);
      console.log("Contraseña actualizada:", result);
      alert("Contraseña actualizada con éxito.");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error.message);
      alert("Error al actualizar la contraseña: " + error.message);
    }
  };

  return (
    <div className="flex flex-col w-full p-10 rounded-2xl dark:text-accent-fg-1">
      <section className="flex w-full mb-4">
        <div className="flex justify-center w-72 h-72 m-4 rounded-full border-8 border-primary-1 dark:border-primary-0">
          <GetSVG name="photo" classNameData="self-center w-16 h-16"></GetSVG>
        </div>
        <div>
          <IconButton
            icon="pencil"
            className="absolute right-32 self-center w-12 h-12"
            toggleBg={true}
            toggleVar={accountDataEditable}
            action={setAccountDataEditable}
          ></IconButton>
          <DataField
            isTitle={true}
            icon="pencil"
            value={userName}
            setFunc={setUserName}
            editable={accountDataEditable}
            placeholder="Nombre de usuario"
          ></DataField>
          <DataField
            icon="device-phone-mobile"
            value={phoneNumber}
            setFunc={setPhoneNumber}
            editable={accountDataEditable}
            placeholder="Número de teléfono"
          ></DataField>
          <DataField
            icon="envelope"
            value={mail}
            setFunc={setMail}
            editable={accountDataEditable}
            placeholder="Correo electrónico"
          ></DataField>
          <DataField
            icon="currency-dollar"
            value={currency}
            setFunc={setCurrency}
            editable={accountDataEditable}
            placeholder="Divisa"
          ></DataField>
          {accountDataEditable && (
            <button
              className="self-center w-[25%] p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1"
              onClick={handleUpdateProfile}
            >
              Guardar
            </button>
          )}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold">Cambiar contraseña</h2>
        <div className="flex justify-between my-4">
          <div className="relative w-[25%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <GetSVG name="lock-closed" classNameData={svg_style}></GetSVG>
            </div>
            <input
              type="password"
              className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"
              placeholder="Contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="relative w-[25%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <GetSVG name="key" classNameData={svg_style}></GetSVG>
            </div>
            <input
              type="password"
              className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="relative w-[25%]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <GetSVG name="key" classNameData={svg_style}></GetSVG>
            </div>
            <input
              type="password"
              className="w-full ps-10 p-2.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0"
              placeholder="Confirmar contraseña"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="self-center w-[25%] p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1"
          onClick={handleChangePassword}
        >
          Cambiar contraseña
        </button>
      </section>
    </div>
  );
}
