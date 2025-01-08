import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import Title from "@/pages/screens/internal/title_with_buttons";

function PreviewArticle({
        caption = null, value = null, color = null,
        captionClassName = "", articleClassName = ""
}) {
    if (caption === null)
        return <NothingToSee></NothingToSee>;

    const value_label = value !== null ? <label> { value } </label> : null;
    const color_badge = color !== null ? <div className="w-6 h-6 rounded-full" style={{backgroundColor: color}}></div> : null;

    if (value_label === null && color_badge === null) {
        return (
            <article className={"flex w-full p-3 rounded-xl bg-primary-0 dark:bg-primary-1 " + articleClassName}>
                <label className={" " + captionClassName + (caption.length > 24 ? " text-sm" : "")}>
                    { caption }
                </label>
            </article>
        );
    }

    return (
        <article className="flex justify-between w-full p-3 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                { color_badge }
                <label className="ps-3">
                    { caption }
                </label>
            </div>
            { value_label }
        </article>
    );
}

export default function PreviewWidget({title, data = null}) {
    let class_data = "";
    let height = " h-1/2";
    let icons = [];
    let displayable_data = [{}];
    let max_items = 3;
    let button = null;

    if (data !== null) {
        if ("className" in data)
            class_data += data.className;
        if ("doNotLimitHeight" in data)
            height = data.doNotLimitHeight ? "" : height;
        if ("icons" in data)
            icons = data.icons;
        if ("maxItems" in data)
            max_items = data.maxItems;
        if ("data" in data)
            displayable_data = data.data.slice(0, max_items);
        if ("buttonCaption" in data)
            button = (
                <button className="self-center truncate w-full p-3 font-bold rounded-lg bg-primary-0 dark:bg-primary-1 text-accent-fg-0 dark:text-accent-fg-1" onClick={"buttonAction" in data ? data.buttonAction : null}>
                    { data.buttonCaption }
                </button>
            );
    }

    return (
        <section className={"flex flex-col justify-between p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1 " + class_data + height}>
            <div>
                <Title title={title} icons={icons}></Title>
                <div>
                    { displayable_data.map((d) => PreviewArticle(d)) }
                </div>
            </div>
            { button }
        </section>
    );
}
