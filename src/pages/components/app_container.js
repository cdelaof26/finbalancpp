import UserPrompt from "@/pages/components/login";
import {useState} from "react";

function showHelpSection() {
    return (
        <div className="flex flex-col w-full">
            <h2 className="self-center text-3xl text-white mb-4">
                Sección de ayuda
            </h2>
            <div className="h-full ml-4 mr-6 p-10 rounded-2xl dark:text-white bg-white dark:bg-black">
                Sección de ayuda de FinbalanC++.
            </div>
        </div>
    );
}

export default function AppContainer() {
    const [loginOpen, setLoginOpen] = useState(true);
    const [helpSectionOpen, setHelpSectionOpen] = useState(false);

    // let internal_component
    let container = (
        <div className="bg-gradient-to-tl from-cyan-500 to-blue-500 dark:from-sky-800 dark:to-blue-950 w-full h-full p-6">
            <div className="">
                <h1 className="text-5xl font-bold text-white">
                    Bienvenido
                </h1>
                <h2 className="text-3xl text-white">
                    FinBalanC++
                </h2>
            </div>
            <div className="flex justify-center h-[88%]">
                { helpSectionOpen ? showHelpSection() : UserPrompt(loginOpen) }
            </div>
        </div>
    );

    let func = {
        "setLoginOpen": setLoginOpen,
        "setHelpSectionOpen": setHelpSectionOpen
    };

    return [container, func];
}
