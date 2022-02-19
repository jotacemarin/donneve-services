# donneve-services

## dependencies
* aws-multipart-parser
* axios
* http-status
* redis
* serverless-apigw-binary

## commands
* deploy `sls deploy --stage prod --verbose`
* createCode `sls invoke local -f createCode -p mocks/event_create_code.json --stage prod`