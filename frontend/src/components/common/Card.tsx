import {HTMLAttributes, PropsWithChildren} from "react";

export function Card(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    const {children, className, ...rest} = props
    return <div className={"shadow-lg rounded-md p-5 " + className} {...rest}>
        {children}
    </div>
}