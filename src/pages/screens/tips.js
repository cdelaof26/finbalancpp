import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import GetSVG from "@/pages/svg";

function Note({paddingComponent = false, title = null, image = null}) {
    if (paddingComponent)
        return <div className="mb-8 w-52 h-20 invisible"></div>

    if (title === null)
        return <NothingToSee></NothingToSee>

    return (
        <button className="flex flex-col w-40 h-40 xl:w-64 xl:h-64 m-2 rounded-xl bg-primary-0 dark:bg-primary-1">
            <span className="flex justify-center w-full h-1/2 rounded-t-xl bg-accent-dim-0 dark:bg-accent-dim-1">
                <GetSVG name="photo" classNameData="self-center w-12 h-12"></GetSVG>
            </span>
            <span className="flex font-bold text-left p-2 lg:p-4 h-1/2 text-ellipsis overflow-hidden">
                { title }
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
                <div className="flex justify-evenly h-fit">
                    <div className="flex flex-col">
                        { notes.slice(0, Math.trunc(notes.length / 2) + 1).map(n => <Note title={n.title} image={n.image}></Note>) }
                    </div>
                    <div className="flex flex-col">
                        <Note paddingComponent={true}></Note>
                        { notes.slice(Math.trunc(notes.length / 2) + 1, notes.length).map(n => <Note title={n.title} image={n.image}></Note>) }
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl border border-b-accent-dim-0 dark:border-b-accent-dim-1 bg-primary-0 dark:bg-primary-1 dark:text-accent-fg-1">

            </div>
        </div>
    );
}
