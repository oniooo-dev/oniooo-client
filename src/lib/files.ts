
/**
 * Uploads files to S3 and returns the URLs of the uploaded files
*/

export const uploadFiles = async (files: File[]): Promise<string[]> => {
    try {
        // Convert files to base64 and prepare the payload
        const fileData = await Promise.all(
            files.map(async (file) => {
                const base64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = () => reject(reader.error);
                    reader.readAsDataURL(file);
                });

                return {
                    fileName: file.name,
                    fileType: file.type,
                    file: base64.split(',')[1], // Remove the base64 prefix
                };
            })
        );

        // Send files to the API
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ files: fileData }),
        });

        const result = await response.json();

        // Handle errors
        if (!response.ok) {
            throw new Error(result.error || 'Failed to upload files');
        }

        // Return the array of uploaded file URLs
        return result.successfulUploads.map((upload: { fileUrl: string }) => upload.fileUrl);
    } catch (error) {
        console.error('Error uploading files:', error);
        return [];
    }
};