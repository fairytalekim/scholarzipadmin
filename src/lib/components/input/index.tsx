import { ChangeEvent, useState } from "react";
import "./input_field.css";
import { MultiSelect, Option } from "react-multi-select-component";


function InputField({
    title,
    onChange,
    type,
    required,
    defaultValue,
    value,
    clickEnter
}: {
    title: string,
    onChange?: (e: any) => void,
    type: string,
    required?: boolean,
    defaultValue?: string,
    value: string,
    clickEnter?: () => void
}) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange && onChange(inputValue)
    }

    const returnControlled = (value: string | undefined | null): string => {
        if (value === undefined || value === null) {
            return ""
        }
        return value
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") clickEnter && clickEnter()
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
                <span className="text-st-r text-gray-600">{title}</span>
                <span className="text-brand-500">{required && "*"} </span>
            </div>
            <div className="group w-full">
                <input
                    placeholder="입력해주세요"
                    className="input px-5 w-full"
                    type={type}
                    onChange={handleChange}
                    defaultValue={returnControlled(defaultValue)}
                    value={returnControlled(value)}
                    onKeyDown={handleEnter}
                />
            </div>
        </div>
    )
}

function SimplifiedInput({
    title,
    onChange,
}: {
    title: string,
    onChange?: (e: any) => void,
}) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange && onChange(inputValue)
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <span className="text-st-r text-gray-600">{title}</span>
            <div className="group w-full">
                <input
                    placeholder="입력해주세요"
                    className="input px-5 w-full"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

function TextArea({
    title,
    onChange,
    required,
    defaultValue,
    value
}: {
    title: string,
    onChange?: (e: any) => void,
    required?: boolean,
    defaultValue?: string,
    value: string
}) {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        onChange && onChange(inputValue)
    }

    const returnControlled = (value: string | undefined | null): string => {
        if (value === undefined || value === null) {
            return ""
        }
        return value
    }

    return (
        <div className="group w-full h-40">
            <textarea
                placeholder="입력해주세요"
                className="px-5 py-3 w-full overflow-scroll resize-none h-full"
                onChange={handleChange}
                defaultValue={returnControlled(defaultValue)}
                value={returnControlled(value)}
            />
        </div>
    )
}


function SingleSelect({
    options,
    title,
    onChange,
    required,
    defaultValue
}: {
    options: string[],
    title: string,
    onChange: (option: string) => void,
    required?: boolean,
    defaultValue?: string
}) {
    const defaultSelect = defaultValue ? defaultValue : "선택하기";
    const [selected, setSelected] = useState<string>(defaultSelect);
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onChange(value)
        setSelected(value);
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
                <span className="text-st-r text-gray-600">{title}</span>
                <span className="text-brand-500">{required && "*"} </span>
            </div>
            <select className={`group w-full input px-5 ${selected !== "선택하기" ? "text-gray-800" : "text-gray-400"}`} onChange={handleChange}>
                <option defaultChecked={!defaultValue}>선택하기</option>
                {
                    options &&
                    options.map(
                        (option: string, id: number) => {
                            return <option
                                key={id}
                                selected={defaultValue === option}
                            >{option}</option>
                        })
                }
            </select>
        </div>
    );
};

