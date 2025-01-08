import GetSVG from "@/pages/svg";

export default function IconButton({
       icon = null, className = null, paintPressed = false,
       toggleBg = false, toggleVar = null, toggleIcon = null,
       action = null
}) {
    if (icon === null || className === null)
        return <></>;

    const toggle = toggleVar !== null && action !== null;
    const f_action = toggle ? () => { action(!toggleVar) } : action;

    const pressed = toggle && toggleVar && toggleBg || paintPressed;
    return (
        <button onClick={f_action} className={"rounded " + className + (pressed ? " bg-accent-1 dark:bg-accent-2" : "")}>
            <GetSVG name={toggleIcon === null ? icon : toggleVar !== null && toggleVar ? toggleIcon : icon} classNameData={"w-full h-full p-1 self-center dark:text-accent-fg-1 " + (pressed ? "text-accent-fg-1" : "text-accent-fg-0")}></GetSVG>
        </button>
    );
}
