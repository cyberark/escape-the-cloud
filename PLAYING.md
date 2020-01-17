# Escape The Cloud

Escape The Cloud is a cloud-enabled, React powered web application responsible for hosting the CyberArk Cloud Escape Room CTF challenge.

### Playing on a privately held AWS account

Please read the following instructions carefully, since you won’t be able to start the challenge without properly configuring the account:

 1. Please log in to your AWS account with an Administrator user.
 2. Deploy IAM policies to your account (if they not exist) by deploying the `Prerequisites.yaml` using CloudFormation. It will create the following:
     - IAM Group
     - IAM User
     - IAM Role
     - Two IAM Policies attached to the role, and group
 3. Please log out and log in with the newly created IAM user, using the username and password you chose during the user creation.
 6. On the website, go to the sign up screen and enter your username, email address, and password. Please use only lowercase characters (no numbers, no special characters, etc) while choosing your username. After the initial registration, an activation email should be sent to you. Click the confirmation link to get started.
 7. Deploy the `escape-the-cloud.json` template using CloudFormation and wait for it to finish. Your'e username on the CloudFormation template should match the username you used to register to the challenge.
 8. On the website, after you logged in to your environment and completed the cloudformation deployment process, the Play Snake button should be replaced with a Start button. If it didn’t, refresh the page. If it still not working, contact us or open an issue.

### Recommendations

For the sake of the challenge, you are authorized, but not allowed to create any resources. The CloudFormation stack will provision all the resources needed for the missions. We’ll mention a few resources you might think creating during the challenge:
- RDS replications.
- RDS snapshots.
- EC2 Instances.
- Amazon Machine Images (AMI).
- EBS volume snapshots.
- S3 bucket using cross-region replication.

This challenge and accounts were tailored to the training purposes, please do not use your  AWS account permissions to abuse the system.
