import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Stack1 extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


  }
}
