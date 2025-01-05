import GetSVG from "@/pages/svg";

export default function IconButton(options) {
    if (!("icon" in options) || !("className" in options))
        return <></>;

    const icon_name = options.icon;
    const style = options.className;
    const toggle_bg = "toggleBg" in options ? options.toggleBg : false;
    const toggle_var = "toggleVar" in options ? options.toggleVar : null;
    const toggle_icon = "toggleIcon" in options ? options.toggleIcon : null;
    const action = "action" in options ? options.action : null;

    const toggle = toggle_var !== null && action !== null;
    const f_action = toggle ? () => { action(!toggle_var) } : action;

    return (
        <button onClick={f_action} className={"rounded " + style + (toggle && toggle_var && toggle_bg ? " bg-accent-1 dark:bg-accent-2" : "")}>
            { GetSVG(toggle_icon === null ? icon_name : toggle_var ? toggle_icon : icon_name, "w-full h-full p-1 self-center dark:text-accent-fg-1 " + (toggle && toggle_var && toggle_bg ? "text-accent-fg-1" : "text-accent-fg-0")) }
        </button>
    );
}
