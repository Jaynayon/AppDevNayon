import React, { createContext, useState } from "react";

interface TableContextDoer {
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>
}

export const TableContext = createContext<TableContextDoer | null>(null);

export default function TableContextProvider(props:{children:React.ReactNode}){
    const [text,setText] = useState("");
    return (
        <TableContext.Provider value={{text,setText}}>
            {props.children}
        </TableContext.Provider>
    );
}