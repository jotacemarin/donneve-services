# donneve-services

## nodejs version
  * 14.20.0

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
  * `GET` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/dailyExchange
  * `GET` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/telegramAuth
  * `GET` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/commands
  * `GET` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/getCommand/{command}
  * `POST` - https://j6a2fj9qc6.execute-api.us-east-2.amazonaws.com/prod/editCommand/{command}
## functions:
  * createCode: createCode
  * uploadMedia: uploadMedia
  * setTags: setTags
  * dailyImage: dailyImage
  * dailyParticipation: dailyParticipation
  * dailyExchange: dailyExchange
  * telegramAuth: telegramAuth
## layers:
  * None