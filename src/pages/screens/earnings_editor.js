import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";

function Editor() {
    return (
        <div className="flex flex-col w-full mt-4">
            <div className="flex justify-between w-full">
                <div className="flex flex-col w-[25%]">
                    <input type="text" className="w-full self-center text-center p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="$100"/>
                    <button className="w-full self-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Agregar
                    </button>
                </div>
                <div className="flex flex-col w-[25%]">
                    <input type="text" className="w-full self-center text-center p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="$100"/>
                    <button className="w-full self-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Modificar
                    </button>
                </div>
                <div className="flex flex-col w-[25%]">
                    <input type="text" className="w-full self-center text-center p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="$100"/>
                    <button className="w-full self-center text-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Descontar
                    </button>
                </div>
            </div>
            {/*<button className="self-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                Descartar cambios
            </button>*/}
        </div>
    );
}

export default function EarningsEditor(func) {
    const article_options = {
        "color": "#108DFF", "caption": "Trabajo", "indicator": "Se agregaron",
        "value": "10000", "editableClassName": "(h-60) h-48", "component": Editor()
    };

    const articles = [];
    articles[0] = article_options;

    return (
        <div className="flex justify-center w-full">
            { Earnings("16,680", [], true, true,  func, true) }
            <div className="flex flex-col w-[60%] mx-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                { Title({ "title": "Categorías", "icons": ["plus"] }) }
                { articles.map(data => EPreviewArticle(data)) }
            </div>
        </div>
    );
}
