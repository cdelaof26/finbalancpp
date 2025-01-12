
export default function NothingToSee({visible = true}) {
    return (
        <article className={"flex flex-col w-full p-2 text-center " + (visible ? "" : "hidden")}>
            <label className="self-center text-2xl text-accent-dim-0 dark:text-accent-dim-1">
                ¡No hay nada que mostrar!
            </label>
            <label className="self-center mt-2 text-accent-dim-0 dark:text-accent-dim-1">
                No hay datos disponibles
            </label>
        </article>
    );
}
