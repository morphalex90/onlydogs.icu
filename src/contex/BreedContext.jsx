import { createContext, useState } from "react";

export const Breed = createContext(null);

function Context({ children }) {
    const [breed, setBreed] = useState();

    return (
        <Breed.Provider value={{ breed, setBreed }}>
            {children}
        </Breed.Provider>
    );
}

export default Context;