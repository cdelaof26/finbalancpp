import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import ColorEditor from "@/pages/screens/internal/color_editor";
import IconButton from "@/pages/screens/internal/icon_button";

export function format_money(value) {
    if (value.length === 0)
        return "$0";

    if (!/^(\d+|\d+\.\d+)$/g.test(value))
        return value;

    value = value === "0" ? "0" : value.replaceAll(/^0+/g, "");
    let dec = "";
    if (value.includes(".")) {
        const slt = value.split(".");
        value = slt[0];
        dec = "." + slt[1];
    }

    if (value.length < 4)
        return "$" + value;

    const r = value.split("").reverse().join("");
    let groups = 0;
    let formatted = "";
    for (let group of [...r.matchAll(/\d{3}/g)]) {
        formatted += group + ",";
        groups++;
    }
    formatted = groups * 3 < r.length ? formatted + r.substring(groups * 3, r.length) : formatted.substring(0, formatted.length - 1);

    return "$" + formatted.split("").reverse().join("") + dec
}

export default function EPreviewArticle({
        title, setTitle = null, value, editable, setEditable = null, color, setColor = null, deleteAction = null, component,
        render = true, indicator = "", editableClassName = ""
}) {
    // console.log(caption === null, value === null, initialColor === null, editableClassName === null, component === null);
    if (title === undefined || title === null)
        return;

    if (!render)
        return <NothingToSee></NothingToSee>;

    let label;
    if (!editable)
        label = <label className="ps-3 self-center"> { title.length !== 0 ? title : "Categoría sin nombre" } </label>
    else
        label = <input type="text" onChange={(e) => setTitle(e.target.value) } value={title} className="self-center ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Titulo"/>

    return (
        <article className={"flex flex-col w-full p-3 transition-[height] duration-300 rounded-xl bg-primary-0 dark:bg-primary-1 " + (editable ? editableClassName : "h-14")}>
            <div className="flex justify-between">
                <div className="flex self-center">
                    <div className="self-center w-6 h-6 rounded-full" style={{backgroundColor: color}}></div>
                    { label }
                </div>
                <div className="flex">
                    <label className="self-center">
                        { indicator + " " + format_money(value) }
                    </label>
                    <div className="flex">
                        <IconButton icon="trash" className="self-center mx-2 w-8 h-8" action={deleteAction}></IconButton>
                        <IconButton icon="pencil" className="self-center w-8 h-8" toggleBg={true} toggleVar={editable} action={setEditable}></IconButton>
                    </div>
                </div>
            </div>
            <div className={"transition-[opacity] duration-300 " + (editable ? "opacity-100" : "opacity-0")}>
                <div className={(editable ? "block" : "hidden")}>
                    { component }
                    <ColorEditor color={color} setColor={setColor}></ColorEditor>
                </div>
            </div>
        </article>
    );
}
