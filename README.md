# Catalog and inventory web app
## Overview
This Next.js (15.3.2) project is a web app for a online catalog and store admin for many types of online stores.

## Installation
Let's give you 2 use cases for installation: local and remote hosting
 - **Local:**

 - Clone this GitHub repository: 
 `git clone https://github.com/Metalkaiser/imperator-la.git`
 - Open a cmd window at the project's root directory:
`cd imperator-la`
 - Install the dependencies:
`npm install`
 - Start the development server:
`npm run dev`
 - Open your browser and go to `http://localhost:3000` to see the project running.

 - **Remote hosting:**
The remote hosting deployment depends on the particular hosting you have decided to use for your web app.

 - Firebase: Firebase hosting only admits static exports:
  a. In the next.config.js file:
`
const nextConfig = {
  output: 'export',
}
`
 b. `npm run build`
 c. `firebase deploy`

 - Vercel: The process in Vercel is very simple. Just follow the instructions in their website for deployment


# Environment configurations
There are some configurations you need to take care of before you begin any development of deployment.

## Database
For getting all the data for you online catalog, you have 4 options:

 - Firebase
 - MongoDB
 - SQL (through Prisma)
 - A mock file (for development purposes)

First, you must make a copy of the .env.example file:
``
cp .env.example .env.(environment).local
``
where (environment) will be the type of environment for your app (development, testing, production or staging)

In your new environment file, you will find some variables that you will need to edit in order for your app to properly work.

 - NODE_ENV: The environment for the file
 - DATA_PROVIDER: The type of database for you project
 - LANG_LOCALES: The languages options you want to set for your web app
 - LANG_DEFAULTLOCALES: The default language for your app, (in case the user accept-language doesn't match any language option)

The following environment variables depends on the selected type of database. For example, if you will use MongoDB, you will need to fill the MONGODB_URI and MONGODB_DB variables, and leave the rest of the databases variables blank.

Now, in the src/services folder, you can find the files for perfoming the requests to the database. Usually, you won't need to modify much there, but if you want to change the way any query is made to the database, you can modify these service files accordingly:

 - FirebaseProductService.tsx: The methods for Firestore requests
 - MongoProductService.tsx: The methods for MongoDB requests
 - SQLProductService.tsx: The methods for SQL (Prisma) requests
 - MockProductService.tsx: The methods for the mock file requests
 - ProductService.tsx: The interface file for the dabatase request. If you modify this file, you will need to accordingly modify the service file of the database type you want to use.

Aditional database configurations can be found in the src/config folder, but you won't need to modify any of these files (except for prisma.tsx to include your database models).

In the src/app/utils/utils.tsx file, you will find some constants which you can edit to fit your prefered database settings, like collections name, storage base url, etc.

**Note:** for using the mock database setting, you must create a src/app/utils/mockinfo.tsx file, and set all dummy info there. If you prefer to change this structure, make sure to save the changes in the MockProductService.tsx file.

## Languages

This web app supports multilanguage content, which depends on the accept-language of the user's web navigator. For that, you just need to set the translation files in the src/app/lang folder, and place the translation folders inside.

For example, let's say you set a *messages* folder in the src/app/lang folder. In the src/app/lang/messages folder, you will place the languages files in .json extension, for example en.json, es.json, de.json, it.json, etc.

Name your language files using the accept-language prefix options, according to the languages you want your website to serve.

Then, in the src/i18n/request.tsx file, you will set the messages folder like this:

    messages: (await  import(`../../src/app/lang/messages/${locale}.json`)).default

inside of the *return* instruction.

For more information about multilanguage setting, you can visit the  [next-intl library documentation](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://next-intl.dev/)