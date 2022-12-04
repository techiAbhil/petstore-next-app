import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle: object = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const focusedStyle: object = {
    borderColor: '#2196f3',
};

const acceptStyle: object = {
    borderColor: '#00e676',
};

const rejectStyle: object = {
    borderColor: '#ff1744',
};

function StyledDropzone(props: any) {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({ accept: { 'image/*': [] } });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>{`Drag 'n' drop some files here, or click to select files`}</p>
            </div>
        </div>
    );
}

export default StyledDropzone;
