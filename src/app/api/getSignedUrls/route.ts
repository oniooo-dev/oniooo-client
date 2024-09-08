import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({ keyFilename: "oniouu.json" });

const bucketName = "melody-chat-files";

// POST /api/getSignedUrls
export async function POST(req: NextRequest) {
	try {
		// Handle JSON stream explicitly if Next.js doesn't parse it automatically
		const jsonResponse = await new Response(req.body).json();
		console.log("Received files:", jsonResponse);
		if (!Array.isArray(jsonResponse.files)) {
			return NextResponse.json({ error: "Bad request, expected an array of files" }, { status: 400 });
		}
		const bucket = storage.bucket(bucketName);
		const files: { name: string; type: string }[] = jsonResponse.files;
		const promises = files.map((file: { name: string; type: string }) =>
			bucket.file(file.name).getSignedUrl({
				version: "v4",
				action: "write",
				expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
				contentType: file.type,
			}),
		);
		const signedUrls = await Promise.all(promises);
		return NextResponse.json({ signedUrls: signedUrls.map((urlData) => urlData[0]) }, { status: 200 });
	} catch (error: any) {
		console.error("Failed to create signed URLs:", error);
		return NextResponse.json({ error: "Failed to create signed URLs", message: error.message }, { status: 500 });
	}
}
