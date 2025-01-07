import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";
import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";

export default function EarningsEditor(func) {
    const article_options = {
        "color": "#108DFF", "caption": "Trabajo", "indicator": "Se agregaron",
        "value": "10000", "editableClassName": "(h-60) h-48", "component": NumericValueEditor()
    };

    const articles = [];
    articles[0] = article_options;

    return (
        <div className="flex justify-center w-full">
            { Earnings("16,680", [], true, true,  func, true) }
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                { Title({ "title": "Categorías", "icons": ["plus"] }) }
                { articles.map(data => EPreviewArticle(data)) }
            </div>
        </div>
    );
}
