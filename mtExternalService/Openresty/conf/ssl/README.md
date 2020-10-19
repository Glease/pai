Source code for CertInstaller is [here](https://msasg.visualstudio.com/DefaultCollection/Multi%20Tenancy/_git/PerfIso?path=%2Fprivate%2FCertInstaller&version=GBdevelop&_a=contents)

There will be an email asking certificate renewal when there are only 30 days left. Follow the instruction in the email to renew certificate. 
1. Download the renewed certificate from the link provided in renewal email.
2. Download and install the renewed certificate on the machine that requested renewal. 
3. Export the certificate with a private key into `apigw.pfx` with password as `mtpteam`
4. Run 
openssl pkcs12 -in apigw.pfx -nocerts -out apigw-privatekey.pem -nodes 
and 
openssl pkcs12 -in apigw.pfx -nokeys -out apigw-publiccert.pem -nodes
to generate nginx consumable style.
5. Copy both `apigw-privatekey.pem` and `apigw-publiccert.pem` onto an AP machine.
5. Open aptools command prompt.
6. Execute `sstool -e -g ASG_MTP\Yarn_Prod -i apigw-publiccert.pem -o apigw-publiccert.pem.encr`.
7. Execute `sstool -e -g ASG_MTP\Yarn_Prod -i apigw-privatekey.pem -o apigw-privatekey.pem.encr`.
8. Replace `apigw-publiccert.pem.encr` and `apigw-privatekey.pem.encr` with newly generated ones.

When SecretStore ACL in `APGold\autopilotservice\Global\VirtualEnvironments\ASG_MTP\Yarn_Prod\SecretStoreConfig.ini` is changed, all `*.encr` might need to be reencrypted in order for them to work on (at least) newly added clusters.

To decrypt an AP encrypted file `<file>.encr`: `sstool -d -i <file>.encr -o <file>`. 