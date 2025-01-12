import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import GetSVG from "@/pages/svg";
import {useState} from "react";

function Note({title = null, image = null, clickAction}) {
    if (title === null)
        return <NothingToSee></NothingToSee>

    return (
        <button onClick={clickAction} className="self-center w-40 h-40 lg:w-64 lg:h-64 rounded-xl bg-primary-0 dark:bg-primary-1">
            <span className="flex justify-center w-full h-1/2 rounded-t-xl bg-slate-300 dark:bg-slate-800">
                { image === null ? <GetSVG name="photo" classNameData="self-center w-12 h-12"></GetSVG> : null }
            </span>
            <span className="flex-col justify-center text-left p-2 lg:p-4 w-full h-1/2 font-bold flex lg:hidden">
                { title.length > 33 ? title.substring(0, 33) + "..." : title }
            </span>
            <span className="flex-col justify-center text-justify p-2 lg:p-4 w-full h-1/2 font-bold hidden lg:flex">
                { title }
            </span>
        </button>
    );
}

function NoteViewer({title = null, image = null, contentLink = null}) {
    const content = "";

    if (title === null)
        return (
            <div className="flex flex-col justify-between overflow-y-auto w-[60%] ml-4 p-8 rounded-2xl border-2 bg-primary-0 dark:bg-primary-1 dark:text-accent-fg-1">
                <div></div>
                <h1 className="m-2 text-right text-accent-dim-0 dark:text-accent-dim-1">
                    Presiona sobre una nota para empezar a leer
                </h1>
            </div>
        );

    return (
        <div className="flex flex-col overflow-y-auto w-[60%] ml-4 p-8 rounded-2xl border-2 bg-primary-0 dark:bg-primary-1 dark:text-accent-fg-1">
            <div className="h-fit">
                <div className="flex justify-center w-full h-96 rounded-xl bg-slate-300 dark:bg-slate-800">
                    { image === null ? <GetSVG name="photo" classNameData="self-center w-24 h-24"></GetSVG> : null }
                </div>
                <h1 className="m-2 text-center font-bold text-3xl">
                    { title }
                </h1>
                <article className="text-justify">
                    { content }
                </article>
            </div>
        </div>
    );
}

export default function Tips() {
    const notes = [
        /*{"title": "Aprende a invertir en bitcoin", "image": null, "contentLink" : null},
        {"title": "¡No te dejes engañar! Bitcoin y las estafas online", "image": null, "contentLink" : null},
        {"title": "Planifica tu retiro: consejos para una jubilación tranquila.", "image": null, "contentLink" : null},
        {"title": "Ahorra sabiamente: consejos para una vida financiera sólida.", "image": null, "contentLink" : null},
        {"title": "Domina tus gastos: estrategias para un presupuesto equilibrado.", "image": null, "contentLink" : null}*/
    ];

    const [note, setNote] = useState({});

    const loadNote = (index, searchInFirstHalf) => {
        if (!searchInFirstHalf)
            index += Math.trunc(notes.length / 2) + 1;

        setNote(notes[index]);
    }

    return (
        <div className="flex justify-center h-full w-full">
            <div className="overflow-y-auto w-[40%] rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <NothingToSee visible={notes.length === 0}></NothingToSee>
                <div className="flex justify-center h-fit">
                    <div className="flex flex-col w-1/2 space-y-6 py-6">
                        { notes.slice(0, Math.trunc(notes.length / 2) + 1).map((n, index) => <Note clickAction={() => loadNote(index, true)} title={n.title} image={n.image}></Note>) }
                    </div>
                    <div className="flex flex-col w-1/2 space-y-6 py-6">
                        <div className="self-center w-40 h-20 invisible"></div>
                        { notes.slice(Math.trunc(notes.length / 2) + 1, notes.length).map((n, index) => <Note clickAction={() => loadNote(index, false)} title={n.title} image={n.image}></Note>) }
                    </div>
                </div>
            </div>
            <NoteViewer title={note.title} image={note.image} contentLink={note.contentLink}></NoteViewer>
        </div>
    );
}
