import IconButton from "@/pages/screens/internal/icon_button";

function QuickLookDiv(data) {
    let dataAvailable = "color" in data && "caption" in data && "value" in data;

    if (!dataAvailable)
        return (
            <article className="flex flex-col w-full p-2 text-center">
                <label className="self-center text-2xl text-accent-dim-0 dark:text-accent-dim-1">
                    ¡No hay nada que mostrar!
                </label>
                <label className="self-center mt-2 text-accent-dim-0 dark:text-accent-dim-1">
                    No hay datos disponibles
                </label>
            </article>
        );

    return (
        <article className="flex justify-between w-full p-3 rounded-xl bg-primary-0 dark:bg-primary-1">
            <div className="flex">
                <div className="w-6 h-6 rounded-full" style={{backgroundColor: data.color}}></div>
                <label className="ps-3">
                    { data.caption }
                </label>
            </div>
            <label>
                { data.value }
            </label>
        </article>
    );
}

export default function PreviewWidget(title, options) {
    let class_data = "";
    let subtitle_buttons = [];
    let displayable_data = [{}];
    let max_items = 3;
    let button = null;


    if (options !== undefined) {
        if ("className" in options)
            class_data += options.className;
        if ("hideButton" in options && options.hideButton)
            subtitle_buttons[0] = IconButton("eye-slash", "w-9 h-9");
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
                <div className="flex justify-between">
                    <h1 className="self-center text-2xl font-bold mb-4">
                        {title}
                    </h1>
                    <div>
                        { subtitle_buttons.map((b) => b) }
                    </div>
                </div>
                <div>
                    { displayable_data.map((d) => QuickLookDiv(d)) }
                </div>
            </div>
            { button }
        </section>
    );
}
