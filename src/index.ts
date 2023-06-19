import { createReadStream } from "fs";
import { uploadFile, getUploadedFileURL, listBuckets } from "../lib/s3";
import { assertIsDefined } from "../lib/error";

(async () => {
    // list all buckets
    // await listBuckets();

    // Upload a file
    const S3_BUCKET = assertIsDefined(process.env.BUCKET);
    const filePath = "./README.md";
    const fileName = "README.md";

    const fileStream = createReadStream(filePath);

    await uploadFile({
        bucket: S3_BUCKET,
        key: fileName,
        body: fileStream,
        contentType: "text/markdown",
    }).catch((error) => console.error("Error uploading file:", error));

    // Get the URL of the uploaded file
    const fileURL = await getUploadedFileURL(S3_BUCKET, fileName);
    console.log("File URL:", fileURL);
})();
