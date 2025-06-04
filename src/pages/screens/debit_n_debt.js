import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import {format_money} from "@/pages/screens/internal/e_preview_article";
import PreviewWidget from "@/pages/screens/internal/preview_widget";
import ColorEditor, {newColor} from "@/pages/screens/internal/color_editor";
import Title from "@/pages/screens/internal/title_with_buttons";
import IconButton from "@/pages/screens/internal/icon_button";
import {useEffect, useState} from "react";
import {callAPI, fetchDataGET} from "@/api/host";
import {date_form} from "@/pages/screens/investments";

export function format_date(value) {
    if (/^\d{4}-\d{1,2}-\d{1,2}$/g.test(value))
        return value;

    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/g.test(value)) {
        let values = value.split("/");
        return values[2] + "-" + values[1] + "-" + values[0];
    }

    try {
        const d = new Date(Date.parse(value));
        return d.getFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate();
    } catch (e) {
        return value;
    }
}

export function get_date() {
    const d = new Date(Date.now());
    return d.getFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate();
}

const day = 60 * 60 * 24;

function expired(d) {
    const now = Math.round(new Date(Date.now()).getTime() / 1000);
    const date = Math.round(new Date(d).getTime() / 1000);
    return now > date + day * 2;
}

function newArticle(isDebt) {
    return {
        "caption": "", "value": "0", "editable": true,
        "color": newColor(), "date": get_date(), "completed": false,
        "isDebt": isDebt
    };
}

export function validateData(v, set, setError) {
    if (/\d+/g.test(v) || v.length === 0) {
        set(v);
        return;
    }

    if (setError !== undefined)
        setError("Valor inválido", "El valor ingresado no es válido");
}

