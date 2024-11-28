import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(request: NextRequest) {
    try {

        // Get the files from the request
        const { files } = await request.json();

        if (!Array.isArray(files) || files.length === 0) {
            return NextResponse.json({ error: 'No files provided for upload' }, { status: 400 });
        }

        // Step 1: Generate Presigned URLs
        const presignedUrls = await Promise.all(
            files.map(async (file: { fileName: string; fileType: string }) => {
                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: file.fileName,
                    ContentType: file.fileType,
                });

                const presignedUrl = await getSignedUrl(s3Client, command, {
                    expiresIn: 3600, // URL expiration time in seconds
                });

                return { fileName: file.fileName, presignedUrl };
            })
        );

        // Step 2: Upload Files to S3
        const uploadResults = await Promise.all(

            // Upload each file to S3
            files.map(async (file: { file: string; fileName: string }) => {
                const presignedUrlObj = presignedUrls.find(
                    (urlObj) => urlObj.fileName === file.fileName
                );

                if (!presignedUrlObj) {
                    throw new Error(`No presigned URL found for file: ${file.fileName}`);
                }

                try {
                    const response = await fetch(presignedUrlObj.presignedUrl, {
                        method: 'PUT',
                        body: Buffer.from(file.file, 'base64'), // Assuming the file is sent as a base64 encoded string
                        headers: {
                            'Content-Type': 'application/octet-stream',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to upload file: ${file.fileName}`);
                    }

                    return { fileUrl: presignedUrlObj.presignedUrl.split('?')[0] };
                }
                catch (error) {
                    console.error(`Error uploading file ${file.fileName}:`, error);
                    return { error: `Failed to upload file: ${file.fileName}` };
                }
            })
        );

        // Separate successful uploads from failed ones
        const successfulUploads = uploadResults.filter((result) => !result.error);
        // const failedUploads = uploadResults.filter((result) => result.error);

        return NextResponse.json({ successfulUploads });
    }
    catch (error) {
        console.error('Error processing files:', error);
        return NextResponse.json({ error: 'Error processing files' }, { status: 500 });
    }
}