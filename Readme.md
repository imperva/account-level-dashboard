# ACCOUNT LEVEL DASHBOARD 

Dashboard relying on Incapsula APIs to view settings of all sites of an account in a clear and actionable dashboard.  
Instant view of settings of all sites and account level statistics  
  
The Account level dashboard includes:  
- table with all main settings assessment (Security and Performance) exportable to xls
- Convenient dashboard showing in a clear way the settings status with export to pdf
- Bulk actions to perform security settings changes to several sites at once



# Installation & Usage
## First time installation: new NodeJS version  
1- Install NodeJS from https://nodejs.org/en/download  
2- Download the project files of this Github directory in a local directory of your choice  
3- from the project directory, run the command: 'mpn install'  
4- run the following command: 'node --http-parser=legacy src/app.js '  
5- browse to localhost:3000  

## Usage
After the first time installation, you only need to run the following command from the project directory:  
1- run 'node src/app.js'  
2- browse to localhost:3000   

it is recommended to login with the API keys of the account admin to benefit from all the account information

## legacy PHP version
The previous PHP version is still available and can be downloaded from the php branch.   
It can be deployed with the Dockerfile or directly on a web server. Follow the readme guide there.

# Screenshots
  
Login Page with API keys  
![alt text](https://raw.githubusercontent.com/imperva/account-level-dashboard/master/images/screenshots/login.png)  
  
Main Dashboard Page  
![alt text](https://github.com/imperva/account-level-dashboard/raw/master/images/screenshots/main%20screen.png)  
  
Security Settings table, per site, exportable in pdf and excel  
![alt text](https://github.com/imperva/account-level-dashboard/raw/master/images/screenshots/security%20assessment%20table.png)  

Bulk Actions Changes to multiple sites at once
![alt text](https://github.com/imperva/account-level-dashboard/blob/master/images/screenshots/bulk%20actions.png) 

## Errors
If you are getting an error that says "Issue with the API Key or Account Permission", make sure that:  
1- The API is properly running on Incapsula API explorer page to confirm it is not a permissions issue  

## Reporting Bugs
please reports bugs, issues or suggestions for improvement in the following page:  
https://github.com/imperva/account-level-dashboard/issues

## Contributions  
- reach out to me for suggestion or if you want to contribute: jonathan.gruber@imperva.com  
- If you want to participate to the project, you can create your own branch and ping me to suggest merges to the master branch
