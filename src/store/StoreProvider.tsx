"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "./store";

interface Props {
    children: ReactNode;
}

const StoreProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
