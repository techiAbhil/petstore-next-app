import jwtDecode from 'jwt-decode';

export const updateUserLocalStorageStateByToken = (token: string = '') => {
    if (!token) return {};
    const userDetails: any = jwtDecode(token);
    delete userDetails?.us_password;
    delete userDetails?.us_otp;
    localStorage.setItem('AUTH_TOKEN', token);
    return userDetails;
};
