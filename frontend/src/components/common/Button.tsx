import {ButtonHTMLAttributes, PropsWithoutRef} from "react";

export function Button({className, ...props}: PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return <button className={`text-white bg-teal-600 shadow-sm my-1 py-1 px-2 rounded-md ${className || ""}`} {...props}/>
}
