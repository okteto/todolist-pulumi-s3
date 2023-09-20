import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Define Pulumi config variables
const config = new pulumi.Config();
const bucketName = config.require("bucketName"); // You can set this in your Pulumi config

// Create an AWS S3 bucket
const todosBucket = new aws.s3.Bucket("todos_bucket", {
    bucket: bucketName,
    forceDestroy: true,
});

// Export the bucket name for reference
export const bucketNameOutput = todosBucket.id;
