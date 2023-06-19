import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { AwsCredentialIdentity } from "@aws-sdk/types";
import * as dotenv from "dotenv";
import { assertIsDefined } from "../lib/error";

// Load environment variables from .env file
dotenv.config();

// Cloudflare R2 credentials
const cedentials: AwsCredentialIdentity = {
    accessKeyId: assertIsDefined(process.env.ACCESS_KEY_ID),
    secretAccessKey: assertIsDefined(process.env.SECRET_ACCESS_KEY),
};

const credentialsProvider = () => Promise.resolve(cedentials);

// if ACCOUNT_ID is not defined, use AWS S3 endpoint
var endpoint = "";
if (process.env.AWS_REGION) {
    endpoint = `https://s3.${process.env.AWS_REGION}.amazonaws.com/`;
} else {
    endpoint = `https://${assertIsDefined(
        process.env.CF_ACCOUNT_ID
    )}.r2.cloudflarestorage.com`;
}

export const client = new S3Client({
    region: process.env.REGION || "auto",
    endpoint: endpoint,
    credentials: credentialsProvider,
} as S3ClientConfig);
