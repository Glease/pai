# MarketPlace
MT web portal provides Marketplace for two purposes:<br>
* To help users submit jobs to MT platform. Since MT platform in AP environment, it may not be convenient to connect to it in local environment. We provide several modules to easy the job submission process. Users can select a module based on your workload type and leverage it to do [job submission](./jobSubmission.md).
* To share commonly used examples. We provide some examples for users to refer to. You can look through examples by job names to find one example that may fit your requirement. The source code git address is included in the example description. We will also provide ways to share your own examples in near future.


## Supported modules

| name                                                  | Guid                                 | Description                                                                               |
| ----------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------|
| [\[Multitenancy\] Run Multiple Exe]                   | 26bcc5e0-5f90-4f24-9e97-61f935e42511 | Run Multiple exe to process paration of big data parallelly.                              |
| [\[Multitenancy\] Run Multiple Docker]                | 3a6d3859-d54f-4da3-bb8b-d665860a3a06 | Run Multiple dockers to process paration of big data parallelly.                              |
| [\[MultiTenancy\] SparkOnYarn]                        | f9f1ba97-477c-4a11-9650-016d1999cc4e | provide interface to run spark job on Yarn.                                               |
| [\[MultiTenancy\] Spark.Net On MT]                     | 0c3e337e-89c0-4b64-8788-6703199fa324 | Provide interface to run Spark .NET job on MT|

For full list of modules that will be supported by Marketplace in the future, please refer to [Multitenancy Æther modules](../AetherModule/AetherModule.md).

To provide your own modules, please refer [module dev guideline](./ModuleDevGuideline.md),   for self-host module update will come soon.



<!-- modules variables -->
[\[Multitenancy\] Split and Copy Cosmos File to HDFS]:./[Multitenancy]%20Split%20and%20Copy%20Cosmos%20File%20to%20HDFS/[Multitenancy]%20Split%20and%20Copy%20Cosmos%20File%20to%20HDFS.md
[\[Multitenancy\] Copy files between Cosmos and HDFS]:./[Multitenancy]%20Copy%20files%20between%20Cosmos%20and%20HDFS/[Multitenancy]%20Copy%20files%20between%20Cosmos%20and%20HDFS.md
[\[Multitenancy\] Run Multiple Exe]:./[Multitenancy]%20Run%20Multiple%20Exe%20New/[Multitenancy]%20Run%20Multiple%20Exe%20New.md
[\[MultiTenancy\] SparkOnYarn]:./[Multitenancy]%20SparkOnYarn/[Multitenancy]%20SparkOnYarn.md
[\[Multitenancy\] Run Multiple Docker]:./[Multitenancy]%20Run%20Multiple%20Docker%20New/[Multitenancy]%20Run%20Multiple%20Docker%20New.md
[\[Multitenancy\] Spark.Net On MT]:./[Multitenancy]%20Spark.Net%20On%20MT/[Multitenancy]Spark.Net%20On%20MT.md


## Supported examples
| name                                                  | Guid                                 | Description                                                                               |
| ----------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------|
| Copy files between cosmos and HDFS                   | bafebva-enbbae-aef-copyBetCosHdfs | This example is used for copy files between cosmos and hdfs, source code: https://msasg.visualstudio.com/Multi%20Tenancy/_git/Multi%20Tenancy?path=%2FMTDistCP%2Fsrc%2Fmain%2Fscala%2Fcom%2Fmicrosoft%2FASG%2FIPG%2FSDP%2FApp.scala&version=GBrelease                              |
| ReadWrite Object Store in Spark.Net                | ossparkdotnet-readonly-run-exe-readwrite | Read and write data on Object store table by Spark DotNet and upload the error info to cosmos. Source code: https://msasg.visualstudio.com/Multi%20Tenancy/_git/MTWebportalMarketplaceExample/pullrequest/1421829?_a=files&path=%2FObjectStoreExample%2FProgram.cs                              |
| Read sstream from cosmos to parquet                        | yipen-spark-cluster-sstoparquet | This example is used for read .ss files from cosmos and write data to parquet, source code: https://msasg.visualstudio.com/Multi%20Tenancy/_git/MTWebportalMarketplaceExample?path=%2FReadSsToParquet%2Fsrc%2Fmain%2Fjava%2Fexample%2FSparkReadSsToParquet.java&version=GBmaster                                               |
| Separate user logs from system logs                     | Userlog-log4j-example-SparkOnYarn | Separate user log by class and namespace. User needn't change the code to output user log to another file. Source code: https://msasg.visualstudio.com/Multi%20Tenancy/_git/MTWebportalMarketplaceExample?version=GBmaster&path=%2FSeperateUserlogByClassExample%2Fsrc%2Fmain%2Fjava%2Fmt%2Fexample%2FLog4jUserLogExample.java|
| Read data from Kafka                     | bafebva-enbbae-aef-SparkOnYarn | This example is used for spark read data from kafka, source code: https://msasg.visualstudio.com/Multi%20Tenancy/_git/MTWebportalMarketplaceExample?path=%2FKafkaExample&version=GBmaster|



self-host example upload will come soon.