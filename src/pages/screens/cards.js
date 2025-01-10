import CardEditor from "@/pages/screens/internal/card_editor";
import Earnings from "@/pages/screens/internal/earnings";

export default function Cards({func}) {
    return (
        <div className="flex justify-center w-full">
            <Earnings func={func}></Earnings>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <h1 className="font-bold mb-4 text-2xl">
                    Tarjeta
                </h1>
                <CardEditor></CardEditor>
            </div>
        </div>
    );
}
