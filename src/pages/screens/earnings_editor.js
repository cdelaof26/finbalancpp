import NumericValueEditor from "@/pages/screens/internal/numeric_value_editor";
import EPreviewArticle from "@/pages/screens/internal/e_preview_article";
import Title from "@/pages/screens/internal/title_with_buttons";
import Earnings from "@/pages/screens/internal/earnings";
import { useState } from "react";
import { newColor } from "@/pages/screens/internal/color_editor";
import NothingToSee from "@/pages/screens/internal/nothing_to_show_component";
import { deleteEarnings } from "@/models/earnings";
function newArticle() {
  return {
    caption: "",
    value: "0",
    editable: true,
    color: newColor(),
  };
}

export default function EarningsEditor({ func, cardData, eranD }) {
  const [articles, setArticles] = useState(eranD);

  const sumValues = (newArticles) => {
    let fValue = 0;
    for (let a of newArticles) fValue += Number(a.value);

    func.setUserEarnings("" + fValue);
  };

  const setProperty = (value, property, index) => {
    const newArticles = [...articles];
    const a = newArticles[index];
    a[property] = value;
    newArticles[index] = a;
    if (property === "value") sumValues(newArticles);
    setArticles(newArticles);
  };

  const createArticle = () => {
    const newArticles = [...articles];
    newArticles.push(newArticle());
    setArticles(newArticles);
  };

  const deleteArticle = async (index) => {
    await deleteEarnings(articles[index].color, articles[index].caption);
    const newArticles = [...articles];
    newArticles.splice(index, 1);
    sumValues(newArticles);
    setArticles(newArticles);
  };

  return (
    <div className="flex justify-center w-full">
      <Earnings
        canPaintEditAsPressed={true}
        func={func}
        cardData={cardData}
      ></Earnings>
      <div className="flex overflow-y-auto flex-col w-[60%] ml-4 p-8 rounded-2xl bg-secondary-0 dark:bg-secondary-1 dark:text-accent-fg-1">
        <Title
          title="Categorías"
          icons={["plus"]}
          action={[createArticle]}
        ></Title>
        {articles.length === 0 ? (
          <NothingToSee></NothingToSee>
        ) : (
          articles.map((a, index) => (
            <EPreviewArticle
              editableClassName="h-48"
              indicator="Se agregaron"
              title={a.caption}
              setTitle={(v) => {
                setProperty(v, "caption", index);
              }}
              color={a.color}
              setColor={(v) => {
                setProperty(v, "color", index);
              }}
              editable={a.editable}
              setEditable={(v) => {
                setProperty(v, "editable", index);
              }}
              value={a.value}
              deleteAction={() => deleteArticle(index)}
              component={
                <NumericValueEditor
                  setError={func.setError}
                  showModify={true}
                  initialValue={a.value}
                  setValue={(v) => {
                    setProperty(v, "value", index);
                  }}
                ></NumericValueEditor>
              }
            ></EPreviewArticle>
          ))
        )}
      </div>
    </div>
  );
}
