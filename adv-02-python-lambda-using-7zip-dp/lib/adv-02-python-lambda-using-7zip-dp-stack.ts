import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class Adv02PythonLambdaUsing7ZipDpStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Bucket: Call Already created Bucket
    const myBucket = s3.Bucket.fromBucketName(this, 'my-bucket-for-python-lambda', 'my-bucket-for-python-lambda');

    // S3 Deployment: Deploy Deployment package in S3 Bucket
    new s3Deploy.BucketDeployment(this, 'deploy-python-deployment-package', {
      sources: [s3Deploy.Source.asset('python-lambda/myPythonLambda-Zipped')],
      destinationBucket: myBucket,
      destinationKeyPrefix: 'deployment-package/',
    })

    // // Lambda: Python Lambda
    // const myPythonLambda = new lambda.Function(this, 'my-python-lambda', {
    //   functionName: 'my-python-lambda',
    //   runtime: lambda.Runtime.PYTHON_3_9,
    //   code: lambda.Code.fromBucket(myBucket, 'deployment-package/myPythonLambda.zip'),
    //   handler: 'myPythonLambda.handler',
    // });

  }
}
