import IconButton from "@/pages/screens/internal/icon_button";

export default function Title(options) {
    if (!("title" in options))
        return <></>;

    const title_class_data = "className" in options ? options.className : "text-2xl";

    const ics = "icons" in options ? options.icons : []; // icon
    const ics_class_data = "self-center " + ("iconsClassName" in options ? options.iconsClassName : "w-9 h-9"); // className
    const ics_paint_as_pressed = "paintPressed" in options ? options.paintPressed : []; // false
    const ics_toggle_bg = "toggleBg" in options ? options.toggleBg : []; // false
    const ics_toggle_var = "toggleVar" in options ? options.toggleVar : []; // null
    const ics_toggle_icon = "toggleIcon" in options ? options.toggleIcon : []; // null
    const ics_action = "action" in options ? options.action : []; // null

    const buttons = ics.map((icon, i) => {
        const opt = {
            "icon": icon, "className": ics_class_data,
            "paintPressed": ics_paint_as_pressed.length > i ? ics_paint_as_pressed[i] : false,
            "toggleBg": ics_toggle_bg.length > i ? ics_toggle_bg[i] : false,
            "toggleVar": ics_toggle_var.length > i ? ics_toggle_var[i] : null,
            "toggleIcon": ics_toggle_icon.length > i ? ics_toggle_icon[i] : null,
            "action": ics_action.length > i ? ics_action[i] : null,
        };
        return IconButton(opt);
    });

    return (
        <div className="flex justify-between w-full self-center">
            <h1 className={"self-center font-bold mb-4 " + title_class_data}>
                { options.title }
            </h1>
            <div>
                { buttons }
            </div>
        </div>
    );
}
