import { createContext, useState } from "react";

interface DeleteContextDoer {
    setRenderer: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    renderer:boolean,
    openDialog:boolean
}

export const DeleteContext = createContext<DeleteContextDoer | null>(null);

export default function DeleteContextProvider(props:{children:React.ReactNode}){
    const [renderer,setRenderer] = useState(false);
    const [openDialog,setOpenDialog] = useState(false);
    return(
        <DeleteContext.Provider value={{setRenderer,setOpenDialog,renderer,openDialog}}>
            {props.children}
        </DeleteContext.Provider>
    );
}