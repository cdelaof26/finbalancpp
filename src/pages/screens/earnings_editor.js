import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";
import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";
import {useEffect, useState} from "react";
import {newColor} from "@/pages/screens/internal/color_editor";
import {callAPI, fetchData} from "@/api/host";

function newArticle() {
    return {
        "caption": "", "value": "0", "editable": true, "color": newColor()
    };
}

export const sumValues = (newArticles, setUserEarnings) => {
    let fValue = 0;
    for (let a of newArticles)
        fValue += Number(a.value);

    setUserEarnings("" + fValue);
};

export default function EarningsEditor({func}) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchData("earnings", func.userId).then((v) => { setArticles(v); sumValues(v, func.setUserEarnings) }).catch((e) => { console.error('Error al obtener los datos:', e); func.setError("Error al cargar los datos", "Categorías no disponibles"); });
    }, []);

    const setProperty = (value, property, index) => {
        const a = articles[index];

        const mod = () => {
            const newArticles = [...articles];
            a[property] = value;
            newArticles[index] = a;
            if (property === "value")
                sumValues(newArticles, func.setUserEarnings);
            setArticles(newArticles);
        }

        if (property !== "editable")
            callAPI("editEarning", func.userId, {"id": a.id, "property": property, "value": value}, "POST").then(mod).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al modificar categoría", "Categorías no disponibles"); });
        else
            mod();
    };

    const createArticle = () => {
        const a = newArticle();

        const push = ({ id }) => {
            a["id"] = id;
            const newArticles = [...articles];
            newArticles.push(a);
            setArticles(newArticles);
            func.setMsg("Registrado", "Ingreso registrado correctamente.");
        }

        callAPI("createEarning", func.userId, a, "POST").then(push).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al crear categoría", "Categorías no disponibles"); });
    };

    const deleteArticle = (index) => {
        const a = articles[index];

        const del = () => {
            const newArticles = [...articles];
            newArticles.splice(index, 1);
            sumValues(newArticles, func.setUserEarnings);
            setArticles(newArticles);
        }

        callAPI("deleteEarning", func.userId, {"id": a.id}, "POST").then(del).catch((e) => { console.error('Error al ejecutar:', e); func.setError("Error al eliminar categoría", "Categorías no disponibles"); });
    };

    return (
        <div className="flex justify-center w-full">
            <Earnings canPaintEditAsPressed={true} func={func}></Earnings>
            <div className="flex overflow-y-auto flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
                <Title title="Categorías" icons={["plus"]} action={[createArticle]}></Title>
                { articles.length === 0 ? <NothingToSee></NothingToSee> : articles.map((a, index) => <EPreviewArticle editableClassName="h-48" indicator="Se agregaron"
                    title={a.caption} setTitle={(v) => {setProperty(v, "caption", index)}}
                    color={a.color} setColor={(v) => {setProperty(v, "color", index)}}
                    editable={a.editable} setEditable={(v) => {setProperty(v, "editable", index)}}
                    value={a.value} deleteAction={() => deleteArticle(index)}
                    component={<NumericValueEditor setError={func.setError} showModify={true} initialValue={a.value} setValue={(v) => {setProperty(v, "value", index)}}></NumericValueEditor>}></EPreviewArticle>)
                }
            </div>
        </div>
    );
}
