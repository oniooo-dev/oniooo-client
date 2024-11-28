import React from 'react'

interface PDFFileProps {
    uri: string;
}

const PDFFile: React.FC<PDFFileProps> = ({ uri }) => {

    // Function to get the PDF File name
    function getFilenameFromUri(uri: string) {
        try {
            const url = new URL(uri);
            const pathname = url.pathname;  // Extracts the path part of the URL
            return pathname.split('/').pop();  // Gets the last segment after the last '/'
        } catch (error) {
            console.error('Invalid URL:', error);
            return '';  // Return an empty string or handle the error as needed
        }
    }
    const filename = getFilenameFromUri(uri);

    return (
        <div className="flex flex-row items-center py-2 px-4 gap-2 bg-white bg-opacity-20 hover:bg-opacity-40
                        rounded-[20px] h-16 cursor-pointer duration-500"
            onClick={() => window.open(uri, '_blank')}
        >
            <img
                src="/icons/files/pdf.png"
                className="w-[30px] h-[30px]"
            />
            <p className="text-sm overflow-hidden max-w-xs truncate">{filename}</p>
        </div>
    )
}

export default PDFFile