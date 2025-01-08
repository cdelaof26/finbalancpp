import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import GetSVG from "@/pages/svg";

function Note(data) {
    if ("padding" in data)
        return <div className="mb-8 w-52 h-20 invisible"></div>

    if (!("title" in data) || !("image" in data))
        return NothingToSee();

    return (
        <button className="flex flex-col w-40 h-40 lg:w-64 lg:h-64 m-2 rounded-xl bg-primary-0 dark:bg-primary-1">
            <span className="flex justify-center w-full h-1/2 rounded-t-xl bg-accent-dim-0 dark:bg-accent-dim-1">
                { GetSVG("photo", "self-center w-12 h-12") }
            </span>
            <span className="flex font-bold text-left p-2 lg:p-4 h-1/2 text-ellipsis overflow-hidden">
                { data.title }
            </span>
        </button>
    );
}

export default function Tips() {
    const notes = [
        {"title": "Aprende a invertir en bitcoin", "image": null},
        {"title": "¡No te dejes engañar! Bitcoin y las estafas online", "image": null},
        {"title": "Planifica tu retiro: consejos para una jubilación tranquila.", "image": null},
        {"title": "Ahorra sabiamente: consejos para una vida financiera sólida.", "image": null},
        {"title": "Domina tus gastos: estrategias para un presupuesto equilibrado.", "image": null},
    ];

    return (
        <div className="flex justify-center h-full w-full">
            <div className="overflow-y-auto w-[40%] p-6 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <div className="flex justify-between h-fit">
                    <div className="flex flex-col">
                        { notes.slice(0, Math.trunc(notes.length / 2) + 1).map(n => Note(n)) }
                    </div>
                    <div className="flex flex-col">
                        { Note({"padding": true}) }
                        { notes.slice(Math.trunc(notes.length / 2) + 1, notes.length).map(n => Note(n)) }
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl border border-b-accent-dim-0 dark:border-b-accent-dim-1 bg-primary-0 dark:bg-primary-1 dark:text-accent-fg-1">

            </div>
        </div>
    );
}
