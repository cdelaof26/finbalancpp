import UserPrompt from "@/pages/components/login";
import {useState} from "react";

function showHelpSection() {
    return (
        <div className="flex flex-col w-full">
            <h2 className="self-center text-3xl text-accent-fg-1 mb-4">
                Sección de ayuda
            </h2>
            <div className="h-full ml-4 mr-6 p-10 rounded-2xl dark:text-accent-fg-1 bg-primary-0 dark:bg-primary-1">
                Sección de ayuda de FinbalanC++.
            </div>
        </div>
    );
}

export default function LoginContainer(setShowLogin) {
    const [helpSectionOpen, setHelpSectionOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(true);

    let func = {
        "setLoginOpen": setLoginOpen,
        "setHelpSectionOpen": setHelpSectionOpen
    };

    let container = (
        <div className="w-full h-full p-6 bg-gradient-to-tl from-cyan-500 to-blue-500 dark:from-sky-800 dark:to-blue-950">
            <div>
                <h1 className="text-5xl font-bold text-accent-fg-1">
                    Bienvenido
                </h1>
                <h2 className="text-3xl text-accent-fg-1">
                    FinbalanC++
                </h2>
            </div>
            <div className="flex h-[88%] justify-center">
                { helpSectionOpen ? showHelpSection() : UserPrompt(loginOpen, setShowLogin) }
            </div>
        </div>
    );

    return [container, func];
}
