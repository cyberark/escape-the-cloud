#!/bin/bash
set -e
IFS='|'

cuser=$(whoami)
mkdir -p /home/$cuser/.aws
echo "[escape]" >> /home/$cuser/.aws/credentials
echo "aws_access_key_id=$AWS_ACCESS_KEY_ID" >> /home/$cuser/.aws/credentials
echo "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" >> /home/$cuser/.aws/credentials

echo "[escape]" >> /home/$cuser/.aws/config
echo "output=json" >> /home/$cuser/.aws/config
echo "region=eu-west-1" >> /home/$cuser/.aws/config

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