function MultipleSelect({
    options,
    title,
    onChange,
    required,
    defaultValue
}: {
    options: any[],
    title: string,
    onChange: (option: any) => void,
    required?: boolean,
    defaultValue?: string
}) {
    const regionArray: string[] = options.map((option: any) => option.region);
    const formatOptions = (transformedItems: any): Option[] => {
        const formattedList: Option[] = [];

        transformedItems.forEach((option: any) => {
            formattedList.push({
                label: "----- " + option.region + " -----",
                value: option.region,
                disabled: false
            });

            option.items.forEach((item: any) => {
                formattedList.push({
                    label: option.region + " / " + item,
                    value: option.region + "/" + item,
                    disabled: false
                });
            });
        });
        formattedList.push({
            label: "제한없음",
            value: "제한없음",
            disabled: false
        })
        const finalFormat = formattedList.filter(option => !option.label.includes("해당없음"))


        return finalFormat;
    }

    const [selected, setSelected] = useState<Option[]>([{
        label: "제한없음",
        value: "제한없음",
        disabled: false
    }]);

    const handleChange = (optionData: Option[]) => {
        const optionList = optionData.filter(option => option.value !== "제한없음");
        setSelected(optionList);
        onChange(optionList);

        const selectedRegions = optionList.filter(option => regionArray.includes(option.value));
        const selectedRegion = selectedRegions.map(region => region.value)[0];
        const selectedItems = optionList.filter(option => !regionArray.includes(option.value));

        if (selectedRegions.length > 0) {
            const itemsInSelectedRegion = formatOptions(options)
                .filter(option => option.value.includes(selectedRegion))
            const list = [...itemsInSelectedRegion, ...selectedItems]
            setSelected(list);
            onChange(list);
        } else {
            setSelected(selectedItems);
            onChange(selectedItems);
        }

        if (optionData.some(option => option.value === "제한없음")) {
            setSelected([{ label: "제한없음", value: "제한없음", disabled: false }]);
            onChange([{ label: "제한없음", value: "제한없음", disabled: false }]);
        }
    }


    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
                <span className="text-st-r text-gray-600">{title}</span>
                <span className="text-brand-500">{required && "*"} </span>
            </div>
            <MultiSelect
                hasSelectAll={false}
                options={formatOptions(options)}
                value={selected}
                onChange={handleChange}
                labelledBy="선택하기"
                className="w-full input"
            />
        </div>
    );
};

function AddToSelection({
    options,
    title,
    onChange,
    required,
    defaultValue
}: {
    options: string[],
    title: string,
    onChange: (option: string[]) => void,
    required?: boolean,
    defaultValue?: string[]
}) {
    const defaultSelect =
        defaultValue ?
            defaultValue?.includes("제한없음" || "선택하기")
                ? []
                : defaultValue
            : []
    const [selected, setSelected] = useState<string[]>(defaultSelect);
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (selected.includes(value)) return;
        const newSelected = [...selected, value].filter(selectedItem => (selectedItem !== "선택하기") && (selectedItem !== "제한없음"));
        setSelected(newSelected);
        onChange(newSelected);
    };

    const removeItem = (item: string) => {
        const newSelected = selected.filter(selectedItem => selectedItem !== item);
        setSelected(newSelected);
    }

    const removeAll = () => {
        setSelected([]);
        onChange([]);
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
                <span className="text-st-r text-gray-600">{title} (다중 선택)</span>
                <span className="text-brand-500">{required && "*"}</span>
            </div>
            <select className={`group w-full input px-5 ${selected.includes("선택하기") ? "text-gray-800" : "text-gray-400"}`} onChange={handleChange}>
                <option defaultChecked={!defaultValue}>선택하기</option>
                {
                    options &&
                    options.map(
                        (option: string, id: number) => {
                            return <option
                                key={id}
                                selected={defaultValue?.includes(option)}
                            >{option}</option>
                        })
                }
            </select>
            <div className="relative w-full h-7">
                <div className="flex gap-2 absolute w-full h-fit overflow-scroll pb-3 pt-1">
                    {selected.map((item: string, id: number) => {
                        return (
                            <div key={id} className="flex items-center gap-2 border rounded-md border-gray-400 py-1 px-2 hover:bg-brand-50 hover:border-brand-200">
                                <span className="text-gray-800 text-st-r">{item}</span>
                                <button
                                    onClick={() => removeItem(item)}
                                    className="text-gray-400 text-st-r"
                                >×</button>
                            </div>
                        )
                    })}
                    {
                        selected.length > 0 &&
                        <div className="flex items-center gap-2 border rounded-md border-gray-400 py-1 px-2 hover:bg-brand-50 hover:border-brand-200">
                            <button
                                onClick={removeAll}
                                className="text-gray-400 text-st-r flex-shrink-0"
                            >전부 비우기</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};



const Input = {
    InputField,
    TextArea,
    SingleSelect,
    MultipleSelect,
    SimplifiedInput,
    AddToSelection
}

export default Input;