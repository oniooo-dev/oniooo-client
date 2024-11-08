import React from 'react'

interface PDFFileProps {
    uri: string;
}

const PDFFile: React.FC<PDFFileProps> = ({ uri }) => {

    // Function to get the PDF File name
    function getFilenameFromUri(uri: string) {
        return uri.substring(uri.lastIndexOf('/') + 1);
    }

    const filename = getFilenameFromUri(uri);

    return (
        <div className="flex flex-row items-center py-2 px-4 gap-2 bg-white bg-opacity-40 rounded-[20px] h-16">
            <img
                src="https://banner2.cleanpng.com/20180612/ulg/aa89pkfqh.webp"
                className="w-[22px] h-[22px]"
            />
            <p>{filename}</p>
        </div>
    )
}

export default PDFFile