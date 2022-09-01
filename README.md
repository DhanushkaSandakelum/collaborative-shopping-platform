# Installation Steps
1. Download and install following softwares before launching the project. Make sure after installing these pieces of software restart your computer.
* [Download IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/download/#section=windows)
* [Download VSCode](https://code.visualstudio.com/download)
* [Download MySQL for Windows Community](https://dev.mysql.com/downloads/installer/)
* [Download Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
* [Download NodeJS](https://nodejs.org/en/download/)
* [Download Gitbash](https://git-scm.com/downloads)
* [Download Github Desktop](https://desktop.github.com/)
* [Download Postman](https://www.postman.com/downloads/)

2. After installing the above softwares, you can install following extensions in VSCode which makes your development easier
* ES7+ React/Redux/React-Native snippets
* Extension Pack for Java
* Prettier - Code formatter

3. Open the backend-ms using IntelliJ IDEA and wait until necessary files are downloaded (Keep connected your device to Internet)

4. Open the frontend-web using VSCode and open the terminal and type `npm install` and wait until all files are downloaded

# 3. Backend Architecture

Backend folder structure,
```
    backend-ms
    │   ├── eureka-server/              # PORT: 8761 - central service for microservice management and inspection
    │   ├── api-gateway/                # PORT: 8080 - pulic gateway API
    │   ├── user/                       # PORT: 6001 - Manage buyer and seller accounts
    │   ├── item/                       # PORT: 6002 - Manage items and collecitons
    │   ├── delivery/                   # PORT: 6003 - Manage the delivery of items
    │   ├── email/                      # PORT: 7001 - to send emails
    │   ├── sms/                        # PORT: 7002 - to send sms
    │   └── payment/                    # PORT: 7003 - to perform card payments
    │
    ├── .gitignore                  # files need to be ignored in git pushing
    ├── mysql.sql                   # initial mysql queries
    └── pom.xml                     # global POM configurations
```