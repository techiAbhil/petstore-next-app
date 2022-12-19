const useUserDetails = () =>
    JSON.parse(localStorage.getItem('USER_DETAILS') ?? '');

export default useUserDetails;
