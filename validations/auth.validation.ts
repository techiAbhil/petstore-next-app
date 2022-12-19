import * as Yup from 'yup';
import { PHONE_VALIDATION_REGEX } from '../utils/constants';

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required(),
    password: Yup.string().required(),
});

export const registrationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
        .required('Please provide confirm passowrd!')
        .oneOf(
            [Yup.ref('password')],
            'Password & Confirm Password do not match!'
        ),
});

export const profileRegistrationSchema = Yup.object({
    name: Yup.string().required(),
    phone: Yup.string()
        .required()
        .test(
            'isValidPhoneNumber',
            'Please enter a valid phone number!',
            (val: any) => PHONE_VALIDATION_REGEX.test(val)
        ),
    country: Yup.string().required(),
    city: Yup.string().required(),
    address: Yup.string().required(),
});
