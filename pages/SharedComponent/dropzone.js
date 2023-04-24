import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
    const [file, setFile] = useState(null);
    const onDrop = useCallback((acceptedFiles) => {
        setFile({
            name: acceptedFiles[0].name,
            size: acceptedFiles[0].size,
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div
            {...getRootProps()}
            className={`${isDragActive ? 'border-black-500' : 'border-black-300'} border-dotted border-4 p-2 text-center cursor-pointer rounded-md`}
        >
            <input {...getInputProps()} />
            <div className="text-black-400">
                <div className="border rounded-md px-4 py-2">
                    {file ? (
                        <>
                            <p>{file.name}</p>
                            <p>{file.size} bytes</p>
                        </>
                    ) : (
                        <p>{isDragActive ? 'Release to drop the files' : 'Drop files here'}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dropzone;
