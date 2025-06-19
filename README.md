
# Catalog and inventory web app

## Overview

This Next.js (15.3.2) project is a web app for an online catalog and store admin for many types of online stores.

 ## Table of Contents

 1. [Installation](#installation)
	 a. [Local](#local)
	 b. [Remote hosting](#remote-hosting)
 2. [Environment configurations](#environment-configurations)
	 a. [Database](#database)
	 b. [Languages](#languages)
 3. [Catalog Menus](#catalog-menus)
	 a. [Header section](#header-section)
	 b. [Side menus](#side-menus)
	 c. [Shopping Cart Configuration](#shopping-cart-configuration)
	 d. [Categories menu](#categories-menu)
 4. [Catalog footer](#catalog-footer)
 5. [Catalog homepage](#catalog-homepage)
	 a. [Auto sliding images carousel](#auto-sliding-images-carousel)
	 b. [Description banner](#description-banner)
 7. ghnfn

# Installation

Let's give you 2 use cases for installation: local and remote hosting

## Local

  

1. Clone this GitHub repository:

`git clone https://github.com/Metalkaiser/imperator-la.git`

2. Open a cmd window at the project's root directory:

`cd imperator-la`

3. Install the dependencies:

`npm install`

4. Start the development server:

`npm run dev`

5. Open your browser and go to `http://localhost:3000` to see the project running.

  

## Remote hosting

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

  

Please note that you will need to configure the static parameters for the dynamic routes.

  

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

  

The following environment variables depend on the selected type of database. For example, if you will use MongoDB, you will need to fill the MONGODB_URI and MONGODB_DB variables, and leave the rest of the databases variables blank.

  

Now, in the src/services folder, you can find the files for performing the requests to the database. Usually, you won't need to modify much there, but if you want to change the way any query is made to the database, you can modify these service files accordingly:

  

- FirebaseProductService.tsx: The methods for Firestore requests

- MongoProductService.tsx: The methods for MongoDB requests

- SQLProductService.tsx: The methods for SQL (Prisma) requests

- MockProductService.tsx: The methods for the mock file requests

- ProductService.tsx: The interface file for the database request. If you modify this file, you will need to accordingly modify the service file of the database type you want to use.

  

Aditional database configurations can be found in the src/config folder, but you won't need to modify any of these files (except for prisma.tsx to include your database models).

  

In the src/app/utils/utils.tsx file, you will find some constants which you can edit to fit your prefered database settings, like collections name, storage base url, etc.

  

**Note:** for using the mock database setting, you must create a src/app/utils/mockinfo.tsx file, and set all dummy info there. If you prefer to change this structure, make sure to save the changes in the MockProductService.tsx file.

  

## Languages

  

This app supports internationalization using [next-intl](https://next-intl.dev/). Translations are located in:
`src/app/lang/messages folder`

Use `en.json`, `es.json`, `de.json`, etc., based on [IETF language tags](https://en.wikipedia.org/wiki/IETF_language_tag). Spanish is the default, but you can change it in the config.

Name your language files using the accept-language prefix options, according to the languages you want your website to serve, for example en.json, es.json, de.json, it.json, etc.

  

For more information about multilanguage setting, you can visit the [next-intl library documentation](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://next-intl.dev/)

  

This web app is configured to have some default values in spanish. Any developer can change them at will in each desired section.

  

# Catalog Menus

## Header section

The header section includes the following content:

- ☰ Hamburger menu (left side menu with categories)
- 🛒 Shopping cart icon (opens cart panel)
- 🏷️ Store logo (center)
- 🔗 Category links (including homepage)

These are the main components involved in the header section:

**Main components:**

- `topmenu.tsx`: Main header structure
- `Topbtn.tsx`: Buttons for hamburger and cart

Customize:

- `webAppProps` and `allCategories` in `utils.tsx`
- Replace images in `public/brand/` folder
- Add translations in `messages/{locale}.json`

- src/app/[locale]/(catalog)/components/topmenu.tsx: The main `<header>` tag component that contains all the header content.

- src/app/[locale]/(catalog)/components/menus/Topbtn.tsx: the component that renders both the hamburguer menu and the shopping cart icon, separately.

The header section can be left as it is, you will just need to change some details according to your web app needs:

- The *webAppProps* constant properties in src/app/utils/utils.tsx
- The defaultLocale, baseCatalogStructure and catalogLabels constants in src/config/websiteConfig/categoryConfig.tsx.
- The images in public/brand folder, keeping the same names as the samples there. The logo_poster_(theme).webp images are the ones which will be set at the middle of the header.
- Set some translations for the Home page in the src/app/lang/messages folder, beginning with your default language, and then any other additional language you have set for your web app. Some examples are:

    public/brand/logo_poster_light.webp
    public/brand/logo_poster_dark.webp

## Side menus

The component src/app/[locale]/(catalog)/components/menus/Sidemenu.tsx allows you to create two kinds of side menus:

 - Options menu: A menu designed to show a list of categories and subcategories of the website.
 - Shopping cart menu: A menu designed to show any item added to a shopping cart.

### Shopping Cart Configuration

The shopping cart functions and components are optional. You can enable or disable them by setting to true or false respectively with the *enabled* property of the baseConfig variable in src/config/shoppingCartConfig.tsx.

    type  CurrencyConversionType  =  "api"  |  "fixed";
    
    interface  ShoppingCartConfig {
	    enabled:  boolean;
	    currencyConversion: {
		    enabled:  boolean;
		    type:  CurrencyConversionType;
		    fixedRate:  number;
		    mainCurrency:  string;
		    exchangeCurrency:  string;
		    targetExchangeCurrency:  string;
		    apiUrl:  string;
		    exchangeExpirationTime:  number; // In hours
	    };
    }  
    
    export  function  getShoppingCartConfig(locale:  string): { shoppingCart:  ShoppingCartConfig } {
	    const  baseConfig:  ShoppingCartConfig  = {
		    enabled:  true,
		    currencyConversion: {
			    enabled:  true,
			    type:  "api",
			    fixedRate:  0,
			    mainCurrency:  "$",
			    exchangeCurrency:  "Bs",
			    targetExchangeCurrency:  "promedio",
			    apiUrl:  "https://ve.dolarapi.com/v1/dolares/oficial",
			    exchangeExpirationTime:  24,
		    },
	    };
	    switch (locale) {
		    // case "en": return { shoppingCart: { ...baseConfig, enabled: false } };
		    default:
			    return { shoppingCart:  baseConfig };
		    }
    }

To configure currency conversion, update:

    currencyConversion: {
      enabled: true,
      type: "api", // or "fixed"
      fixedRate: 0,
      apiUrl: "...",
      exchangeExpirationTime: 24
    }

To localize the configuration per language, override properties per `locale`.

### Categories menu
Here you will find the active categories on the website, the subcategories for each one of them.

The categories and subcategories images can be found in the public/misc/menu folder.

 - **categories** folder: here you will store the images for each category in your store. Each category image must be in .webp format, and the filename must be the related *slug* found at src/config/websiteConfig/categoryConfig.tsx file (for example, *categoryname.webp*).
 - **subcategories** folder: here you will store the images for each subcategory in your store. Each subcategory image must be in .webp format, and the filename must be the related *slug* for the category and subcategory found at src/config/websiteConfig/categoryConfig.tsx file (for example, *category-subcategory.webp*).

The categories and related subcategories shown will depend on the active items for each one. For example, if your store has a category called "hardware", but there is no available item that belongs to that category, then the "hardware" category will not be shown in this menu. This also applies in case that any subcategory has no item available.

# Catalog footer
This section is quite simple.

 1. Make sure you have a footer.copyright object in your translation files.
 2. In the src/config/websiteConfig/miscConfigs.tsx file, configure your links for the footer in the footerLinks constant, and the correspondent translations in the footer object, using the links as the keys.
 3. Also, in the miscConfigs.tsx file, set the socialLinks constant for any icon link, usually social media links. The socialLinks constant objects follow the following structure:
	

    { href:  link string, icon:  icon string}

	You can find the icon strings at the src/app/utils/svgItems.tsx file, in the footerIcons constant. You are free to add any othe icon you consider needed for your website.

# Catalog homepage
The homepage of the catalog website can be found in the src/app/[locale]/(catalog)/page.tsx file. You can modify the content at will, but the default structure is the following:

 - Auto sliding images carousel: A series of informative or decorative images, looping automaticaly.
 - Descriptive icons: A section for setting some short information, such as the shop services or characteristics.

## Auto sliding images carousel
The images displayed in the homepage slider are defined in the src/config/websiteConfig/miscConfigs.tsx file.
All slider images are stored in public/misc/banner/ folder.

The project uses the alias `@P/` to reference the `public/` folder. For example:

    import newImage from "@P/misc/banner/new-image.webp";

### ➕ Adding a New Image to the Slider

1.  Place your image (preferably in `.webp` format) inside public/misc/banner/ folder
2. Open the miscConfigs.tsx file.
3. Import your new image at the top of the file:

    import newImage from "@P/misc/banner/new-image.webp";

5. Add it to the `imageSliderData` array:

    export const imageSliderData = [
      { src: image1 },
      { src: image2 },
      { src: image3 },
      { src: newImage }, // ← New image added
    ];

### 💡 Tips

-   Keep all images the same dimensions for a consistent layout.
-   Use `.webp` format for optimized performance and good visual quality.
-   Try to keep image file sizes under `200KB` for fast loading.

## Description banner
The `Description.tsx` component displays a set of feature highlights or service descriptions, each paired with a corresponding SVG icon. It is designed to visually communicate key advantages or offerings of the business (e.g. fast payment, quality assurance, quick delivery) in a compact and responsive layout.

-   Each item consists of an icon and a translated text label.
    
-   The content is dynamically rendered based on an array (`descriptionImages`) and translation keys.
    
-   Built-in support for internationalization (i18n) using `next-intl`.
    
This component is ideal for the homepage or landing section where key features need to be quickly showcased to users.

### 📌 How to Customize the `Descr` Component
1. Locate the Component File
Your component is likely located at `src/app/[locale]/(catalog)/components/home/Description.tsx`

 2. Understand the Data Source

The `descriptionImages` array (e.g. in `/app/utils/svgItems.tsx`) contains objects with two keys:

-   `name`: the translation lookup key
    
-   `icon`: the SVG icon element
    

Example entry:

`{ name: "payment", icon: <svg>…</svg>,
}` 

3. Editing or Adding Items

To **edit** an existing item, adjust its `name` and/or swap the `icon` SVG.  
To **add** a new item:

1.  Add a new object to the array.
    
2.  Provide a unique `name`, matching a key in your translation JSON.
    
3.  Include a valid SVG element for the new icon.
    

Example of adding a `support` icon:

`{ name: "support", icon: ( <svg  className="…">
      {/* new SVG path here */} </svg>
  )
},` 

4. Add the Translation Key

In your locale JSON file under `homeDescription.*` (e.g., `en.json`):

`{  "payment":  "Fast payment",  "quality":  "Top quality",  "delivery":  "Quick delivery",  "support":  "24/7 Support"  }` 

Make sure the new `name` (“support”) matches here.

5. Check Styling

By default, icons are rendered in a flex container with centered text:

`<article  className="h-[200px] md:h-[250px] flex justify-evenly items-center">
  … </article>` 

Adjust this wrapper’s Tailwind classes to control layout, spacing, sizing, or alignment if needed.