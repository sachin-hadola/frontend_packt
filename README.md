# Packt Assessment (Customer)

A project is about to build a Backend for the bookstore where admin can add, edit, delete the books and customers can search for a book and see the whole details about the book

## Tech Stack

**Framework:** Vue.js (The Progressive JavaScript Framework), Bootstrap

## Installation

Below is the steps to install the project

1. Clone the project

  git clone https://github.com/ronaksolanki10/interview_packt_frontend.git

2. Install dependencies

    npm install

3. Create '.env' file & add below Environment variable in it

    VUE_APP_API_BASE_URL=<API_BASE_URL>/api
    VUE_APP_NAME="Book Store Management"
    VUE_APP_ADMIN_API_URL="${VUE_APP_API_BASE_URL}/admin"
    VUE_APP_FRONTEND_API_URL="${VUE_APP_API_BASE_URL}"

#Note:
1. Replace <API_BASE_URL> with API Base URL (A URL of the project where backend/API project has been setup)

## Run/Deploy Project

To run the project in local machine

    npm run serve

To deploy the project run

  npm run build

and upload files created under ```/dist``` folder


## Portal Access

 1. Admin

URL - https://domain.com/admin

Login Credential
- Email: admin@packt.com
- Password: Admin@123

###

2. Customer

URL - https://domain.com

Note: Replace ``` domain.com``` with the domain name where the projects are installed
