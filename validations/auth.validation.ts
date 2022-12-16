import * as Yup from 'yup';

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
