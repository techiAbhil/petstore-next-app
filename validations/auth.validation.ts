import * as Yup from 'yup';
import {
    OTP_VALIDATION_REGEX,
    PHONE_VALIDATION_REGEX,
} from '../utils/constants';

export const loginSchema = Yup.object({
    us_email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    us_password: Yup.string().required('Password is required!'),
});

export const forgotPassowrdSchema = Yup.object({
    us_email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
});

export const forgotPasswordFinalSchema = Yup.object().shape({
    us_password: Yup.string().required('Password is required'),
    cnf_password: Yup.string()
        .oneOf([Yup.ref('us_password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const registrationSchema = Yup.object({
    us_email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    us_password: Yup.string().required('Password is required!'),

    us_phone: Yup.string()
        .required('Phone number is required!')
        .test(
            'isValidPhoneNumber',
            'Please enter a valid phone number!',
            (val: any) => PHONE_VALIDATION_REGEX.test(val)
        ),
});

export const profileRegistrationSchema = Yup.object({
    us_full_name: Yup.string().required('Full Name is required!'),
    us_country: Yup.string().required('Country is required!'),
    us_city: Yup.string().required('City is required!'),
    us_address: Yup.string().required('Address is required!'),
    us_email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    us_phone: Yup.string()
        .required('Phone number is required!')
        .test(
            'isValidPhoneNumber',
            'Please enter a valid phone number!',
            (val: any) => PHONE_VALIDATION_REGEX.test(val)
        ),
});

export const otpValidationScehma = Yup.object({
    us_otp: Yup.string()
        .required('OTP is required!')
        .test('isValidOTP', 'Please enter a valid OTP number!', (val: any) =>
            OTP_VALIDATION_REGEX.test(val)
        ),
});
