import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mime from 'mime-types';

// Initialize the S3 Client with necessary configurations
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

/**
 * Extracts the file extension from a given file key.
 * @param {string} fileKey - The key of the file in S3.
 * @returns {string} - The file extension in lowercase.
 */
const getFileExtension = (fileKey: string): string => {
    const parts = fileKey.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
};

/**
 * Determines the MIME type based on the file extension using the `mime-types` library.
 * @param {string} extension - The file extension.
 * @returns {string} - The corresponding MIME type or 'application/octet-stream' as a default.
 */
const getMimeType = (extension: string): string => {
    return mime.lookup(extension) || 'application/octet-stream';
};

/**
 * Handles the POST request to generate a signed URL and determine the file type.
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The JSON response containing `fileType` and `signedUrl`.
 */
export async function POST(request: NextRequest) {
    try {
        // Parse the JSON body to extract `fileUri`
        const { fileUri } = await request.json();

        // Validate that `fileUri` is present and is a string
        if (!fileUri || typeof fileUri !== 'string') {
            return NextResponse.json(
                { error: 'Invalid or missing fileUri' },
                { status: 400 }
            );
        }

        // Log the received file URI for debugging purposes
        console.log("Processing file URI:", fileUri);

        // Attempt to construct a URL object from the `fileUri`
        let url: URL;
        try {
            url = new URL(fileUri);
        }
        catch (err) {
            return NextResponse.json(
                { error: `Malformed file URI: ${fileUri}` },
                { status: 400 }
            );
        }

        // Extract the file key from the URL's pathname (removing any leading slashes)
        const fileKey = decodeURIComponent(url.pathname.replace(/^\/+/, ''));

        // Extract the file extension and determine the MIME type
        const extension = getFileExtension(fileKey);
        const mimeType = getMimeType(extension);

        // Create a command to get the object from S3
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
        });

        // Generate a presigned URL valid for 1 hour (3600 seconds)
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        // Log the signed URL and MIME type for debugging
        console.log(`Generated signed URL for ${fileUri}: ${signedUrl}`);
        console.log(`Determined MIME type for ${fileUri}: ${mimeType}`);

        // Return the `fileType` and `signedUrl` in the JSON response
        return NextResponse.json({
            fileType: mimeType,
            signedUrl
        });

    }
    catch (error) {
        // Log the error for server-side debugging
        console.error('Error processing request:', error);

        // Return a generic internal server error message
        return NextResponse.json(
            { error: 'Internal server error', details: (error as Error).message },
            { status: 500 }
        );
    }
}