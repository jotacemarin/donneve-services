# donneve-services

## nodejs version
  * 14.16.1

## dependencies
  * aws-multipart-parser
  * axios
  * http-status
  * redis
  * serverless-apigw-binary

## commands
  * deploy `sls deploy --stage prod --verbose`
  * createCode `sls invoke local -f createCode -p mocks/event_create_code.json --stage prod`

## Service Information
  * service: donneve-services
  * stage: prod
  * region: us-east-2
  * stack: donneve-services-prod
  * resources: 26
## api keys:
  * None
## endpoints:
  * `POST` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/createCode
  * `POST` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/uploadMedia
  * `POST` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/setTags
  * `POST` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/dailyImage
  * `GET` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/dailyParticipation
## functions:
  * createCode: createCode
  * uploadMedia: uploadMedia
  * setTags: setTags
## layers:
  * None

## Stack Outputs
  * UploadMediaLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:776336691876:function:uploadMedia:13
  * CreateCodeLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:776336691876:function:createCode:13
  * SetTagsLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-2:776336691876:function:setTags:1
  * ServiceEndpoint: https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod
  * ServerlessDeploymentBucketName: donneve-services-prod-serverlessdeploymentbucket-2ol3aivg3wkn