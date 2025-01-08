import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import {format_money} from "@/pages/screens/internal/e_preview_article";
import PreviewWidget from "@/pages/screens/internal/preview_widget";
import ColorEditor from "@/pages/screens/internal/color_editor";
import Title from "@/pages/screens/internal/title_with_buttons";
import IconButton from "@/pages/screens/internal/icon_button";
import {useState} from "react";

function format_date(value) {
    if (/\d{4}-\d{2}-\d{2}/g.test(value))
        return value;

    if (/\d{2}\/\d{2}\/\d{4}/g.test(value)) {
        let values = value.split("/");
        return values[2] + "-" + values[1] + "-" + values[0];
    }

    return value;
}

function EDPreviewArticle({
          caption = null, initalValue = null, initialDate = null,
          initialColor = null, editableClassName, initialEditableState = false,
          initialCompletedState = false
}) {
    if (caption === null || initalValue === null || initialDate === null
        || initialColor === null || editableClassName === null)
        return <NothingToSee></NothingToSee>;

    const [editable, setEditable] = useState(initialEditableState);
    const [completed, setCompleted] = useState(initialCompletedState);

    const [title, setTitle] = useState(caption);
    const [value, setValue] = useState(initalValue);
    const [date, setDate] = useState(format_date(initialDate));
    const [color, setColor] = useState(initialColor);

    let label;
    if (!editable)
        label = <label className="ps-3 self-center"> { title } </label>
    else
        label = <input type="text" onChange={(e) => setTitle(e.target.value) } value={title} className="self-center ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Titulo"/>

    let value_label;
    if (!editable)
        value_label = <label className="self-center"> { format_money(value) } </label>
    else
        value_label = <input type="text" onChange={(e) => setValue(e.target.value) } value={value} className="self-center w-1/3 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Cantidad"/>

    let date_label;
    if (!editable)
        date_label = <label className="self-center"> { date } </label>
    else
        date_label = <input type="date" onChange={(e) => setDate(e.target.value) } value={date} className="self-center w-1/3 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="DD/MM/AAAA"/>

    return (
        <article className={"flex flex-col w-full p-3 transition-[height] duration-300 rounded-xl bg-primary-0 dark:bg-primary-1 " + (editable ? editableClassName : "h-24")}>
            <div className="flex justify-between">
                <div className="flex self-center">
                    <div className="self-center w-6 h-6 rounded-full" style={{backgroundColor: color}}></div>
                    { label }
                </div>
                <IconButton icon={completed ? "check" : ""} className="self-center border w-8 h-8" toggleVar={completed} action={setCompleted}></IconButton>
            </div>
            <div className="flex justify-between my-3">
                { value_label }
                { date_label }
                <div className="flex">
                    <IconButton icon="trash" className="self-center mx-2 w-8 h-8"></IconButton>
                    <IconButton icon="pencil" className="self-center w-8 h-8" toggleBg={true} toggleVar={editable} action={setEditable}></IconButton>
                </div>
            </div>
            <div className={"transition-[opacity] duration-300 " + (editable ? "opacity-100" : "opacity-0")}>
                <div className={(editable ? "block" : "hidden")}>
                    <ColorEditor color={color} setColor={setColor}></ColorEditor>
                </div>
            </div>
        </article>
    );
}

function Section({title, middle = false}) {
    const examples = [
        {"caption": "Pagar agua", "value": "30000000", "date": "12/12/2025",
            "color": "#E44F8F", "editableClassName": "h-40"},
        {"caption": "Pagar electricidad", "value": "3456", "date": "12/12/2025",
            "color": "#E4BB8F", "editableClassName": "h-40"},
    ];

    return (
        <div className={"flex flex-col w-[40%] p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1 " + (middle ? "mx-4" : "")}>
            <Title title={title} icons={["plus"]}></Title>
            <label className="uppercase font-bold text-accent-dim-0 mb-4">
                Vigentes
            </label>
            { examples.map(e => <EDPreviewArticle
                caption={e.caption} initalValue={e.value} initialDate={e.date} initialColor={e.color}
                editableClassName={e.editableClassName}></EDPreviewArticle>) }
            <label className="uppercase font-bold text-accent-dim-0 my-4">
                Completados
            </label>
            <label className="uppercase font-bold text-accent-dim-0 my-4">
                Caducados
            </label>
        </div>
    );
}

export default function DebitNDebt({func}) {
    const tips_example = [
        { "caption": "¿Cómo pedir un préstamo?", "captionClassName": "font-bold", "articleClassName": "my-2 p-4" },
        { "caption": "¿Qué pasa si no pago mi deuda por $5,000,000?", "captionClassName": "font-bold", "articleClassName": "my-2 p-4" },
        { "caption": "Gambling: Cómo Evitar Las Deudas En Juegos De Azar", "captionClassName": "font-bold", "articleClassName": "my-2 p-4" }
    ];

    const tips_options = {
        "className": " w-[20%]",
        "data": tips_example,
        "maxItems": 6,
        "doNotLimitHeight": true,
        "buttonCaption": "Ver más tips",
        "buttonAction": () => { func.setSidebarToggled(6); func.loadTips() }
    };

    return (
        <div className="flex justify-center w-full">
            <Section title="Adeudos"></Section>
            <Section title="Deudas" middle={true}></Section>
            <PreviewWidget title="Tips" data={tips_options}></PreviewWidget>
        </div>
    );
}
