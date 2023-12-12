import {InputHTMLAttributes, PropsWithoutRef} from "react";

export function Input({className, ...props}: PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>>) {
    return <input className={`border border-slate-200 outline-0 shadow-sm my-1 py-1 px-2 rounded-md ${className || ""}`} {...props}/>
}

export function LabelledInput({className, id, label, ...props}: {id: string, label: String} & PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>>) {
    return <div className={` ${className || ""}`}>
        <label htmlFor={id}>{label}</label>
        <Input id={id} {...props}/>
    </div>
}