import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type BreedContext = {
    breed: string,
    setBreed: Dispatch<SetStateAction<string>>,
};

export const Breed = createContext<BreedContext>({} as BreedContext);

function Context({ children }: { children: ReactNode }) {
    const [breed, setBreed] = useState('');

    return (
        <Breed.Provider value={{ breed, setBreed }}>
            {children}
        </Breed.Provider>
    );
}

export default Context;