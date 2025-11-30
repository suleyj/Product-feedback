import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const SECRET_KEY = process.env.AWS_SECRET_KEY;
const s3Client = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
    },
    region: BUCKET_REGION,
});

const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

module.exports = { s3Client, PutObjectCommand, generateFileName, BUCKET_NAME };
