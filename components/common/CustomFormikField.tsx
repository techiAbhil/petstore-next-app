import { ErrorMessage, Field } from 'formik';

const CustomFormikField = ({
    name,
    className,
    type = 'text',
    placeholder,
    hideErrorMsg = false,
    errorMessageComponent = 'div',
    disabled = false,
}: {
    name: string;
    className?: string;
    type?: string;
    placeholder?: string;
    hideErrorMsg?: boolean;
    errorMessageComponent?: string;
    disabled?: boolean;
}) => {
    return (
        <>
            <Field
                type={type}
                className={className}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
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
