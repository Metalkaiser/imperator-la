import { productProps, PaymentMethod, shippingMethod, GiftOption, sale } from "./types";
import { phoneNumber } from "./utils";

export const mockTopProds = [
  {
    id: "id_1",
    productId: "3QRhVuojOvohgBB1ub40"
  },
  {
    id: "id_2",
    productId: "LA91hlO3nycsK8uKGMb3"
  },
  {
    id: "id_3",
    productId: "UwDNW5Nng8T3IOaaxZ6Q"
  },
  {
    id: "id_4",
    productId:"3C1St7zHZ1Br0lOVFnCQ"
  },
  {
    id: "id_5",
    productId: "FVXUEhYRPn00B07VFQuA"
  },
  {
    id: "id_6",
    productId: "DvK5oWaljMFlEn0wWoQJ"
  },
  {
    id: "id_7",
    productId: "RSAyLx3cCAu8rhST9tMn"
  },
];

export const cartItems = [
  {id: 17, name: "Medalla de cruz", mainSku: "COL-0110", sku: "COL-0111", qt: 1, price: 23},
  {id: 1, name: "León ojos rojos", mainSku: "ANI-0010", sku: "ANI-0011", qt: 1, size: 12, price: 20},
  {id: 35, name: "Brazalete minimalista de cuero", mainSku: "BRA-3080", sku: "BRA-3081", qt: 1, size: 70, price: 15},
  {id: 36, name: "CURREN Marrón", mainSku: "REL-0010", sku: "REL-0010", qt: 1, price: 40},
  {id: 44, name: "Arete de pluma (unidad)", mainSku: "AAI-0030", sku: "AAI-0031", qt: 1, size: "Único", price: 4}
];

export const mockSales: sale[] = [];

