import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";
import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";

export default function EarningsEditor({func}) {
    const article_options = {
        "color": "#108DFF", "caption": "Trabajo", "indicator": "Se agregaron",
        "value": "10000", "editableClassName": "(h-60) h-48", "component": <NumericValueEditor showAll={true}></NumericValueEditor>
    };

    const articles = [
        article_options
    ];

    return (
        <div className="flex justify-center w-full">
            <Earnings earnings="16680" canPaintEditAsPressed={true} func={func}></Earnings>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Categorías" icons={["plus"]}></Title>
                { articles.map(d => <EPreviewArticle initialColor={d.color} caption={d.caption} indicator={d.indicator} value={d.value} editableClassName={d.editableClassName} component={d.component}></EPreviewArticle>) }
            </div>
        </div>
    );
}
