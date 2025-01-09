import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";
import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";
import {newColor} from "@/pages/screens/internal/color_editor";
import {useState} from "react";

function newArticle(value, setValue, setError) {
    return {
        "caption": "", "indicator": "Se agregaron", "value": value, "color": newColor(),
        "editableClassName": "h-48", "component": <NumericValueEditor setError={setError} initialValue={value} setValue={setValue} showAll={true}></NumericValueEditor>,
        "initialEditableState": true
    };
}

export default function EarningsEditor({func}) {
    const [values, setValues] = useState([]);
    const [articles, setArticles] = useState([]);

    const setValue = (value, index) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
    };

    const createState = () => {
        const newValues = [...values];
        newValues.push("0");
        setValues(newValues);
    };

    const createArticle = () => {
        const a = newArticle( values[values.length], (v) => setValue(v, values.length), func.setError);
        setArticles((data) => [...data, a]);
    }

    return (
        <div className="flex justify-center w-full">
            <Earnings earnings="16680" canPaintEditAsPressed={true} func={func}></Earnings>
            <div className="flex flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Categorías" icons={["plus"]} action={[() => {createState(); createArticle()}]}></Title>
                { articles.map((d, index) => <EPreviewArticle
                    initialColor={d.color} caption={d.caption} indicator={d.indicator}
                    value={values[index]} editableClassName={d.editableClassName} component={d.component}
                    initialEditableState={d.initialEditableState}></EPreviewArticle>)
                }
            </div>
        </div>
    );
}
