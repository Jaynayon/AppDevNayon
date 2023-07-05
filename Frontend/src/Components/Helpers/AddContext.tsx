import { createContext, useState } from "react";

interface AddContextDoer {
    setRenderer: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    renderer:boolean,
    openDialog:boolean
}

export const AddContext = createContext<AddContextDoer | null>(null);

export default function AddContextProvider(props:{children:React.ReactNode}){
    const [renderer,setRenderer] = useState(false);
    const [openDialog,setOpenDialog] = useState(false);
    return(
        <AddContext.Provider value={{setRenderer,setOpenDialog,renderer,openDialog}}>
            {props.children}
        </AddContext.Provider>
    );
}