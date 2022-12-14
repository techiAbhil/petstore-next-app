import { ErrorMessage, Field } from 'formik';

const CustomFormikField = ({
    name,
    className,
    type = 'text',
    placeholder,
    hideErrorMsg = false,
    errorMessageComponent = 'div',
}: {
    name: string;
    className?: string;
    type?: string;
    placeholder?: string;
    hideErrorMsg?: boolean;
    errorMessageComponent?: string;
}) => {
    return (
        <>
            <Field
                type={type}
                className={className}
                placeholder={placeholder}
                name={name}
            />
            {!hideErrorMsg && (
                <ErrorMessage
                    className="text-danger text-capitalize p-1"
                    name={name}
                    component={errorMessageComponent}
                />
            )}
        </>
    );
};

export default CustomFormikField;
