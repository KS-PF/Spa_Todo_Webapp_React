import React, { createContext, FC, ReactNode, useState } from "react";



type ApiCountContextType = {
    apiCount: number;
    setApiCount: React.Dispatch<React.SetStateAction<number>>;
};


export const ApiCountContext = createContext<ApiCountContextType | 0>(0);

type Props = {
    children: ReactNode;
};

export const ApiCountProvider: FC<Props> = ({ children }) => {
    const [apiCount, setApiCount] = useState<number>(0);

    return (
        <ApiCountContext.Provider value={{ apiCount, setApiCount }}>
            {children}
        </ApiCountContext.Provider>
    );
};