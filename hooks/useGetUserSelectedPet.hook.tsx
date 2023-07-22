import { useMemo } from 'react';
import { useAppSelector } from '../store/store';

export const useGetUserSelectedPet = function () {
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );

    const userPets = useAppSelector((state) => state.userDashboard.pets);
    const selectedPet = useMemo(() => {
        return userPets.find(
            (pet) => pet.petId === selectedPetIDForMarketplace
        );
    }, [userPets, selectedPetIDForMarketplace]);
    return selectedPet;
};
