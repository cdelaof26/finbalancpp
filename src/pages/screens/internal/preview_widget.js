import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import Title from "@/pages/screens/internal/title_with_buttons";

function PreviewArticle(data) {
    if (!("caption" in data))
        return NothingToSee();

    const value_label = "value" in data ? <label> { data.value } </label> : null;
    const color_badge = "color" in data ? <div className="w-6 h-6 rounded-full" style={{backgroundColor: data.color}}></div> : null;

    if (value_label === null && color_badge === null) {
        const caption_style = "captionClassName" in data ? data.captionClassName : "";
        const article_style =  "articleClassName" in data ? data.articleClassName : "";

        return (
            <article className={"flex justify-center w-full p-3 rounded-xl bg-primary-0 dark:bg-primary-1 " + article_style}>
                <label className={caption_style}>
                    { data.caption }
                </label>
            </article>
        );
    }

    return (
        <article className="flex justify-between w-full p-3 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                { color_badge }
                <label className="ps-3">
                    { data.caption }
                </label>
            </div>
            { value_label }
        </article>
    );
}

export default function PreviewWidget(title, options) {
    let class_data = "";
    let icons = [];
    let displayable_data = [{}];
    let max_items = 3;
    let button = null;

    if (options !== undefined) {
        if ("className" in options)
            class_data += options.className;
        if ("hideButton" in options && options.hideButton)
            icons[0] = "eye-slash";
        if ("maxItems" in options)
            max_items = options.maxItems;
        if ("data" in options)
            displayable_data = options.data.slice(0, max_items);
        if ("buttonCaption" in options)
            button = (
                <button className="self-center w-full p-3 font-bold rounded-lg bg-primary-0 dark:bg-primary-1 text-accent-fg-0 dark:text-accent-fg-1" onClick={"buttonAction" in options ? options.buttonAction : null}>
                    { options.buttonCaption }
                </button>
            )
    }

    return (
        <section className={"flex flex-col justify-between h-1/2 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1 " + class_data}>
            <div>
                { Title({"title": title, "iconsClassName": "w-9 h-9", "icons": icons}) }
                <div>
                    { displayable_data.map((d) => PreviewArticle(d)) }
                </div>
            </div>
            { button }
        </section>
    );
}
