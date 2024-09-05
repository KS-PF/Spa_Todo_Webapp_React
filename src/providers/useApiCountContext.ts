import { useContext } from "react";
import { ApiCountContext } from "./apiCountProvider";

export const useApiCountContext = () => {
    const context = useContext(ApiCountContext);
    if (!context) {
        throw new Error("Error:useApiCountContextがApiCountProviderの範囲外にあります。");
    }
    return context;
};