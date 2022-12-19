import { ErrorMessage, Field } from 'formik';
import Form from 'react-bootstrap/Form';

const CustomFormikSelect = ({
    children,
    name,
    hideErrorMsg = false,
    errorMessageComponent = 'div',
}: {
    children: any[];
    name: string;
    hideErrorMsg?: boolean;
    errorMessageComponent?: string;
}) => {
    return (
        <>
            <Field name={name} defaultValue="">
                {({ field }: any) => (
                    <Form.Select {...field}>{children}</Form.Select>
                )}
            </Field>
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

export default CustomFormikSelect;
