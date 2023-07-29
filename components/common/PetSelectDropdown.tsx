import { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGetUserSelectedPet } from '../../hooks/useGetUserSelectedPet.hook';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { IUserPet } from '../../store/user-dashboard-slice';
import { setUserSelectedOptionsState } from '../../store/user-selected-options-slice';

const PetSelectDropdown = () => {
    const userSelectedOptions = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const userPets = useAppSelector((state) => state.userDashboard.pets);
    const dispatch = useAppDispatch();
    const selectedPet = useGetUserSelectedPet();

    const onPetSection = useCallback(
        (pet: IUserPet) => {
            dispatch(
                setUserSelectedOptionsState({
                    ...userSelectedOptions,
                    selectedPetIDForMarketplace: pet.petId,
                })
            );
        },
        [dispatch, userSelectedOptions]
    );

    return (
        <div className="center">
            <Dropdown drop="down">
                <Dropdown.Toggle
                    className="profile-dropdown text-capitalize"
                    id="dropdown-basic"
                >
                    {selectedPet?.name ?? 'Select Pet'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {userPets.map((pet) => (
                        <Dropdown.Item
                            key={pet?.petId}
                            href="#"
                            onClick={() => onPetSection(pet)}
                            active={selectedPet?.petId === pet.petId}
                        >
                            <span className="text-capitalize text-center">
                                {pet?.name}
                            </span>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default PetSelectDropdown;