function EDPreviewArticle({
          title, setTitle = null, value, setValue = null, editable, setEditable = null,
          color, setColor = null, date, setDate = null,
          completed, setCompleted = null, deleteAction = null,
          render = true, editableClassName = "", setError = null
}) {
    if (!render)
        return <NothingToSee></NothingToSee>;

    let label;
    if (!editable)
        label = <label className="ps-3 self-center"> { title === "" ? "Elemento sin nombre" : title } </label>
    else
        label = <input type="text" onChange={(e) => setTitle(e.target.value) } value={title} className="self-center ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Titulo"/>

    let value_label;
    if (!editable)
        value_label = <label className="self-center"> { format_money(value) } </label>
    else
        value_label = <input type="text" onChange={(e) => validateData(e.target.value, setValue, setError) } value={value} className="self-center w-1/3 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="Cantidad"/>

    let date_label;
    if (!editable)
        date_label = <label className="self-center"> { format_date(date) } </label>
    else
        date_label = <input type="date" onChange={(e) => setDate(e.target.value) } value={date} className="self-center w-1/3 ps-3 p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="DD/MM/AAAA"/>

    return (
        <article className={"flex flex-col w-full p-3 transition-[height] duration-300 rounded-xl bg-primary-0 dark:bg-primary-1 " + (editable ? editableClassName : "h-24")}>
            <div className="flex justify-between">
                <div className="flex self-center">
                    <div className="self-center w-6 h-6 rounded-full" style={{backgroundColor: color}}></div>
                    { label }
                </div>
                <div className="flex">
                    <label className={"self-center rounded-lg p-1 mr-6 uppercase text-sm font-bold border border-accent-b-0 dark:border-accent-b-1 bg-secondary-0 dark:bg-secondary-1 " + (!completed && expired(date) ? "" : "hidden")}>
                        Caducado
                    </label>
                    <IconButton icon={completed ? "check" : ""} className="self-center border w-8 h-8" toggleVar={completed} action={setCompleted}></IconButton>
                </div>
            </div>
            <div className="flex justify-between my-3">
                { value_label }
                { date_label }
                <div className="flex">
                    <IconButton icon="trash" className={"self-center w-8 h-8" + (completed ? "" : "mx-2")} action={deleteAction}></IconButton>
                    <IconButton icon="pencil" className={"self-center w-8 h-8 " + (completed ? "hidden" : "")} toggleBg={true} toggleVar={editable} action={setEditable}></IconButton>
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

function Section({title, middle = false, func}) {
    const [completedArticles, setCompletedArticles] = useState([]);
    const [nonCompletedArticles, setNonCompletedArticles] = useState([]);

    const loadData = (data) => {
        const newCompleted = [];
        const newNonCompleted = [];
        for (let d of data)
            if (d["completed"])
                newCompleted.push(d);
            else
                newNonCompleted.push(d);

        setCompletedArticles(newCompleted);
        setNonCompletedArticles(newNonCompleted);
    }

    useEffect(() => {
        callAPI("deb", func.userId, {"isDebt": middle}, "POST").then(loadData).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", title + " no disponibles"); });
    }, []);

    const createNonCompletedArticle = () => {
        const a = newArticle(middle);

        const push = ({ id }) => {
            a["id"] = id;
            const newNonCompleted = [...nonCompletedArticles];
            newNonCompleted.push(a);
            setNonCompletedArticles(newNonCompleted);
            func.setMsg("Registrado", title.replace("s", "") + " registrado correctamente.");
        }

        callAPI("createDeb", func.userId, a, "POST").then(push).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al crear " + title, title + " no disponibles"); });
    };

    let previousCall = "";
    const setProperty = (value, property, index, searchInCompletedArticles) => {
        const newCompletedArticles = [...completedArticles];
        const newNonCompletedArticles = [...nonCompletedArticles];
        const a = searchInCompletedArticles ? newCompletedArticles[index] : newNonCompletedArticles[index];

        const mod = () => {
            a[property] = value;

            if (property === "completed") {
                if (a.editable)
                    a.editable = false;

                if (searchInCompletedArticles && !a.completed) {
                    newCompletedArticles.splice(index, 1);
                    newNonCompletedArticles.push(a);
                } else if (!searchInCompletedArticles && a.completed) {
                    newNonCompletedArticles.splice(index, 1);
                    newCompletedArticles.push(a);
                }
            } else {
                if (searchInCompletedArticles)
                    newCompletedArticles[index] = a;
                else
                    newNonCompletedArticles[index] = a;
            }

            setCompletedArticles(newCompletedArticles);
            setNonCompletedArticles(newNonCompletedArticles);
        }

        if (previousCall === property && previousCall === "date")
            return;
        previousCall = property;

        const numeric = property === "value";
        const is_date = property === "date";

        if (property !== "editable")
            callAPI("editDeb", func.userId, {"id": a.id, "property": property, "value": numeric && value === "" ? "0" : is_date && value === "" ? get_date() : value}, "POST").then(mod).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al editar " + title, title + " no disponibles"); });
        else
            mod();
    };

    const deleteArticle = (index, searchInCompletedArticles) => {
        const a = searchInCompletedArticles ? completedArticles[index] : nonCompletedArticles[index];

        const del = () => {
            const newArticles = searchInCompletedArticles ? [...completedArticles] : [...nonCompletedArticles];
            newArticles.splice(index, 1);
            if (searchInCompletedArticles)
                setCompletedArticles(newArticles);
            else
                setNonCompletedArticles(newArticles);
        }

        callAPI("deleteDeb", func.userId, {"id": a.id}, "POST").then(del).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al eliminar " + title, title + " no disponibles"); });
    }

    const presentData = completedArticles.length + nonCompletedArticles.length !== 0;

    return (
        <div className={"flex overflow-y-auto flex-col w-[40%] p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1 " + (middle ? "mx-4" : "")}>
            <Title title={title} icons={["plus"]} action={[createNonCompletedArticle]}></Title>
            <NothingToSee visible={!presentData}></NothingToSee>
            <label className={"uppercase font-bold text-accent-dim-0 mb-4 " + (!presentData ? "hidden" : "")}>
                Sin completar
            </label>
            { nonCompletedArticles.map((a, index) => <EDPreviewArticle editableClassName="h-40"
                title={a.caption} setTitle={(v) => setProperty(v, "caption", index, false)}
                value={a.value} setValue={(v) => setProperty(v, "value", index, false)}
                editable={a.editable} setEditable={(v) => setProperty(v, "editable", index, false)}
                color={a.color} setColor={(v) => setProperty(v, "color", index, false)}
                date={a.date} setDate={(v) => setProperty(v, "date", index, false)}
                completed={a.completed} setCompleted={(v) => setProperty(v, "completed", index, false)}
                deleteAction={() => deleteArticle(index, false)} setError={func.setError}
            ></EDPreviewArticle>) }
            <label className={"uppercase font-bold text-accent-dim-0 my-4 " + (!presentData ? "hidden" : "")}>
                Completados
            </label>
            { completedArticles.map((a, index) => <EDPreviewArticle editableClassName="h-40"
               title={a.caption} setTitle={(v) => setProperty(v, "caption", index, true)}
               value={a.value} setValue={(v) => setProperty(v, "value", index, true)}
               editable={a.editable} setEditable={(v) => setProperty(v, "editable", index, true)}
               color={a.color} setColor={(v) => setProperty(v, "color", index, true)}
               date={a.date} setDate={(v) => setProperty(v, "date", index, true)}
               completed={a.completed} setCompleted={(v) => setProperty(v, "completed", index, true)}
               deleteAction={() => deleteArticle(index, true)} setError={func.setError}
            ></EDPreviewArticle>) }
        </div>
    );
}

export default function DebitNDebt({func}) {
    const tips_options = {
        "className": " w-[20%]",
        "data": [], // tips_example,
        "maxItems": 6,
        "doNotLimitHeight": true,
        "buttonCaption": "Ver más tips",
        "buttonAction": () => { func.setSidebarToggled(6); func.loadTips() }
    };
    const [tipsOptions, setTipsOptions] = useState(tips_options);
    const updateTips = (data) => {
        for (let d of data) {
            d["captionClassName"] = "font-bold";
            d["articleClassName"] = "my-2 p-4";
        }

        const newTipsOptions = tips_options;
        newTipsOptions["data"] = data;
        setTipsOptions(newTipsOptions);
    }

    useEffect(() => {
        fetchDataGET("previewTips").then(updateTips).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al cargar tips", "Tips no disponibles"); });
    }, []);

    return (
        <div className="flex justify-center w-full">
            <Section title="Adeudos" func={func}></Section>
            <Section title="Deudas" middle={true} func={func}></Section>
            <PreviewWidget title="Tips" data={tipsOptions}></PreviewWidget>
        </div>
    );
}
