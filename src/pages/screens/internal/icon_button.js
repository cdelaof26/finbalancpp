import GetSVG from "@/pages/svg";

export default function IconButton(icon_name, style, action) {
    return (
        <button onClick={action} className={"rounded " + style}>
            { GetSVG(icon_name, "w-full h-full p-1 self-center text-accent-fg-0 dark:text-accent-fg-1") }
        </button>
    );
}
