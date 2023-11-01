// './context/MenuContext.js'
import React, { createContext, useContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = (props) => {
    const [menu, setMenu] = React.useState(null);
    return <MenuContext.Provider value={{ menu, setMenu }}>{props.children}</MenuContext.Provider>;
};