/*
  * 
  * Payment methods configuration
  *
  * This configuration defines the available payment methods for the shopping cart.
  * Each payment method includes its name, whether it is enabled, associated data,
  * an icon URL, and fee details (if applicable).
  *
*/
export const paymentMethods:PaymentMethod[] = [
  { 
    id: 1,
    order: 4,
    name: "Paypal",
    enabled: true,
    data: {
      email: "margelys.gelves@gmail.com",
    },
    userData: [
      "clientEmail",
      "reference"
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/888/888870.png",
    fee: {
      status: true,
      percentage: 5.4,
      fixed: 0.3,
    }
  },
  {
    id: 2,
    order: 1,
    name: "Pago móvil",
    enabled: true,
    data: {
      id: "18.898.854",
      phoneNumber: phoneNumber,
      bank: "0134 - Banesco"
    },
    userData: [
      "clientPhone",
      "reference"
    ],
    icon: "/misc/other/PAGO-MOVIL-SINFONDO.webp",
    fee: {
      status: false
    }
  },
  {
    id: 3,
    order: 3,
    name: "Binance Pay",
    enabled: true,
    data: {
      email: "margelys.gelves@gmail.com",
    },
    userData: [
      "clientEmail",
      "reference"
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/16580/16580578.png",
    fee: {
      status: false
    }
  },
  {
    id: 4,
    order: 2,
    name: "banktransfer",
    enabled: true,
    data: {
      id: "18.898.854",
      name: "Margelys Gelves",
      bank: "Banesco",
      accountNumber: "0134-0131-4513-1303-7990",
      accountType: "Corriente",
    },
    userData: [
      "clientName",
      "reference"
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/8176/8176479.png",
    fee: {
      status: false
    }
  },
  {
    id: 5,
    order: 5,
    name: "Zinli",
    enabled: true,
    data: {
      email: "margelys.gelves@gmail.com",
    },
    userData: [
      "clientEmail",
      "reference"
    ],
    icon: "https://negocios.zinli.com/logo192.png",
    fee: {
      status: false
    }
  },
  {
    id: 6,
    order: 6,
    name: "cash",
    enabled: true,
    data: {
      phoneNumber: phoneNumber,
    },
    userData: [],
    icon: "https://cdn-icons-png.flaticon.com/512/3683/3683086.png",
    fee: {
      status: false
    }
  }
];

export const shippingMethods:shippingMethod[] = [
  {
    id: 1,
    order: 1,
    name: "Zoom",
    enabled: true,
    shipToHome: true,
    data: [
      "clientName",
      "clientId",
      "officeName",
      "officeAddress",
      "Municipality",
      "Community",
      "City",
      "State"
    ],
    icon: "/misc/other/Logo-Zoom-Oficial.webp",
    fee: {
      status: true,
      onlyPayOnDelivery: false,
      fixed: 1.45,
    }
  },
  {
    id: 2,
    order: 2,
    name: "MRW",
    enabled: true,
    shipToHome: false,
    data: [
      "clientName",
      "clientId",
      "officeName",
      "officeAddress",
      "Municipality",
      "Community",
      "City",
      "State"
    ],
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/MRW_logo.svg/330px-MRW_logo.svg.png",
    fee: {
      status: true,
      onlyPayOnDelivery: false,
      fixed: 1.45,
    }
  },
  {
    id: 3,
    order: 3,
    name: "Domesa",
    enabled: false,
    shipToHome: false,
    data: [
      "clientName",
      "clientId",
      "officeName",
      "officeAddress",
      "Municipality",
      "Community",
      "City",
      "State"
    ],
    icon: "/misc/other/logo-domesa.webp",
    fee: {
      status: true,
      onlyPayOnDelivery: false,
      fixed: 1.45,
    }
  },
  {
    id: 4,
    order: 4,
    name: "Tealca",
    enabled: true,
    shipToHome: false,
    data: [
      "clientName",
      "clientId",
      "officeName",
      "officeAddress",
      "Municipality",
      "Community",
      "City",
      "State"
    ],
    icon: "/misc/other/logo_tealca_footer_desktop.webp",
    fee: {
      status: false,
      onlyPayOnDelivery: true,
    }
  },
  {
    id: 5,
    order: 5,
    name: "shop",
    enabled: false,
    shipToHome: false,
    data: [
      "clientName",
      "clientId",
      "address"
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
    fee: {
      status: false,
      onlyPayOnDelivery: false
    }
  }
];

export const giftOptions: GiftOption[] = [
  {
    id: 1,
    name: "Estuche de cuero negro",
    description: "Protege tu producto con estilo",
    type: "case",
    price: 3,
    image: "/misc/other/leather-bag.webp",
    available: true
  },
  {
    id: 2,
    name: "Envoltorio navideño",
    description: "Perfecto para regalos festivos",
    type: "wrapping",
    price: 1.5,
    image: "/misc/other/gift.webp",
    available: false
  }
];

export const firebaseProductsList:productProps[] = 
[
  {
    "id": "uImL9X3UQMA21fpZdF0R",
    "discount": {"type": 1, "value": 2.2},
    "price": 9,
    "description": "Piercing negro a presión de estilo rockero",
    "updatedAt": 1752586218633,
    "status": 0,
    "category": 4,
    "name": "Piercing negro (unidad)",
    "variants": [
      {"color": "", "sku": "AAI-0010", "image": "%2Fskus%2FAAI-0010.webp?alt=media&token=7b968752-20d2-47e1-8562-5e214d24b11c", "stock": [
        {"name": "single", "quantity": 0}
      ]}
    ],
    "images": [
      "%2Fpendants%2FPiercing%20negro.webp?alt=media&token=3639dbd2-27f3-4fa8-bb13-11959bbf6f21"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-0010.webp?alt=media&token=76026a95-6b8b-422e-b820-d1c93fa2655e",
    "waLink": "Piercing%20negro%20%28a%20presi%C3%B3n%29",
    "mainSku": "AAI-0010"
  },
  {
    "id": "gpyYvQqO7tJNYDP99EAc",
    "discount": {"type": 1, "value": 2.2},
    "price": 9,
    "name": "Piercing de cadena (unidad)",
    "variants": [
      {"color": "", "sku": "AAI-0020", "image": "%2Fskus%2FAAI-0020.webp?alt=media&token=4fa46e30-756c-4775-b8b0-39c7d0130abd", "stock": [
        {"name": "single", "quantity": 0}
      ]}
    ],
    "category": 4,
    "images": [
      "%2Fpendants%2FPiercieng%20de%20cadena.webp?alt=media&token=fd38e487-b58d-4204-b7df-a535a6d87217"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-0020.webp?alt=media&token=806b191f-dd29-4f22-99ef-a98b7b964210",
    "description": "Piercing de estilo rockero con pequeña cadena, de color negro, a presión",
    "waLink": "Piercieng%20de%20cadena%20%28a%20presi%C3%B3n%29",
    "mainSku": "AAI-0020",
    "updatedAt": 1752586218636,
    "status": 0,
    "createdAt": null
  },
  {
    "id": "htSjh2uCw7B4QZVY8aIU",
    "discount": {"type": 1, "value": 2.2},
    "createdAt": null,
    "category": 4,
    "images": [
      "%2Fpendants%2FArete%20de%20pluma%201.webp?alt=media&token=b87cf2a2-d036-4d84-a293-353dd9e0e9d5",
      "%2Fpendants%2FArete%20de%20pluma%202.webp?alt=media&token=ce51fb42-afb5-473f-8a0a-2f485041203c",
      "%2Fpendants%2FArete%20de%20pluma%203.webp?alt=media&token=4129371b-e476-4fba-8fba-e9c792e98873"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-0030.webp?alt=media&token=272a8474-55e2-4a73-9889-0ff1485f70c8",
    "updatedAt": 1753186769009,
    "name": "Arete de pluma (unidad)",
    "price": 9,
    "description": "Arete a presión, con pequeña cadena y diseño de pluma elegante. Disponible en plateado y en negro",
    "waLink": "Arete%20de%20pluma%20%28a%20presi%C3%B3n%29",
    "variants": [
        {"color": "gray", "sku": "AAI-0031", "image": "%2Fskus%2FAAI-0031.webp?alt=media&token=b158ea0b-5426-4236-aa52-c5c1b737f94d", "stock": [
            {"name": "single", "quantity": 1}
        ]},
        {"color": "black", "sku": "AAI-0032", "image": "%2Fskus%2FAAI-0032.webp?alt=media&token=5d30dbb4-f4bf-4ff7-8385-0da45af45deb", "stock": [
            {"name": "single", "quantity": 3}
        ]}
    ],
    "status": 1,
    "mainSku": "AAI-0030"
  },
  {
    "id": "ieaJYFJZx72H0VBR45Cj",
    "discount": {"type": 1, "value": 2.1},
    "price": 10,
    "description": "Aretes de acero inoxidable a presión, con diseño de cruz. Disponible en plateado y en negro",
    "variants": [
        {"sku": "AAI-0041", "color": "gray", "image": "%2Fskus%2FAAI-0041.webp?alt=media&token=33781f41-6bc4-444e-a4b7-fe362a76f3a8", "stock": [
            {"name": "single", "quantity": 6}
        ]},
        {"color": "black", "sku": "AAI-0042", "image": "%2Fskus%2FAAI-0042.webp?alt=media&token=b75f24f9-65f8-4ff5-b584-75acd2a6684e", "stock": [
            {"name": "single", "quantity": 6}
        ]}
    ],
    "updatedAt": 1753186819756,
    "status": 1,
    "category": 4,
    "name": "Arete de cruz (unidad)",
    "createdAt": null,
    "images": [
      "%2Fpendants%2FArete%20de%20cruz%201.webp?alt=media&token=a11d934b-1519-41ff-a669-005840d4dcd9",
      "%2Fpendants%2FArete%20de%20cruz%202.webp?alt=media&token=71282352-5cc6-4ef2-b149-2f3c8825fd4f",
      "%2Fpendants%2FArete%20de%20cruz%203.webp?alt=media&token=97b1d067-c712-4676-9115-758ff6b93bed"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-0040.webp?alt=media&token=67ead749-b572-4eb5-a959-ae505f643ab0",
    "waLink": "Arete%20de%20cruz%20%28a%20presi%C3%B3n%29",
    "mainSku": "AAI-0040"
  },
  {
    "id": "tx44epEpN0MJQ51sXf2f",
    "images": [
        "%2Fpendants%2FPiercing%20vegvisir%201.webp?alt=media&token=d8292fea-d7eb-42c1-9bd4-2acf47be72db",
        "%2Fpendants%2FPiercing%20par.webp?alt=media&token=8116d3a4-c518-46e9-a99f-847f2786d878"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-3010.webp?alt=media&token=2d5f0bf3-674a-403e-8e42-dd9294ff72f7",
    "name": "Piercing vegvisir túneles nº8 (par)",
    "variants": [
      {"color": "", "sku": "AAI-3010", "image": "%2Fskus%2FAAI-3010.webp?alt=media&token=32a6239c-ad32-4a91-bbeb-1303cd547e60", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "mainSku": "AAI-3010",
    "description": "Piercing tipo túnel de 8mm, con diseño de vegvisir a cada lado",
    "createdAt": null,
    "waLink": "Piercing%20vegvisir%20t%C3%BAneles%20n%C2%BA8",
    "updatedAt": 1746966807653,
    "status": 1,
    "price": 10.75,
    "category": 4
  },
  {
    "id": "RSAyLx3cCAu8rhST9tMn",
    "category": 4,
    "images": [
        "%2Fpendants%2FPiercing%20valknut%201.webp?alt=media&token=233d0bf9-38c8-4506-9119-58edfccd6e37",
        "%2Fpendants%2FPiercing%20valknut%202.webp?alt=media&token=2cfd1c53-4188-4bec-87ea-2bb11f378f8d",
        "%2Fpendants%2FPiercing%20par.webp?alt=media&token=8116d3a4-c518-46e9-a99f-847f2786d878"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-3020.webp?alt=media&token=668ba84d-2aa3-40bb-a931-107edf4a94ee",
    "updatedAt": 1746966814606,
    "price": 10.75,
    "name": "Piercing valknut túneles nº8 (par)",
    "status": 1,
    "variants": [
      {"color": "", "sku": "AAI-3020", "image": "%2Fskus%2FAAI-3020.webp?alt=media&token=e26258d3-4c50-4e59-b70d-5d5a4905d288", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "mainSku": "AAI-3020",
    "createdAt": null,
    "description": "Piercing tipo túnel de 8mm, con diseño de valknut a cada lado",
    "waLink": "Piercing%20valknut%20t%C3%BAneles%20n%C2%BA8"
  },
  {
    "id": "QKFrYijfrQndpQ1DID0h",
    "mainSku": "AAI-3030",
    "updatedAt": 1746966823094,
    "createdAt": null,
    "name": "Piercing árbol de la vida túneles nº8 (par)",
    "price": 10.75,
    "variants": [
      {"color": "", "sku": "AAI-3030", "image": "%2Fskus%2FAAI-3030.webp?alt=media&token=ffd11c6a-a19f-41f8-8434-632b681de0c3", "stock": [
        {"name": "single", "quantity": 2}
      ]}
    ],
    "waLink": "Piercing%20%C3%A1rbol%20de%20la%20vida%20t%C3%BAneles%20n%C2%BA8",
    "status": 1,
    "description": "Piercing tipo túnel de 8mm, con diseño de Yggdrasil y runas a cada lado",
    "category": 4,
    "images": [
        "%2Fpendants%2F%C3%81rbol%20de%20la%20vida.webp?alt=media&token=68c79191-4b9b-4a29-b9bc-57e23a8637c9",
        "%2Fpendants%2FPiercing%20par.webp?alt=media&token=8116d3a4-c518-46e9-a99f-847f2786d878"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-3030.webp?alt=media&token=6c700adc-f04f-4af4-83fe-86debb6bd9cc",
    "rating": 0
  },
  {
    "id": "mrfJZTypWGJ3vz30yRIw",
    "name": "Piercing lobo túneles nº8 (par)",
    "variants": [
      {"color": "", "sku": "AAI-3040", "image": "%2Fskus%2FAAI-3040.webp?alt=media&token=907e9f45-bf28-4b68-b7c2-3e58ca9a9ca6", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "status": 0,
    "images": [
        "%2Fpendants%2FLobo.webp?alt=media&token=f5b408a9-add1-45b9-b922-d38ae0f19ca0",
        "%2Fpendants%2FPiercing%20par.webp?alt=media&token=8116d3a4-c518-46e9-a99f-847f2786d878"
    ],
    "thumbnail": "%2Fthumbnails%2FAAI-3040.webp?alt=media&token=a5b33b67-c243-4981-a681-1ba7943353d2",
    "waLink": "Piercing%20lobo%20t%C3%BAneles%20n%C2%BA8",
    "description": "Piercing tipo túnel de 8mm, con diseño de lobo y runas a cada lado",
    "updatedAt": 1746966831231,
    "category": 4,
    "mainSku": "AAI-3040",
    "createdAt": null,
    "price": 10.75
  },
  {
    "id": "mLiBd7qZ3m6NDkVvdju4",
    "category": 0,
    "images": [
        "%2Frings%2Felegant%2FLe%C3%B3n%20ojos%20rojos%201.webp?alt=media&token=e18c17e7-82b7-4084-968d-02dd75987f04",
        "%2Frings%2Felegant%2FLe%C3%B3n%20ojos%20rojos%202.webp?alt=media&token=fb21bd28-cf38-4e85-a191-8f0b13c0637e",
        "%2Frings%2Felegant%2FLe%C3%B3n%20ojos%20rojos%203.webp?alt=media&token=10195d7b-6ad5-4afe-b55d-bb0f0d9811f1",
        "%2Frings%2Felegant%2FLe%C3%B3n%20ojos%20rojos%204.webp?alt=media&token=eeb82fdb-0f51-42c6-873d-4a2218f78217",
        "%2Frings%2Felegant%2FLe%C3%B3n%20ojos%20rojos%205.webp?alt=media&token=2c3bf907-3540-4810-8b74-3deec333fc97"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0010.webp?alt=media&token=a059b76b-c8c5-4d63-b867-b78a6ebe873b",
    "price": 18,
    "mainSku": "ANI-0010",
    "variants": [
      {"sku": "ANI-0011", "color": "yellow", "image": "%2Fskus%2FANI-0011.webp?alt=media&token=a7666f6e-54b4-4429-a8c0-98d65fb7c3c0", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 0},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 0},
          {"name": "11", "quantity": 0},
          {"name": "12", "quantity": 0},
          {"name": "13", "quantity": 0}
      ]},
      {"color": "gray", "sku": "ANI-0012", "image": "%2Fskus%2FANI-0012.webp?alt=media&token=797b56cf-ce05-440c-97b4-cfdebd17bc0f", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]}
    ],
    "name": "León ojos rojos",
    "createdAt": null,
    "waLink": "anillo%20Le%C3%B3n%20de%20ojos%20rojos",
    "discount": {type: 1, value: 2.2},
    "subcategory": 0,
    "status": 1,
    "description": "Anillo elegante con diseño de león, con ojos rojos de cristal. Disponible en dorado y en plateado",
    "updatedAt": 1753186975107
  },
  {
    "id": "paav0sOsxMGnyxLlg5Ww",
    "variants": [
      {"sku": "ANI-0021", "color": "yellow", "image": "%2Fskus%2FANI-0021.webp?alt=media&token=a99b6679-3942-40de-a138-f5187fbc331c", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0022", "image": "%2Fskus%2FANI-0022.webp?alt=media&token=85fc673d-0574-4553-b0ea-bf4d414a7075", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]}
    ],
    "price": 19.5,
    "status": 1,
    "updatedAt": 1753187028557,
    "createdAt": null,
    "name": "Estrella de David",
    "category": 0,
    "mainSku": "ANI-0020",
    "description": "Anillo elegante con diseño de estrella de David. Disponible en dorado y en plateado",
    "images": [
        "%2Frings%2Felegant%2FEstrella%20de%20David%201.webp?alt=media&token=b76edd7c-d798-4350-8047-7b8edcc2d98c",
        "%2Frings%2Felegant%2FEstrella%20de%20David%202.webp?alt=media&token=3ad6fbfb-715d-4e21-94bf-e15107e85ea6",
        "%2Frings%2Felegant%2FEstrella%20de%20David%203.webp?alt=media&token=6303ea1c-d5f6-45e1-8d80-f19711098dcf",
        "%2Frings%2Felegant%2FEstrella%20de%20David%204.webp?alt=media&token=7cc5e674-c177-451b-a696-5ccce0257bec"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0020.webp?alt=media&token=02012901-7960-43b6-b83b-0061322e06a8",
    "waLink": "anillo%20Estrella%20de%20David",
    "subcategory": 0
  },
  {
    "id": "uXclq9N2qVu3JVEj91uX",
    "status": 1,
    "createdAt": null,
    "name": "Octogonal de León",
    "category": 0,
    "waLink": "anillo%20Octogonal%20de%20Le%C3%B3n",
    "updatedAt": 1753187075276,
    "description": "Anillo elegante con diseño de león y forma hexagonal. Disponible en dorado y en plateado",
    "images": [
        "%2Frings%2Felegant%2FOctogonal%20de%20Le%C3%B3n%201.webp?alt=media&token=eee7c04d-e5d4-4092-a951-be2065222c9c",
        "%2Frings%2Felegant%2FOctogonal%20de%20Le%C3%B3n%202.webp?alt=media&token=5461128c-e4d2-48bc-8224-048993c01368",
        "%2Frings%2Felegant%2FOctogonal%20de%20Le%C3%B3n%203.webp?alt=media&token=e3375817-8e05-47ed-89ad-5d616f876508"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0030.webp?alt=media&token=963327d7-0546-4b3d-9056-f6c160cf5878",
    "variants": [
        {"sku": "ANI-0031", "color": "yellow", "image": "%2Fskus%2FANI-0031.webp?alt=media&token=5753cae0-d2eb-48a2-9f2e-86eaa61fc0f2", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]},
        {"sku": "ANI-0032", "color": "gray", "image": "%2Fskus%2FANI-0032.webp?alt=media&token=cd1d5e4a-f4a1-4a42-a309-4ef7d611b966", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]},
    ],
    "mainSku": "ANI-0030",
    "price": 18.95,
    "subcategory": 0
  },
  {
    "id": "U3Qz8zx5c7B7VbZMpyFA",
    "name": "Elegante lujoso",
    "status": 1,
    "waLink": "anillo%20Elegante%20lujoso",
    "images": [
        "%2Frings%2Felegant%2FElegante%20lujoso%201.webp?alt=media&token=b38674fc-8169-4914-8703-c5e3f3e88a24",
        "%2Frings%2Felegant%2FElegante%20lujoso%202.webp?alt=media&token=c440dfdf-9474-4009-b32d-175d35af4ab2"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0040.webp?alt=media&token=6de670f3-5c33-470a-bf61-67dccd86ee7c",
    "description": "Anillo dorado elegante, adornado con circones",
    "updatedAt": 1753187214862,
    "category": 0,
    "mainSku": "ANI-0040",
    "subcategory": 0,
    "discount": {"type": 1, "value": 4.25},
    "createdAt": null,
    "price": 19,
    "variants": [
      {"sku": "ANI-0040", "color": "", "image": "%2Fskus%2FANI-0040.webp?alt=media&token=8cb3f9a6-9969-4144-9c56-846093bb3ffa", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
  },
  {
    "id": "kFCtyLC1foOYMFvPYPZq",
    "waLink": "anillo%20Jaguar",
    "status": 1,
    "mainSku": "ANI-0050",
    "discount": {"type": 1, "value": 4.6},
    "createdAt": null,
    "description": "Anillo elegante con diseño jaguar, adornado con piedras rojas en sus ojos. Disponible en dorado y en negro",
    "category": 0,
    "name": "Jaguar",
    "updatedAt": 1753187263718,
    "variants": [
        {"color": "yellow", "sku": "ANI-0051", "image": "%2Fskus%2FANI-0051.webp?alt=media&token=7cb1f02b-410e-4204-b292-10e441dc6fc0", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
        ]},
        {"color": "black", "sku": "ANI-0052", "image": "%2Fskus%2FANI-0052.webp?alt=media&token=7133cc57-3822-4022-a589-8844dd20f99f", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
        ]},
    ],
    "subcategory": 0,
    "images": [
        "%2Frings%2Felegant%2FJaguar%201.webp?alt=media&token=18d9321c-ccbc-440d-83c4-4de391db96c2",
        "%2Frings%2Felegant%2FJaguar%202.webp?alt=media&token=378c9c0f-d972-4d65-a512-3a42266043b6",
        "%2Frings%2Felegant%2FJaguar%203.webp?alt=media&token=cfce2ed3-8a09-4b90-9ce4-2b9f4f65de31"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0050.webp?alt=media&token=59eecd34-cd8a-4e56-839a-b58f06808a6c",
    "price": 20
  },
  {
    "id": "1LqtXMzMTfNO1kosm9v7",
    "category": 0,
    "discount": {"type": 1, "value": 4.25},
    "updatedAt": 1753187294926,
    "status": 1,
    "description": "Anillo elegante minimalista, con detalles que hacen referencia a los caracteres chinos que significan 'para toda la vida'",
    "subcategory": 0,
    "createdAt": null,
    "name": "Manifiesto de distinción",
    "mainSku": "ANI-0060",
    "variants": [
      {"color": "", "sku": "ANI-0060", "image": "%2Fskus%2FANI-0060.webp?alt=media&token=15bee034-0a5a-4615-81c3-0ceb86de79ad", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Manifiesto%20de%20distinci%C3%B3n",
    "images": [
        "%2Frings%2Felegant%2FA%20manifest%20of%20distinction%201.webp?alt=media&token=dc085ccc-b069-48fe-b890-2266beef122e",
        "%2Frings%2Felegant%2FA%20manifest%20of%20distinction%202.webp?alt=media&token=96c1aa76-41fa-47ac-8c5c-45c1889a9571"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0060.webp?alt=media&token=7463808e-c57e-4fc8-83dd-43e998423d35",
    "price": 18,
    "rating": 0
  },
  {
    "id": "5vm28WkdicTqT9uz3YFy",
    "updatedAt": 1753187309798,
    "images": [
        "%2Frings%2Felegant%2FNautico%201.webp?alt=media&token=dae7d960-956f-4c6a-b090-718bb29f4019",
        "%2Frings%2Felegant%2FNautico%202.webp?alt=media&token=5a306e32-209c-428e-843b-58d7ca6633ac"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0070.webp?alt=media&token=165c5bbf-816a-43c6-815b-b695acd0b917",
    "variants": [
      {"color": "", "sku": "ANI-0070", "image": "%2Fskus%2FANI-0070.webp?alt=media&token=c0f4ce8b-4285-4569-8018-c70460c5454c", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "name": "Náutico",
    "status": 1,
    "price": 17.5,
    "createdAt": null,
    "waLink": "anillo%20N%C3%A1utico",
    "category": 0,
    "mainSku": "ANI-0070",
    "subcategory": 0,
    "description": "Anillo elegante con diseño de brújula navegante"
  },
  {
    "id": "3QRhVuojOvohgBB1ub40",
    "images": [
        "%2Frings%2Felegant%2FANI-0080.webp?alt=media&token=52aac0f1-e5ef-480e-9550-14340deb5b8a",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Redondo%20dorado%201.webp?alt=media&token=d1ccc6db-77b3-4d80-9483-bf1e6f1bbb78",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Redondo%20dorado%202.webp?alt=media&token=8c13a68c-ba03-4692-9021-08fdc7b7bb47",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Redondo%20dorado%203.webp?alt=media&token=221c1df0-2e4f-4ef5-9aab-2d121b582579",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Redondo%20dorado%204.webp?alt=media&token=90a0d3d9-66e1-4508-85a3-a39ac8ca0470",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Redondo%20plateado.webp?alt=media&token=4060801d-797e-428d-97b5-08568cc4bb1d"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0080.webp?alt=media&token=6558290e-5c44-4765-87b8-3f31d6f0f3d1",
    "updatedAt": 1753187343710,
    "variants": [
      {"color": "yellow", "sku": "ANI-0081", "image": "%2Fskus%2FANI-0081.webp?alt=media&token=04569a89-da93-4f97-9d62-68c71e0db9c6", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0082", "image": "%2Fskus%2FANI-0082.webp?alt=media&token=0b15831f-b781-4b2a-92e7-2111dfe9b7cd", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "Anillo%20San%20Benito%20Redondo",
    "status": 1,
    "name": "Anillo San Benito Redondo",
    "price": 18.5,
    "mainSku": "ANI-0080",
    "subcategory": 0,
    "category": 0,
    "description": "Anillo conmemorativo de San Benito de Nursia, con diseño redondo"
  },
  {
    "id": "yaQYSKmm2vsEClSTk1EH",
    "price": 20.5,
    "category": 0,
    "updatedAt": 1753187355253,
    "variants": [
      {"color": "yellow", "sku": "ANI-0091", "image": "%2Fskus%2FANI-0091.webp?alt=media&token=7cb373fa-de8b-4861-a468-d5e3e95405f4", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0092", "image": "%2Fskus%2FANI-0092.webp?alt=media&token=6ae37274-0a00-4ee1-8b41-8544d934c701", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "mainSku": "ANI-0090",
    "images": [
        "%2Frings%2Felegant%2FANI-0090.webp?alt=media&token=524f7ffa-f407-44b2-9b0d-f20f5ff55c38",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Octogonal%20dorado.webp?alt=media&token=d825a1f8-ad4b-4d1a-8838-9314bb3ec03a",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Octogonal%20mixto.webp?alt=media&token=335e82c7-18f2-4b44-a0fa-668b6f817895",
        "%2Frings%2Felegant%2FAnillo%20San%20Benito%20Octogonal%20plateado.webp?alt=media&token=b54ff238-9239-4516-9229-a48fd3e95acf"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0090.webp?alt=media&token=0d8eecc4-b1f4-4103-95b7-7902c1d47bcb",
    "status": 1,
    "waLink": "Anillo%20San%20Benito%20Octogonal",
    "name": "Anillo San Benito Octogonal",
    "subcategory": 0,
    "description": "Anillo conmemorativo de San Benito de Nursia, de diseño octogonal"
  },
  {
    "id": "0lhqIGtSCrdJRSLgxOBJ",
    "createdAt": null,
    "variants": [
      {"color": "yellow", "sku": "ANI-0102", "image": "%2Fskus%2FANI-0102.webp?alt=media&token=ea74b1ab-9671-4965-b9b0-5b95796c75d2", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "subcategory": 0,
    "name": "Corona de rey",
    "mainSku": "ANI-0102",
    "category": 0,
    "price": 18.7,
    "images": [
        "%2Frings%2Felegant%2FCorona%20de%20rey.webp?alt=media&token=d6cc2fb1-4b27-48b5-abdb-d1b5391eb60d"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0102.webp?alt=media&token=891909f9-8496-4a75-ab70-063ac561cd0c",
    "status": 1,
    "waLink": "anillo%20Corona%20de%20rey",
    "updatedAt": 1753187375238,
    "description": "Anillo elegante con forma de corona"
  },
  {
    "id": "c4Yf7om9OmkoK3b82EB9",
    "discount": {"type": 1, "value": 4.4},
    "waLink": "anillo%20Plumas%20refinadas",
    "mainSku": "ANI-0110",
    "createdAt": null,
    "updatedAt": 1753187405311,
    "variants": [
      {"color": "", "sku": "ANI-0110", "image": "%2Fskus%2FANI-0110.webp?alt=media&token=91237262-8d23-4f7e-987b-35f4b72a09a6", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "images": [
        "%2Frings%2Felegant%2FPlumas%20refinadas%201.webp?alt=media&token=f7344d60-9f22-4abc-93a8-72f535cb9e53",
        "%2Frings%2Felegant%2FPlumas%20refinadas%202.webp?alt=media&token=c5038e95-067c-423a-8781-a336a903934e"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-0110.webp?alt=media&token=3a771f2c-0df5-4601-9b0b-0be08c8c5569",
    "price": 20,
    "name": "Plumas refinadas",
    "description": "Anillo elegante con forma de 2 plumas, enlazando al dedo que lo use",
    "subcategory": 0,
    "status": 1,
    "category": 0
  },
  {
    "id": "riUMNdhzbcAIpwnenBP4",
    "variants": [
      {"color": "", "sku": "ANI-1010", "image": "%2Fskus%2FANI-1010.webp?alt=media&token=405071f5-38eb-448f-ab67-0fd05b3a761e", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "updatedAt": 1753187418975,
    "description": "Anillo elegante adornado con la cruz del reino de Jerusalén",
    "category": 0,
    "subcategory": 1,
    "name": "Cruz de Jerusalén",
    "waLink": "anillo%20Cruz%20de%20Jerusal%C3%A9n",
    "mainSku": "ANI-1010",
    "images": [
        "%2Frings%2Fmasonic%2FCruz%20de%20Jerusal%C3%A9n%201.webp?alt=media&token=bb6acfd5-2507-4539-b5dd-bfedfaa739e4",
        "%2Frings%2Fmasonic%2FCruz%20de%20Jerusal%C3%A9n%202.webp?alt=media&token=b0a46429-f61c-4116-bf9c-c78ad88cc691"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1010.webp?alt=media&token=2a54c63e-e42d-413a-bcdb-fe6dcfe35a52",
    "price": 18.75,
    "status": 1
  },
  {
    "id": "YfxYR8wDFVB1cNFohx39",
    "price": 21.3,
    "mainSku": "ANI-1020",
    "name": "Masónico redondo latín",
    "waLink": "anillo%20Mas%C3%B3nico%20redondo%20lat%C3%ADn",
    "status": 1,
    "variants": [
      {"color": "yellow", "sku": "ANI-1021", "image": "%2Fskus%2FANI-1021.webp?alt=media&token=d433d1c8-7af4-4a6a-b6c8-de1f8914c2ae", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-1022", "image": "%2Fskus%2FANI-1022.webp?alt=media&token=9975eb45-0b00-432c-979b-f00d193923a2", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "subcategory": 1,
    "description": "Anillo de escuadra masónica, de cuerpo redondo ajustado y plateado. Disponible en dorado y en plateado",
    "category": 0,
    "images": [
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20redondo%20lat%C3%ADn%201.webp?alt=media&token=d5e91a3e-d538-475c-855c-e9efa0ad0a80",
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20redondo%20lat%C3%ADn%202.webp?alt=media&token=28621e9e-121e-4104-b193-d2c0e389835c",
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20redondo%20lat%C3%ADn%203.webp?alt=media&token=e55e98b8-3687-470a-8d57-08b64322459a"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1020.webp?alt=media&token=438677d2-ee61-4cc8-8954-c7796c485b15",
    "updatedAt": 1753187434190,
    "rating": 0
  },
  {
    "id": "HwE6hzBgbczp3qINtnxS",
    "subcategory": 1,
    "category": 0,
    "name": "Masónico cuadrado",
    "status": 1,
    "mainSku": "ANI-1030",
    "description": "Anillo de escuadra masónica, de cuerpo cuadrado y plateado",
    "variants": [
      {"color": "", "sku": "ANI-1030", "image": "%2Fskus%2FANI-1030.webp?alt=media&token=acbac750-f936-4311-9047-8ee41da3f200", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Mas%C3%B3nico%20cuadrado",
    "images": [
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20cuadrado%201.webp?alt=media&token=46afa887-c75c-4196-a98e-805915d7b9e3",
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20cuadrado%202.webp?alt=media&token=da37418f-c2ae-4219-b60b-1ecc8d887b06"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1030.webp?alt=media&token=07818672-78c3-4cc0-ad7c-e24e317da1b3",
    "price": 19.5,
    "createdAt": null,
    "updatedAt": 1753187445039
  },
  {
    "id": "erzHhUs0B6OE4H50iHew",
    "category": 0,
    "price": 21.3,
    "images": [
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20azul%201.webp?alt=media&token=f72b3146-e74e-4c82-9691-1ef046815440",
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20azul%202.webp?alt=media&token=08b6f143-639f-49d5-a04f-79442e719ba5"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1040.webp?alt=media&token=381edaac-9ff6-4abd-ab18-02b6694f2f4e",
    "name": "Masónico azul",
    "createdAt": null,
    "status": 1,
    "updatedAt": 1753187455415,
    "subcategory": 1,
    "waLink": "anillo%20Mas%C3%B3nico%20azul",
    "variants": [
      {"color": "", "sku": "ANI-1040", "image": "%2Fskus%2FANI-1040.webp?alt=media&token=3acc7f6e-ff63-467e-a268-8ef8782ffc7e", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "mainSku": "ANI-1040",
    "description": "Anillo de escuadra masónica, de cuerpo redondo ajustado y plateado, y detalle de fondo en azul"
  },
  {
    "id": "TVk76ej3aLVDf4B12ldr",
    "category": 0,
    "price": 19.5,
    "images": [
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20de%20lujo%201.webp?alt=media&token=1a4d3730-bcfb-4107-a5b1-6bb566e376b9",
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20de%20lujo%202.webp?alt=media&token=418e716f-071a-4c9f-8980-3f9ae6c85cca"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1050.webp?alt=media&token=a0a8699d-8e01-446e-8b6b-b100cd36cdba",
    "createdAt": null,
    "mainSku": "ANI-1050",
    "waLink": "anillo%20Mas%C3%B3nico%20de%20lujo",
    "updatedAt": 1753187467758,
    "variants": [
      {"color": "", "sku": "ANI-1050", "image": "%2Fskus%2FANI-1050.webp?alt=media&token=bb0ee1df-0e9b-4f35-b88c-5a435c9013e2", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "subcategory": 1,
    "name": "Masónico de lujo",
    "status": 1,
    "description": "Anillo de escuadra masónica, de cuerpo redondo ajustado y dorado, y adornado con zircones alrededor"
  },
  {
    "id": "dvFLFsMQsF2SdjPi4fes",
    "images": [
        "%2Frings%2Fmasonic%2FTri%C3%A1ngulo%20mas%C3%B3nico%201.webp?alt=media&token=85070194-0261-4f88-bc16-f13bf58c6d87",
        "%2Frings%2Fmasonic%2FTri%C3%A1ngulo%20mas%C3%B3nico%202.webp?alt=media&token=edc4009b-e2ec-418b-9e06-67bb80a3567c"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1060.webp?alt=media&token=1f9a9441-a390-4757-ab6f-01c1c364d52d",
    "description": "Anilo plateado con forma de triángulo y figura del ojo de la Providencia",
    "createdAt": null,
    "mainSku": "ANI-1060",
    "price": 18.3,
    "updatedAt": 1753187478463,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1060", "image": "%2Fskus%2FANI-1060.webp?alt=media&token=7ef9a246-ec4c-427b-950b-c64db300cff1", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Tri%C3%A1ngulo%20mas%C3%B3nico",
    "category": 0,
    "subcategory": 1,
    "name": "Triángulo masónico",
    "rating": 0
  },
  {
    "id": "Z5DMWmgvQCUqsYxqGN91",
    "category": 0,
    "images": [
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20master%201.webp?alt=media&token=a8d6974a-d976-46f7-b060-273112d90bec",
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20master%202.webp?alt=media&token=b350ac3f-2a83-4ef3-8696-91891ac1527d"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1080.webp?alt=media&token=a22d15ab-b600-4fe3-9509-df07f2ff82a8",
    "mainSku": "ANI-1080",
    "createdAt": null,
    "description": "Anillo de escuadra masónica, de cuerpo redondo ajustado y dorado, y adornado con las palabras 'Master' y 'Mason'",
    "subcategory": 1,
    "name": "Masónico master",
    "price": 18.95,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1080", "image": "%2Fskus%2FANI-1080.webp?alt=media&token=88fdebf2-f4f1-4a8a-b49e-15c52cd9cfcc", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753187488935,
    "waLink": "anillo%20Mas%C3%B3nico%20master"
  },
  {
    "id": "vE8iO6Fn6d5C4uouTH1G",
    "waLink": "anillo%20Cruz%20templarios",
    "updatedAt": 1753187500335,
    "createdAt": null,
    "subcategory": 1,
    "category": 0,
    "price": 17.5,
    "description": "Anillo de cruz templaria, con escudos de cruz templaria a los lados",
    "images": [
        "%2Frings%2Fmasonic%2FAnillo%20Cruz%20templarios%201.webp?alt=media&token=626a4692-39e3-42b4-a5b0-1aa1f3a1c9f0",
        "%2Frings%2Fmasonic%2FAnillo%20Cruz%20templarios%202.webp?alt=media&token=6e667832-9483-449f-9e86-f93e33f7ac4a"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1090.webp?alt=media&token=14bfbbb0-32f5-4cd4-82e7-425e1012971d",
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1090", "image": "%2Fskus%2FANI-1090.webp?alt=media&token=3d20af00-87ec-409d-ae91-37fe6d35d095", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "name": "Anillo Cruz templarios",
    "mainSku": "ANI-1090"
  },
  {
    "id": "qBVIO2QbrGtm5vVJwdT9",
    "status": 1,
    "price": 18.9,
    "description": "Anillo adornado con escruadras masónicas, y rodamiento antiestrés. Disponible en dorado y en plateado",
    "mainSku": "ANI-1100",
    "name": "Masónico spin",
    "category": 0,
    "images": [
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20spin%201.webp?alt=media&token=f68e4575-0c4f-47b2-97a8-febb2ff2e1f1",
        "%2Frings%2Fmasonic%2FMas%C3%B3nico%20spin%202.webp?alt=media&token=8803c5c5-832a-4ce0-8053-226f611e9b2f"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-1100.webp?alt=media&token=1a76a552-0e95-4b78-9515-72db1d9ae555",
    "updatedAt": 1753187515534,
    "createdAt": null,
    "subcategory": 1,
    "variants": [
      {"color": "yellow", "sku": "ANI-1101", "image": "%2Fskus%2FANI-1101.webp?alt=media&token=76b831dd-355a-478a-ae4e-234b44762b90", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-1102", "image": "%2Fskus%2FANI-1102.webp?alt=media&token=0455d8c5-2a00-47c4-8d0b-d5bea448a84c", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Mas%C3%B3nico%20spin"
  },
  {
    "id": "MwzKI1WcVr5OTwuH64k9",
    "category": 0,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-2010", "image": "%2Fskus%2FANI-2010.webp?alt=media&token=3572f34a-19ae-4f91-990a-e8fb865e8411", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753187547396,
    "status": 1,
    "name": "Calavera de ojos rojos",
    "subcategory": 2,
    "images": [
      "%2Frings%2Frock%2FCalavera%20de%20ojos%20rojos%201.webp?alt=media&token=e353a629-aca3-4640-9c81-4042b71d13d7",
      "%2Frings%2Frock%2FCalavera%20de%20ojos%20rojos%202.webp?alt=media&token=17e29c69-e23e-49e8-9109-04c3f62d8d40"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2010.webp?alt=media&token=7dddaf22-dd01-4298-bf92-c83f7a8ee0c2",
    "waLink": "anillo%20Calavera%20de%20ojos%20rojos",
    "description": "Anillo de calavera, adornado con cristales rojos en cada ojo",
    "mainSku": "ANI-2010",
    "price": 18.7
  },
  {
    "id": "UwDNW5Nng8T3IOaaxZ6Q",
    "updatedAt": 1753187564183,
    "category": 0,
    "mainSku": "ANI-2020",
    "name": "Calavera",
    "images": [
      "%2Frings%2Frock%2FCalavera%201.webp?alt=media&token=dbb77dd6-1393-4f65-bce3-f13a4784899d",
      "%2Frings%2Frock%2FCalavera%202.webp?alt=media&token=00b6a68c-4ac4-43b6-89c3-beb825e8f469"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2020.webp?alt=media&token=4f2cc05b-b622-44d0-b256-863a1458d896",
    "price": 19.3,
    "subcategory": 2,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-2020", "image": "%2Fskus%2FANI-2020.webp?alt=media&token=556f13fe-2587-4936-801b-fddd6c951fce", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Calavera",
    "createdAt": null,
    "description": "Anillo de calavera, sencillo de color plateado"
  },
  {
    "id": "HIkBnKKZHvQ5W8H90CwS",
    "price": 20,
    "status": 1,
    "mainSku": "ANI-2030",
    "discount": {"type": 1, "value": 4.4},
    "updatedAt": 1753187585423,
    "subcategory": 2,
    "variants": [
      {"color": "", "sku": "ANI-2030", "image": "%2Fskus%2FANI-2030.webp?alt=media&token=02119bec-b7b2-49fb-b691-68cbc5845a06", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "category": 0,
    "createdAt": null,
    "name": "Calavera gritando",
    "description": "Anillo de calavera con colmillos y boca abierta",
    "images": [
      "%2Frings%2Frock%2FCalavera%20gritando%201.webp?alt=media&token=fad24dc5-ad36-4a48-9f3e-30b236ddc45c",
      "%2Frings%2Frock%2FCalavera%20gritando%202.webp?alt=media&token=6618fb82-d52a-4923-a51d-2ac79bc3607f"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2030.webp?alt=media&token=39a3fdb0-5996-49cf-99b9-055703695468",
    "waLink": "anillo%20Calavera%20gritando"
  },
  {
    "id": "vgR04m4rvchCjRlDu0ac",
    "images": [
      "%2Frings%2Frock%2FCirculos%20de%20calavera%201.webp?alt=media&token=479b480a-0573-4914-a28e-a8b958329341",
      "%2Frings%2Frock%2FCirculos%20de%20calavera%202.webp?alt=media&token=e9b55062-4560-40ba-8f81-d471170a0d87"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2040.webp?alt=media&token=3d2df18b-a749-4b2b-a9b0-9a22f609b983",
    "waLink": "anillo%20Circulos%20de%20calavera",
    "category": 0,
    "variants": [
      {"color": "", "sku": "ANI-2040", "image": "%2Fskus%2FANI-2040.webp?alt=media&token=2ba644d8-c788-4c59-b9b4-456f48ff051d", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "status": 1,
    "price": 16.9,
    "updatedAt": 1753187595783,
    "description": "Anillo de calaveras alineadas en círculo",
    "createdAt": null,
    "subcategory": 2,
    "name": "Circulos de calavera",
    "mainSku": "ANI-2040"
  },
  {
    "id": "0pI3bRmQuZFaJT0cNuGY",
    "updatedAt": 1753187606527,
    "category": 0,
    "description": "Anillo de calavera adornada con piedras verdes en cada ojo, y diseño similar a las calaveras mexicanas",
    "status": 1,
    "subcategory": 2,
    "mainSku": "ANI-2050",
    "waLink": "anillo%20Calavera%20mexicana%20ojos%20verdes",
    "images": [
      "%2Frings%2Frock%2FCalavera%20mexicana%20ojos%20verdes%201.webp?alt=media&token=7d447ac8-7e37-477d-908c-17c4243808f4",
      "%2Frings%2Frock%2FCalavera%20mexicana%20ojos%20verdes%202.webp?alt=media&token=3d53082f-325a-4fe4-a94e-e23f3019a01b",
      "%2Frings%2Frock%2FCalavera%20mexicana%20ojos%20verdes%203.webp?alt=media&token=43f95663-d6a6-4598-aaab-e9e4917816c5"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2050.webp?alt=media&token=ff71cc06-f997-4ffc-8697-304eb33a6753",
    "price": 18.7,
    "name": "Calavera mexicana ojos verdes",
    "variants": [
      {"color": "", "sku": "ANI-2050", "image": "%2Fskus%2FANI-2050.webp?alt=media&token=478e989f-b84e-4e55-ba06-d73e87c90aea", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "createdAt": null
  },
  {
    "id": "tgg8nyEHVNOlcQQPa5Dz",
    "name": "Medusa",
    "waLink": "anillo%20Medusa",
    "updatedAt": 1753187617607,
    "price": 17.5,
    "variants": [
      {"color": "", "sku": "ANI-2060", "image": "%2Fskus%2FANI-2060.webp?alt=media&token=d083be31-4858-4aa2-87d4-1508e0a726a9", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "description": "Anillo con la figura de la gorgona de la mitología griega, Medusa, y adornado con zircones alrededor",
    "mainSku": "ANI-2060",
    "images": [
      "%2Frings%2Frock%2FMedusa%201.webp?alt=media&token=136ffc6c-11db-489f-a267-012201ff6b9d",
      "%2Frings%2Frock%2FMedusa%202.webp?alt=media&token=65b96d00-3093-4c74-bb4d-4c627e7e8568",
      "%2Frings%2Frock%2FMedusa%203.webp?alt=media&token=11631bc9-8340-4d7b-9b8c-48daa5d14e12"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2060.webp?alt=media&token=25e8c432-6704-480a-8ddf-682c05552110",
    "subcategory": 2,
    "status": 1,
    "category": 0,
    "numReviews": 0
  },
  {
    "id": "3XMuB3qNC4OdQ424AZfp",
    "category": 0,
    "variants": [
      {"color": "cyan", "sku": "ANI-2081", "image": "%2Fskus%2FANI-2081.webp?alt=media&token=79c05531-c174-40ed-9a70-c96f67bdd986", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "blue", "sku": "ANI-2082", "image": "%2Fskus%2FANI-2082.webp?alt=media&token=b56c9c8e-b55a-4835-abf2-739ad1e1d6f0", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "mainSku": "ANI-2080",
    "createdAt": null,
    "status": 1,
    "subcategory": 2,
    "images": [
        "%2Frings%2Frock%2FOjo%20malvado%20azul%201.webp?alt=media&token=9c2735c6-0d15-46d8-ac94-c3559b476734",
        "%2Frings%2Frock%2FOjo%20malvado%20azul%202.webp?alt=media&token=bcf6c2c6-e2bf-4106-9d98-9b6b016c6977",
        "%2Frings%2Frock%2FOjo%20malvado%20azul%203.webp?alt=media&token=d8d011d2-8111-4222-a413-7e9f7e589bfc"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2080.webp?alt=media&token=07dd2e6b-c96f-4c87-8c68-b886958a7263",
    "name": "Ojo malvado azul",
    "updatedAt": 1753187628663,
    "waLink": "anillo%20Ojo%20malvado%20azul",
    "price": 19.3,
    "description": "Anillo con figura de ojo azul, adornado a los lados con garras y calaveras. Disponible en azul claro y azul oscuro"
  },
  {
    "id": "quWZ7HDkhPUxkBeFu7AG",
    "mainSku": "ANI-2090",
    "name": "Guerrero espartano",
    "price": 17.5,
    "variants": [
      {"color": "", "sku": "ANI-2090", "image": "%2Fskus%2FANI-2090.webp?alt=media&token=21aa3280-482c-4945-a817-69d65b46fec2", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753187639175,
    "description": "Anillo con forma de casco de guerrero griego",
    "createdAt": null,
    "subcategory": 2,
    "waLink": "anillo%20Guerrero%20espartano",
    "status": 1,
    "category": 0,
    "images": [
      "%2Frings%2Frock%2FGuerrero%20espartano%201.webp?alt=media&token=2ad0c188-fb67-4ac2-99c4-ae64813b06a9",
      "%2Frings%2Frock%2FGuerrero%20espartano%202.webp?alt=media&token=8ef62aa8-c518-4644-b8ce-3e21d04617c5"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2090.webp?alt=media&token=f27bdacc-01bc-476a-87cf-6c1c8f53ec23"
  },
  {
    "id": "RYXHOwDXBsucOYcVnNSB",
    "updatedAt": 1753187670503,
    "category": 0,
    "waLink": "anillo%20Anillo%2013",
    "discount": {"type": 1, "value": 4.25},
    "price": 19,
    "mainSku": "ANI-2100",
    "subcategory": 2,
    "variants": [
      {"color": "", "sku": "ANI-2100", "image": "%2Fskus%2FANI-2100.webp?alt=media&token=e6a99253-88d1-4025-bd6e-fa6f9733a6fe", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "images": [
      "%2Frings%2Frock%2FAnillo%2013%201.webp?alt=media&token=aab2d74e-1d63-44bc-929b-608653579ee9",
      "%2Frings%2Frock%2FAnillo%2013%202.webp?alt=media&token=87d2c18c-183e-4b8c-8b81-8b42356cb1a9"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2100.webp?alt=media&token=f431d409-563b-4caa-8795-49e408d5083c",
    "description": "Anillo con el número 13 en frente y de forma cuadrada",
    "status": 1,
    "name": "Anillo 13",
    "createdAt": null
  },
  {
    "id": "RS3qq8FTRtM0NInBZlJp",
    "price": 17.5,
    "images": [
      "%2Frings%2Frock%2Fserpiente%20enrollada%201.webp?alt=media&token=1ee6bcb2-8175-4ce3-ad8d-ecf462f4ddb2",
      "%2Frings%2Frock%2Fserpiente%20enrollada%202.webp?alt=media&token=2b045a1e-acec-4c3e-bd6b-8095028042ce"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2120.webp?alt=media&token=fa05fefc-6084-4090-b5b4-08f2149a4d12",
    "mainSku": "ANI-2120",
    "waLink": "anillo%20Serpiente%20enrollada",
    "updatedAt": 1753187705046,
    "variants": [
      {"color": "", "sku": "ANI-2120", "image": "%2Fskus%2FANI-2120.webp?alt=media&token=21ad8343-d1be-403e-87b7-fe94476007da", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "subcategory": 2,
    "discount": {"type": 1, "value": 3.6},
    "createdAt": null,
    "name": "Serpiente enrollada",
    "category": 0,
    "status": 1,
    "description": "Anillo con forma de serpiente enrollada alrededor del dedo"
  },
  {
    "id": "SczhQYdtBm3IUx0QuMzU",
    "price": 19.5,
    "category": 0,
    "waLink": "anillo%20Garras%20con%20gema%20azul",
    "mainSku": "ANI-2140",
    "updatedAt": 1753187720271,
    "name": "Garras con gema azul",
    "createdAt": null,
    "description": "Anillo con forma de garra sosteniendo una gema azul.",
    "images": [
      "%2Frings%2Frock%2FGarras%20con%20gema%20azul%203.webp?alt=media&token=5d3b6b0d-25d7-4772-8190-dec131c482cf",
      "%2Frings%2Frock%2FGarras%20con%20gema%20azul%204.webp?alt=media&token=7e41332b-45dc-452f-893b-bce14756415f"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-2140.webp?alt=media&token=65463817-e828-464c-a668-0109ee30665e",
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-2140", "image": "%2Fskus%2FANI-2140.webp?alt=media&token=dd3f1446-e205-4b11-9f35-7c9b6d2e562e", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "subcategory": 2
  },
  {
    "id": "e9Xo7nL0cW23rRA9dWiE",
    "description": "Anillo con figura del árbol Yggdrasil en dorado, el árbol de la vida de la mitología nórdica",
    "updatedAt": 1753187730830,
    "subcategory": 3,
    "name": "Árbol de la vida",
    "mainSku": "ANI-3010",
    "waLink": "anillo%20%C3%81rbol%20de%20la%20vida",
    "price": 19.9,
    "status": 1,
    "category": 0,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3010", "image": "%2Fskus%2FANI-3010.webp?alt=media&token=55bf4fb0-394c-4028-a68a-251f24aae71c", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "images": [
      "%2Frings%2Fviking%2F%C3%81rbol%20de%20la%20vida%201.webp?alt=media&token=195dd23d-e43c-497d-97e1-7c7014f4b247"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3010.webp?alt=media&token=24a2ea31-63ad-4964-a298-6dd103f69175"
  },
  {
    "id": "Gt6KQNDKUNEc6N7Xiafz",
    "mainSku": "ANI-3020",
    "name": "Vegvisir con hachas",
    "variants": [
      {"color": "yellow", "sku": "ANI-3021", "image": "%2Fskus%2FANI-3021.webp?alt=media&token=1c9f7d2d-b5b9-41db-b41e-03d9ee6a9baf", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3022", "image": "%2Fskus%2FANI-3022.webp?alt=media&token=bae5db6f-f9ac-4494-991d-fc0fe90e42d8", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "status": 1,
    "updatedAt": 1753187743758,
    "category": 0,
    "subcategory": 3,
    "description": "Anillo de vegvisir, adornado con hachas a los lados. Disponible en dorado y en plateado",
    "waLink": "anillo%20Vegvisir%20con%20hachas",
    "images": [
      "%2Frings%2Fviking%2FVegvisir%20con%20hachas%201.webp?alt=media&token=869679ce-7ba2-452f-b1e3-ebd18a149d91",
      "%2Frings%2Fviking%2FVegvisir%20con%20hachas%202.webp?alt=media&token=2998a3af-ed12-4ab9-9847-84887fb96067",
      "%2Frings%2Fviking%2FVegvisir%20con%20hachas%203.webp?alt=media&token=c9b85231-7f18-40c3-8938-aeaf8a0c3a75"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3020.webp?alt=media&token=cca4d7ec-1a57-4a62-adfd-524fbca281ee",
    "price": 17.5,
    "createdAt": null
  },
  {
    "id": "GJ1MdaoxklN6SBeurovH",
    "name": "Vikingo vegvisir",
    "variants": [
      {"color": "yellow", "sku": "ANI-3031", "image": "%2Fskus%2FANI-3031.webp?alt=media&token=fc142d4e-1d42-473d-9570-afd1321d0614", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3032", "image": "%2Fskus%2FANI-3032.webp?alt=media&token=7371ecce-98b0-4ee7-92a9-ad90be81fafe", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "category": 0,
    "price": 18.95,
    "images": [
      "%2Frings%2Fviking%2FVikingo%20vegvisir%201.webp?alt=media&token=bf12c510-adc7-4cb8-addd-7c8be44a15ef",
      "%2Frings%2Fviking%2FVikingo%20vegvisir%202.webp?alt=media&token=12cd5cc5-1abd-42b6-ae8e-e4bace4ebc92",
      "%2Frings%2Fviking%2FVikingo%20vegvisir%203.webp?alt=media&token=050ed277-73ca-42de-a956-d009c2718e2c"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3030.webp?alt=media&token=da2f05f9-072f-495e-b4c7-75393f3559c3",
    "createdAt": null,
    "subcategory": 3,
    "description": "Anillo redondo ajustado con vegvisir. Disponible en dorado y en plateado",
    "waLink": "anillo%20Vikingo%20vegvisir",
    "mainSku": "ANI-3030",
    "updatedAt": 1753187762799,
    "status": 1
  },
  {
    "id": "6WSqVl5H9sW5d3FozlIY",
    "description": "Anillo de runas nórdicas. Disponible en dorado y en plateado",
    "price": 18.9,
    "status": 1,
    "createdAt": null,
    "category": 0,
    "variants": [
      {"color": "yellow", "sku": "ANI-3041", "image": "%2Fskus%2FANI-3041.webp?alt=media&token=becf30fc-7764-48b8-a4b7-56d5cba8368b", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3042", "image": "%2Fskus%2FANI-3042.webp?alt=media&token=0e074bb8-43d5-4d4c-bdf4-6671592b7032", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "name": "Runas vikingas",
    "waLink": "anillo%20Runas%20vikingas",
    "images": [
      "%2Frings%2Fviking%2FRunas%20vikingas%201.webp?alt=media&token=4d0ac372-d9ee-4523-abf2-89061d3fc95d",
      "%2Frings%2Fviking%2FRunas%20vikingas%202.webp?alt=media&token=f00ab5b8-46d2-4ed4-96a9-08020cbd985c"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3040.webp?alt=media&token=9a3a9b39-c392-40fa-81a5-9eb0499dbcc3",
    "mainSku": "ANI-3040",
    "subcategory": 3,
    "updatedAt": 1753187780184
  },
  {
    "id": "42fIU8cvjdXEBSjcjnVy",
    "variants": [
      {"color": "", "sku": "ANI-3050", "image": "%2Fskus%2FANI-3050.webp?alt=media&token=a83c9950-e0b3-493d-8d11-1c64dfcf0174", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "images": [
      "%2Frings%2Fviking%2FCr%C3%A1neo%20de%20cuervo%201.webp?alt=media&token=efc6b70b-e904-4ca9-bc1b-7343260a610b",
      "%2Frings%2Fviking%2FCr%C3%A1neo%20de%20cuervo%202.webp?alt=media&token=4ce284b8-570f-46ee-bec4-83aca9c02454"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3050.webp?alt=media&token=000d7cc1-c304-4546-a423-4683c040265a",
    "mainSku": "ANI-3050",
    "category": 0,
    "status": 1,
    "createdAt": null,
    "subcategory": 3,
    "name": "Cráneo de cuervo",
    "updatedAt": 1753187794008,
    "waLink": "anillo%20Cr%C3%A1neo%20de%20cuervo",
    "price": 17.5,
    "description": "Anillo de cráneo de cuervo, adornado con un vegvisir en la frente",
    "numReviews": 0
  },
  {
    "id": "DrdyUqGNTx7MiHFaYJdV",
    "subcategory": 3,
    "images": [
      "%2Frings%2Fviking%2FLobo%20furioso%201.webp?alt=media&token=d5cf964f-ea21-40e7-8cef-0da72b574620",
      "%2Frings%2Fviking%2FLobo%20furioso%202.webp?alt=media&token=75473d04-a878-4886-bbeb-b93210bc8eaf"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3060.webp?alt=media&token=fa1497a6-955f-400f-9a84-97ee181a3469",
    "updatedAt": 1753187944624,
    "category": 0,
    "mainSku": "ANI-3060",
    "price": 18,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-3060", "image": "%2Fskus%2FANI-3060.webp?alt=media&token=734f70af-4928-4421-91dc-6ec93e638b5a", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "discount": {"type": 1, "value": 4.1},
    "createdAt": null,
    "name": "Lobo furioso",
    "description": "Anillo de lobo gruñendo",
    "waLink": "anillo%20Lobo%20furioso"
  },
  {
    "id": "06LwbLroHxIVtr351VO7",
    "price": 18,
    "status": 1,
    "discount": {"type": 1, "value": 4.1},
    "name": "Lobo extravagante",
    "images": [
      "%2Frings%2Fviking%2FLobo%20extravagante%201.webp?alt=media&token=2e0e2d2d-f714-49b5-8ada-760e2323ca40",
      "%2Frings%2Fviking%2FLobo%20extravagante%202.webp?alt=media&token=99e40e4d-f9d2-4ff7-ba61-47fbe1f7a01b"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3070.webp?alt=media&token=da5bbafc-35ec-4e9a-ac34-da02b26d93d1",
    "waLink": "anillo%20Lobo%20extravagante",
    "variants": [
      {"color": "", "sku": "ANI-3070", "image": "%2Fskus%2FANI-3070.webp?alt=media&token=8fa14c8d-512a-4db6-91e0-021ad2555f84", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "subcategory": 3,
    "description": "Anillo de lobo huargo, como el símbolo de la casa Stark de Juego de Tronos",
    "updatedAt": 1753187968080,
    "category": 0,
    "mainSku": "ANI-3070",
    "createdAt": null
  },
  {
    "id": "Tl6AvAKJFyZDzR9g0kVn",
    "subcategory": 3,
    "updatedAt": 1753187980400,
    "name": "Anillo lobo valknut",
    "status": 1,
    "mainSku": "ANI-3080",
    "waLink": "anillo%20Lobo%20valknut",
    "description": "Anillo adornado con un lobo y símbolo valknut en dorado",
    "images": [
      "%2Frings%2Fviking%2FAnillo%20lobo%20valknut%201.webp?alt=media&token=bfec0f14-236a-4803-99e3-c24d577e52f5",
      "%2Frings%2Fviking%2FAnillo%20lobo%20valknut%202.webp?alt=media&token=61a8793a-9aa2-4b20-815f-ccdd68e90ceb",
      "%2Frings%2Fviking%2FAnillo%20lobo%20valknut%203.webp?alt=media&token=33102d1d-3e1d-4cc0-845b-d486196826a0"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3080.webp?alt=media&token=aaf7aa7a-7072-4566-9cea-058d2dc0a318",
    "category": 0,
    "price": 17.9,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3080", "image": "%2Fskus%2FANI-3080.webp?alt=media&token=b4db0069-ad79-4d7b-9621-d370dda820d6", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
  },
  {
    "id": "hxBBWAWHHPfAlokL2dna",
    "subcategory": 3,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3101", "image": "%2Fskus%2FANI-3101.webp?alt=media&token=0b934910-5e3d-4272-aeba-e5046c1a7ac6", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "status": 1,
    "price": 17.5,
    "category": 0,
    "description": "Anillo adornado con el símbolo valknut en dorado",
    "name": "Anillo valknut",
    "waLink": "anillo%20Valknut",
    "mainSku": "ANI-3101",
    "updatedAt": 1753187993023,
    "images": [
      "%2Frings%2Fviking%2FAnillo%20valknut.webp?alt=media&token=5b21367a-74e9-4eba-926a-2c8dae1cf2d6"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3101.webp?alt=media&token=c12b57bd-52de-454d-8b48-b4537f52f780"
  },
  {
    "id": "B3fTJvc742g1vx3Lyybp",
    "images": [
      "%2Frings%2Fviking%2FTriqueta.webp?alt=media&token=3d328f38-d861-46c7-82ed-7d782ecefbc3"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3130.webp?alt=media&token=9544c4c0-678e-4f06-9def-1100fd50fc78",
    "category": 0,
    "price": 19,
    "updatedAt": 1753188040360,
    "status": 1,
    "name": "Triqueta",
    "mainSku": "ANI-3130",
    "discount": {"type": 1, "value": 4.1},
    "variants": [
      {"color": "", "sku": "ANI-3130", "image": "%2Fskus%2FANI-3130.webp?alt=media&token=57482796-fc4d-43fa-a1ca-ed4a996677e5", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "description": "Anillo circular adornado con triquetas a lo largo de su forma",
    "createdAt": null,
    "waLink": "anillo%20Triqueta",
    "subcategory": 3
  },
  {
    "id": "FVXUEhYRPn00B07VFQuA",
    "name": "Vegvisir refinado",
    "price": 20,
    "subcategory": 3,
    "images": [
      "%2Frings%2Fviking%2FVegvisir%20refinado.webp?alt=media&token=62da391b-f30d-4411-87db-136bec3c2c17"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3141.webp?alt=media&token=afe09475-32cd-47ec-addf-124f3eb24541",
    "waLink": "anillo%20Vegvisir%20refinado",
    "discount": {"type": 0, "value": 21},
    "description": "Anillo dorado, adornado con un vegvisir central",
    "updatedAt": 1753188068840,
    "status": 1,
    "mainSku": "ANI-3141",
    "createdAt": null,
    "category": 0,
    "variants": [
      {"color": "", "sku": "ANI-3141", "image": "%2Fskus%2FANI-3141.webp?alt=media&token=7269e887-36f7-4c7e-a5c7-5782bef2a953", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ]
  },
  {
    "id": "Yrn0PLDeMaddgHzppXTf",
    "category": 0,
    "createdAt": null,
    "subcategory": 3,
    "waLink": "anillo%20Runas%20con%20vegvisir",
    "status": 1,
    "mainSku": "ANI-3152",
    "updatedAt": 1753188125979,
    "name": "Runas con vegvisir",
    "description": "Anillo plateado de Vegvisir, adornado con runas nórdinas en el perímetro del vegvisir",
    "images": [
      "%2Frings%2Fviking%2FRunas%20con%20vegvisir%20(plateado)%201.webp?alt=media&token=aa3d308e-5d60-4f1e-991a-93efd3919d45",
      "%2Frings%2Fviking%2FRunas%20con%20vegvisir%20(plateado)%202.webp?alt=media&token=2f53f354-77e4-43ed-a7cb-638dde0da867"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3152.webp?alt=media&token=bc5ea67a-3734-4cd0-94e5-c2717268fb63",
    "price": 18.75,
    "variants": [
      {"color": "", "sku": "ANI-3152", "image": "%2Fskus%2FANI-3152.webp?alt=media&token=87a1bd6f-81bc-4171-b2d0-b4035aa8d424", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ]
  },
  {
    "id": "o7ixHDArNMUO40H66jbS",
    "description": "Anillo plateado de valknut dorado, adornado con runas nórdinas en el perímetro del valknut",
    "price": 19.9,
    "variants": [
      {"color": "", "sku": "ANI-3161", "image": "%2Fskus%2FANI-3161.webp?alt=media&token=d38f3115-e426-4773-8413-1f17691feee9", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188175241,
    "status": 1,
    "category": 0,
    "images": [
        "%2Frings%2Fviking%2FRunas%20con%20valknut%20(dorado)%201.webp?alt=media&token=c05f844f-0aad-4f92-93a5-98712fdca2b1",
        "%2Frings%2Fviking%2FRunas%20con%20valknut%20(dorado)%202.webp?alt=media&token=c7159649-7d29-473c-9df6-7ab8d2dd5e08"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3161.webp?alt=media&token=ebf6db91-e8ca-4636-a0bd-d7ce197aab1c",
    "subcategory": 3,
    "createdAt": null,
    "mainSku": "ANI-3161",
    "waLink": "anillo%20Runas%20con%20valknut",
    "name": "Runas con valknut"
  },
  {
    "id": "9oGTy4PXYNB1jcJC5pCf",
    "waLink": "anillo%20Martillo%20de%20Thor",
    "category": 0,
    "subcategory": 3,
    "name": "Anillo Martillo de Thor",
    "mainSku": "ANI-3170",
    "description": "Anillo con forma de martillo Thor",
    "updatedAt": 1753188186743,
    "status": 1,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3170", "image": "%2Fskus%2FANI-3170.webp?alt=media&token=0613d477-0c5f-491c-bbc2-eaefaddbec64", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "images": [
        "%2Frings%2Fviking%2FAnillo%20Martillo%20de%20Thor%201.webp?alt=media&token=aa44ff05-bd50-4179-a23e-c832577ed2c9",
        "%2Frings%2Fviking%2FAnillo%20Martillo%20de%20Thor%202.webp?alt=media&token=33b43cbe-5b4e-4cbb-a351-dbec06828b7a",
        "%2Frings%2Fviking%2FAnillo%20Martillo%20de%20Thor%203.webp?alt=media&token=1b12ea1f-567d-44c6-92ca-c73a0722fc51"
    ],
    "thumbnail": "%2Fthumbnails%2FANI-3170.webp?alt=media&token=4d65a374-6b70-467f-b88a-07fd1ed6123c",
    "price": 17.5
  },
  {
    "id": "Y4CIXqEzDlJEsSy1ohRQ",
    "category": 2,
    "updatedAt": 1753188207578,
    "images": [
        "%2Fbracelets%2Felegant%2FBrazalete%20elegante%20de%20runas%20vikingo%201.webp?alt=media&token=250d5874-7ac7-457c-9ee3-e43e5814d2a3",
        "%2Fbracelets%2Felegant%2FBrazalete%20elegante%20de%20runas%20vikingo%202.webp?alt=media&token=f0f4f272-2f6f-4f58-9336-62cf5886bffc",
        "%2Fbracelets%2Felegant%2FBrazalete%20elegante%20de%20runas%20vikingo%203.webp?alt=media&token=ee5d3f95-5679-43a0-b6bf-af72f1226989",
        "%2Fbracelets%2Felegant%2FBrazalete%20elegante%20de%20runas%20vikingo%204.webp?alt=media&token=ca02651f-3d7f-47d8-bae9-a899c18b30c3"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-0010.webp?alt=media&token=eda25fec-9f6b-4b4f-95ba-681ddea76866",
    "name": "Brazalete elegante de runas vikingo",
    "variants": [
      {"color": "yellow", "sku": "BRA-0011", "image": "%2Fskus%2FBRA-0011.webp?alt=media&token=f1f2963c-d624-42d9-8fc6-83134139e570", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "BRA-0012", "image": "%2Fskus%2FBRA-0012.webp?alt=media&token=c73222dd-910d-4721-858b-8b4217cfc857", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "black", "sku": "BRA-0013", "image": "%2Fskus%2FBRA-0013.webp?alt=media&token=4886437d-a973-42bd-8230-2d868efb75f3", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "waLink": "Brazalete%20elegante%20de%20runas%20vikingo",
    "price": 18.3,
    "mainSku": "BRA-0010",
    "subcategory": 0,
    "status": 1,
    "createdAt": null,
    "description": "Brazalete elegante minimalista, adornado con detalles de runas nórdicas. Disponible en dorado, plateado y negro"
  },
  {
    "id": "SdDuwKe4e1onlYGna1Vq",
    "name": "Pulsera piedra de ágata azul esmerilada",
    "status": 1,
    "mainSku": "BRA-0020",
    "price": 14.75,
    "category": 2,
    "description": "Pulsera de cuentas de ágata pulida esmerilada, con separadores y broche hechos de acero inoxidable",
    "waLink": "Pulsera%20piedra%20de%20ágata%20azul%20esmerilada",
    "images": [
      "%2Fbracelets%2Felegant%2FPulsera%20piedra%20de%20%C3%A1gata%20azul%20esmerilada%20-%200.webp?alt=media&token=3901942b-e551-441d-bf76-5427c29fddd4",
      "%2Fbracelets%2Felegant%2FPulsera%20piedra%20de%20%C3%A1gata%20azul%20esmerilada%20-%201.webp?alt=media&token=61d74aab-6986-4660-b394-c2fbc64af52e"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-0020.webp?alt=media&token=ea60cb22-9b2b-425c-b1c1-76aaa8126cff",
    "variants": [
      {"color": "", "sku": "BRA-0020", "image": "%2Fskus%2FBRA-0020.webp?alt=media&token=67c5824e-a440-4073-8b1f-6b38bed5e30d", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "subcategory": 0
  },
  {
    "id": "tPzTJwnS9KYZDw9HVHE6",
    "category": 2,
    "name": "Brazalete piedra de ojo de tigre",
    "updatedAt": 1753188240033,
    "waLink": "Brazalete%20piedra%20de%20ojo%20de%20tigre",
    "price": 15.75,
    "variants": [
      {"color": "", "sku": "BRA-0030", "image": "%2Fskus%2FBRA-0030.webp?alt=media&token=68e0007e-1efd-48b3-8c17-f9d2fbf536d6", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "mainSku": "BRA-0030",
    "subcategory": 0,
    "images": [
      "%2Fbracelets%2Felegant%2FBrazalete%20piedra%20de%20ojo%20de%20tigre%2001.webp?alt=media&token=eb20449a-b9b1-4506-93af-0bee5f8354fe",
      "%2Fbracelets%2Felegant%2FBrazalete%20piedra%20de%20ojo%20de%20tigre%2002.webp?alt=media&token=6f922ba1-c8bc-4f4d-be49-01bb2d55f950"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-0030.webp?alt=media&token=8c371d2b-6df8-401f-b12e-007ffdaa683a",
    "description": "Elegante brazalete hecho de cuentas de ojo de tigre amarillo, con deparadores y broche en acero inoxidable",
    "status": 1
  },
  {
    "id": "hEyMPh4dQFS65sgFzhb5",
    "price": 14.75,
    "category": 2,
    "images": [
      "%2Fbracelets%2Felegant%2FPulsera%20piedra%20volc%C3%A1nica%20-%200.webp?alt=media&token=db68bd84-0b31-48a8-848a-eeffee2a67dc",
      "%2Fbracelets%2Felegant%2FPulsera%20piedra%20volc%C3%A1nica%20-%201.webp?alt=media&token=9754a886-7b5e-4a60-acc4-c8b3bb987c95"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-0040.webp?alt=media&token=0f3256c0-7de4-469f-ade4-a3ec2b54a08d",
    "description": "Pulsera de cuentas de piedra volcánica, con separadores y broche de acero inoxidable",
    "mainSku": "BRA-0040",
    "subcategory": 0,
    "status": 1,
    "waLink": "Pulsera%20piedra%20volcánica",
    "name": "Pulsera piedra volcánica",
    "variants": [
      {"color": "", "sku": "BRA-0040", "image": "%2Fskus%2FBRA-0040.webp?alt=media&token=28bfe47d-b029-4acd-b9e2-4622c834b068", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ]
  },
  {
    "id": "hIg9tM1dsT1aL4TGM7Qu",
    "mainSku": "BRA-0050",
    "waLink": "Brazalete%20de%20cuero%20legítimo",
    "category": 2,
    "name": "Brazalete de cuero legítimo",
    "variants": [
      {"color": "black", "sku": "BRA-0051", "image": "%2Fskus%2FBRA-0051.webp?alt=media&token=4d81e9ba-21bf-4842-b319-d4d5f27c48e0", "stock": [
        {"name": "19mm", "quantity": 1},
        {"name": "21mm", "quantity": 1}
      ]},
      {"color": "brown", "sku": "BRA-0053", "image": "%2Fskus%2FBRA-0053.webp?alt=media&token=c306c503-cf7b-45f8-9b40-46beec1c599e", "stock": [
        {"name": "19mm", "quantity": 1},
        {"name": "21mm", "quantity": 0}
      ]}
    ],
    "description": "Brazalete de cuero legítimo con broche magnético en acero inoxidable. Disponible en colores marrón y negro. Disponibles en 19cm y 21cm.",
    "price": 17.5,
    "subcategory": 0,
    "status": 1,
    "images": [
      "%2Fbracelets%2Felegant%2FBrazalete%20de%20cuero%20leg%C3%ADtimo%20-%200.webp?alt=media&token=ea6f320d-455f-44b0-bec3-68543638862e",
      "%2Fbracelets%2Felegant%2FBrazalete%20de%20cuero%20leg%C3%ADtimo%20-%201.webp?alt=media&token=4b9ecdb3-ee1c-4afb-b0ec-c4cdc9450970",
      "%2Fbracelets%2Felegant%2FBrazalete%20de%20cuero%20leg%C3%ADtimo%20-%202.webp?alt=media&token=b0df4d98-391e-4e10-af73-44afe2336542"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-0050.webp?alt=media&token=676abbf2-9e88-4d27-907e-6c9d0763e64f"
  },
  {
    "id": "Hbojhb1uG5Qb3dXPXFAi",
    "images": [
      "%2Fbracelets%2Felegant%2FPulsera%20Twist%204mm%20-%200.webp?alt=media&token=82bec5d3-ccf8-468a-847d-8256350afae3",
      "%2Fbracelets%2Felegant%2FPulsera%20Twist%204mm%20-%201.webp?alt=media&token=87844455-2359-40c2-a49c-645642e3c58b",
      "%2Fbracelets%2Felegant%2FPulsera%20Twist%204mm%20-%202.webp?alt=media&token=0cdab8af-615c-4818-b81b-b1f07c2c3511",
      "%2Fbracelets%2Felegant%2FPulsera%20Twist%204mm%20-%203.webp?alt=media&token=07de7ead-8126-401d-b007-72334c94fa46"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-0060.webp?alt=media&token=c00d5333-0367-4d34-9abe-7c04b69e4245",
    "price": 12.5,
    "updatedAt": 1753188259752,
    "name": "Pulsera Twist 4mm",
    "description": "Pulsera de tejido retorcido, de acero inoxidable. Disponible en dorado y en plateado.",
    "status": 1,
    "category": 2,
    "variants": [
      {"color": "yellow", "sku": "BRA-0061", "image": "%2Fskus%2FBRA-0061.webp?alt=media&token=627fc107-6a6c-41bd-9d1d-604062f5d391", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "BRA-0062", "image": "%2Fskus%2FBRA-0062.webp?alt=media&token=914af05b-e322-4dc3-8816-d14222e2f84a", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "subcategory": 0,
    "mainSku": "BRA-0060",
    "waLink": "Pulsera%20Twist%204mm"
  },
  {
    "id": "lt7xYTsz7mewItnTyTcP",
    "images": [
      "%2Fbracelets%2Fmasonic%2FBrazalete%20de%20cuero%20y%20comp%C3%A1s%20mas%C3%B3nico.webp?alt=media&token=f831c01d-91d9-42f1-bfbe-87e6a879b38c"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-1010.webp?alt=media&token=2afe0666-8910-4a2a-a1f2-0a75f24d5d73",
    "mainSku": "BRA-1010",
    "variants": [
      {"color": "", "sku": "BRA-1010", "image": "%2Fskus%2FBRA-1010.webp?alt=media&token=cfde3178-e73d-4e7a-8b4e-cf66c12c197f", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 2,
    "status": 1,
    "createdAt": null,
    "subcategory": 1,
    "name": "Brazalete de cuero y compás masónico",
    "updatedAt": 1748353304238,
    "waLink": "Brazalete%20de%20cuero%20y%20comp%C3%A1s%20mas%C3%B3nico",
    "price": 19.75,
    "description": "Brazalete de escuadra masónica en acero inoxidable y correa de cuero negro genuino de calidad",
    "numReviews": 0
  },
  {
    "id": "mr0gjFK3FqWL4x3FtRCX",
    "mainSku": "BRA-3010",
    "variants": [
      {"color": "", "sku": "BRA-3010", "image": "%2Fskus%2FBRA-3010.webp?alt=media&token=ef6fc089-9c3c-44d5-9663-406abff0775b", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "%2Fbracelets%2Fviking%2FBrazalete%20vikingo.webp?alt=media&token=60626d03-7d22-42ed-b7ec-819464f5285e"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3010.webp?alt=media&token=8167b36c-bc73-4065-bf9b-e76bedc6aff0",
    "waLink": "brazalete%20vikingo",
    "category": 2,
    "price": 19.5,
    "subcategory": 3,
    "name": "Brazalete vikingo",
    "updatedAt": 1753571605979,
    "description": "Brazalete vikingo, inspirado en los antiguos brazaletes de lealtad entre reyes y súbditos en Escandinavia.",
    "status": 1,
    "createdAt": null
  },
  {
    "id": "tPmFuMI0tq0DbPRPzzXU",
    "subcategory": 3,
    "waLink": "Brazalete%20de%20cuero%20leg%C3%ADtimo%20y%20martillo%20de%20Thor",
    "description": "Brazalete con forma de martillo de Thor en acero inoxidable y correa de cuero negro genuino",
    "createdAt": null,
    "category": 2,
    "images": [
      "%2Fbracelets%2Fviking%2FBrazalete%20de%20cuero%20leg%C3%ADtimo%20y%20martillo%20de%20Thor%201.webp?alt=media&token=977e0a90-985d-403a-8b50-e06c710788fd",
      "%2Fbracelets%2Fviking%2FBrazalete%20de%20cuero%20leg%C3%ADtimo%20y%20martillo%20de%20Thor%202.webp?alt=media&token=d0f423c6-7f0c-4e95-8219-75834893d9ad"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3020.webp?alt=media&token=0f1a1a07-a72b-4bbf-969f-ef4d8803806b",
    "name": "Brazalete de cuero legítimo y martillo de Thor",
    "status": 1,
    "price": 27.7,
    "updatedAt": 1753188324152,
    "variants": [
      {"color": "", "sku": "BRA-3020", "image": "%2Fskus%2FBRA-3020.webp?alt=media&token=8c052920-fa34-44a7-b314-96f046ace9ac", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "mainSku": "BRA-3020"
  },
  {
    "id": "jncF8e6RxDO6D3UqTZ6S",
    "price": 17.95,
    "description": "Brazalete adornado con runas nórdicas",
    "createdAt": null,
    "status": 1,
    "category": 2,
    "updatedAt": 1753188340529,
    "subcategory": 3,
    "mainSku": "BRA-3030",
    "variants": [
      {"color": "", "sku": "BRA-3030", "image": "%2Fskus%2FBRA-3030.webp?alt=media&token=3b7f3b67-bae9-4c8f-866c-005d2c40056d", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "Brazalete%20vikingo%20de%20runas",
    "images": [
      "%2Fbracelets%2Fviking%2FBrazalete%20vikingo%20de%20runas%201.webp?alt=media&token=2e42b125-c66d-43b2-a06b-fac44d788f4b",
      "%2Fbracelets%2Fviking%2FBrazalete%20vikingo%20de%20runas%202.webp?alt=media&token=7c01f1eb-db7b-42fd-97ff-033e8e9f3497"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3030.webp?alt=media&token=fce666ad-6627-4fae-aef4-2d0610be80e3",
    "name": "Brazalete vikingo de runas"
  },
  {
    "id": "89EIfbVmtJrsdjBTHLVL",
    "updatedAt": 1753188355312,
    "status": 1,
    "description": "Brazalete de cadena grande, con cabezas de lobo y aro cerrojo",
    "category": 2,
    "subcategory": 3,
    "waLink": "Brazaletes%20vikingos%20de%20cadena%20grande%20plateada",
    "mainSku": "BRA-3040",
    "variants": [
      {"color": "", "sku": "BRA-3040", "image": "%2Fskus%2FBRA-3040.webp?alt=media&token=b13bb01c-fae5-4074-bd1d-61043441f76f", "stock": [
        {"name": "19cm", "quantity": 1},
        {"name": "21cm", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "price": 25.7,
    "images": [
      "%2Fbracelets%2Fviking%2Fcollar%20cadena%20grande%201.webp?alt=media&token=5dad32ee-65d2-4f0f-858f-b9af30b1376b",
      "%2Fbracelets%2Fviking%2Fcollar%20cadena%20grande%202.webp?alt=media&token=42a11734-8d0a-4046-be3b-4655303a9f1d"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3040.webp?alt=media&token=a8ef841a-ea41-49e0-9a57-4e97d4013fb1",
    "name": "Brazaletes vikingos de cadena grande plateada"
  },
  {
    "id": "4mnY8PIGa47OpwFZBntA",
    "description": "Brazalete con detalles en negro y plateado, y figura de valknut en el centro de la pieza",
    "images": [
      "%2Fbracelets%2Fviking%2FBrazalete%20s%C3%B3lido%20valknut%201.webp?alt=media&token=a3805e84-52f6-428f-92de-4c97e9196ae6",
      "%2Fbracelets%2Fviking%2FBrazalete%20s%C3%B3lido%20valknut%202.webp?alt=media&token=2a5c61c4-fe4d-4d3f-9821-903e97898fac"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3050.webp?alt=media&token=a00141bc-9aec-4220-a220-d87122fac400",
    "status": 1,
    "price": 17,
    "createdAt": null,
    "subcategory": 3,
    "name": "Brazalete sólido valknut",
    "updatedAt": 1746919932140,
    "waLink": "Brazalete%20s%C3%B3lido%20valknut",
    "category": 2,
    "mainSku": "BRA-3050",
    "variants": [
      {"color": "", "sku": "BRA-3050", "image": "%2Fskus%2FBRA-3050.webp?alt=media&token=f7a3cf33-a03a-4462-ba94-1c799499ba51", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "discount": {"type": 0, "value": 20}
  },
  {
    "id": "ZhcVI9vR9SSQfFhSMK9Z",
    "subcategory": 3,
    "images": [
      "%2Fbracelets%2Fviking%2FValknut%20minimalista%201.webp?alt=media&token=102e7401-827f-4e44-a8b8-6a4d892690ee",
      "%2Fbracelets%2Fviking%2FValknut%20minimalista%202.webp?alt=media&token=92ec80e0-4e99-4d45-859b-93065e32bc08"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3060.webp?alt=media&token=e30b3ae9-c279-4700-ad84-986c43290577",
    "category": 2,
    "mainSku": "BRA-3060",
    "variants": [
      {"color": "", "sku": "BRA-3060", "image": "%2Fskus%2FBRA-3060.webp?alt=media&token=e6c32a75-4fda-446a-9a63-db3bfbd59eac", "stock": [
        {"name": "70mm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "waLink": "brazalete%20Valknut%20minimalista",
    "updatedAt": 1752585346166,
    "description": "Brazalete plateado de diseño minimalista y elegante, con diseño ornamental y figura valknut en medio",
    "discount": {"type": 0, "value": 20},
    "price": 15,
    "status": 0,
    "name": "Valknut minimalista",
    "rating": 0
  },
  {
    "id": "3C1St7zHZ1Br0lOVFnCQ",
    "images": [
      "%2Fbracelets%2Fviking%2FMartillo%20de%20Thor%20dorado%201.webp?alt=media&token=503d589f-30e3-4ad1-821b-1ef144702195",
      "%2Fbracelets%2Fviking%2FMartillo%20de%20Thor%20dorado%202.webp?alt=media&token=a28fa0f6-5acb-4f13-a4c5-5f749e5de63b"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3071.webp?alt=media&token=296fb4b3-f684-4364-8478-3a6bd096d375",
    "category": 2,
    "name": "Martillo de Thor dorado",
    "createdAt": null,
    "mainSku": "BRA-3071",
    "variants": [
      {"color": "", "sku": "BRA-3071", "image": "%2Fskus%2FBRA-3071.webp?alt=media&token=f32114c2-bcdb-411a-9087-d1c1f122787b", "stock": [
        {"name": "70mm", "quantity": 2}
      ]}
    ],
    "waLink": "brazalete%20Martillo%20de%20Thor%20dorado",
    "description": "Brazalete con detalles en dorado de runas nórdicas, figura de martillo de Thor en el centro y ornamentos",
    "updatedAt": 1746935185554,
    "status": 1,
    "subcategory": 3,
    "price": 22.9
  },
  {
    "id": "ZZgmLF02JYFdg7eQSPFK",
    "waLink": "Brazalete%20minimalista%20de%20cuero",
    "variants": [
      {"color": "brown", "sku": "BRA-3081", "image": "%2Fskus%2FBRA-3081.webp?alt=media&token=b5f817b7-fca4-4fcd-8c3e-67cf51348664", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "black", "sku": "BRA-3082", "image": "%2Fskus%2FBRA-3082.webp?alt=media&token=48a46d50-7045-4117-afb7-6b3d54b32795", "stock": [
        {"name": "70mm", "quantity": 0}
      ]}
    ],
    "updatedAt": 1753188402146,
    "createdAt": null,
    "price": 16.5,
    "images": [
      "%2Fbracelets%2Felegant%2Fbrazalete%20cuero%20elegante%201.webp?alt=media&token=906e730a-a5d5-441b-a929-b3a16dc6c39a",
      "%2Fbracelets%2Felegant%2Fbrazalete%20cuero%20elegante%202.webp?alt=media&token=16eae902-7dc5-4c9c-ac08-1e89f9c206b3",
      "%2Fbracelets%2Felegant%2Fbrazalete%20cuero%20elegante%203.webp?alt=media&token=21ad1304-e7bb-4857-b314-9cef4d1575bd",
      "%2Fbracelets%2Felegant%2Fbrazalete%20cuero%20elegante%204.webp?alt=media&token=a28d3b92-0902-4c7c-9bf3-b760fc6b1c78"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3080.webp?alt=media&token=d8a74eee-bfec-4c34-804e-98897af37aa2",
    "subcategory": 3,
    "description": "Brazalete de diseño minimalista de cuero genuino. Disponible en marrón y en negro",
    "mainSku": "BRA-3080",
    "category": 2,
    "status": 1,
    "name": "Brazalete minimalista de cuero"
  },
  {
    "id": "RM6r5EfVGZWkjr7tKMDW",
    "status": 0,
    "price": 23,
    "category": 2,
    "name": "Brazalete vikingo rústico",
    "mainSku": "BRA-3090",
    "variants": [
      {"color": "", "sku": "BRA-3090", "image": "%2Fskus%2FBRA-3090.webp?alt=media&token=f6d7c0ff-5461-4398-9baa-0590feabe7c9", "stock": [
        {"name": "70mm", "quantity": 0}
      ]}
    ],
    "updatedAt": null,
    "images": [
      "%2Fbracelets%2Fviking%2FBrazalete%20vikingo%20r%C3%BAstico.webp?alt=media&token=e7bd555f-a592-4d9d-8fa3-dddcf34d1487"
    ],
    "thumbnail": "%2Fthumbnails%2FBRA-3090.webp?alt=media&token=f2571aca-b48e-40bf-9f14-fe4863e81e52",
    "subcategory": 3,
    "createdAt": null,
    "description": "Brazalete vikingo en tono gris, con detalles ornamentales",
    "waLink": "Brazalete%20vikingo%20r%C3%BAstico"
  },
  {
    "id": "SsAa3ZIXy1IcSHFBynRK",
    "category": 1,
    "subcategory": 0,
    "price": 18.5,
    "status": 1,
    "name": "Collar de ancla",
    "images": [
      "%2Fnecklaces%2Felegant%2FCollar%20de%20ancla%201.webp?alt=media&token=319f0224-f580-474b-90bb-cb454a37dc37",
      "%2Fnecklaces%2Felegant%2FCollar%20de%20ancla%202.webp?alt=media&token=e6756eb1-ec57-4abb-9f66-d65644410337",
      "%2Fnecklaces%2Felegant%2FCollar%20de%20ancla%203.webp?alt=media&token=f1de959d-8f40-4f85-ae76-55ef603acd23"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0010.webp?alt=media&token=963bbd29-36d8-4f4e-a7c8-398769355562",
    "mainSku": "COL-0010",
    "variants": [
      {"color": "gray", "sku": "COL-0010", "image": "%2Fskus%2FCOL-0010.webp?alt=media&token=fae2c222-a054-4b50-bff8-8536eed164bf", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "yellow", "sku": "COL-0011", "image": "%2Fskus%2FCOL-0011.webp?alt=media&token=46b502d1-24cd-40af-9eee-f79e0f1de0b1", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "waLink": "collar%20de%20ancla",
    "description": "Elegante collar de ancla",
    "updatedAt": 1753188420713,
    "createdAt": null
  },
  {
    "id": "bETgBEKcqbX21expxttE",
    "variants": [
      {"color": "yellow", "sku": "COL-0021", "image": "%2Fskus%2FCOL-0021.webp?alt=media&token=3d6abdb2-c9a3-4c7a-b500-3b6a6d610111", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0022", "image": "%2Fskus%2FCOL-0022.webp?alt=media&token=475ac63e-0752-4934-83ec-6d9cd1e82ce7", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "black", "sku": "COL-0023", "image": "%2Fskus%2FCOL-0023.webp?alt=media&token=d64001d2-6635-4440-b50c-3693a4174cda", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "updatedAt": 1748353369209,
    "price": 13.5,
    "images": [
      "%2Fnecklaces%2Felegant%2FLobo%20minimalista%201.webp?alt=media&token=7c5ffa99-2877-4f9a-8956-3ee829ec7c78",
      "%2Fnecklaces%2Felegant%2FLobo%20minimalista%202.webp?alt=media&token=06b390af-2f37-47ac-9fd0-0620f02dfc9c",
      "%2Fnecklaces%2Felegant%2FLobo%20minimalista%203.webp?alt=media&token=5bba9346-7944-4c45-86bf-2fcada6d8f8f"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0020.webp?alt=media&token=0757bc1e-cd75-44b5-b460-0f58f9e2de03",
    "waLink": "collar%20Lobo%20minimalista",
    "createdAt": null,
    "status": 0,
    "description": "Collar elegante y minimalista de lobo. Disponible en dorado, plateado y negro",
    "name": "Lobo minimalista",
    "category": 1,
    "subcategory": 0,
    "discount": {"type": 0, "value": 20},
    "mainSku": "COL-0020"
  },
  {
    "id": "rIWtdThGd2JHsKD3yVkk",
    "subcategory": 0,
    "price": 14.75,
    "description": "Collar elegante y minimalista con forma de estrella de David. Disponible en dorado, plateado y negro",
    "status": 1,
    "updatedAt": 1746917894921,
    "mainSku": "COL-0030",
    "createdAt": null,
    "variants": [
      {"color": "yellow", "sku": "COL-0031", "image": "%2Fskus%2FCOL-0031.webp?alt=media&token=6a5b49a1-c525-40d9-bae0-d40572327ec7", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0032", "image": "%2Fskus%2FCOL-0032.webp?alt=media&token=a3471ca7-3eaf-4946-b850-e1df1088dd43", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0033", "image": "%2Fskus%2FCOL-0033.webp?alt=media&token=a0bbd17b-fbc2-4020-bb75-9fa1b18f5279", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "name": "Estrella de David",
    "waLink": "collar%20Estrella%20de%20David",
    "images": [
      "%2Fnecklaces%2Felegant%2FEstrella%20de%20David%201.webp?alt=media&token=e29ccaba-ba8c-4a7b-86ec-ac06346c4c51",
      "%2Fnecklaces%2Felegant%2FEstrella%20de%20David%202.webp?alt=media&token=ed2dfaff-0258-4db0-b341-6c53600e3eb2",
      "%2Fnecklaces%2Felegant%2FEstrella%20de%20David%203.webp?alt=media&token=c44b9863-af38-44b8-a93e-72a6eab85cef"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0030.webp?alt=media&token=b508f5d8-6d06-4961-ace7-1ff096fcef88",
    "rating": 0
  },
  {
    "id": "4dypTVvKadKoyt5XsWx1",
    "mainSku": "COL-0040",
    "category": 1,
    "variants": [
      {"color": "gray", "sku": "COL-0041", "image": "%2Fskus%2FCOL-0041.webp?alt=media&token=ac271ce2-baeb-45c0-bbac-6b80c0c2da45", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0042", "image": "%2Fskus%2FCOL-0042.webp?alt=media&token=567ddd87-963b-4bb2-bcf6-596d9da666bb", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "subcategory": 0,
    "name": "Collares geométricos",
    "price": 16,
    "waLink": "Collares%20geom%C3%A9tricos",
    "images": [
      "%2Fnecklaces%2Felegant%2FCOL-0040-1.webp?alt=media&token=023520fb-1d7b-4986-95af-62e0f292301c",
      "%2Fnecklaces%2Felegant%2FCOL-0040-2.webp?alt=media&token=fe103fb8-1c4e-493f-b441-1619ceb1db0e",
      "%2Fnecklaces%2Felegant%2FCOL-0040-3.webp?alt=media&token=99623fd7-1797-44dd-93a9-5441c477a71f",
      "%2Fnecklaces%2Felegant%2FCOL-0040-4.webp?alt=media&token=058b75bd-b6df-41e7-8a73-5aff3f4137bf"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0040.webp?alt=media&token=fc32da86-249e-4ce2-980d-e75559328bf6",
    "createdAt": null,
    "status": 1,
    "updatedAt": 1753188456649,
    "discount": {"type": 1, "value": 3.6},
    "description": "Collares triangulares minimalistas. Disponibles en plateado y en negro",
    "rating": 0
  },
  {
    "id": "hXFm0WTbGengDl7F1Cwf",
    "mainSku": "COL-0050",
    "discount": {"type": 0, "value": 21},
    "name": "León rey",
    "price": 15,
    "status": 1,
    "images": [
      "%2Fnecklaces%2Felegant%2FLe%C3%B3n%20rey%201.webp?alt=media&token=5502c2ea-0641-4de5-93a8-56d89dde2105",
      "%2Fnecklaces%2Felegant%2FLe%C3%B3n%20rey%202.webp?alt=media&token=6a5be6ca-746e-40da-917c-44f6161217db",
      "%2Fnecklaces%2Felegant%2FLe%C3%B3n%20rey%203.webp?alt=media&token=cd83d079-5b54-420a-b478-1adbf9e76a3a",
      "%2Fnecklaces%2Felegant%2FLe%C3%B3n%20rey%204.webp?alt=media&token=a6aa621c-2286-4d77-972e-87f7dc6a190e",
      "%2Fnecklaces%2Felegant%2FLe%C3%B3n%20rey%205.webp?alt=media&token=71a5db74-3de4-47ac-8afa-9b6c5a3004d8",
      "%2Fnecklaces%2Felegant%2FLe%C3%B3n%20rey%206.webp?alt=media&token=f01dc0d0-2af3-4daa-8051-6a0777a10a71"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0050.webp?alt=media&token=4f172b4d-f688-444c-a2d2-8a894133cafe",
    "waLink": "collar%20Le%C3%B3n%20rey",
    "createdAt": null,
    "subcategory": 0,
    "description": "Collar minimalista elegante con forma de rey con corona. Disponible en dorado, plateado o negro",
    "updatedAt": 1753188484168,
    "variants": [
      {"color": "yellow", "sku": "COL-0051", "image": "%2Fskus%2FCOL-0051.webp?alt=media&token=361f7b8c-da49-428d-9b2e-2a3d0aa8eeff", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0052", "image": "%2Fskus%2FCOL-0052.webp?alt=media&token=7cd6135e-2094-4675-8758-30cacd218cda", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0053", "image": "%2Fskus%2FCOL-0053.webp?alt=media&token=787e476e-56a5-4b8e-8d92-b0dc475a31d8", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "category": 1
  },
  {
    "id": "EQFwoYpUN9y2MdN7cab6",
    "updatedAt": 1753188497737,
    "waLink": "collar%20Br%C3%BAjula",
    "status": 1,
    "mainSku": "COL-0060",
    "variants": [
      {"color": "", "sku": "COL-0060", "image": "%2Fskus%2FCOL-0060.webp?alt=media&token=34663b47-6427-4580-8b45-cdb8e4ce12cb", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 18.95,
    "description": "Collar elegante con forma de brújula dorada",
    "createdAt": null,
    "images": [
      "%2Fnecklaces%2Felegant%2FBr%C3%BAjula%201.webp?alt=media&token=4ad03ce0-1376-43fb-bd41-eae935319cd9",
      "%2Fnecklaces%2Felegant%2FBr%C3%BAjula%202.webp?alt=media&token=bec2723d-11ee-4860-943a-f99f86177d32"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0060.webp?alt=media&token=9664a4f1-3000-4f61-97c8-d0ea15d7d6be",
    "category": 1,
    "name": "Collar Brújula",
    "subcategory": 0,
    "numReviews": 0
  },
  {
    "id": "92Wa2rgNvv78BwVK1e2H",
    "createdAt": null,
    "updatedAt": 1753188533977,
    "price": 21,
    "description": "Medalla de cruz, con cruz independiente en dorado. disponible en plateado y en negro",
    "subcategory": 0,
    "mainSku": "COL-0070",
    "name": "Medalla con cruz",
    "status": 1,
    "waLink": "collar%20Medalla%20con%20cruz",
    "variants": [
      {"color": "gray", "sku": "COL-0071", "image": "%2Fskus%2FCOL-0071.webp?alt=media&token=0b4df62a-fa9b-4068-8a95-acdd9b21cb6a", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "black", "sku": "COL-0072", "image": "%2Fskus%2FCOL-0072.webp?alt=media&token=819001af-c480-4476-9583-8ca3c95fb86c", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "category": 1,
    "discount": {"type": 1, "value": 4.6},
    "images": [
      "%2Fnecklaces%2Felegant%2FMedalla%20con%20cruz%201.webp?alt=media&token=c75ea8bf-e578-4078-84b0-b902c7aec231",
      "%2Fnecklaces%2Felegant%2FMedalla%20con%20cruz%202.webp?alt=media&token=ca1bc31b-af62-412d-90f6-b87c895419d9",
      "%2Fnecklaces%2Felegant%2FMedalla%20con%20cruz%203.webp?alt=media&token=0b4c6570-b20f-4bbd-bab0-f21d5648d9ea",
      "%2Fnecklaces%2Felegant%2FMedalla%20con%20cruz%204.webp?alt=media&token=dad89673-113f-4099-9198-33e3a8b5ebcb"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0070.webp?alt=media&token=6c8ebe0f-0b95-409d-9c57-128176e71336"
  },
  {
    "id": "nX5rcPoMRndeJavmBzjl",
    "images": [
      "%2Fnecklaces%2Felegant%2FMedallon%20Filipenses.webp?alt=media&token=c979cb6e-6a7f-4ab0-a172-6ae6679f0a84"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0080.webp?alt=media&token=0a3bbdab-da0e-4bd1-badd-918312722151",
    "discount": {"type": 1, "value": 4.05},
    "subcategory": 0,
    "category": 1,
    "updatedAt": 1753188556521,
    "createdAt": null,
    "price": 19,
    "status": 1,
    "waLink": "collar%20Medallon%20Filipenses",
    "mainSku": "COL-0080",
    "variants": [
      {"color": "", "sku": "COL-0080", "image": "%2Fskus%2FCOL-0080.webp?alt=media&token=01658689-13b8-4c0d-bfee-b26a549a35d8", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "description": "Collar de medallón negro con cita de Filipenses 4:13",
    "name": "Medallon Filipenses"
  },
  {
    "id": "ppS8WClWJW6f2O2pznbY",
    "subcategory": 0,
    "category": 1,
    "description": "Collar con dije que contiene la oración del Padre nuestro",
    "status": 1,
    "name": "Padre nuestro",
    "waLink": "collar%20Padre%20nuestro",
    "createdAt": null,
    "price": 16,
    "discount": {"type": 1, "value": 3.3},
    "updatedAt": 1753188585337,
    "mainSku": "COL-0090",
    "variants": [
      {"color": "", "sku": "COL-0090", "image": "%2Fskus%2FCOL-0090.webp?alt=media&token=6a519d85-3fbe-49a2-bbd4-78d0e31914a9", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "%2Fnecklaces%2Felegant%2FPadre%20nuestro%201.webp?alt=media&token=ec0eabba-3732-46b5-9226-2974012d261e",
      "%2Fnecklaces%2Felegant%2FPadre%20nuestro%202.webp?alt=media&token=7e275f9c-382b-4452-80f0-a0624f96c586"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0090.webp?alt=media&token=683c3269-0c7f-4e10-9357-c85fe3ab1d02"
  },
  {
    "id": "LA91hlO3nycsK8uKGMb3",
    "name": "Cruz con cadena",
    "status": 1,
    "category": 1,
    "description": "Collar doble de dije de cruz y collar sencillo y elegante",
    "subcategory": 0,
    "images": [
      "%2Fnecklaces%2Felegant%2FCruz%20con%20cadena%201.webp?alt=media&token=efc23652-d745-488d-9639-161ef84f6e88",
      "%2Fnecklaces%2Felegant%2FCruz%20con%20cadena%202.webp?alt=media&token=a0b1a8ff-5312-4ebf-abd3-1eac9aaa6206",
      "%2Fnecklaces%2Felegant%2FCruz%20con%20cadena%203.webp?alt=media&token=9efc6688-2177-4cdf-a993-7d0841930012"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0100.webp?alt=media&token=77b70b52-fb40-40d9-bd54-24c8adf1c05d",
    "discount": {"type": 1, "value": 4.6},
    "variants": [
      {"color": "yellow", "sku": "COL-0101", "image": "%2Fskus%2FCOL-0101.webp?alt=media&token=616e200d-2022-4df4-885d-c5bba7fac792", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0102", "image": "%2Fskus%2FCOL-0102.webp?alt=media&token=ad8f921b-18fb-4972-8481-d19888dbdf9b", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "waLink": "collar%20Cruz%20con%20cadena",
    "price": 21,
    "updatedAt": 1753188608113,
    "createdAt": null,
    "mainSku": "COL-0100"
  },
  {
    "id": "5cPehiyRPX0WGaEc4r0N",
    "variants": [
      {"color": "yellow", "sku": "COL-0111", "image": "%2Fskus%2FCOL-0111.webp?alt=media&token=a96f4c3d-894e-4f9b-8cda-9044052b9f5d", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0112", "image": "%2Fskus%2FCOL-0112.webp?alt=media&token=28853ebd-1cd1-4474-a879-cb2f48929f64", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188633401,
    "price": 20,
    "images": [
      "%2Fnecklaces%2Felegant%2FMedalla%20de%20cruz%201.webp?alt=media&token=1c097983-18ce-4134-a899-4f5ab25f3879",
      "%2Fnecklaces%2Felegant%2FMedalla%20de%20cruz%202.webp?alt=media&token=ef00f2ca-aa33-4a04-bbe1-177d62f07a3e"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0110.webp?alt=media&token=23089f0f-3787-453a-93bd-707f4e733f3d",
    "waLink": "collar%20Medalla%20de%20cruz",
    "createdAt": null,
    "status": 1,
    "description": "Collar de medalla con cruz dorada, adornado con zircones. Disponible en dorado y en plateado",
    "name": "Medalla de cruz",
    "category": 1,
    "subcategory": 0,
    "discount": {"type": 0, "value": 22},
    "mainSku": "COL-0110"
  },
  {
    "id": "lj0QhaNDQ1LuY1TyO4Qm",
    "name": "Lanza tibetana",
    "status": 0,
    "updatedAt": 1753188667105,
    "waLink": "collar%20Lanza%20tibetana",
    "price": 18.5,
    "subcategory": 0,
    "images": [
      "%2Fnecklaces%2Felegant%2FLanza%20tibetana%201.webp?alt=media&token=28902ea3-b6af-49c5-9223-1fa6bf37bfad",
      "%2Fnecklaces%2Felegant%2FLanza%20tibetana%202.webp?alt=media&token=f6d5e656-b3d5-400c-8c37-9c8e6c97e938"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0120.webp?alt=media&token=fe4dbfaa-3f06-4166-ab2c-8b93006bf58c",
    "createdAt": null,
    "description": "Collar con dije en forma de lanza de guerra tibetana",
    "category": 1,
    "mainSku": "COL-0120",
    "variants": [
      {"color": "", "sku": "COL-0120", "image": "%2Fskus%2FCOL-0120.webp?alt=media&token=e1c108ac-1013-4188-b1ad-3c69692efbcd", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ]
  },
  {
    "id": "EQFnOixZarCldkmZ9ZKH",
    "name": "Piedra y cuentas negras",
    "images": [
      "%2Fnecklaces%2Felegant%2FPiedra%20y%20cuentas%20negras%201.webp?alt=media&token=87ca3aca-7ff7-4ad8-bf47-9d94d33b869b",
      "%2Fnecklaces%2Felegant%2FPiedra%20y%20cuentas%20negras%202.webp?alt=media&token=76f0df68-7b57-4b72-9530-88c8ca0b30db"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0130.webp?alt=media&token=863d24f5-d562-43b8-be52-78f193eba5a3",
    "category": 1,
    "price": 20,
    "subcategory": 0,
    "discount": {"type": 0, "value": 22},
    "mainSku": "COL-0130",
    "variants": [
      {"color": "", "sku": "COL-0130", "image": "%2Fskus%2FCOL-0130.webp?alt=media&token=41647720-313a-4044-8da2-ac14f9fccd1c", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "updatedAt": 1753188687233,
    "status": 0,
    "description": "Elegante collar adornado con piedras y cuentas negras",
    "waLink": "collar%20Piedra%20y%20cuentas%20negras",
    "numReviews": 0
  },
  {
    "id": "WEjc5zClsv8v1oSAJrGI",
    "name": "Amuleto ojo de Horus",
    "updatedAt": 1753188717792,
    "waLink": "collar%20Amuleto%20ojo%20de%20Horus",
    "variants": [
      {"color": "yellow", "sku": "COL-0141", "image": "%2Fskus%2FCOL-0141.webp?alt=media&token=6d96aee3-cfab-41f8-872c-10d2789b1f70", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0142", "image": "%2Fskus%2FCOL-0142.webp?alt=media&token=dcf7f240-10a3-4c0c-a212-80bffdc5e01a", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "discount": {"type": 1, "value": 6.3},
    "images": [
      "%2Fnecklaces%2Felegant%2FAmuleto%20ojo%20de%20Horus%201.webp?alt=media&token=dfd23022-8869-48e8-88c5-9ccfcd752c80",
      "%2Fnecklaces%2Felegant%2FAmuleto%20ojo%20de%20Horus%202.webp?alt=media&token=7b01c4d0-82b2-4e28-9fde-3e181633a546",
      "%2Fnecklaces%2Felegant%2FAmuleto%20ojo%20de%20Horus%203.webp?alt=media&token=20ee4e19-eb00-4b51-b0c5-08996db29d79"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0140.webp?alt=media&token=7c556965-ef6a-4353-9ceb-b410c9d0af8b",
    "description": "Collar elegante de dije compuesto por un medallon con el ojo de Horus, y una pirámide dorado o plateada",
    "mainSku": "COL-0140",
    "subcategory": 0,
    "price": 26,
    "category": 1,
    "createdAt": null,
    "status": 1
  },
  {
    "id": "A8i52ywdgNkOpGYZ0lLx",
    "description": "Medallon de cruz conmemorativa de San Benito de Nursia.",
    "subcategory": 0,
    "images": [
      "%2Fnecklaces%2Felegant%2FCOL-0150.webp?alt=media&token=d1c5889b-c543-446e-9e39-e67cd1f9e7dc",
      "%2Fnecklaces%2Felegant%2FMedall%C3%B3n%20San%20Benito%20dorado.webp?alt=media&token=212bd24e-d08f-4128-8184-06c132d64b54",
      "%2Fnecklaces%2Felegant%2FMedall%C3%B3n%20San%20Benito%20mixto.webp?alt=media&token=2266ae0b-6f83-43b2-8d0c-d08befdd1d51",
      "%2Fnecklaces%2Felegant%2FMedall%C3%B3n%20San%20Benito%20plateado.webp?alt=media&token=2f987a27-7fb5-4a16-93db-995d13070a52"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0150.webp?alt=media&token=075f17bd-c0dd-4041-814b-db17a020ec04",
    "name": "Medallón San Benito",
    "updatedAt": 1753571810150,
    "waLink": "Medallón%20San%20Benito",
    "status": 1,
    "mainSku": "COL-0150",
    "variants": [
      {"color": "yellow", "sku": "COL-0151", "image": "%2Fskus%2FCOL-0151.webp?alt=media&token=b318395c-2b77-4d00-ab5a-b94a307cf723", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-0152", "image": "%2Fskus%2FCOL-0152.webp?alt=media&token=25460de1-8699-4fe8-9e54-5f1c499e9a12", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "orange", "sku": "COL-0153", "image": "%2Fskus%2FCOL-0153.webp?alt=media&token=b713d530-18dd-4118-b0d7-3b866b00a27e", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "category": 1,
    "price": 19.5
  },
  {
    "id": "AbLyjhJlJQC2Xoac7Yb7",
    "price": 12.5,
    "updatedAt": 1746917685171,
    "images": [
      "%2Fnecklaces%2Felegant%2FCOL-0160.webp?alt=media&token=b3f5d0e8-8da2-4260-8d80-c1a4496959eb",
      "%2Fnecklaces%2Felegant%2FCOL-0160%202.webp?alt=media&token=f299f55d-af87-4a0a-bb53-78a59a39dcd8"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-0160.webp?alt=media&token=8bc6e540-f493-4e6e-b74a-bcb95b615141",
    "category": 1,
    "description": "Medalla conmemorativa de San Benito de Nursia, con cruz en una cara e imagen de Benito de Nursia en la otra cara",
    "status": 0,
    "waLink": "Medalla%20San%20Benito%20dos%20caras",
    "mainSku": "COL-0160",
    "variants": [
      {"color": "yellow", "sku": "COL-0161", "image": "%2Fskus%2FCOL-0161.webp?alt=media&token=2e081a6e-d0b7-4c77-aad2-9d8017efd73c", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0162", "image": "%2Fskus%2FCOL-0162.webp?alt=media&token=6edd56a2-faa9-4ed1-9ae8-733ae2b3f837", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "name": "Medalla San Benito dos caras",
    "subcategory": 0
  },
  {
    "id": "2TSCKFGjAkpA6AAzDMbA",
    "updatedAt": 1753188787187,
    "variants": [
      {"color": "gray", "sku": "COL-1011", "image": "%2Fskus%2FCOL-1011.webp?alt=media&token=ba3856fd-9854-4c92-8781-f879c3dfb3f6", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "yellow", "sku": "COL-1012", "image": "%2Fskus%2FCOL-1012.webp?alt=media&token=7eeb51e3-6ec7-4a84-8fd4-beb9565a1520", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "createdAt": null,
    "status": 1,
    "images": [
      "%2Fnecklaces%2Fmasonic%2FMas%C3%B3nico%201.webp?alt=media&token=4d8c5008-f8c4-41d3-b0ef-783f8f64ee64",
      "%2Fnecklaces%2Fmasonic%2FMas%C3%B3nico%202.webp?alt=media&token=14360766-c48d-40b3-ad9a-bd37e7f0f811",
      "%2Fnecklaces%2Fmasonic%2FMas%C3%B3nico%203.webp?alt=media&token=6b09fde3-ff60-4b5b-b34b-7802b97071cd"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-1010.webp?alt=media&token=12fd9f02-e5b4-414b-a0c5-20797d7391b0",
    "mainSku": "COL-1010",
    "category": 1,
    "description": "Collar de escuadra masónica. Disponible en dorado y en plateado",
    "waLink": "collar%20Masónico",
    "subcategory": 1,
    "name": "Masónico",
    "price": 20.5,
    "numReviews": 0
  },
  {
    "id": "aAsSAStfGp5Vuobr4t5R",
    "updatedAt": 1753188797762,
    "images": [
      "%2Fnecklaces%2Fmasonic%2FCruz%20templaria%201.webp?alt=media&token=7e599655-9cfe-4373-8c21-1a2dea5c8a8f",
      "%2Fnecklaces%2Fmasonic%2FCruz%20templaria%202.webp?alt=media&token=5fd2ddf8-45c2-484e-8912-bef9f14502ae",
      "%2Fnecklaces%2Fmasonic%2FCruz%20templaria%203.webp?alt=media&token=4b08814d-137e-4194-a92a-b88c31d769fa",
      "%2Fnecklaces%2Fmasonic%2FCruz%20templaria%204.webp?alt=media&token=dcfe1811-0c67-42ee-a3f5-e27fb963b395"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-1020.webp?alt=media&token=5466babd-be91-48b1-9c94-d7532158aa49",
    "mainSku": "COL-1020",
    "variants": [
      {"color": "", "sku": "COL-1020", "image": "%2Fskus%2FCOL-1020.webp?alt=media&token=5402843b-4c7c-4010-b935-1518d29aaa19", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "status": 1,
    "description": "Collar con dije de cruz adornada con símbolos templarios",
    "waLink": "collar%20Cruz%20templaria",
    "subcategory": 1,
    "name": "Cruz templaria",
    "category": 1,
    "price": 18.5,
    "numReviews": 0
  },
  {
    "id": "ESPRHdeInqKnRgdP5fWI",
    "category": 1,
    "waLink": "collar%20Medall%C3%B3n%20templario",
    "subcategory": 1,
    "createdAt": null,
    "updatedAt": 1753188810305,
    "description": "Collar de medallón adornado con un guerrero templario",
    "price": 18.5,
    "images": [
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20templario%201.webp?alt=media&token=0bad6b6a-ec91-4950-b11b-9aa8389ce87a",
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20templario%202.webp?alt=media&token=08c88854-8c7c-46a2-be87-fe6d8c7024cb"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-1030.webp?alt=media&token=4124031a-e554-4927-9863-04e8f0e641ac",
    "mainSku": "COL-1030",
    "variants": [
      {"color": "", "sku": "COL-1030", "image": "%2Fskus%2FCOL-1030.webp?alt=media&token=aa8c541e-bee1-46b6-ab1d-9f8e69c18ef3", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "name": "Medallón templario"
  },
  {
    "id": "oYnTqvVeEyST41nCHiKV",
    "mainSku": "COL-1040",
    "waLink": "collar%20Medall%C3%B3n%20cruz%20templarios",
    "variants": [
      {"color": "yellow", "sku": "COL-1041", "image": "%2Fskus%2FCOL-1041.jpeg?alt=media&token=7b79d41f-7805-4d87-bc84-ba90792a697c", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-1042", "image": "%2Fskus%2FCOL-1042.jpeg?alt=media&token=5636648c-cec6-4a01-b77c-9ab219fcf5ec", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20cruz%20templarios%201.jpeg?alt=media&token=06497ce5-7a39-422b-bd2e-4421dba851f3",
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20cruz%20templarios%202.jpeg?alt=media&token=77165be2-8c6b-4b5d-81ac-e32384c52876"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-1040.jpeg?alt=media&token=94f6f873-fb49-40e8-b173-1e7ad1330f47",
    "name": "Medallón cruz templarios",
    "category": 1,
    "subcategory": 1,
    "createdAt": null,
    "description": "Collar medallón adornado con la cruz de los caballeros templarios, y adornado con zircones. Disponible en dorado y en plateado",
    "status": 1,
    "updatedAt": 1748478890481,
    "price": 19.5
  },
  {
    "id": "vr3wtx09Dxdv82jQJo3h",
    "status": 1,
    "price": 22.5,
    "category": 1,
    "name": "Medallón escuadra masónico",
    "updatedAt": 1748353728840,
    "mainSku": "COL-1050",
    "images": [
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20escuadra%20mas%C3%B3nico%201.webp?alt=media&token=5bbc86a5-8e82-4dd1-ac2e-0e7cf89393fa",
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20escuadra%20mas%C3%B3nico%202.webp?alt=media&token=9de2f2d3-5ad4-4906-a56e-a6d28b545e1b",
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20escuadra%20mas%C3%B3nico%203.webp?alt=media&token=25b54f44-1d75-4ade-8dd6-f4c9b21de752",
      "%2Fnecklaces%2Fmasonic%2FMedall%C3%B3n%20escuadra%20mas%C3%B3nico%204.webp?alt=media&token=2cb0a463-879d-456a-a910-4006ede12a4c"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-1050.webp?alt=media&token=3d7d0181-2d4d-4f73-acce-a703befa8d65",
    "subcategory": 1,
    "createdAt": null,
    "variants": [
      {"color": "yellow", "sku": "COL-1051", "image": "%2Fskus%2FCOL-1051.webp?alt=media&token=135b4e8f-a4f1-477d-a959-a640e4fae28f", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-1052", "image": "%2Fskus%2FCOL-1052.webp?alt=media&token=310138cf-4903-4a70-9d29-b601f8443d75", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "description": "Collar de medallón adornado con una escuadra masónica dorada y con zircones. Disponible en dorado y en plateado",
    "waLink": "collar%20Medall%C3%B3n%20escuadra%20mas%C3%B3nico"
  },
  {
    "id": "sA2FmO8MsF2hqJbKWtmb",
    "description": "Collar de espada rota en su hoja, adornada con detalles en su hoja y empuñadura",
    "name": "Espada rota",
    "waLink": "collar%20Espada%20rota",
    "price": 19.5,
    "updatedAt": 1753188853537,
    "subcategory": 2,
    "images": [
      "%2Fnecklaces%2Frock%2FEspada%20rota.webp?alt=media&token=9a99d428-47fc-4e55-adf9-bee7c274b7c8"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2010.webp?alt=media&token=e1aae516-2ff9-4d76-81d4-917cc96c8a3c",
    "mainSku": "COL-2010",
    "variants": [
      {"color": "", "sku": "COL-2010", "image": "%2Fskus%2FCOL-2010.webp?alt=media&token=6affd5e3-c0d3-43c7-a608-0f072df3cf39", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "status": 0,
    "createdAt": null,
    "rating": 0
  },
  {
    "id": "piurl2EO99uNiHdDgfMK",
    "name": "Búho con esqueleto",
    "mainSku": "COL-2030",
    "variants": [
      {"color": "", "sku": "COL-2030", "image": "%2Fskus%2FCOL-2030.webp?alt=media&token=dc2a60ef-bb50-40d3-92a4-a759bd861d8c", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188878553,
    "status": 1,
    "images": [
      "%2Fnecklaces%2Frock%2FB%C3%BAho%20con%20esqueleto%201.webp?alt=media&token=3360f3d1-5340-4d04-87cd-052720f22cc2",
      "%2Fnecklaces%2Frock%2FB%C3%BAho%20con%20esqueleto%202.webp?alt=media&token=624dbd93-3897-4d66-879c-c9ca967cdb01"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2030.webp?alt=media&token=e5674583-15e9-4df9-81b2-f61d044694c6",
    "subcategory": 2,
    "waLink": "collar%20B%C3%BAho%20con%20esqueleto",
    "createdAt": null,
    "price": 19.7,
    "category": 1,
    "description": "Collar de Búho, adornado con piedras amarillas en sus ojos, y con huesos de esqueleto en sus patas"
  },
  {
    "id": "m4u2IJAPSPROacIjpawx",
    "price": 20,
    "waLink": "collar%20Amuleto%20de%20drag%C3%B3n%20chino",
    "status": 0,
    "mainSku": "COL-2040",
    "variants": [
      {"color": "", "sku": "COL-2040", "image": "%2Fskus%2FCOL-2040.webp?alt=media&token=2e5eefac-9769-452d-8677-5b2edf5bd4b9", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "category": 1,
    "updatedAt": null,
    "createdAt": null,
    "subcategory": 2,
    "name": "Amuleto de dragón chino",
    "description": "Collar amuleto con figura de un dragón chino en relieve",
    "images": [
      "%2Fnecklaces%2Frock%2FAmuleto%20de%20drag%C3%B3n%20chino%201.webp?alt=media&token=8dda17ff-efff-4fba-92c7-3b8d73d846ef",
      "%2Fnecklaces%2Frock%2FAmuleto%20de%20drag%C3%B3n%20chino%202.webp?alt=media&token=ad77445b-32da-4087-ae0e-1a57a5fec8da"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2040.webp?alt=media&token=485cbd22-1187-4a95-ac07-f4999165e055"
  },
  {
    "id": "rJltBJ502ZorLhll0BQR",
    "images": [
      "%2Fnecklaces%2Frock%2FOjo%20iluminati%201.webp?alt=media&token=88b71601-4140-48a0-8b9b-423cef8ad3e4",
      "%2Fnecklaces%2Frock%2FOjo%20iluminati%202.webp?alt=media&token=4f83c8ba-1c52-42ae-be9d-bffd7cb20296",
      "%2Fnecklaces%2Frock%2FOjo%20iluminati%203.webp?alt=media&token=ec656f02-8a9f-4a7b-9fdd-c60ba2f38e1a",
      "%2Fnecklaces%2Frock%2FOjo%20iluminati%204.webp?alt=media&token=738634a6-2693-46b5-b851-7f52c3f6cc87",
      "%2Fnecklaces%2Frock%2FOjo%20iluminati%205.webp?alt=media&token=6443e5a1-25c5-4f23-bd5f-796ba5b10469"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2050.webp?alt=media&token=bd465e34-932c-4e71-8d1f-5134086bddc7",
    "name": "Ojo iluminati",
    "variants": [
      {"color": "red", "sku": "COL-2051", "image": "%2Fskus%2FCOL-2051.webp?alt=media&token=32b26487-6adf-4e7d-988c-cb7caaf1d4d7", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "blue", "sku": "COL-2052", "image": "%2Fskus%2FCOL-2052.webp?alt=media&token=b6d33b5f-95e2-45df-9f5b-ddf72187dfcf", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "mainSku": "COL-2050",
    "status": 1,
    "description": "desc",
    "waLink": "collar%20Ojo%20iluminati",
    "createdAt": null,
    "category": 1,
    "price": 21.5,
    "subcategory": 2,
    "updatedAt": 1753188891682
  },
  {
    "id": "Ttruz31I4w1dpBt88QP7",
    "images": [
      "%2Fnecklaces%2Frock%2FAmuleto%20de%20le%C3%B3n%20chino%201.webp?alt=media&token=5e848247-3ae5-40fb-888c-e4cc4ac9a524",
      "%2Fnecklaces%2Frock%2FAmuleto%20de%20le%C3%B3n%20chino%202.webp?alt=media&token=dba17a00-4e51-497e-955d-2645aba0fd87"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2060.webp?alt=media&token=5b6eed0f-c9c3-43ef-92d9-04bcd89b8412",
    "mainSku": "COL-2060",
    "variants": [
      {"color": "", "sku": "COL-2060", "image": "%2Fskus%2FCOL-2060.webp?alt=media&token=1f3aff8a-c4bb-4dea-9b3a-2a063b12253b", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "name": "Amuleto de león chino",
    "status": 0,
    "waLink": "collar%20Amuleto%20de%20le%C3%B3n%20chino",
    "discount": {"type": 0, "value": 20},
    "price": 19,
    "updatedAt": 1753571876918,
    "createdAt": null,
    "subcategory": 2,
    "description": "Collar amuleto con figura de un león chino en relieve",
    "category": 1,
    "numReviews": 0
  },
  {
    "id": "SpHdHSyeRcSCW8pNvBqh",
    "waLink": "collar%20Tridente%20de%20Neptuno",
    "description": "Collar en forma de tridente del dios Neptuno, dios de los mares según la mitología griega",
    "status": 1,
    "category": 1,
    "images": [
      "%2Fnecklaces%2Frock%2FCollar%20tridente%201.webp?alt=media&token=cb65f59c-2a05-4a2e-aea8-7d781c445324",
      "%2Fnecklaces%2Frock%2FCollar%20tridente%202.webp?alt=media&token=135dce81-1403-4989-86f3-2722327afe37"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2070.webp?alt=media&token=ec173267-2398-4c37-9f01-07a30ff6f86a",
    "createdAt": null,
    "subcategory": 2,
    "mainSku": "COL-2070",
    "variants": [
      {"color": "", "sku": "COL-2070", "image": "%2Fskus%2FCOL-2070.webp?alt=media&token=dbc1d710-4761-4170-ac41-977463ddc623", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "name": "Tridente de Neptuno",
    "updatedAt": 1753188905553,
    "price": 19.5
  },
  {
    "id": "c4XGxj1xkmThqNnDUktW",
    "status": 1,
    "waLink": "collar%20Medusa",
    "createdAt": null,
    "name": "Medusa",
    "description": "Collar medallón de cabeza de la gorgona de la mitología griega, Medusa",
    "price": 19.5,
    "mainSku": "COL-2080",
    "variants": [
      {"color": "", "sku": "COL-2080", "image": "%2Fskus%2FCOL-2080.webp?alt=media&token=62968433-89c0-4712-bb80-0d1ad0085855", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188915650,
    "images": [
      "%2Fnecklaces%2Frock%2FCollar%20medusa%201.webp?alt=media&token=2feeabf5-049d-4265-b968-ea23bf0a4330",
      "%2Fnecklaces%2Frock%2FCollar%20medusa%202.webp?alt=media&token=091aabe1-29c6-474c-ab76-a0ff0e975379"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2080.webp?alt=media&token=297f9176-7d85-43b6-a1fd-d3fa21cc0d4c",
    "subcategory": 2,
    "category": 1
  },
  {
    "id": "eTYMsEw7QzIHY9bF7qHY",
    "images": [
      "%2Fnecklaces%2Frock%2FM%C3%A1scara%20demonio%20japon%C3%A9s%201.webp?alt=media&token=ab4f19d4-9023-48f3-8164-9b5040822dd8",
      "%2Fnecklaces%2Frock%2FM%C3%A1scara%20demonio%20japon%C3%A9s%202.webp?alt=media&token=474d18b9-bd01-48bb-a154-8969bbc8b732",
      "%2Fnecklaces%2Frock%2FM%C3%A1scara%20demonio%20japon%C3%A9s%203.webp?alt=media&token=5c917ddf-8c04-4048-8bd5-adf59c4b9ffc"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2090.webp?alt=media&token=5c9a0442-8cea-4ce5-b08a-2ef25595c30e",
    "updatedAt": 1753188926521,
    "waLink": "collar%20M%C3%A1scara%20demonio%20japon%C3%A9s",
    "status": 1,
    "category": 1,
    "price": 18.5,
    "name": "Máscara demonio japonés",
    "description": "Collar de máscara de guerrero japonés (Hannya)",
    "subcategory": 2,
    "createdAt": null,
    "mainSku": "COL-2090",
    "variants": [
      {"color": "", "sku": "COL-2090", "image": "%2Fskus%2FCOL-2090.webp?alt=media&token=2e811b55-26df-46e0-bbef-d16d9c566d5e", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ]
  },
  {
    "id": "7fohdD8lhighipGOa0Iv",
    "description": "Collar con dije en forma de defensor, adornado con un ojo azul.",
    "category": 1,
    "mainSku": "COL-2100",
    "variants": [
      {"color": "", "sku": "COL-2100", "image": "%2Fskus%2FCOL-2100.webp?alt=media&token=1d521aa6-e410-41b7-80c7-4b55e7ab74d5", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "name": "Ojo malvado",
    "images": [
      "%2Fnecklaces%2Frock%2FOjo%20malvado%203.jpeg?alt=media&token=e62c4ffb-036c-4006-9e3c-3f0e5573ee6c"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2100.webp?alt=media&token=9c85ff64-6eae-445a-a5dc-8fe611e87ff3",
    "discount": {"type": 1, "value": 4.3},
    "subcategory": 2,
    "status": 1,
    "updatedAt": 1753188961739,
    "price": 21,
    "createdAt": null,
    "waLink": "collar%20Ojo%20malvado"
  },
  {
    "id": "f6pXDzrlbd3JEtRhljHe",
    "createdAt": null,
    "description": "Collar con forma de mariposa, con un detalle de calavera",
    "waLink": "collar%20Mariposa%20g%C3%B3tica",
    "price": 21,
    "images": [
      "%2Fnecklaces%2Frock%2FMariposa%20g%C3%B3tica%201.webp?alt=media&token=96d68b0b-be03-49f4-974e-f33ea1749037",
      "%2Fnecklaces%2Frock%2FMariposa%20g%C3%B3tica%202.webp?alt=media&token=227209bd-6565-4760-a1ad-c046d62cb81f"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2110.webp?alt=media&token=17a780ec-cc98-420c-8add-ec91745e3ca4",
    "subcategory": 2,
    "status": 1,
    "name": "Mariposa gótica",
    "updatedAt": 1753188979137,
    "mainSku": "COL-2110",
    "variants": [
      {"color": "", "sku": "COL-2110", "image": "%2Fskus%2FCOL-2110.webp?alt=media&token=dc8d6d7d-1a00-4a95-9d2b-2cbf9c0a2bab", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "discount": {"type": 1, "value": 4.3}
  },
  {
    "id": "KoQt60ZCzTsWEfNAGRRn",
    "description": "Collar rectangular con un mantra en dorado en chino de un lado, y adorno de YingYang del otro lado",
    "category": 1,
    "waLink": "collar%20Mantra",
    "price": 23,
    "updatedAt": 1745351179757,
    "name": "Mantra",
    "createdAt": null,
    "mainSku": "COL-2120",
    "variants": [
      {"color": "", "sku": "COL-2120", "image": "%2Fskus%2FCOL-2120.webp?alt=media&token=1b08b122-52a1-4ecd-80b8-0ccafce107c1", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "status": 0,
    "images": [
      "%2Fnecklaces%2Frock%2FMantra%201.webp?alt=media&token=7c798c7b-1bac-4565-9049-d24ff2d05c7d",
      "%2Fnecklaces%2Frock%2FMantra%202.webp?alt=media&token=337a156a-04ce-49bc-a579-81a33a2528bc"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2120.webp?alt=media&token=8d5acc34-83fa-4c9b-b13f-7f3915bf3af8",
    "subcategory": 2,
    "rating": 0
  },
  {
    "id": "8xYay4hYTUP0f7dYlFU8",
    "createdAt": null,
    "status": 1,
    "category": 1,
    "updatedAt": 1753188991345,
    "mainSku": "COL-2130",
    "name": "Calavera ojos rojos",
    "variants": [
      {"color": "yellow", "sku": "COL-2131", "image": "%2Fskus%2FCOL-2131.webp?alt=media&token=cfbffb8f-f166-4c59-a527-d87468638850", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-2132", "image": "%2Fskus%2FCOL-2132.webp?alt=media&token=3a477d08-0569-40e3-8665-a6106c180541", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 19.5,
    "images": [
      "%2Fnecklaces%2Frock%2FCalavera%20ojos%20rojos%201.webp?alt=media&token=cae192ae-69fd-4595-8e91-b5cdc08606fb",
      "%2Fnecklaces%2Frock%2FCalavera%20ojos%20rojos%202.webp?alt=media&token=25ff453b-50db-4cfc-aa59-e908c7ac928f",
      "%2Fnecklaces%2Frock%2FCalavera%20ojos%20rojos%203.webp?alt=media&token=71dc9dc8-f1bf-4721-91ec-ee7eab02dc0a",
      "%2Fnecklaces%2Frock%2FCalavera%20ojos%20rojos%204.webp?alt=media&token=f12b3739-ec2e-44dc-9839-3d3de5e64215"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2130.webp?alt=media&token=b2b046e1-1995-4a71-bf64-6baa87025de8",
    "subcategory": 2,
    "waLink": "collar%20Calavera%20ojos%20rojos",
    "description": "Collar de calavera con piedras rojas en los ojos y corona en dorado o plateado"
  },
  {
    "id": "89wnoGd10fAqGxf5HHfp",
    "waLink": "collar%20Medalla%20casco%20Espartano",
    "createdAt": null,
    "updatedAt": 1753189001721,
    "subcategory": 2,
    "price": 21.5,
    "variants": [
      {"color": "yellow", "sku": "COL-2141", "image": "%2Fskus%2FCOL-2141.webp?alt=media&token=01725906-9883-4b50-bc61-7bf8ca629ad8", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-2142", "image": "%2Fskus%2FCOL-2142.webp?alt=media&token=2a41b1de-ddc6-4418-b8b1-f7bf24a08426", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Medalla casco Espartano",
    "images": [
      "%2Fnecklaces%2Frock%2FMedalla%20casco%20Espartano%201.webp?alt=media&token=50e58761-66fc-463d-9b9e-e4eb426f5588",
      "%2Fnecklaces%2Frock%2FMedalla%20casco%20Espartano%202.webp?alt=media&token=670a0e77-6651-4780-b136-755acf0d3129",
      "%2Fnecklaces%2Frock%2FMedalla%20casco%20Espartano%203.webp?alt=media&token=f2220696-81d5-4de7-a342-490c924d62cc",
      "%2Fnecklaces%2Frock%2FMedalla%20casco%20Espartano%204.webp?alt=media&token=3bec81d0-e875-4822-a457-2d07ac139c72"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2140.webp?alt=media&token=b8cdce25-cedd-40e2-a315-238f7d2587aa",
    "description": "Collar de medallón con forma de guerrero espartano. Disponible en dorado y en plateado",
    "mainSku": "COL-2140",
    "status": 1,
    "category": 1
  },
  {
    "id": "5QsnMdM3MWSTEYKzor4h",
    "subcategory": 2,
    "images": [
      "%2Fnecklaces%2Frock%2FThe%20Witcher.webp?alt=media&token=5b8bcc0a-406d-46f7-ada3-48b2bb5189cf"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2150.webp?alt=media&token=274d1039-0e7c-4477-ab9e-6a763660d76d",
    "price": 17.5,
    "mainSku": "COL-2150",
    "variants": [
      {"color": "", "sku": "COL-2150", "image": "%2Fskus%2FCOL-2150.webp?alt=media&token=fa268f9f-8669-48dc-9137-5301fa6775f8", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "updatedAt": 1753571923254,
    "name": "The Witcher",
    "status": 0,
    "waLink": "collar%20The%20Witcher",
    "category": 1,
    "description": "Collar con la figura del lobo de Geralt de Rivia, de la serie The Witcher",
    "createdAt": null
  },
  {
    "id": "h7iqse0tzVfwN9KddzVL",
    "updatedAt": 1753571927654,
    "waLink": "collar%20de%20Calavera",
    "createdAt": null,
    "discount": {"type": 0, "value": 20},
    "name": "Collar de Calavera",
    "price": 18,
    "category": 1,
    "subcategory": 2,
    "images": [
      "%2Fnecklaces%2Frock%2Fcalavera%201.webp?alt=media&token=f7f1161a-c082-4718-903c-a0423c49d21a",
      "%2Fnecklaces%2Frock%2Fcalavera%202.webp?alt=media&token=235994d3-e31a-469e-b693-645204c319c1"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2160.webp?alt=media&token=160f9b6c-0490-4ab9-b116-b2c033cd3103",
    "mainSku": "COL-2160",
    "variants": [
      {"color": "", "sku": "COL-2160", "image": "%2Fskus%2FCOL-2160.webp?alt=media&token=31186b60-0c12-4e18-a61d-1ad8e625019c", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "description": "Collar con forma de calavera humana",
    "status": 0
  },
  {
    "id": "0V97xX8knUJkuD2ObSVx",
    "mainSku": "COL-2170",
    "variants": [
      {"color": "", "sku": "COL-2170", "image": "%2Fskus%2FCOL-2170.jpeg?alt=media&token=177a2685-48fb-44d4-8e9c-789e6185c760", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "name": "Alas de ángel",
    "category": 1,
    "waLink": "collar%20Alas%20de%20%C3%A1ngel",
    "images": [
      "%2Fnecklaces%2Frock%2Falas%20de%20angel%201.jpeg?alt=media&token=1f7dbfea-4d5a-4e1e-93bf-bf249b9e06ef"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2170.jpeg?alt=media&token=4f0fb12e-b84c-482c-8e94-c7e84fea91f0",
    "subcategory": 2,
    "description": "Collar con dije que asemeja alas de ángel",
    "createdAt": null,
    "price": 16.9,
    "updatedAt": 1753571937038
  },
  {
    "id": "FpzmrR1CRq51EEOtKiT6",
    "createdAt": null,
    "status": 1,
    "name": "Carnero con valknut",
    "waLink": "collar%20Carnero%20con%20valknut",
    "description": "Collar de cabeza de carnero, adornado con runas nórdicas y valknut",
    "updatedAt": 1753189077178,
    "category": 1,
    "images": [
      "%2Fnecklaces%2Frock%2FCarnero%20con%20valknut%201.webp?alt=media&token=c861a7f2-74ed-4488-97cd-8c367936e085",
      "%2Fnecklaces%2Frock%2FCarnero%20con%20valknut%202.webp?alt=media&token=8d3994fb-b909-4b21-adc6-14ae177823df"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-2180.webp?alt=media&token=02cac7dd-e942-4ff1-a290-abe91f4f65a8",
    "price": 20.5,
    "mainSku": "COL-2180",
    "variants": [
      {"color": "", "sku": "COL-2180", "image": "%2Fskus%2FCOL-2180.webp?alt=media&token=476795ac-14cd-4850-bc5a-42007593cf07", "stock": [
        {"name": "60cm", "quantity": 3}
      ]}
    ],
    "subcategory": 2
  },
  {
    "id": "XwMPY1pouzSPkBLx47le",
    "waLink": "collar%20Medall%C3%B3n%20Fenrir",
    "price": 18.5,
    "status": 0,
    "updatedAt": 1753189088874,
    "category": 1,
    "subcategory": 3,
    "images": [
      "%2Fnecklaces%2Fviking%2FMedall%C3%B3n%20Fenrir.webp?alt=media&token=dbb0d26e-a423-4062-99a2-82dff7240ad2"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3010.webp?alt=media&token=c0f2e2a3-4000-442e-bde7-94bde3cf2605",
    "name": "Medallón Fenrir",
    "description": "Collar Medallon adornado con la figura del lobo gigante Fenrir, hijo de Loki",
    "mainSku": "COL-3010",
    "variants": [
      {"color": "", "sku": "COL-3010", "image": "%2Fskus%2FCOL-3010.webp?alt=media&token=910c2872-5ebb-4433-8760-a37f3333b77c", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null
  },
  {
    "id": "VcAuQc9niMgrMMGygfhD",
    "description": "Medallón de cabeza de lobo, complementado con 2 hachas doradas cruzadas",
    "category": 1,
    "mainSku": "COL-3020",
    "variants": [
      {"color": "", "sku": "COL-3020", "image": "%2Fskus%2FCOL-3020.webp?alt=media&token=c40186f3-f496-4d2d-b7de-2635a018f33b", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "images": [
      "%2Fnecklaces%2Fviking%2FMedall%C3%B3n%20de%20lobo%20con%20runas%20y%20hachas%20cruzadas.webp?alt=media&token=4cbae3c5-9f30-40e1-8a07-6ec15e466a0a"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3020.webp?alt=media&token=775d4198-9ad0-4f69-8949-6d8fb4ca97d9",
    "name": "Medallón de lobo con runas y hachas cruzadas",
    "status": 0,
    "subcategory": 2,
    "updatedAt": null,
    "createdAt": null,
    "price": 20,
    "waLink": "collar%20Medall%C3%B3n%20de%20lobo%20con%20runas%20y%20hachas%20cruzadas"
  },
  {
    "id": "YZnRln8bJVDQETXiIsBP",
    "description": "Collar con cabeza de lobo en relieve, adornado al perímetro con runas nórdicas doradas",
    "updatedAt": 1753189104778,
    "mainSku": "COL-3030",
    "variants": [
      {"color": "", "sku": "COL-3030", "image": "%2Fskus%2FCOL-3030.webp?alt=media&token=d475300a-1a08-429a-81cb-136035933644", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "subcategory": 3,
    "price": 19.7,
    "status": 1,
    "category": 1,
    "waLink": "collar%20Medallon%20lobo%20vikingo%20con%20runas",
    "name": "Medallon lobo vikingo con runas",
    "images": [
      "%2Fnecklaces%2Fviking%2FMedallon%20lobo%20%20vikingo%20con%20runas.webp?alt=media&token=12dfdf65-0953-4906-9b90-e5abe71f7eeb"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3030.webp?alt=media&token=4063d21a-5f5b-4439-aab5-0fc4b7462e2c"
  },
  {
    "id": "WI17HfeBGWrYiiSNWBE9",
    "waLink": "collar%20Medall%C3%B3n%20lobo%20en%20relieve",
    "subcategory": 3,
    "status": 0,
    "category": 1,
    "price": 20,
    "updatedAt": null,
    "description": "Medallón con cabeza de lobo en relieve",
    "mainSku": "COL-3040",
    "variants": [
      {"color": "", "sku": "COL-3040", "image": "%2Fskus%2FCOL-3040.webp?alt=media&token=51d4a01f-310b-4df4-8dbe-cdaefdc6a958", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "name": "Medallón lobo en relieve",
    "images": [
      "%2Fnecklaces%2Fviking%2FMedall%C3%B3n%20lobo%20en%20relieve.webp?alt=media&token=42cd092a-6860-46a5-9e55-0ef260941db8"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3040.webp?alt=media&token=e93c2622-f339-425b-ab73-eff8ffd9ba72"
  },
  {
    "id": "3yj51yKdTjUqID8cgZ6b",
    "updatedAt": 1753189117346,
    "status": 1,
    "description": "Collar con dije de cabeza de lobo de perfil, emblema de los lobos espaciales de Warhammer 40K",
    "category": 1,
    "subcategory": 3,
    "waLink": "collar%20Lobo%20de%20perfil",
    "mainSku": "COL-3050",
    "variants": [
      {"color": "", "sku": "COL-3050", "image": "%2Fskus%2FCOL-3050.webp?alt=media&token=24538088-7057-401b-88de-5bdcf527a6ea", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "createdAt": null,
    "price": 18.9,
    "images": [
      "%2Fnecklaces%2Fviking%2FLobo%20de%20perfil.webp?alt=media&token=895865e2-df09-4ada-9085-c8aa061f55fc"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3050.webp?alt=media&token=1b619a81-e460-4e0e-82b4-df0736b2fc56",
    "name": "Lobo de perfil"
  },
  {
    "id": "04z5IjZzI1NegvXNlhQm",
    "waLink": "collar%20Lobo%20de%20ojos%20rojos",
    "updatedAt": 1753189127322,
    "createdAt": null,
    "status": 1,
    "name": "Lobo de ojos rojos",
    "description": "Collar de cabeza de lobo, adornado en sus ojos con piedras rojas",
    "images": [
      "%2Fnecklaces%2Fviking%2FLobo%20de%20ojos%20rojos%201.webp?alt=media&token=fb5aeaf5-1f67-466f-979c-a70178579859",
      "%2Fnecklaces%2Fviking%2FLobo%20de%20ojos%20rojos%202.webp?alt=media&token=1a9cb0fe-d0d5-4fb8-bd26-4d2410d77a29"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3060.webp?alt=media&token=f98cc1a4-0caf-4deb-88dd-f513bfe7ee64",
    "subcategory": 3,
    "category": 1,
    "price": 18.9,
    "mainSku": "COL-3060",
    "variants": [
      {"color": "", "sku": "COL-3060", "image": "%2Fskus%2FCOL-3060.webp?alt=media&token=ce0b2b34-0b84-4869-9338-fb7b03cd4b69", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ]
  },
  {
    "id": "s1AyjZtfq9sfEHMURxhC",
    "createdAt": null,
    "name": "Lobo con runa en la frente",
    "description": "Collar de cabeza de lobo, adornado con la runa nórdica 'Odal' en la frente",
    "images": [
      "%2Fnecklaces%2Fviking%2FLobo%20con%20runa%20en%20la%20frente%201.webp?alt=media&token=83d5e16e-6cbb-4e8e-b909-a36b436f40ff",
      "%2Fnecklaces%2Fviking%2FLobo%20con%20runa%20en%20la%20frente%202.webp?alt=media&token=66c5194d-6d7c-43eb-ac44-3fb9507fd3e1"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3070.webp?alt=media&token=4caf0c1b-0e7c-4462-9ffc-dd819b9cdd67",
    "updatedAt": 1753189146146,
    "price": 19.5,
    "category": 1,
    "mainSku": "COL-3070",
    "variants": [
      {"color": "", "sku": "COL-3070", "image": "%2Fskus%2FCOL-3070.webp?alt=media&token=20c2ac6c-506e-43cb-9840-cfc6d3f69bb7", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "waLink": "collar%20Lobo%20con%20runa%20en%20la%20frente",
    "status": 0,
    "subcategory": 3
  },
  {
    "id": "jx9zzh1C6hB8lnCuKNzo",
    "price": 15,
    "waLink": "collar%20Martillo%20de%20Thor",
    "images": [
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%2001.webp?alt=media&token=160c9100-78e1-4d20-9dfc-729433c3e10f"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3080.webp?alt=media&token=2cb71172-f6b3-4c7b-93c8-ca319acf6c08",
    "name": "Martillo de Thor",
    "status": 0,
    "category": 1,
    "description": "Collar con forma de martillo de Thor",
    "mainSku": "COL-3080",
    "variants": [
      {"color": "", "sku": "COL-3080", "image": "%2Fskus%2FCOL-3080.webp?alt=media&token=2c51e6f7-4e16-4d6c-988b-de7eda961c2c", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "updatedAt": null,
    "subcategory": 3,
    "createdAt": null
  },
  {
    "id": "iS9Iv8jG8ZyCZWAsLBcP",
    "name": "Martillo de Thor dije compuesto",
    "mainSku": "COL-3100",
    "updatedAt": 1753189163714,
    "description": "Collar con forma de martillo de Thor, adornado con detalles en el mango, y pieza adicional de dije compuesto",
    "variants": [
      {"color": "yellow", "sku": "COL-3101", "image": "%2Fskus%2FCOL-3101.webp?alt=media&token=e6102156-0f69-4cf8-8aae-b5772069dcc5", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-3102", "image": "%2Fskus%2FCOL-3102.webp?alt=media&token=5d61d373-09ce-4ca1-991d-38efa92df3fe", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "waLink": "collar%20Martillo%20de%20Thor%20dije%20compuesto",
    "subcategory": 3,
    "status": 0,
    "price": 20.5,
    "category": 1,
    "images": [
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%20dije%20compuesto%201.webp?alt=media&token=36da3045-6a32-4e15-a19c-fd260dfeaeda",
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%20dije%20compuesto%202.webp?alt=media&token=21d9a091-e518-4d7d-8864-59b3c7e09eff",
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%20dije%20compuesto%203.webp?alt=media&token=a5dc76e5-62b5-4740-bf04-ece6e3494bce",
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%20dije%20compuesto%204.webp?alt=media&token=a66fbf51-d72f-42af-9358-15e1bc5973f3"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3100.webp?alt=media&token=2e20dbdc-68a3-4ee7-9f10-960a80e4873c"
  },
  {
    "id": "ER2oeWGWdYKKH4vFuqib",
    "mainSku": "COL-3110",
    "variants": [
      {"color": "", "sku": "COL-3110", "image": "%2Fskus%2FCOL-3110.webp?alt=media&token=1bfef98d-91fb-4a08-ba99-2fa4b54ce5eb", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "subcategory": 3,
    "name": "Punta de Lanza con valknut",
    "status": 1,
    "images": [
      "%2Fnecklaces%2Fviking%2FPunta%20de%20Lanza%20con%20valknut%201.webp?alt=media&token=142e6210-2c53-4b1b-9932-338e303574c5",
      "%2Fnecklaces%2Fviking%2FPunta%20de%20Lanza%20con%20valknut%202.webp?alt=media&token=3d03f10f-c7e0-4a45-a3e1-240ae97f4172"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3110.webp?alt=media&token=497328df-75a8-4716-babd-260eecfc23e4",
    "description": "Collar con forma de punta de lanza, adornado con detalles y valknut",
    "createdAt": null,
    "waLink": "collar%20Punta%20de%20Lanza%20con%20valknut",
    "updatedAt": 1753189180962,
    "price": 19.7
  },
  {
    "id": "2aSdlexZXvlx2EVm84sy",
    "waLink": "collar%20Vegvisir%20vintage",
    "mainSku": "COL-3120",
    "variants": [
      {"color": "yellow", "sku": "COL-3121", "image": "%2Fskus%2FCOL-3121.webp?alt=media&token=50c44f7e-e380-415a-bee4-517ea88cb049", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-3122", "image": "%2Fskus%2FCOL-3122.webp?alt=media&token=09435fea-609f-483b-ae93-46c5fd841bfc", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753189242258,
    "subcategory": 3,
    "createdAt": null,
    "price": 19.7,
    "category": 1,
    "images": [
      "%2Fnecklaces%2Fviking%2FVegvisir%20vintage%201.webp?alt=media&token=9aaa6653-c1df-4a59-97e2-dbe3bb36c487",
      "%2Fnecklaces%2Fviking%2FVegvisir%20vintage%202.webp?alt=media&token=02bc7d14-1e37-4ea8-8a1b-5d340aca0d28",
      "%2Fnecklaces%2Fviking%2FVegvisir%20vintage%203.webp?alt=media&token=4a0d3596-6b61-458a-bdd1-0ff89216868f",
      "%2Fnecklaces%2Fviking%2FVegvisir%20vintage%204.webp?alt=media&token=987799d4-5286-45de-9cd3-15c1503fe085"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3120.webp?alt=media&token=e93ea27c-32d8-445a-8734-ed663a76a45f",
    "name": "Vegvisir vintage",
    "status": 1,
    "description": "Collar con diseño elegante de brújula tipo vegvisir. Disponible en dorado y en plateado.",
    "numReviews": 0
  },
  {
    "id": "WngSDVcsx72cOICPsMhd",
    "createdAt": null,
    "mainSku": "COL-3130",
    "variants": [
      {"color": "", "sku": "COL-3130", "image": "%2Fskus%2FCOL-3130.webp?alt=media&token=86ddba71-d8af-43f1-8a6a-0651576455b7", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "collar%20Punta%20de%20hacha",
    "name": "Punta de hacha",
    "description": "Collar con forma de punta de hacha, adornado con detalles y vegvisir",
    "images": [
      "%2Fnecklaces%2Fviking%2FPunta%20de%20hacha%201.webp?alt=media&token=f68d0b29-7378-4698-ad1b-cd9b75dafabe",
      "%2Fnecklaces%2Fviking%2FPunta%20de%20hacha%202.webp?alt=media&token=bed430d3-93e2-4492-b070-55451569bab7"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3130.webp?alt=media&token=644fb02b-97e8-4a59-9db6-04e6ce8cb2e6",
    "status": 0,
    "updatedAt": null,
    "category": 1,
    "price": 18,
    "subcategory": 3
  },
  {
    "id": "OmewU8Nf2LWISFxgChty",
    "subcategory": 3,
    "description": "Collar con forma de vegvisir, en diseño elegante minimalista",
    "images": [
      "%2Fnecklaces%2Fviking%2FVegvisir%20minimalista%201.webp?alt=media&token=0c8ec218-64f2-4401-94d6-4cc57371fcc4",
      "%2Fnecklaces%2Fviking%2FVegvisir%20minimalista%202.webp?alt=media&token=46817b77-91d7-4ef4-8c48-671087be3222"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3140.webp?alt=media&token=5befb91e-f71e-45a7-b4e9-3a27a0a7f935",
    "status": 1,
    "waLink": "collar%20Vegvisir%20minimalista",
    "mainSku": "COL-3140",
    "variants": [
      {"color": "", "sku": "COL-3140", "image": "%2Fskus%2FCOL-3140.webp?alt=media&token=e3b3f442-1f1f-4d5f-ac18-fe458597be15", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "price": 19.5,
    "category": 1,
    "name": "Vegvisir minimalista",
    "updatedAt": 1753189262850
  },
  {
    "id": "ozpsuqjuyu82v5eEvWbl",
    "createdAt": null,
    "name": "Cráneo de cuervo con vegvisir",
    "description": "Collar de cráneo de cuervo, adornado con un vegvisir en la frente",
    "images": [
      "%2Fnecklaces%2Fviking%2FCr%C3%A1neo%20de%20cuervo%20con%20vegvisir%201.webp?alt=media&token=7b3493e8-60ad-4dc2-91ae-9c7297305c79",
      "%2Fnecklaces%2Fviking%2FCr%C3%A1neo%20de%20cuervo%20con%20vegvisir%202.webp?alt=media&token=3628af16-893c-482c-9f03-c6e83243f0de"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3150.webp?alt=media&token=9f5c3a64-010d-41bd-914c-292ebebe2230",
    "updatedAt": 1753189274169,
    "price": 18.9,
    "category": 1,
    "mainSku": "COL-3150",
    "variants": [
      {"color": "", "sku": "COL-3150", "image": "%2Fskus%2FCOL-3150.webp?alt=media&token=d4085445-a6d2-4155-95a2-6494dce02421", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "collar%20Cr%C3%A1neo%20de%20cuervo%20con%20vegvisir",
    "subcategory": 3,
    "status": 1
  },
  {
    "id": "nH4Zw0M67BbYJKiuLguL",
    "images": [
      "%2Fnecklaces%2Fviking%2FCollar%20Jormundgand%201.webp?alt=media&token=871526f1-2a4a-44ff-8cfb-76d0bed82023",
      "%2Fnecklaces%2Fviking%2FCollar%20Jormundgand%202.webp?alt=media&token=4a14cb9a-ea9f-4dc7-9cb8-85732b73a193"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3160.webp?alt=media&token=7878f16a-22ee-4a25-a64c-19f213c9f9d4",
    "mainSku": "COL-3160",
    "variants": [
      {"color": "", "sku": "COL-3160", "image": "%2Fskus%2FCOL-3160.webp?alt=media&token=75c01a7d-84b6-4088-aaa2-147c3e4da16e", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "status": 0,
    "waLink": "collar%20Jormundgand",
    "category": 1,
    "description": "Collar con la forma de Jormundgand, la serpiente del mundo de la motología nórdica",
    "subcategory": 3,
    "price": 17,
    "name": "Collar Jormundgand",
    "discount": {"type": 0, "value": 20},
    "updatedAt": 1753571971655
  },
  {
    "id": "7JMHbz89gnJNFvTE9MuJ",
    "description": "Collar con la forma de Jormundgand, la serpiente del mundo de la motología nórdica, en apariencia de infinito",
    "status": 1,
    "createdAt": null,
    "category": 1,
    "subcategory": 3,
    "price": 20.5,
    "waLink": "collar%20Jormundgand%20infinito",
    "mainSku": "COL-3170",
    "variants": [
      {"color": "", "sku": "COL-3170", "image": "%2Fskus%2FCOL-3170.webp?alt=media&token=318ef210-fb92-4d26-a59b-ca0f1805edf8", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753189303615,
    "name": "Collar Jormundgand infinito",
    "images": [
      "%2Fnecklaces%2Fviking%2FCollar%20Jormundgand%20infinito%201.webp?alt=media&token=1e0d04dc-39fa-40c1-a04e-0bb40faa2e1d",
      "%2Fnecklaces%2Fviking%2FCollar%20Jormundgand%20infinito%202.webp?alt=media&token=9c55f895-9655-45c2-83cd-012605cf320d"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3170.webp?alt=media&token=aa1fb421-aa79-4988-a6f5-508b252a2b71",
    "rating": 0
  },
  {
    "id": "aL7Z0XpbobtXYx2lMCGF",
    "subcategory": 3,
    "description": "Collar tipo medallón con figura de valknut por un lado, y vegvisir por el otro lado",
    "status": 1,
    "images": [
      "%2Fnecklaces%2Fviking%2FCollar%20valknut%20con%20vegvisir%201.webp?alt=media&token=857457fa-b70b-4a80-b839-8e52b0c2395e",
      "%2Fnecklaces%2Fviking%2FCollar%20valknut%20con%20vegvisir%202.webp?alt=media&token=90e28019-3f30-4f6a-a615-82930793a855"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3180.webp?alt=media&token=9f68bfd5-51fa-47be-b33e-48cae7949720",
    "mainSku": "COL-3180",
    "variants": [
      {"color": "", "sku": "COL-3180", "image": "%2Fskus%2FCOL-3180.webp?alt=media&token=8ff5f450-ee16-4728-b586-fe0213d33890", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "waLink": "collar%20valknut%20con%20vegvisir",
    "createdAt": null,
    "updatedAt": 1753189314138,
    "name": "Collar valknut con vegvisir",
    "price": 20.7
  },
  {
    "id": "QOckosbV14Espy3kIEi9",
    "updatedAt": 1753189324347,
    "description": "Collar con forma de hacha, adornada con un valknut a cada lado de la hoja",
    "waLink": "collar%20hacha%20con%20valknut",
    "createdAt": null,
    "images": [
      "%2Fnecklaces%2Fviking%2FCollar%20hacha%20con%20valknut%201.webp?alt=media&token=38238241-b9ae-416d-9254-7b66cd1b1ec2",
      "%2Fnecklaces%2Fviking%2FCollar%20hacha%20con%20valknut%202.webp?alt=media&token=4896d16f-ccc6-453e-927c-acee9a06c03f"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3190.webp?alt=media&token=aac4af45-7989-4343-a93c-6efd2f9bd15f",
    "name": "Collar hacha con valknut",
    "category": 1,
    "price": 19.95,
    "subcategory": 3,
    "mainSku": "COL-3190",
    "variants": [
      {"color": "", "sku": "COL-3190", "image": "%2Fskus%2FCOL-3190.webp?alt=media&token=74bcb77e-b55c-4952-8664-bc3e451fdcc8", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "rating": 0
  },
  {
    "id": "DvK5oWaljMFlEn0wWoQJ",
    "waLink": "collar%20%C3%81rbol%20de%20la%20vida%20con%20runas",
    "mainSku": "COL-3200",
    "variants": [
      {"color": "", "sku": "COL-3200", "image": "%2Fskus%2FCOL-3200.webp?alt=media&token=7b199444-3c58-47cd-9a7b-28f68c20ca52", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "name": "Árbol de la vida con runas",
    "status": 1,
    "description": "Collar tipo medallón, con figura central del árbol Yggdrasil, y adornado en el perímetro con runas nórdicas",
    "createdAt": null,
    "price": 20.5,
    "subcategory": 3,
    "images": [
      "%2Fnecklaces%2Fviking%2F%C3%81rbol%20de%20la%20vida%20con%20runas.webp?alt=media&token=39129b46-abef-4ced-82b4-cda38880fa34"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3200.webp?alt=media&token=aeb900b2-49bf-4f4e-836e-0e3c17798fc0",
    "updatedAt": 1753189344778
  },
  {
    "id": "6enR8bfNfvBtQ9vierhm",
    "price": 16.75,
    "waLink": "collar%20Medalla%20de%20Od%C3%ADn",
    "mainSku": "COL-3210",
    "variants": [
      {"color": "", "sku": "COL-3210", "image": "%2Fskus%2FCOL-3210.webp?alt=media&token=be8510f0-03e6-4991-9940-d0ac6eb3763f", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "discount": {"type": 0, "value": 20},
    "name": "Medalla de Odín",
    "createdAt": null,
    "subcategory": 3,
    "images": [
      "%2Fnecklaces%2Fviking%2FMedalla%20de%20Od%C3%ADn%201.webp?alt=media&token=152c0c97-c2e5-4fc8-9bee-c20b7fe03cf0",
      "%2Fnecklaces%2Fviking%2FMedalla%20de%20Od%C3%ADn%202.webp?alt=media&token=e756c5e9-f7d4-4539-a7aa-d6485994eb0f"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3210.webp?alt=media&token=95595a67-f626-4eee-af19-cea732367c08",
    "description": "Collar tipo medalla, con la figura del rostro de Odín, dios de la motilogía nórdica",
    "updatedAt": 1752586347139,
    "status": 0,
    "category": 1,
    "rating": 0
  },
  {
    "id": "nElRGAO4uVIINTGYFGba",
    "price": 18.5,
    "mainSku": "COL-3220",
    "variants": [
      {"color": "", "sku": "COL-3220", "image": "%2Fskus%2FCOL-3220.webp?alt=media&token=f32e2c46-5983-48b1-bb35-4dc90f290afa", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "subcategory": 3,
    "images": [
      "%2Fnecklaces%2Fviking%2FBarra%203D%20de%20runas%201.webp?alt=media&token=5bc8fac7-66da-47e9-88b5-695a9fb1d5d9",
      "%2Fnecklaces%2Fviking%2FBarra%203D%20de%20runas%202.webp?alt=media&token=a8e56231-febd-45e1-9c3d-82e71364d6e9"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3220.webp?alt=media&token=eaba49a5-8416-4727-a5fd-f59180ea0e30",
    "updatedAt": 1753189373580,
    "description": "Collar de barra torcida, adornada con runas nórdicas",
    "status": 1,
    "name": "Barra 3D de runas",
    "waLink": "collar%20Barra%203D%20de%20runas",
    "createdAt": null,
    "category": 1
  },
  {
    "id": "8I91HqvyYAi81b9MVeKc",
    "name": "Cuerno vikingo con vegvísir",
    "images": [
      "%2Fnecklaces%2Fviking%2FCuerno%20vikingo%20con%20vegv%C3%ADsir%201.webp?alt=media&token=4273d696-b9f6-42c9-827e-0d0e55e33232",
      "%2Fnecklaces%2Fviking%2FCuerno%20vikingo%20con%20vegv%C3%ADsir%202.webp?alt=media&token=f5833e99-ba35-4001-872f-d53cd734c576"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3230.webp?alt=media&token=c671d6b9-cd7c-42bf-8a34-d91706ea5ed2",
    "price": 17.5,
    "status": 1,
    "category": 1,
    "description": "Collar con forma de cuerno, adornado con runas y vegvisir",
    "updatedAt": 1753189385587,
    "subcategory": 3,
    "waLink": "collar%20Cuerno%20vikingo%20con%20vegv%C3%ADsir",
    "mainSku": "COL-3230",
    "variants": [
      {"color": "", "sku": "COL-3230", "image": "%2Fskus%2FCOL-3230.webp?alt=media&token=c0b48adc-fab9-4534-a384-bac63af7d80b", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "createdAt": null
  },
  {
    "id": "yBAFjgsmmzF9ST2caQUi",
    "name": "Aro con cuervo",
    "subcategory": 3,
    "images": [
      "%2Fnecklaces%2Fviking%2FAro%20con%20cuervo%201.webp?alt=media&token=163ceacc-b100-4d85-9a2c-f5b6205c4ea0",
      "%2Fnecklaces%2Fviking%2FAro%20con%20cuervo%202.webp?alt=media&token=dbaf51a2-b88e-41d9-bb72-6266aff2a181",
      "%2Fnecklaces%2Fviking%2FAro%20con%20cuervo%203.webp?alt=media&token=adaef8ab-1fb3-4d7e-930f-b8f84ff0e569",
      "%2Fnecklaces%2Fviking%2FAro%20con%20cuervo%204.webp?alt=media&token=bd440dd1-f38a-4fa9-a475-272cad4b07c4"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3240.webp?alt=media&token=56c4c4df-be48-4391-86d3-3ff09514f9a5",
    "price": 19,
    "mainSku": "COL-3240",
    "status": 1,
    "category": 1,
    "variants": [
      {"color": "yellow", "sku": "COL-3241", "image": "%2Fskus%2FCOL-3241.webp?alt=media&token=4bc42d9c-1737-43b2-8168-ef04c45eab77", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3242", "image": "%2Fskus%2FCOL-3242.webp?alt=media&token=2209c3ff-c913-40fe-a436-0dd29354e9c5", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "waLink": "collar%20Aro%20con%20cuervo",
    "createdAt": null,
    "description": "Collar de aro con cuervo, alusión a Odín, dios de la mitología nórdica. Disponible en dorado o plateado",
    "discount": {"type": 1, "value": 4.1},
    "updatedAt": 1753189409594
  },
  {
    "id": "lceaXpfbT1Y5v4fZpFVa",
    "variants": [
      {"color": "yellow", "sku": "COL-3251", "image": "%2Fskus%2FCOL-3251.webp?alt=media&token=5a27c1b6-bcaa-40eb-a6d2-5c6949a11991", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-3252", "image": "%2Fskus%2FCOL-3252.webp?alt=media&token=6dd1fa4c-ee3b-45d9-b38a-86e98b924245", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753189423538,
    "description": "Collar tipo medallón con figura de nuedo celta en dorado o plateado",
    "waLink": "collar%20Nudo%20celta",
    "price": 19.7,
    "createdAt": null,
    "mainSku": "COL-3250",
    "name": "Nudo celta",
    "images": [
      "%2Fnecklaces%2Fviking%2FNudo%20celta%201.webp?alt=media&token=8615ae53-51ce-4800-9953-bc4e22bf4033",
      "%2Fnecklaces%2Fviking%2FNudo%20celta%202.webp?alt=media&token=ca718712-efd2-4edc-98ec-112a18f3dd2d",
      "%2Fnecklaces%2Fviking%2FNudo%20celta%203.webp?alt=media&token=4c969820-887a-48ac-b5a1-f3b48dbbbc53",
      "%2Fnecklaces%2Fviking%2FNudo%20celta%204.webp?alt=media&token=0e119cdf-63e5-4cb0-9fa8-83446eebd53d"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3250.webp?alt=media&token=bbb8d3c1-5b29-4e94-be20-8a18252f60b4",
    "subcategory": 3,
    "status": 1,
    "category": 1,
    "numReviews": 0
  },
  {
    "id": "CVIPandDBuB3wEcqPZ7N",
    "subcategory": 3,
    "createdAt": null,
    "name": "Hachas dobles vikingas",
    "updatedAt": 1753189433252,
    "images": [
      "%2Fnecklaces%2Fviking%2FHachas%20dobles%20vikingas.webp?alt=media&token=c559f6cd-bac4-4645-92b5-3548ab35e5b8"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3260.webp?alt=media&token=c094bbfd-a3d8-4729-830e-04d1935891d6",
    "status": 1,
    "category": 1,
    "description": "Collar con forma de 2 hachas de guerra cruzadas",
    "waLink": "collar%20Hachas%20dobles%20vikingas",
    "mainSku": "COL-3260",
    "variants": [
      {"color": "", "sku": "COL-3260", "image": "%2Fskus%2FCOL-3260.webp?alt=media&token=8e80ab7b-a08c-4655-9766-9b003eec0eaf", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 19.95
  },
  {
    "id": "RX1803PB2aVjZUbdd4PG",
    "price": 19,
    "updatedAt": 1753189451259,
    "subcategory": 3,
    "images": [
      "%2Fnecklaces%2Fviking%2FMedall%C3%B3n%20Hugin%20y%20Munin%201.webp?alt=media&token=de9da831-b96c-4eb9-aa2c-4995265ee9e1",
      "%2Fnecklaces%2Fviking%2FMedall%C3%B3n%20Hugin%20y%20Munin%202.webp?alt=media&token=a5e9bb41-d5a5-4fd4-b836-e2e0dccdc836"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3270.webp?alt=media&token=c6a72ebc-e9e6-4ae3-b420-4c4224b9fdff",
    "name": "Medallón Hugin y Munin",
    "status": 1,
    "category": 1,
    "waLink": "collar%20Medall%C3%B3n%20Hugin%20y%20Munin",
    "createdAt": null,
    "description": "Collar tipo medallón, con las figuras de Hugin y Munin, los 2 cuervos compañeros de Odín, dios de la motología nórdica",
    "discount": {"type": 1, "value": 4.1},
    "mainSku": "COL-3270",
    "variants": [
      {"color": "", "sku": "COL-3270", "image": "%2Fskus%2FCOL-3270.webp?alt=media&token=4d045544-b088-446f-b088-af2e1df7f9e4", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ]
  },
  {
    "id": "6gLfqIBa1ceaVxeIiY44",
    "waLink": "collar%20Nudo%20de%20bruja",
    "status": 0,
    "images": [
      "%2Fnecklaces%2Fviking%2FNudo%20de%20bruja%201.webp?alt=media&token=a4ea1589-ed2b-49b8-ac78-c85844f4fc0a",
      "%2Fnecklaces%2Fviking%2FNudo%20de%20bruja%202.webp?alt=media&token=4ddfee42-0f99-4a71-baea-f7624b1f2cce"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3280.webp?alt=media&token=735d0a1a-5823-49fa-b825-f498b63130bb",
    "price": 17.5,
    "category": 1,
    "description": "Collar con forma del nudo de bruja celta",
    "subcategory": 3,
    "createdAt": null,
    "name": "Nudo de bruja",
    "updatedAt": 1753189476051,
    "mainSku": "COL-3280",
    "variants": [
      {"color": "", "sku": "COL-3280", "image": "%2Fskus%2FCOL-3280.webp?alt=media&token=85af43bb-7d52-4f14-8c78-186e9ba46f90", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ]
  },
  {
    "id": "XEiRA1msNEBq3lZl7GjC",
    "images": [
      "%2Fnecklaces%2Fviking%2FLobo%20dorado.webp?alt=media&token=f61c0ccb-b0a1-4d1b-9369-3a4023bd027f"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3290.webp?alt=media&token=8e14003b-6982-417b-9e46-2250ce16b24f",
    "createdAt": null,
    "price": 19.5,
    "category": 1,
    "description": "Collar tipo medallón, con la figura que representa a los protagonistas de The Witcher",
    "status": 0,
    "name": "The Witcher Lobo dorado",
    "updatedAt": 1753189492866,
    "waLink": "collar%20The%20Witcher%20Lobo%20dorado",
    "subcategory": 3,
    "mainSku": "COL-3290",
    "variants": [
      {"color": "", "sku": "COL-3290", "image": "%2Fskus%2FCOL-3290.webp?alt=media&token=c9caafe1-86cc-4bf0-b694-1ed69c0ae9b5", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ]
  },
  {
    "id": "LezMJ5smNhc1UozXgmTY",
    "description": "Collar con forma de aro, adornado con runas nórdicas a lo largo de su perímetro. Disponible en dorado y en plateado",
    "updatedAt": 1753572063294,
    "createdAt": null,
    "images": [
      "%2Fnecklaces%2Fviking%2FRueda%20de%20runas%20vikingas%201.webp?alt=media&token=52345200-4a1d-48cf-92dd-a95ff46ab071",
      "%2Fnecklaces%2Fviking%2FRueda%20de%20runas%20vikingas%202.webp?alt=media&token=b7436fb5-1584-4f04-bf07-82db3f13161b",
      "%2Fnecklaces%2Fviking%2FRueda%20de%20runas%20vikingas%203.webp?alt=media&token=8a7e2f0c-215a-4045-abd8-a76ae57fe28e",
      "%2Fnecklaces%2Fviking%2FRueda%20de%20runas%20vikingas%204.webp?alt=media&token=bddf44e3-5cd4-4fa7-bea0-195658e06a9c"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3300.webp?alt=media&token=f93a5bbe-55e8-4efe-bba5-d5334c1849d9",
    "category": 1,
    "variants": [
      {"color": "yellow", "sku": "COL-3301", "image": "%2Fskus%2FCOL-3301.webp?alt=media&token=2915a325-a8e8-439f-af58-ac01e22de39b", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3302", "image": "%2Fskus%2FCOL-3302.webp?alt=media&token=dc6622b4-9aaa-4e40-98ea-e58341f78ca5", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "waLink": "collar%20Rueda%20de%20runas%20vikingas",
    "price": 16.95,
    "mainSku": "COL-3300",
    "subcategory": 3,
    "name": "Rueda de runas vikingas",
    "status": 1
  },
  {
    "id": "F7WzmbHIOYqTKbqQzARg",
    "updatedAt": 1753189529627,
    "category": 1,
    "name": "Martillo de Thor con valknut",
    "description": "Collar martillo de Thor, con detalles dorados y valknut",
    "images": [
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%20con%20valknut%20-%200.webp?alt=media&token=bad6bcb5-f57c-44cd-bf82-4e19f2aae499",
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%20con%20valknut%20-%201.webp?alt=media&token=b36cf86f-2990-44c1-9cb2-9c7e8cd2a063",
      "%2Fnecklaces%2Fviking%2FMartillo%20de%20Thor%20con%20valknut%20-%202.webp?alt=media&token=0cf5093d-c1ea-41f2-ada5-8cfb81b86cd0"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3310.webp?alt=media&token=e577b91e-c683-4731-96dc-5238133b7190",
    "status": 1,
    "price": 19.5,
    "subcategory": 3,
    "variants": [
      {"color": "", "sku": "COL-3310", "image": "%2Fskus%2FCOL-3310.webp?alt=media&token=405dcf3a-f4df-457c-926c-7a680ca73482", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "waLink": "Martillo%20de%20Thor%20con%20valknut",
    "mainSku": "COL-3310"
  },
  {
    "id": "aOJQlytWcdC5O3qIA7vL",
    "waLink": "Collar%20Doble%20Hacha%20Hugin%20y%20Munin",
    "price": 18.95,
    "description": "Collar de hacha de doble filo, adornado con las figuras de dos cuervos de Odín.",
    "updatedAt": 1753189543770,
    "mainSku": "COL-3320",
    "variants": [
      {"color": "yellow", "sku": "COL-3321", "image": "%2Fskus%2FCOL-3321.webp?alt=media&token=4efa01dd-cec9-46e3-b0aa-e9a370f08a08", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3322", "image": "%2Fskus%2FCOL-3322.webp?alt=media&token=88d40b53-2808-4ef1-b1c1-b09f02ce7f7a", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Collar Doble Hacha Hugin y Munin",
    "images": [
      "%2Fnecklaces%2Fviking%2FCollar%20Doble%20Hacha%20Hugin%20y%20Munin%20-%200.webp?alt=media&token=fddd320c-5ff9-4b1d-9f26-0f65761a301e",
      "%2Fnecklaces%2Fviking%2FCollar%20Doble%20Hacha%20Hugin%20y%20Munin%20-%201.webp?alt=media&token=ab2dd6e6-e7b2-4ce7-bd95-3d4d9b033faa",
      "%2Fnecklaces%2Fviking%2FCollar%20Doble%20Hacha%20Hugin%20y%20Munin%20-%202.webp?alt=media&token=7498e0a7-a3e6-4071-8fa8-ff18352c03bb"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3320.webp?alt=media&token=153439c6-6116-4abf-8ef3-a7d80cc45a29",
    "subcategory": 3,
    "status": 1,
    "category": 1,
  },
  {
    "id": "1KE6Gf2N25uTXwlX9sdk",
    "description": "Medallón con elegante diseño dorado de lobos, con valknut superior, y runas nórdicas perimetrales",
    "updatedAt": 1753189565883,
    "images": [
      "%2Fnecklaces%2Fviking%2FLobos%20en%20relieve%2C%20valknut%20y%20runas.webp?alt=media&token=9303f5ba-4b66-4a84-8a1f-274a61cdef18"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3400.webp?alt=media&token=362d3e0e-b915-4e3e-80cb-3dce4ac06aff",
    "category": 1,
    "price": 19,
    "waLink": "Collar%20Lobos%20en%20relieve%2C%20valknut%20y%20runas",
    "mainSku": "COL-3400",
    "variants": [
      {"color": "", "sku": "COL-3400", "image": "%2Fskus%2FCOL-3400.webp?alt=media&token=d32253f5-2ba2-4282-818c-1cbcb0feb0dd", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "subcategory": 3,
    "name": "Lobos en relieve, valknut y runas",
    "status": 1,
    "discount": {"type": 1, "value": 4.1}
  },
  {
    "id": "UfMWqSBMk12N9y9dxvA5",
    "mainSku": "COL-3410",
    "subcategory": 3,
    "status": 1,
    "variants": [
      {"color": "", "sku": "COL-3410", "image": "%2Fskus%2FCOL-3410.webp?alt=media&token=e4d538f3-5190-47e5-b5ca-d8ea8086da84", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Collar de diente de lobo",
    "images": [
      "%2Fnecklaces%2Fviking%2FCollar%20de%20diente%20de%20lobo%20-%200.webp?alt=media&token=ff3209ee-9446-43c5-b58b-afb6ab0206ff",
      "%2Fnecklaces%2Fviking%2FCollar%20de%20diente%20de%20lobo%20-%201.webp?alt=media&token=4fbb0889-2b80-4d38-8f31-488a9ef59795",
      "%2Fnecklaces%2Fviking%2FCollar%20de%20diente%20de%20lobo%20-%202.webp?alt=media&token=ed0fd16d-9cd3-44a6-83da-b6482440545a",
      "%2Fnecklaces%2Fviking%2FCollar%20de%20diente%20de%20lobo%20-%203.webp?alt=media&token=ad857496-b08d-4c1f-acbe-751eb0df9cb9"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3410.webp?alt=media&token=0d4561f9-d5d2-4716-b47f-73902267f9ff",
    "price": 21.75,
    "category": 1,
    "waLink": "Collar%20de%20diente%20de%20lobo",
    "description": "Collar plateado con diseño elegante de forma de colmillo de lobo"
  },
  {
    "id": "HGawjU551YC61Or9oObf",
    "mainSku": "COL-3420",
    "variants": [
      {"color": "", "sku": "COL-3420", "image": "%2Fskus%2FCOL-3420.webp?alt=media&token=37048f9a-27d0-44f0-9350-489ecabc7898", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 17.9,
    "subcategory": 3,
    "name": "Collar Guerrero Berseker",
    "status": 1,
    "images": [
      "%2Fnecklaces%2Fviking%2FCollar%20Guerrero%20Berseker%20-%200.webp?alt=media&token=44a7eba6-e954-40ca-a0f7-953585bc8a0f",
      "%2Fnecklaces%2Fviking%2FCollar%20Guerrero%20Berseker%20-%201.webp?alt=media&token=c3fe7a20-bc0a-4f24-96ca-0bcde99bb0fa",
      "%2Fnecklaces%2Fviking%2FCollar%20Guerrero%20Berseker%20-%202.webp?alt=media&token=f92132e5-dbac-457c-8397-f764e74f914d",
      "%2Fnecklaces%2Fviking%2FCollar%20Guerrero%20Berseker%20-%203.webp?alt=media&token=60ac456c-8ea7-4c88-90d7-8454063f9329"
    ],
    "thumbnail": "%2Fthumbnails%2FCOL-3420.webp?alt=media&token=5f1d60ca-ffe1-4b83-b921-1d8e2326f5e0",
    "description": "Elegante collar con forma de guerrero vikingo, y cuervo en su hombro.",
    "waLink": "Collar%20Guerrero%20Berseker",
    "category": 1
  },
  {
    "id": "KIjWV2PqDYr3SttX8z1j",
    "waLink": "reloj%20CURREN%20Marr%C3%B3n",
    "category": 3,
    "description": "Reloj con correa de cuero marrón y cuerpo de acero inoxidable. Reloj automático (no usa baterías)",
    "images": [
      "%2Fclocks%2Fcurren%201.webp?alt=media&token=6bb9b5b8-2a43-4e80-9efa-37f2be403286",
      "%2Fclocks%2Fcurren%202.webp?alt=media&token=20e11050-2a9e-4414-b660-af7773195fce"
    ],
    "thumbnail": "%2Fthumbnails%2FREL-0010.webp?alt=media&token=19527dc4-8428-4524-8652-265fa9eb8023",
    "createdAt": null,
    "mainSku": "REL-0010",
    "variants": [
      {"color": "", "sku": "REL-0010", "image": "%2Fskus%2FREL-0010.webp?alt=media&token=39f1e9b2-0c22-45c3-8235-dc4d1127ce09", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "status": 0,
    "name": "CURREN Marrón",
    "updatedAt": 1746054964208,
    "price": 40
  },
  {
    "id": "XPWBsMqLsMJqBUQacnL2",
    "status": 0,
    "description": "Reloj dorado de acero inoxidable",
    "updatedAt": 1746967584712,
    "images": [
      "%2Fclocks%2Fdorado%201.webp?alt=media&token=3015fbfc-9ade-468e-8d37-4505ccf1f612",
      "%2Fclocks%2Fdorado%202.webp?alt=media&token=5adb25b0-bbe1-49ba-902e-c0f569069c10"
    ],
    "thumbnail": "%2Fthumbnails%2FREL-1011.webp?alt=media&token=82297f73-2629-46d2-869e-f9ee2b35ee88",
    "price": 47,
    "name": "OLEVS dorado",
    "category": 3,
    "waLink": "reloj%20OLEVS%20dorado",
    "mainSku": "REL-1011",
    "variants": [
      {"color": "", "sku": "REL-1011", "image": "%2Fskus%2FREL-1011.webp?alt=media&token=3e842fa0-848e-4b65-acc1-7d0655f79e21", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null
  },
  {
    "id": "PhhFF9tFi4PHXpNCqAtd",
    "createdAt": null,
    "updatedAt": 1746054964215,
    "status": 0,
    "mainSku": "REL-1012",
    "variants": [
      {"color": "", "sku": "REL-1012", "image": "%2Fskus%2FREL-1012.webp?alt=media&token=4c2f5aaa-3435-4d8c-9fd9-a17f45b2275c", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "price": 47,
    "description": "Reloj negro de acero inoxidable",
    "waLink": "reloj%20OLEVS%20negro",
    "name": "OLEVS negro",
    "category": 3,
    "images": [
      "%2Fclocks%2Freloj%20negro%201.webp?alt=media&token=7d3922b2-4346-45ba-9b22-54dd37d8190f",
      "%2Fclocks%2Freloj%20negro%202.webp?alt=media&token=e28e081d-038a-4eaf-a939-f081d6f30c52"
    ],
    "thumbnail": "%2Fthumbnails%2FREL-1012.webp?alt=media&token=1c55c581-1435-43e8-8393-649f15250ca5"
  },
  {
    "id": "jjr143W5psMhi875zQ8H",
    "updatedAt": null,
    "description": "Reloj de cuerpo dorado y pulsera plateada de acero inoxidable",
    "category": 3,
    "price": 47,
    "images": [
      "%2Fclocks%2Fdorado%20y%20plateado%201.webp?alt=media&token=b5902dba-dabf-4b8f-b1dd-9179cb98e04b",
      "%2Fclocks%2Fdorado%20y%20plateado%202.webp?alt=media&token=9f9534c6-e2d4-4088-8080-77bc5b258150"
    ],
    "thumbnail": "%2Fthumbnails%2FREL-1013.webp?alt=media&token=4fecdce8-de1e-4cca-a832-a92b044fdcf3",
    "waLink": "reloj%20OLEVS%20plateado%20y%20dorado",
    "status": 0,
    "mainSku": "REL-1013",
    "variants": [
      {"color": "", "sku": "REL-1013", "image": "%2Fskus%2FREL-1013.webp?alt=media&token=2cf6353f-88f7-40f6-ba2c-396cefcebb31", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "name": "OLEVS plateado y dorado",
    "createdAt": null
  },
  {
    "id": "h93xc1ge2RjzjGI4J5Eh",
    "category": 3,
    "updatedAt": 1746967584719,
    "status": 0,
    "mainSku": "REL-1020",
    "variants": [
      {"color": "", "sku": "REL-1020", "image": "%2Fskus%2FREL-1020.webp?alt=media&token=79886aef-309e-43a1-888a-f57c52049c35", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "description": "Reloj de acero inoxidable, de diseño en rombo y en color plateado",
    "images": [
      "%2Fclocks%2Freloj%20plateado%201.webp?alt=media&token=e6f7bd2e-c1cf-4c94-b1f9-39ca117abbd1",
      "%2Fclocks%2Freloj%20plateado%202.webp?alt=media&token=8871237f-b1d8-4852-96d6-d2ab755a7f72"
    ],
    "thumbnail": "%2Fthumbnails%2FREL-1020.webp?alt=media&token=b46c4b7b-ec18-40e0-844b-d6b4f1a10a82",
    "name": "OLEVS plateado rómbico",
    "waLink": "reloj%20OLEVS%20plateado%20r%C3%B3mbico",
    "price": 43,
    "createdAt": null,
    "rating": 0
  },
  {
    "id": "EzZbPJ6gu3Cnx2MxdKPq",
    "name": "OLEVS plateado y azul",
    "updatedAt": 1746967584720,
    "category": 3,
    "images": [
      "%2Fclocks%2Fplateado%20con%20azul%201.webp?alt=media&token=f26df29a-828b-4392-ba84-e8e078716b61",
      "%2Fclocks%2Fplateado%20con%20azul%202.webp?alt=media&token=e37f7da4-cf1a-4631-a8b8-e713a82df95c"
    ],
    "thumbnail": "%2Fthumbnails%2FREL-1030.webp?alt=media&token=b53a3437-3e5f-43cb-a9eb-3b66035839bf",
    "createdAt": null,
    "waLink": "reloj%20OLEVS%20plateado%20y%20azul",
    "description": "Reloj de acero inoxidable, en color plateado y con visor de color azul brillante",
    "status": 0,
    "price": 43,
    "mainSku": "REL-1030",
    "variants": [
      {"color": "", "sku": "REL-1030", "image": "%2Fskus%2FREL-1030.webp?alt=media&token=701c1b67-6e1f-44d1-99f9-45a546e37610", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
  }
]