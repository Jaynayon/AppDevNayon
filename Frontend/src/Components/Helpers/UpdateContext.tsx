import { createContext, useState } from "react";

interface UpdateContextDoer {
    setRenderer: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    renderer:boolean,
    openDialog:boolean
}

export const UpdateContext = createContext<UpdateContextDoer | null>(null);

export default function UpdateContextProvider(props:{children:React.ReactNode}){
    const [renderer,setRenderer] = useState(false);
    const [openDialog,setOpenDialog] = useState(false);
    return(
        <UpdateContext.Provider value={{setRenderer,setOpenDialog,renderer,openDialog}}>
            {props.children}
        </UpdateContext.Provider>
    );
}