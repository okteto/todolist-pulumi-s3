# Oktetodo

A todo list application showing how you can provision external resources (like an AWS S3 bucket in this case) your application might need with Okteto using Pulumi.

## Steps to Run it

1. Create the following [Okteto secrets](https://www.okteto.com/docs/cloud/secrets/) with your AWS account values.
```
AWS_ACCESS_KEY_ID
AWS_REGION
AWS_SECRET_ACCESS_KEY
```
Note: Make sure this user has the permissions to create S3 buckets.


2. Get an [access token from Pulumi](https://www.pulumi.com/docs/pulumi-cloud/access-management/access-tokens/#creating-personal-access-tokens) and add it as an Okteto secret.
```
PULUMI_ACCESS_TOKEN
```


2. Deploy the application from the UI using the Git URL (https://github.com/okteto/todolist-pulumi-s3) option or clone the repo and run `okteto deploy` or `okteto up`.
