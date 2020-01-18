#!/bin/bash
set -e
IFS='|'

mkdir -p /root/.aws
echo "[escape]" >> /root/.aws/credentials
echo "aws_access_key_id=$AWS_ACCESS_KEY_ID" >> /root/.aws/credentials
echo "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" >> /root/.aws/credentials

echo "[escape]" >> /root/.aws/config
echo "output=json" >> /root/.aws/config
echo "region=eu-west-1" >> /root/.aws/config

REACTCONFIG="{\"SourceDir\":\"src\",\"DistributionDir\":\"build\",\"BuildCommand\":\"npm run-script build\",\"StartCommand\":\"npm run-script start\"}"
AWSCLOUDFORMATIONCONFIG="{\"configLevel\":\"project\",\"useProfile\":true,\"profileName\":\"escape\",\"region\":\"eu-west-1\"}"
AMPLIFY="{\"projectName\":\"cyberarkchallengewebapp\",\"defaultEditor\":\"code\"}"
INIT="{\"envName\":\"dev\"}"
FRONTEND="{\"frontend\":\"javascript\",\"framework\":\"react\",\"config\":$REACTCONFIG}"
PROVIDERS="{\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG}"

amplify init \
--amplify $INIT \
--providers $PROVIDERS \
--yes
