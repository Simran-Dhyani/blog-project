import React, { useId } from "react";
const Input=React.forwardRef(function Input(
    {
        label,
        type="text",
        className="",
        ...props
    },ref){
        const id=useId();
        return(
            <div className="w-full">
                {label && <label className="inline-block"
                htmlFor={id}>
                    {label}
                </label>

            }
            <input 
            type={type}
            className={`px-4 rounded-lg bg-yellow-50 text-black border border-gray-200 w-full 
            ${className}`}
            ref={ref}
            id={id}
            {...props}
            />     
            </div>
        )

})
export default Input;