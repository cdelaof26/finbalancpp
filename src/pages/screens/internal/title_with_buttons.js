import IconButton from "@/pages/screens/internal/icon_button";

export default function Title({
      title = null, className = "text-2xl", icons = [],
      iconsClassName = "w-9 h-9", paintPressed = [], toggleBg = [],
      toggleVar = [], toggleIcon = [], action = []
}) {
    if (title === null)
        return <></>;

    iconsClassName += " self-center";

    const buttons = icons.map((icon, i) => {
        return <IconButton icon={icon} className={iconsClassName} paintPressed={paintPressed.length > i ? paintPressed[i] : false}
                           toggleBg={toggleBg.length > i ? toggleBg[i] : false} toggleVar={toggleVar.length > i ? toggleVar[i] : null} toggleIcon={toggleIcon.length > i ? toggleIcon[i] : null}
                           action={action.length > i ? action[i] : null}>
        </IconButton>;
    });

    return (
        <div className="flex justify-between w-full self-center">
            <h1 className={"self-center font-bold mb-4 " + className}>
                { title }
            </h1>
            <div>
                { buttons }
            </div>
        </div>
    );
}
