import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({ keyFilename: "oniuuu.json" });

const bucketName = "melody-files";

// POST /api/getSignedUrls
export async function POST(req: NextRequest) {

	try {

		// Convert stream to JSON if Next.js doesn't handle automatically
		const body = await req.json(); // Using req.json() to parse JSON body
		console.log("Received files:", body.files);

		if (!Array.isArray(body.files)) {
			return new NextResponse(
				JSON.stringify(
					{
						error: "Bad request, expected an array of files"
					}
				),
				{
					status: 400
				}
			);
		}

		const bucket = storage.bucket(bucketName);

		const promises = body.files.map((file: { name: string; type: string; }) =>
			bucket.file(file.name).getSignedUrl(
				{
					version: "v4",
					action: "write",
					expires: Date.now() + 15 * 60 * 1000, // 15 minutes from now
					contentType: file.type,
				}
			)
		);

		const signedUrls = await Promise.all(promises);

		return new NextResponse(
			JSON.stringify(
				{
					signedUrls: signedUrls.map(urlData => urlData[0])
				}
			),
			{
				status: 200
			}
		);
	} catch (error: any) {
		console.error("Failed to create signed URLs:", error);
		return NextResponse.json({ error: "Failed to create signed URLs", message: error.message }, { status: 500 });
	}
}
