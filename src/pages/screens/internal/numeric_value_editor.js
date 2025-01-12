import {useState} from "react";

function updateValue(newValue, value, setValue, mode, setError) {
    if (newValue.includes(","))
        newValue = newValue.replaceAll(",", "");

    if (/^(\d+|\d+\.?\d+)$/g.test(newValue)) {
        let data = "";
        switch (mode) {
            case 0:
                data = "" + (Number(value) + Number(newValue));
            break;
            case 1:
                data = newValue;
            break;
            case 2:
                data = "" + (Number(value) - Number(newValue));
            break;
        }

        if (data.startsWith("-")) {
            if (setError !== null)
                setError("Valor demasiado grande", "El valor ingresado no puede ser mayor que " + value);

            return value;
        }

        setValue(data);

        return data;
    }

    if (setError !== null)
        setError("Valor inválido", "El valor ingresado no es válido");

    return value;
}

function InputValueSelector({value, setValue}) {
    return (
        <input onChange={e => { setValue(e.target.value) }} value={value === "0" ? "" : value} type="text" className="w-full self-center text-center p-1.5 rounded-lg text-sm bg-secondary-0 dark:bg-secondary-1 border border-accent-b-0 dark:border-accent-b-1 text-accent-fg-0 dark:text-accent-fg-1 placeholder-accent-dim-0 dark:placeholder-accent-dim-1 focus:ring-accent-0 focus:border-accent-0" placeholder="$100"/>
    );
}

export default function NumericValueEditor({
       showAdd = false, showModify = false, showRemove = false,
       showAll = false, initialValue = "0", setValue = null, setError = null
}) {
    if (showAll) {
        showAdd = true;
        showModify = true;
        showRemove = true;
    }

    const [fieldValue, setFieldValue] = useState(["0", initialValue, "0"]);
    const setFieldValueI = (value, index) => {
        const newFieldValue = [...fieldValue];
        newFieldValue[index] = value;
        setFieldValue(newFieldValue);
    };

    const updateField = (i) => {
        const v = updateValue(fieldValue[i], fieldValue[1], setValue, i, setError);

        const newFieldValue = [...fieldValue];
        newFieldValue[1] = v;
        if (i !== 1) newFieldValue[i] = "";
        setFieldValue(newFieldValue);
    }

    return (
        <div className="flex flex-col w-full mt-4">
            <div className="flex justify-between w-full">
                <div className={"flex flex-col w-[25%] " + (showAdd ? "" : "invisible")}>
                    <InputValueSelector value={fieldValue[0]} setValue={(v) => setFieldValueI(v, 0)}></InputValueSelector>
                    <button onClick={() => updateField(0)} className="w-full self-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Agregar
                    </button>
                </div>
                <div className={"flex flex-col w-[25%] " + (showModify ? "" : "invisible")}>
                    <InputValueSelector value={fieldValue[1]} setValue={(v) => setFieldValueI(v, 1)}></InputValueSelector>
                    <button onClick={() => updateField(1)} className="w-full self-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
                        Modificar
                    </button>
                </div>
                <div className={"flex flex-col w-[25%] " + (showRemove ? "" : "invisible")}>
                    <InputValueSelector value={fieldValue[2]} setValue={(v) => setFieldValueI(v, 2)}></InputValueSelector>
                    <button onClick={() => updateField(2)} className="w-full self-center p-3 font-bold rounded-lg text-accent-fg-0 dark:text-accent-fg-1">
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
