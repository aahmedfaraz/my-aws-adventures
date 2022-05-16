import * as AWS from 'aws-sdk';
var glue = new AWS.Glue({apiVersion: '2017-03-31'});

const GLUE_JOB_NAME = process.env.GLUE_JOB_NAME;

export const handler = async (event: any) => {
    // Print Event
    console.log('EVENT ==>> ', event);

    // Glue Job Run Params
    const params : any = {
        JobName: GLUE_JOB_NAME,
    }

    // Start Glue Job
    const response = await glue.startJobRun(params).promise();

    // Display and Return Response
    console.log('RESPONSE ==>> ', response);
    return response;
}

