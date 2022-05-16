import * as cdk from '@aws-cdk/core';
import * as glue from '@aws-cdk/aws-glue';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export class Adv01GluePythonShellJobStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Glue Job: Python Shell Job
    const myPythonShellGlueJob = new glue.Job(this, 'my-python-shell-glue-job', {
      jobName: 'my-python-shell-glue-job',
      executable: glue.JobExecutable.pythonShell({
        glueVersion: glue.GlueVersion.V1_0,
        pythonVersion: glue.PythonVersion.THREE,
        script: glue.Code.fromAsset('./job_script/script.py'),
      }),
      description: 'My Python Script',
    });

    // Lambda: Function to trigger Glue Job
    const triggerGlueJobLambda = new lambda.Function(this, 'trigger-glue-job-lambda', {
      functionName: 'trigger-glue-job-lambda',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'triggerGlueJobLambda.handler',
      environment: {
        GLUE_JOB_NAME: myPythonShellGlueJob.jobName,
      },
      timeout: cdk.Duration.seconds(30),
    });

    // IAM Policy: Policy to assign Lambda permission to trigger Glue Job
    triggerGlueJobLambda.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['glue:StartJobRun'],
      resources: [myPythonShellGlueJob.jobArn],
    }))

  }
}
