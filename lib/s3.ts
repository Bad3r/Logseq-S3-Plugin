import { client } from "./s3-config";
import {
    ListBucketsCommand,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

// Function to list all buckets
export const listBuckets = async () => {
    try {
        const command = new ListBucketsCommand({});
        const data = await client.send(command);
        console.log(data);
    } catch (err) {
        console.log("Error", err);
    }
};

type UploadParams = {
    bucket: string;
    key: string;
    body:
        | string
        | ArrayBuffer
        | ArrayBufferView
        | Readable
        | ReadableStream<any>;
    contentType: string;
};

export async function uploadFile({
    bucket,
    key,
    body,
    contentType,
}: UploadParams): Promise<void> {
    await client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body as Readable,
            ContentType: contentType,
        })
    );
}

// Function to get the URL of an uploaded file
export async function getUploadedFileURL(
    bucket: string,
    key: string
): Promise<string> {
    return await getSignedUrl(
        client,
        new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        }),
        { expiresIn: 3600 }
    );
}

// function to delete a file
export async function deleteFile(bucket: string, key: string): Promise<void> {
    await client.send(
        new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        })
    );
}
