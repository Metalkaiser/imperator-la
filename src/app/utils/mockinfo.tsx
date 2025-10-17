import { productProps, PaymentMethod, shippingMethod, GiftOption, sale, activity_logs } from "./types";
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

export const mockSales: sale[] = [
  
];

export const mockSpecials: sale[] = [
  
];

export const mockActivity: activity_logs[] = [
  {
    id: "id_1",
    timestamp: Date.parse("08-25-2025"),
    userId: "id_1",
    username: "pEpItO PaTEacUloS",
    action: "product_edit",
    target: {
      collection: "products",
      item: "gpyYvQqO7tJNYDP99EAc",
    },
    diff: [
      {
        item: "status",
        oldValue: 1,
        newValue: 0
      },
      {
        item: "quantity",
        oldValue: 1,
        newValue: 0
      }
    ]
  },
  {
    id: "id_2",
    timestamp: Date.parse("08-29-2025"),
    userId: "id_2",
    username: "la negra tiene tumbao",
    action: "product_delete",
    target: {
      collection: "products",
      item: "VcAuQc9niMgrMMGygfhD"
    },
    diff: [
      {
        item: "status",
        oldValue: 1,
        newValue: 2
      },
      {
        item: "isDeleted",
        oldValue: false,
        newValue: true
      }
    ]
  },
  {
    id: "id_3",
    timestamp: Date.parse("10-03-2025"),
    userId: "id_2",
    username: "la negra tiene tumbao",
    action: "product_created",
    target: {
      collection: "products",
      item: "Z5DMWmgvQCUqsYxqGN91"
    }
  },
];

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
      {"color": "", "sku": "AAI-0010", "image": "/misc/test-thumbnails/skus/AAI-0010.webp", "stock": [
        {"name": "single", "quantity": 0}
      ]}
    ],
    "images": [
      "/misc/test-images/zarcillos/Piercing%20negro.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0010.webp",
    "waLink": "Piercing%20negro%20%28a%20presión%29",
    "mainSku": "AAI-0010"
  },
  {
    "id": "gpyYvQqO7tJNYDP99EAc",
    "discount": {"type": 1, "value": 2.2},
    "price": 9,
    "name": "Piercing de cadena (unidad)",
    "variants": [
      {"color": "", "sku": "AAI-0020", "image": "/misc/test-thumbnails/skus/AAI-0020.webp", "stock": [
        {"name": "single", "quantity": 0}
      ]}
    ],
    "category": 4,
    "images": [
      "/misc/test-images/zarcillos/Piercieng%20de%20cadena.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0020.webp",
    "description": "Piercing de estilo rockero con pequeña cadena, de color negro, a presión",
    "waLink": "Piercieng%20de%20cadena%20%28a%20presión%29",
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
      "/misc/test-images/zarcillos/Arete%20de%20pluma%201.webp",
      "/misc/test-images/zarcillos/Arete%20de%20pluma%202.webp",
      "/misc/test-images/zarcillos/Arete%20de%20pluma%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0030.webp",
    "updatedAt": 1753186769009,
    "name": "Arete de pluma (unidad)",
    "price": 9,
    "description": "Arete a presión, con pequeña cadena y diseño de pluma elegante. Disponible en plateado y en negro",
    "waLink": "Arete%20de%20pluma%20%28a%20presión%29",
    "variants": [
        {"color": "gray", "sku": "AAI-0031", "image": "/misc/test-thumbnails/skus/AAI-0031.webp", "stock": [
            {"name": "single", "quantity": 1}
        ]},
        {"color": "black", "sku": "AAI-0032", "image": "/misc/test-thumbnails/skus/AAI-0032.webp", "stock": [
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
        {"sku": "AAI-0041", "color": "gray", "image": "/misc/test-thumbnails/skus/AAI-0041.webp", "stock": [
            {"name": "single", "quantity": 6}
        ]},
        {"color": "black", "sku": "AAI-0042", "image": "/misc/test-thumbnails/skus/AAI-0042.webp", "stock": [
            {"name": "single", "quantity": 6}
        ]}
    ],
    "updatedAt": 1753186819756,
    "status": 1,
    "category": 4,
    "name": "Arete de cruz (unidad)",
    "createdAt": null,
    "images": [
      "/misc/test-images/zarcillos/Arete%20de%20cruz%201.webp",
      "/misc/test-images/zarcillos/Arete%20de%20cruz%202.webp",
      "/misc/test-images/zarcillos/Arete%20de%20cruz%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0040.webp",
    "waLink": "Arete%20de%20cruz%20%28a%20presión%29",
    "mainSku": "AAI-0040"
  },
  {
    "id": "tx44epEpN0MJQ51sXf2f",
    "images": [
        "/misc/test-images/zarcillos/Piercing%20vegvisir%201.webp",
        "/misc/test-images/zarcillos/Piercing%20par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3010.webp",
    "name": "Piercing vegvisir túneles nº8 (par)",
    "variants": [
      {"color": "", "sku": "AAI-3010", "image": "/misc/test-thumbnails/skus/AAI-3010.webp", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "mainSku": "AAI-3010",
    "description": "Piercing tipo túnel de 8mm, con diseño de vegvisir a cada lado",
    "createdAt": null,
    "waLink": "Piercing%20vegvisir%20túneles%20n%C2%BA8",
    "updatedAt": 1746966807653,
    "status": 1,
    "price": 10.75,
    "category": 4
  },
  {
    "id": "RSAyLx3cCAu8rhST9tMn",
    "category": 4,
    "images": [
        "/misc/test-images/zarcillos/Piercing%20valknut%201.webp",
        "/misc/test-images/zarcillos/Piercing%20valknut%202.webp",
        "/misc/test-images/zarcillos/Piercing%20par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3020.webp",
    "updatedAt": 1746966814606,
    "price": 10.75,
    "name": "Piercing valknut túneles nº8 (par)",
    "status": 1,
    "variants": [
      {"color": "", "sku": "AAI-3020", "image": "/misc/test-thumbnails/skus/AAI-3020.webp", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "mainSku": "AAI-3020",
    "createdAt": null,
    "description": "Piercing tipo túnel de 8mm, con diseño de valknut a cada lado",
    "waLink": "Piercing%20valknut%20túneles%20n%C2%BA8"
  },
  {
    "id": "QKFrYijfrQndpQ1DID0h",
    "mainSku": "AAI-3030",
    "updatedAt": 1746966823094,
    "createdAt": null,
    "name": "Piercing árbol de la vida túneles nº8 (par)",
    "price": 10.75,
    "variants": [
      {"color": "", "sku": "AAI-3030", "image": "/misc/test-thumbnails/skus/AAI-3030.webp", "stock": [
        {"name": "single", "quantity": 2}
      ]}
    ],
    "waLink": "Piercing%20árbol%20de%20la%20vida%20túneles%20n%C2%BA8",
    "status": 1,
    "description": "Piercing tipo túnel de 8mm, con diseño de Yggdrasil y runas a cada lado",
    "category": 4,
    "images": [
        "/misc/test-images/zarcillos/Árbol%20de%20la%20vida.webp",
        "/misc/test-images/zarcillos/Piercing%20par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3030.webp",
    "rating": 0
  },
  {
    "id": "mrfJZTypWGJ3vz30yRIw",
    "name": "Piercing lobo túneles nº8 (par)",
    "variants": [
      {"color": "", "sku": "AAI-3040", "image": "/misc/test-thumbnails/skus/AAI-3040.webp", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "status": 0,
    "images": [
        "/misc/test-images/zarcillos/Lobo.webp",
        "/misc/test-images/zarcillos/Piercing%20par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3040.webp",
    "waLink": "Piercing%20lobo%20túneles%20n%C2%BA8",
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
        "/misc/test-images/anillos/León%20ojos%20rojos%201.webp",
        "/misc/test-images/anillos/León%20ojos%20rojos%202.webp",
        "/misc/test-images/anillos/León%20ojos%20rojos%203.webp",
        "/misc/test-images/anillos/León%20ojos%20rojos%204.webp",
        "/misc/test-images/anillos/León%20ojos%20rojos%205.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0010.webp",
    "price": 18,
    "mainSku": "ANI-0010",
    "variants": [
      {"sku": "ANI-0011", "color": "yellow", "image": "/misc/test-thumbnails/skus/ANI-0011.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 0},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 0},
          {"name": "11", "quantity": 0},
          {"name": "12", "quantity": 0},
          {"name": "13", "quantity": 0}
      ]},
      {"color": "gray", "sku": "ANI-0012", "image": "/misc/test-thumbnails/skus/ANI-0012.webp", "stock": [
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
    "waLink": "anillo%20León%20de%20ojos%20rojos",
    "discount": {type: 1, value: 2.2},
    "subcategory": 0,
    "status": 1,
    "description": "Anillo elegante con diseño de león, con ojos rojos de cristal. Disponible en dorado y en plateado",
    "updatedAt": 1753186975107
  },
  {
    "id": "paav0sOsxMGnyxLlg5Ww",
    "variants": [
      {"sku": "ANI-0021", "color": "yellow", "image": "/misc/test-thumbnails/skus/ANI-0021.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0022", "image": "/misc/test-thumbnails/skus/ANI-0022.webp", "stock": [
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
        "/misc/test-images/anillos/Estrella%20de%20David%201.webp",
        "/misc/test-images/anillos/Estrella%20de%20David%202.webp",
        "/misc/test-images/anillos/Estrella%20de%20David%203.webp",
        "/misc/test-images/anillos/Estrella%20de%20David%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0020.webp",
    "waLink": "anillo%20Estrella%20de%20David",
    "subcategory": 0
  },
  {
    "id": "uXclq9N2qVu3JVEj91uX",
    "status": 1,
    "createdAt": null,
    "name": "Octogonal de León",
    "category": 0,
    "waLink": "anillo%20Octogonal%20de%20León",
    "updatedAt": 1753187075276,
    "description": "Anillo elegante con diseño de león y forma hexagonal. Disponible en dorado y en plateado",
    "images": [
        "/misc/test-images/anillos/Octogonal%20de%20León%201.webp",
        "/misc/test-images/anillos/Octogonal%20de%20León%202.webp",
        "/misc/test-images/anillos/Octogonal%20de%20León%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0030.webp",
    "variants": [
        {"sku": "ANI-0031", "color": "yellow", "image": "/misc/test-thumbnails/skus/ANI-0031.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]},
        {"sku": "ANI-0032", "color": "gray", "image": "/misc/test-thumbnails/skus/ANI-0032.webp", "stock": [
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
        "/misc/test-images/anillos/Elegante%20lujoso%201.webp",
        "/misc/test-images/anillos/Elegante%20lujoso%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0040.webp",
    "description": "Anillo dorado elegante, adornado con circones",
    "updatedAt": 1753187214862,
    "category": 0,
    "mainSku": "ANI-0040",
    "subcategory": 0,
    "discount": {"type": 1, "value": 4.25},
    "createdAt": null,
    "price": 19,
    "variants": [
      {"sku": "ANI-0040", "color": "", "image": "/misc/test-thumbnails/skus/ANI-0040.webp", "stock": [
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
        {"color": "yellow", "sku": "ANI-0051", "image": "/misc/test-thumbnails/skus/ANI-0051.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
        ]},
        {"color": "black", "sku": "ANI-0052", "image": "/misc/test-thumbnails/skus/ANI-0052.webp", "stock": [
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
        "/misc/test-images/anillos/Jaguar%201.webp",
        "/misc/test-images/anillos/Jaguar%202.webp",
        "/misc/test-images/anillos/Jaguar%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0050.webp",
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
      {"color": "", "sku": "ANI-0060", "image": "/misc/test-thumbnails/skus/ANI-0060.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Manifiesto%20de%20distinción",
    "images": [
        "/misc/test-images/anillos/A%20manifest%20of%20distinction%201.webp",
        "/misc/test-images/anillos/A%20manifest%20of%20distinction%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0060.webp",
    "price": 18,
    "rating": 0
  },
  {
    "id": "5vm28WkdicTqT9uz3YFy",
    "updatedAt": 1753187309798,
    "images": [
        "/misc/test-images/anillos/Nautico%201.webp",
        "/misc/test-images/anillos/Nautico%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0070.webp",
    "variants": [
      {"color": "", "sku": "ANI-0070", "image": "/misc/test-thumbnails/skus/ANI-0070.webp", "stock": [
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
    "waLink": "anillo%20Náutico",
    "category": 0,
    "mainSku": "ANI-0070",
    "subcategory": 0,
    "description": "Anillo elegante con diseño de brújula navegante"
  },
  {
    "id": "3QRhVuojOvohgBB1ub40",
    "images": [
        "/misc/test-images/anillos/ANI-0080.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Redondo%20dorado%201.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Redondo%20dorado%202.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Redondo%20dorado%203.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Redondo%20dorado%204.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Redondo%20plateado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0080.webp",
    "updatedAt": 1753187343710,
    "variants": [
      {"color": "yellow", "sku": "ANI-0081", "image": "/misc/test-thumbnails/skus/ANI-0081.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0082", "image": "/misc/test-thumbnails/skus/ANI-0082.webp", "stock": [
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
      {"color": "yellow", "sku": "ANI-0091", "image": "/misc/test-thumbnails/skus/ANI-0091.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0092", "image": "/misc/test-thumbnails/skus/ANI-0092.webp", "stock": [
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
        "/misc/test-images/anillos/ANI-0090.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Octogonal%20dorado.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Octogonal%20mixto.webp",
        "/misc/test-images/anillos/Anillo%20San%20Benito%20Octogonal%20plateado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0090.webp",
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
      {"color": "yellow", "sku": "ANI-0102", "image": "/misc/test-thumbnails/skus/ANI-0102.webp", "stock": [
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
        "/misc/test-images/anillos/Corona%20de%20rey.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0102.webp",
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
      {"color": "", "sku": "ANI-0110", "image": "/misc/test-thumbnails/skus/ANI-0110.webp", "stock": [
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
        "/misc/test-images/anillos/Plumas%20refinadas%201.webp",
        "/misc/test-images/anillos/Plumas%20refinadas%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0110.webp",
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
      {"color": "", "sku": "ANI-1010", "image": "/misc/test-thumbnails/skus/ANI-1010.webp", "stock": [
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
    "waLink": "anillo%20Cruz%20de%20Jerusalén",
    "mainSku": "ANI-1010",
    "images": [
        "/misc/test-images/anillos/masonicos/Cruz%20de%20Jerusalén%201.webp",
        "/misc/test-images/anillos/masonicos/Cruz%20de%20Jerusalén%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1010.webp",
    "price": 18.75,
    "status": 1
  },
  {
    "id": "YfxYR8wDFVB1cNFohx39",
    "price": 21.3,
    "mainSku": "ANI-1020",
    "name": "Masónico redondo latín",
    "waLink": "anillo%20Masónico%20redondo%20latín",
    "status": 1,
    "variants": [
      {"color": "yellow", "sku": "ANI-1021", "image": "/misc/test-thumbnails/skus/ANI-1021.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-1022", "image": "/misc/test-thumbnails/skus/ANI-1022.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Masónico%20redondo%20latín%201.webp",
        "/misc/test-images/anillos/masonicos/Masónico%20redondo%20latín%202.webp",
        "/misc/test-images/anillos/masonicos/Masónico%20redondo%20latín%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1020.webp",
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
      {"color": "", "sku": "ANI-1030", "image": "/misc/test-thumbnails/skus/ANI-1030.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Masónico%20cuadrado",
    "images": [
        "/misc/test-images/anillos/masonicos/Masónico%20cuadrado%201.webp",
        "/misc/test-images/anillos/masonicos/Masónico%20cuadrado%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1030.webp",
    "price": 19.5,
    "createdAt": null,
    "updatedAt": 1753187445039
  },
  {
    "id": "erzHhUs0B6OE4H50iHew",
    "category": 0,
    "price": 21.3,
    "images": [
        "/misc/test-images/anillos/masonicos/Masónico%20azul%201.webp",
        "/misc/test-images/anillos/masonicos/Masónico%20azul%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1040.webp",
    "name": "Masónico azul",
    "createdAt": null,
    "status": 1,
    "updatedAt": 1753187455415,
    "subcategory": 1,
    "waLink": "anillo%20Masónico%20azul",
    "variants": [
      {"color": "", "sku": "ANI-1040", "image": "/misc/test-thumbnails/skus/ANI-1040.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Masónico%20de%20lujo%201.webp",
        "/misc/test-images/anillos/masonicos/Masónico%20de%20lujo%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1050.webp",
    "createdAt": null,
    "mainSku": "ANI-1050",
    "waLink": "anillo%20Masónico%20de%20lujo",
    "updatedAt": 1753187467758,
    "variants": [
      {"color": "", "sku": "ANI-1050", "image": "/misc/test-thumbnails/skus/ANI-1050.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Triángulo%20masónico%201.webp",
        "/misc/test-images/anillos/masonicos/Triángulo%20masónico%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1060.webp",
    "description": "Anilo plateado con forma de triángulo y figura del ojo de la Providencia",
    "createdAt": null,
    "mainSku": "ANI-1060",
    "price": 18.3,
    "updatedAt": 1753187478463,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1060", "image": "/misc/test-thumbnails/skus/ANI-1060.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Triángulo%20masónico",
    "category": 0,
    "subcategory": 1,
    "name": "Triángulo masónico",
    "rating": 0
  },
  {
    "id": "Z5DMWmgvQCUqsYxqGN91",
    "category": 0,
    "images": [
        "/misc/test-images/anillos/masonicos/Masónico%20master%201.webp",
        "/misc/test-images/anillos/masonicos/Masónico%20master%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1080.webp",
    "mainSku": "ANI-1080",
    "createdAt": null,
    "description": "Anillo de escuadra masónica, de cuerpo redondo ajustado y dorado, y adornado con las palabras 'Master' y 'Mason'",
    "subcategory": 1,
    "name": "Masónico master",
    "price": 18.95,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1080", "image": "/misc/test-thumbnails/skus/ANI-1080.webp", "stock": [
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
    "waLink": "anillo%20Masónico%20master"
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
        "/misc/test-images/anillos/masonicos/Anillo%20Cruz%20templarios%201.webp",
        "/misc/test-images/anillos/masonicos/Anillo%20Cruz%20templarios%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1090.webp",
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1090", "image": "/misc/test-thumbnails/skus/ANI-1090.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Masónico%20spin%201.webp",
        "/misc/test-images/anillos/masonicos/Masónico%20spin%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1100.webp",
    "updatedAt": 1753187515534,
    "createdAt": null,
    "subcategory": 1,
    "variants": [
      {"color": "yellow", "sku": "ANI-1101", "image": "/misc/test-thumbnails/skus/ANI-1101.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-1102", "image": "/misc/test-thumbnails/skus/ANI-1102.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Masónico%20spin"
  },
  {
    "id": "MwzKI1WcVr5OTwuH64k9",
    "category": 0,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-2010", "image": "/misc/test-thumbnails/skus/ANI-2010.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Calavera%20de%20ojos%20rojos%201.webp",
      "/misc/test-images/anillos/rockeros/Calavera%20de%20ojos%20rojos%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2010.webp",
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
      "/misc/test-images/anillos/rockeros/Calavera%201.webp",
      "/misc/test-images/anillos/rockeros/Calavera%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2020.webp",
    "price": 19.3,
    "subcategory": 2,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-2020", "image": "/misc/test-thumbnails/skus/ANI-2020.webp", "stock": [
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
      {"color": "", "sku": "ANI-2030", "image": "/misc/test-thumbnails/skus/ANI-2030.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Calavera%20gritando%201.webp",
      "/misc/test-images/anillos/rockeros/Calavera%20gritando%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2030.webp",
    "waLink": "anillo%20Calavera%20gritando"
  },
  {
    "id": "vgR04m4rvchCjRlDu0ac",
    "images": [
      "/misc/test-images/anillos/rockeros/Circulos%20de%20calavera%201.webp",
      "/misc/test-images/anillos/rockeros/Circulos%20de%20calavera%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2040.webp",
    "waLink": "anillo%20Circulos%20de%20calavera",
    "category": 0,
    "variants": [
      {"color": "", "sku": "ANI-2040", "image": "/misc/test-thumbnails/skus/ANI-2040.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Calavera%20mexicana%20ojos%20verdes%201.webp",
      "/misc/test-images/anillos/rockeros/Calavera%20mexicana%20ojos%20verdes%202.webp",
      "/misc/test-images/anillos/rockeros/Calavera%20mexicana%20ojos%20verdes%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2050.webp",
    "price": 18.7,
    "name": "Calavera mexicana ojos verdes",
    "variants": [
      {"color": "", "sku": "ANI-2050", "image": "/misc/test-thumbnails/skus/ANI-2050.webp", "stock": [
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
      {"color": "", "sku": "ANI-2060", "image": "/misc/test-thumbnails/skus/ANI-2060.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Medusa%201.webp",
      "/misc/test-images/anillos/rockeros/Medusa%202.webp",
      "/misc/test-images/anillos/rockeros/Medusa%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2060.webp",
    "subcategory": 2,
    "status": 1,
    "category": 0,
    "numReviews": 0
  },
  {
    "id": "3XMuB3qNC4OdQ424AZfp",
    "category": 0,
    "variants": [
      {"color": "cyan", "sku": "ANI-2081", "image": "/misc/test-thumbnails/skus/ANI-2081.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "blue", "sku": "ANI-2082", "image": "/misc/test-thumbnails/skus/ANI-2082.webp", "stock": [
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
        "/misc/test-images/anillos/rockeros/Ojo%20malvado%20azul%201.webp",
        "/misc/test-images/anillos/rockeros/Ojo%20malvado%20azul%202.webp",
        "/misc/test-images/anillos/rockeros/Ojo%20malvado%20azul%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2080.webp",
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
      {"color": "", "sku": "ANI-2090", "image": "/misc/test-thumbnails/skus/ANI-2090.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Guerrero%20espartano%201.webp",
      "/misc/test-images/anillos/rockeros/Guerrero%20espartano%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2090.webp"
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
      {"color": "", "sku": "ANI-2100", "image": "/misc/test-thumbnails/skus/ANI-2100.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Anillo%2013%201.webp",
      "/misc/test-images/anillos/rockeros/Anillo%2013%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2100.webp",
    "description": "Anillo con el número 13 en frente y de forma cuadrada",
    "status": 1,
    "name": "Anillo 13",
    "createdAt": null
  },
  {
    "id": "RS3qq8FTRtM0NInBZlJp",
    "price": 17.5,
    "images": [
      "/misc/test-images/anillos/rockeros/serpiente%20enrollada%201.webp",
      "/misc/test-images/anillos/rockeros/serpiente%20enrollada%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2120.webp",
    "mainSku": "ANI-2120",
    "waLink": "anillo%20Serpiente%20enrollada",
    "updatedAt": 1753187705046,
    "variants": [
      {"color": "", "sku": "ANI-2120", "image": "/misc/test-thumbnails/skus/ANI-2120.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Garras%20con%20gema%20azul%203.webp",
      "/misc/test-images/anillos/rockeros/Garras%20con%20gema%20azul%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2140.webp",
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-2140", "image": "/misc/test-thumbnails/skus/ANI-2140.webp", "stock": [
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
    "waLink": "anillo%20Árbol%20de%20la%20vida",
    "price": 19.9,
    "status": 1,
    "category": 0,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3010", "image": "/misc/test-thumbnails/skus/ANI-3010.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Árbol%20de%20la%20vida%201.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3010.webp"
  },
  {
    "id": "Gt6KQNDKUNEc6N7Xiafz",
    "mainSku": "ANI-3020",
    "name": "Vegvisir con hachas",
    "variants": [
      {"color": "yellow", "sku": "ANI-3021", "image": "/misc/test-thumbnails/skus/ANI-3021.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3022", "image": "/misc/test-thumbnails/skus/ANI-3022.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Vegvisir%20con%20hachas%201.webp",
      "/misc/test-images/anillos/vikingos/Vegvisir%20con%20hachas%202.webp",
      "/misc/test-images/anillos/vikingos/Vegvisir%20con%20hachas%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3020.webp",
    "price": 17.5,
    "createdAt": null
  },
  {
    "id": "GJ1MdaoxklN6SBeurovH",
    "name": "Vikingo vegvisir",
    "variants": [
      {"color": "yellow", "sku": "ANI-3031", "image": "/misc/test-thumbnails/skus/ANI-3031.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3032", "image": "/misc/test-thumbnails/skus/ANI-3032.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Vikingo%20vegvisir%201.webp",
      "/misc/test-images/anillos/vikingos/Vikingo%20vegvisir%202.webp",
      "/misc/test-images/anillos/vikingos/Vikingo%20vegvisir%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3030.webp",
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
      {"color": "yellow", "sku": "ANI-3041", "image": "/misc/test-thumbnails/skus/ANI-3041.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3042", "image": "/misc/test-thumbnails/skus/ANI-3042.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Runas%20vikingas%201.webp",
      "/misc/test-images/anillos/vikingos/Runas%20vikingas%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3040.webp",
    "mainSku": "ANI-3040",
    "subcategory": 3,
    "updatedAt": 1753187780184
  },
  {
    "id": "42fIU8cvjdXEBSjcjnVy",
    "variants": [
      {"color": "", "sku": "ANI-3050", "image": "/misc/test-thumbnails/skus/ANI-3050.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Cráneo%20de%20cuervo%201.webp",
      "/misc/test-images/anillos/vikingos/Cráneo%20de%20cuervo%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3050.webp",
    "mainSku": "ANI-3050",
    "category": 0,
    "status": 1,
    "createdAt": null,
    "subcategory": 3,
    "name": "Cráneo de cuervo",
    "updatedAt": 1753187794008,
    "waLink": "anillo%20Cráneo%20de%20cuervo",
    "price": 17.5,
    "description": "Anillo de cráneo de cuervo, adornado con un vegvisir en la frente",
    "numReviews": 0
  },
  {
    "id": "DrdyUqGNTx7MiHFaYJdV",
    "subcategory": 3,
    "images": [
      "/misc/test-images/anillos/vikingos/Lobo%20furioso%201.webp",
      "/misc/test-images/anillos/vikingos/Lobo%20furioso%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3060.webp",
    "updatedAt": 1753187944624,
    "category": 0,
    "mainSku": "ANI-3060",
    "price": 18,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-3060", "image": "/misc/test-thumbnails/skus/ANI-3060.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Lobo%20extravagante%201.webp",
      "/misc/test-images/anillos/vikingos/Lobo%20extravagante%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3070.webp",
    "waLink": "anillo%20Lobo%20extravagante",
    "variants": [
      {"color": "", "sku": "ANI-3070", "image": "/misc/test-thumbnails/skus/ANI-3070.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Anillo%20lobo%20valknut%201.webp",
      "/misc/test-images/anillos/vikingos/Anillo%20lobo%20valknut%202.webp",
      "/misc/test-images/anillos/vikingos/Anillo%20lobo%20valknut%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3080.webp",
    "category": 0,
    "price": 17.9,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3080", "image": "/misc/test-thumbnails/skus/ANI-3080.webp", "stock": [
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
      {"color": "", "sku": "ANI-3101", "image": "/misc/test-thumbnails/skus/ANI-3101.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Anillo%20valknut.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3101.webp"
  },
  {
    "id": "B3fTJvc742g1vx3Lyybp",
    "images": [
      "/misc/test-images/anillos/vikingos/Triqueta.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3130.webp",
    "category": 0,
    "price": 19,
    "updatedAt": 1753188040360,
    "status": 1,
    "name": "Triqueta",
    "mainSku": "ANI-3130",
    "discount": {"type": 1, "value": 4.1},
    "variants": [
      {"color": "", "sku": "ANI-3130", "image": "/misc/test-thumbnails/skus/ANI-3130.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Vegvisir%20refinado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3141.webp",
    "waLink": "anillo%20Vegvisir%20refinado",
    "discount": {"type": 0, "value": 21},
    "description": "Anillo dorado, adornado con un vegvisir central",
    "updatedAt": 1753188068840,
    "status": 1,
    "mainSku": "ANI-3141",
    "createdAt": null,
    "category": 0,
    "variants": [
      {"color": "", "sku": "ANI-3141", "image": "/misc/test-thumbnails/skus/ANI-3141.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Runas%20con%20vegvisir%20(plateado)%201.webp",
      "/misc/test-images/anillos/vikingos/Runas%20con%20vegvisir%20(plateado)%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3152.webp",
    "price": 18.75,
    "variants": [
      {"color": "", "sku": "ANI-3152", "image": "/misc/test-thumbnails/skus/ANI-3152.webp", "stock": [
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
      {"color": "", "sku": "ANI-3161", "image": "/misc/test-thumbnails/skus/ANI-3161.webp", "stock": [
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
        "/misc/test-images/anillos/vikingos/Runas%20con%20valknut%20(dorado)%201.webp",
        "/misc/test-images/anillos/vikingos/Runas%20con%20valknut%20(dorado)%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3161.webp",
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
      {"color": "", "sku": "ANI-3170", "image": "/misc/test-thumbnails/skus/ANI-3170.webp", "stock": [
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
        "/misc/test-images/anillos/vikingos/Anillo%20Martillo%20de%20Thor%201.webp",
        "/misc/test-images/anillos/vikingos/Anillo%20Martillo%20de%20Thor%202.webp",
        "/misc/test-images/anillos/vikingos/Anillo%20Martillo%20de%20Thor%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3170.webp",
    "price": 17.5
  },
  {
    "id": "Y4CIXqEzDlJEsSy1ohRQ",
    "category": 2,
    "updatedAt": 1753188207578,
    "images": [
        "/misc/test-images/brazaletes/elegantes/Brazalete%20elegante%20de%20runas%20vikingo%201.webp",
        "/misc/test-images/brazaletes/elegantes/Brazalete%20elegante%20de%20runas%20vikingo%202.webp",
        "/misc/test-images/brazaletes/elegantes/Brazalete%20elegante%20de%20runas%20vikingo%203.webp",
        "/misc/test-images/brazaletes/elegantes/Brazalete%20elegante%20de%20runas%20vikingo%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0010.webp",
    "name": "Brazalete elegante de runas vikingo",
    "variants": [
      {"color": "yellow", "sku": "BRA-0011", "image": "/misc/test-thumbnails/skus/BRA-0011.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "BRA-0012", "image": "/misc/test-thumbnails/skus/BRA-0012.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "black", "sku": "BRA-0013", "image": "/misc/test-thumbnails/skus/BRA-0013.webp", "stock": [
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
      "/misc/test-images/brazaletes/elegantes/Pulsera%20piedra%20de%20ágata%20azul%20esmerilada%20-%200.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera%20piedra%20de%20ágata%20azul%20esmerilada%20-%201.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0020.webp",
    "variants": [
      {"color": "", "sku": "BRA-0020", "image": "/misc/test-thumbnails/skus/BRA-0020.webp", "stock": [
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
      {"color": "", "sku": "BRA-0030", "image": "/misc/test-thumbnails/skus/BRA-0030.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "mainSku": "BRA-0030",
    "subcategory": 0,
    "images": [
      "/misc/test-images/brazaletes/elegantes/Brazalete%20piedra%20de%20ojo%20de%20tigre%2001.webp",
      "/misc/test-images/brazaletes/elegantes/Brazalete%20piedra%20de%20ojo%20de%20tigre%2002.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0030.webp",
    "description": "Elegante brazalete hecho de cuentas de ojo de tigre amarillo, con deparadores y broche en acero inoxidable",
    "status": 1
  },
  {
    "id": "hEyMPh4dQFS65sgFzhb5",
    "price": 14.75,
    "category": 2,
    "images": [
      "/misc/test-images/brazaletes/elegantes/Pulsera%20piedra%20volcánica%20-%200.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera%20piedra%20volcánica%20-%201.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0040.webp",
    "description": "Pulsera de cuentas de piedra volcánica, con separadores y broche de acero inoxidable",
    "mainSku": "BRA-0040",
    "subcategory": 0,
    "status": 1,
    "waLink": "Pulsera%20piedra%20volcánica",
    "name": "Pulsera piedra volcánica",
    "variants": [
      {"color": "", "sku": "BRA-0040", "image": "/misc/test-thumbnails/skus/BRA-0040.webp", "stock": [
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
      {"color": "black", "sku": "BRA-0051", "image": "/misc/test-thumbnails/skus/BRA-0051.webp", "stock": [
        {"name": "19mm", "quantity": 1},
        {"name": "21mm", "quantity": 1}
      ]},
      {"color": "brown", "sku": "BRA-0053", "image": "/misc/test-thumbnails/skus/BRA-0053.webp", "stock": [
        {"name": "19mm", "quantity": 1},
        {"name": "21mm", "quantity": 0}
      ]}
    ],
    "description": "Brazalete de cuero legítimo con broche magnético en acero inoxidable. Disponible en colores marrón y negro. Disponibles en 19cm y 21cm.",
    "price": 17.5,
    "subcategory": 0,
    "status": 1,
    "images": [
      "/misc/test-images/brazaletes/elegantes/Brazalete%20de%20cuero%20legítimo%20-%200.webp",
      "/misc/test-images/brazaletes/elegantes/Brazalete%20de%20cuero%20legítimo%20-%201.webp",
      "/misc/test-images/brazaletes/elegantes/Brazalete%20de%20cuero%20legítimo%20-%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0050.webp"
  },
  {
    "id": "Hbojhb1uG5Qb3dXPXFAi",
    "images": [
      "/misc/test-images/brazaletes/elegantes/Pulsera%20Twist%204mm%20-%200.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera%20Twist%204mm%20-%201.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera%20Twist%204mm%20-%202.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera%20Twist%204mm%20-%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0060.webp",
    "price": 12.5,
    "updatedAt": 1753188259752,
    "name": "Pulsera Twist 4mm",
    "description": "Pulsera de tejido retorcido, de acero inoxidable. Disponible en dorado y en plateado.",
    "status": 1,
    "category": 2,
    "variants": [
      {"color": "yellow", "sku": "BRA-0061", "image": "/misc/test-thumbnails/skus/BRA-0061.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "BRA-0062", "image": "/misc/test-thumbnails/skus/BRA-0062.webp", "stock": [
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
      "/misc/test-images/brazaletes/masonicos/Brazalete%20de%20cuero%20y%20compás%20masónico.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-1010.webp",
    "mainSku": "BRA-1010",
    "variants": [
      {"color": "", "sku": "BRA-1010", "image": "/misc/test-thumbnails/skus/BRA-1010.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 2,
    "status": 1,
    "createdAt": null,
    "subcategory": 1,
    "name": "Brazalete de cuero y compás masónico",
    "updatedAt": 1748353304238,
    "waLink": "Brazalete%20de%20cuero%20y%20compás%20masónico",
    "price": 19.75,
    "description": "Brazalete de escuadra masónica en acero inoxidable y correa de cuero negro genuino de calidad",
    "numReviews": 0
  },
  {
    "id": "mr0gjFK3FqWL4x3FtRCX",
    "mainSku": "BRA-3010",
    "variants": [
      {"color": "", "sku": "BRA-3010", "image": "/misc/test-thumbnails/skus/BRA-3010.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete%20vikingo.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3010.webp",
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
    "waLink": "Brazalete%20de%20cuero%20legítimo%20y%20martillo%20de%20Thor",
    "description": "Brazalete con forma de martillo de Thor en acero inoxidable y correa de cuero negro genuino",
    "createdAt": null,
    "category": 2,
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete%20de%20cuero%20legítimo%20y%20martillo%20de%20Thor%201.webp",
      "/misc/test-images/brazaletes/vikingos/Brazalete%20de%20cuero%20legítimo%20y%20martillo%20de%20Thor%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3020.webp",
    "name": "Brazalete de cuero legítimo y martillo de Thor",
    "status": 1,
    "price": 27.7,
    "updatedAt": 1753188324152,
    "variants": [
      {"color": "", "sku": "BRA-3020", "image": "/misc/test-thumbnails/skus/BRA-3020.webp", "stock": [
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
      {"color": "", "sku": "BRA-3030", "image": "/misc/test-thumbnails/skus/BRA-3030.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "Brazalete%20vikingo%20de%20runas",
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete%20vikingo%20de%20runas%201.webp",
      "/misc/test-images/brazaletes/vikingos/Brazalete%20vikingo%20de%20runas%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3030.webp",
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
      {"color": "", "sku": "BRA-3040", "image": "/misc/test-thumbnails/skus/BRA-3040.webp", "stock": [
        {"name": "19cm", "quantity": 1},
        {"name": "21cm", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "price": 25.7,
    "images": [
      "/misc/test-images/brazaletes/vikingos/collar%20cadena%20grande%201.webp",
      "/misc/test-images/brazaletes/vikingos/collar%20cadena%20grande%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3040.webp",
    "name": "Brazaletes vikingos de cadena grande plateada"
  },
  {
    "id": "4mnY8PIGa47OpwFZBntA",
    "description": "Brazalete con detalles en negro y plateado, y figura de valknut en el centro de la pieza",
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete%20sólido%20valknut%201.webp",
      "/misc/test-images/brazaletes/vikingos/Brazalete%20sólido%20valknut%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3050.webp",
    "status": 1,
    "price": 17,
    "createdAt": null,
    "subcategory": 3,
    "name": "Brazalete sólido valknut",
    "updatedAt": 1746919932140,
    "waLink": "Brazalete%20sólido%20valknut",
    "category": 2,
    "mainSku": "BRA-3050",
    "variants": [
      {"color": "", "sku": "BRA-3050", "image": "/misc/test-thumbnails/skus/BRA-3050.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "discount": {"type": 0, "value": 20}
  },
  {
    "id": "ZhcVI9vR9SSQfFhSMK9Z",
    "subcategory": 3,
    "images": [
      "/misc/test-images/brazaletes/vikingos/Valknut%20minimalista%201.webp",
      "/misc/test-images/brazaletes/vikingos/Valknut%20minimalista%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3060.webp",
    "category": 2,
    "mainSku": "BRA-3060",
    "variants": [
      {"color": "", "sku": "BRA-3060", "image": "/misc/test-thumbnails/skus/BRA-3060.webp", "stock": [
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
      "/misc/test-images/brazaletes/vikingos/Martillo%20de%20Thor%20dorado%201.webp",
      "/misc/test-images/brazaletes/vikingos/Martillo%20de%20Thor%20dorado%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3071.webp",
    "category": 2,
    "name": "Martillo de Thor dorado",
    "createdAt": null,
    "mainSku": "BRA-3071",
    "variants": [
      {"color": "", "sku": "BRA-3071", "image": "/misc/test-thumbnails/skus/BRA-3071.webp", "stock": [
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
      {"color": "brown", "sku": "BRA-3081", "image": "/misc/test-thumbnails/skus/BRA-3081.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "black", "sku": "BRA-3082", "image": "/misc/test-thumbnails/skus/BRA-3082.webp", "stock": [
        {"name": "70mm", "quantity": 0}
      ]}
    ],
    "updatedAt": 1753188402146,
    "createdAt": null,
    "price": 16.5,
    "images": [
      "/misc/test-images/brazaletes/elegantes/brazalete%20cuero%20elegante%201.webp",
      "/misc/test-images/brazaletes/elegantes/brazalete%20cuero%20elegante%202.webp",
      "/misc/test-images/brazaletes/elegantes/brazalete%20cuero%20elegante%203.webp",
      "/misc/test-images/brazaletes/elegantes/brazalete%20cuero%20elegante%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3080.webp",
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
      {"color": "", "sku": "BRA-3090", "image": "/misc/test-thumbnails/skus/BRA-3090.webp", "stock": [
        {"name": "70mm", "quantity": 0}
      ]}
    ],
    "updatedAt": null,
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete%20vikingo%20rústico.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3090.webp",
    "subcategory": 3,
    "createdAt": null,
    "description": "Brazalete vikingo en tono gris, con detalles ornamentales",
    "waLink": "Brazalete%20vikingo%20rústico"
  },
  {
    "id": "SsAa3ZIXy1IcSHFBynRK",
    "category": 1,
    "subcategory": 0,
    "price": 18.5,
    "status": 1,
    "name": "Collar de ancla",
    "images": [
      "/misc/test-images/collares/elegantes/Collar%20de%20ancla%201.webp",
      "/misc/test-images/collares/elegantes/Collar%20de%20ancla%202.webp",
      "/misc/test-images/collares/elegantes/Collar%20de%20ancla%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0010.webp",
    "mainSku": "COL-0010",
    "variants": [
      {"color": "gray", "sku": "COL-0010", "image": "/misc/test-thumbnails/skus/COL-0010.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "yellow", "sku": "COL-0011", "image": "/misc/test-thumbnails/skus/COL-0011.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-0021", "image": "/misc/test-thumbnails/skus/COL-0021.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0022", "image": "/misc/test-thumbnails/skus/COL-0022.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "black", "sku": "COL-0023", "image": "/misc/test-thumbnails/skus/COL-0023.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "updatedAt": 1748353369209,
    "price": 13.5,
    "images": [
      "/misc/test-images/collares/elegantes/Lobo%20minimalista%201.webp",
      "/misc/test-images/collares/elegantes/Lobo%20minimalista%202.webp",
      "/misc/test-images/collares/elegantes/Lobo%20minimalista%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0020.webp",
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
      {"color": "yellow", "sku": "COL-0031", "image": "/misc/test-thumbnails/skus/COL-0031.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0032", "image": "/misc/test-thumbnails/skus/COL-0032.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0033", "image": "/misc/test-thumbnails/skus/COL-0033.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "name": "Estrella de David",
    "waLink": "collar%20Estrella%20de%20David",
    "images": [
      "/misc/test-images/collares/elegantes/Estrella%20de%20David%201.webp",
      "/misc/test-images/collares/elegantes/Estrella%20de%20David%202.webp",
      "/misc/test-images/collares/elegantes/Estrella%20de%20David%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0030.webp",
    "rating": 0
  },
  {
    "id": "4dypTVvKadKoyt5XsWx1",
    "mainSku": "COL-0040",
    "category": 1,
    "variants": [
      {"color": "gray", "sku": "COL-0041", "image": "/misc/test-thumbnails/skus/COL-0041.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0042", "image": "/misc/test-thumbnails/skus/COL-0042.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "subcategory": 0,
    "name": "Collares geométricos",
    "price": 16,
    "waLink": "Collares%20geométricos",
    "images": [
      "/misc/test-images/collares/elegantes/COL-0040-1.webp",
      "/misc/test-images/collares/elegantes/COL-0040-2.webp",
      "/misc/test-images/collares/elegantes/COL-0040-3.webp",
      "/misc/test-images/collares/elegantes/COL-0040-4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0040.webp",
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
      "/misc/test-images/collares/elegantes/León%20rey%201.webp",
      "/misc/test-images/collares/elegantes/León%20rey%202.webp",
      "/misc/test-images/collares/elegantes/León%20rey%203.webp",
      "/misc/test-images/collares/elegantes/León%20rey%204.webp",
      "/misc/test-images/collares/elegantes/León%20rey%205.webp",
      "/misc/test-images/collares/elegantes/León%20rey%206.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0050.webp",
    "waLink": "collar%20León%20rey",
    "createdAt": null,
    "subcategory": 0,
    "description": "Collar minimalista elegante con forma de rey con corona. Disponible en dorado, plateado o negro",
    "updatedAt": 1753188484168,
    "variants": [
      {"color": "yellow", "sku": "COL-0051", "image": "/misc/test-thumbnails/skus/COL-0051.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0052", "image": "/misc/test-thumbnails/skus/COL-0052.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0053", "image": "/misc/test-thumbnails/skus/COL-0053.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "category": 1
  },
  {
    "id": "EQFwoYpUN9y2MdN7cab6",
    "updatedAt": 1753188497737,
    "waLink": "collar%20Brújula",
    "status": 1,
    "mainSku": "COL-0060",
    "variants": [
      {"color": "", "sku": "COL-0060", "image": "/misc/test-thumbnails/skus/COL-0060.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 18.95,
    "description": "Collar elegante con forma de brújula dorada",
    "createdAt": null,
    "images": [
      "/misc/test-images/collares/elegantes/Brújula%201.webp",
      "/misc/test-images/collares/elegantes/Brújula%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0060.webp",
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
      {"color": "gray", "sku": "COL-0071", "image": "/misc/test-thumbnails/skus/COL-0071.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "black", "sku": "COL-0072", "image": "/misc/test-thumbnails/skus/COL-0072.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "category": 1,
    "discount": {"type": 1, "value": 4.6},
    "images": [
      "/misc/test-images/collares/elegantes/Medalla%20con%20cruz%201.webp",
      "/misc/test-images/collares/elegantes/Medalla%20con%20cruz%202.webp",
      "/misc/test-images/collares/elegantes/Medalla%20con%20cruz%203.webp",
      "/misc/test-images/collares/elegantes/Medalla%20con%20cruz%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0070.webp"
  },
  {
    "id": "nX5rcPoMRndeJavmBzjl",
    "images": [
      "/misc/test-images/collares/elegantes/Medallon%20Filipenses.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0080.webp",
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
      {"color": "", "sku": "COL-0080", "image": "/misc/test-thumbnails/skus/COL-0080.webp", "stock": [
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
      {"color": "", "sku": "COL-0090", "image": "/misc/test-thumbnails/skus/COL-0090.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "/misc/test-images/collares/elegantes/Padre%20nuestro%201.webp",
      "/misc/test-images/collares/elegantes/Padre%20nuestro%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0090.webp"
  },
  {
    "id": "LA91hlO3nycsK8uKGMb3",
    "name": "Cruz con cadena",
    "status": 1,
    "category": 1,
    "description": "Collar doble de dije de cruz y collar sencillo y elegante",
    "subcategory": 0,
    "images": [
      "/misc/test-images/collares/elegantes/Cruz%20con%20cadena%201.webp",
      "/misc/test-images/collares/elegantes/Cruz%20con%20cadena%202.webp",
      "/misc/test-images/collares/elegantes/Cruz%20con%20cadena%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0100.webp",
    "discount": {"type": 1, "value": 4.6},
    "variants": [
      {"color": "yellow", "sku": "COL-0101", "image": "/misc/test-thumbnails/skus/COL-0101.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0102", "image": "/misc/test-thumbnails/skus/COL-0102.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-0111", "image": "/misc/test-thumbnails/skus/COL-0111.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0112", "image": "/misc/test-thumbnails/skus/COL-0112.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188633401,
    "price": 20,
    "images": [
      "/misc/test-images/collares/elegantes/Medalla%20de%20cruz%201.webp",
      "/misc/test-images/collares/elegantes/Medalla%20de%20cruz%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0110.webp",
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
      "/misc/test-images/collares/elegantes/Lanza%20tibetana%201.webp",
      "/misc/test-images/collares/elegantes/Lanza%20tibetana%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0120.webp",
    "createdAt": null,
    "description": "Collar con dije en forma de lanza de guerra tibetana",
    "category": 1,
    "mainSku": "COL-0120",
    "variants": [
      {"color": "", "sku": "COL-0120", "image": "/misc/test-thumbnails/skus/COL-0120.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ]
  },
  {
    "id": "EQFnOixZarCldkmZ9ZKH",
    "name": "Piedra y cuentas negras",
    "images": [
      "/misc/test-images/collares/elegantes/Piedra%20y%20cuentas%20negras%201.webp",
      "/misc/test-images/collares/elegantes/Piedra%20y%20cuentas%20negras%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0130.webp",
    "category": 1,
    "price": 20,
    "subcategory": 0,
    "discount": {"type": 0, "value": 22},
    "mainSku": "COL-0130",
    "variants": [
      {"color": "", "sku": "COL-0130", "image": "/misc/test-thumbnails/skus/COL-0130.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-0141", "image": "/misc/test-thumbnails/skus/COL-0141.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0142", "image": "/misc/test-thumbnails/skus/COL-0142.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "discount": {"type": 1, "value": 6.3},
    "images": [
      "/misc/test-images/collares/elegantes/Amuleto%20ojo%20de%20Horus%201.webp",
      "/misc/test-images/collares/elegantes/Amuleto%20ojo%20de%20Horus%202.webp",
      "/misc/test-images/collares/elegantes/Amuleto%20ojo%20de%20Horus%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0140.webp",
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
      "/misc/test-images/collares/elegantes/COL-0150.webp",
      "/misc/test-images/collares/elegantes/Medallón%20San%20Benito%20dorado.webp",
      "/misc/test-images/collares/elegantes/Medallón%20San%20Benito%20mixto.webp",
      "/misc/test-images/collares/elegantes/Medallón%20San%20Benito%20plateado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0150.webp",
    "name": "Medallón San Benito",
    "updatedAt": 1753571810150,
    "waLink": "Medallón%20San%20Benito",
    "status": 1,
    "mainSku": "COL-0150",
    "variants": [
      {"color": "yellow", "sku": "COL-0151", "image": "/misc/test-thumbnails/skus/COL-0151.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-0152", "image": "/misc/test-thumbnails/skus/COL-0152.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "orange", "sku": "COL-0153", "image": "/misc/test-thumbnails/skus/COL-0153.webp", "stock": [
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
      "/misc/test-images/collares/elegantes/COL-0160.webp",
      "/misc/test-images/collares/elegantes/COL-0160%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0160.webp",
    "category": 1,
    "description": "Medalla conmemorativa de San Benito de Nursia, con cruz en una cara e imagen de Benito de Nursia en la otra cara",
    "status": 0,
    "waLink": "Medalla%20San%20Benito%20dos%20caras",
    "mainSku": "COL-0160",
    "variants": [
      {"color": "yellow", "sku": "COL-0161", "image": "/misc/test-thumbnails/skus/COL-0161.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0162", "image": "/misc/test-thumbnails/skus/COL-0162.webp", "stock": [
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
      {"color": "gray", "sku": "COL-1011", "image": "/misc/test-thumbnails/skus/COL-1011.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "yellow", "sku": "COL-1012", "image": "/misc/test-thumbnails/skus/COL-1012.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "createdAt": null,
    "status": 1,
    "images": [
      "/misc/test-images/collares/masonicos/Masónico%201.webp",
      "/misc/test-images/collares/masonicos/Masónico%202.webp",
      "/misc/test-images/collares/masonicos/Masónico%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1010.webp",
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
      "/misc/test-images/collares/masonicos/Cruz%20templaria%201.webp",
      "/misc/test-images/collares/masonicos/Cruz%20templaria%202.webp",
      "/misc/test-images/collares/masonicos/Cruz%20templaria%203.webp",
      "/misc/test-images/collares/masonicos/Cruz%20templaria%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1020.webp",
    "mainSku": "COL-1020",
    "variants": [
      {"color": "", "sku": "COL-1020", "image": "/misc/test-thumbnails/skus/COL-1020.webp", "stock": [
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
    "waLink": "collar%20Medallón%20templario",
    "subcategory": 1,
    "createdAt": null,
    "updatedAt": 1753188810305,
    "description": "Collar de medallón adornado con un guerrero templario",
    "price": 18.5,
    "images": [
      "/misc/test-images/collares/masonicos/Medallón%20templario%201.webp",
      "/misc/test-images/collares/masonicos/Medallón%20templario%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1030.webp",
    "mainSku": "COL-1030",
    "variants": [
      {"color": "", "sku": "COL-1030", "image": "/misc/test-thumbnails/skus/COL-1030.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "name": "Medallón templario"
  },
  {
    "id": "oYnTqvVeEyST41nCHiKV",
    "mainSku": "COL-1040",
    "waLink": "collar%20Medallón%20cruz%20templarios",
    "variants": [
      {"color": "yellow", "sku": "COL-1041", "image": "/misc/test-thumbnails/skus/COL-1041.jpeg", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-1042", "image": "/misc/test-thumbnails/skus/COL-1042.jpeg", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "/misc/test-images/collares/masonicos/Medallón%20cruz%20templarios%201.jpeg",
      "/misc/test-images/collares/masonicos/Medallón%20cruz%20templarios%202.jpeg"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1040.jpeg",
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
      "/misc/test-images/collares/masonicos/Medallón%20escuadra%20masónico%201.webp",
      "/misc/test-images/collares/masonicos/Medallón%20escuadra%20masónico%202.webp",
      "/misc/test-images/collares/masonicos/Medallón%20escuadra%20masónico%203.webp",
      "/misc/test-images/collares/masonicos/Medallón%20escuadra%20masónico%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1050.webp",
    "subcategory": 1,
    "createdAt": null,
    "variants": [
      {"color": "yellow", "sku": "COL-1051", "image": "/misc/test-thumbnails/skus/COL-1051.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-1052", "image": "/misc/test-thumbnails/skus/COL-1052.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "description": "Collar de medallón adornado con una escuadra masónica dorada y con zircones. Disponible en dorado y en plateado",
    "waLink": "collar%20Medallón%20escuadra%20masónico"
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
      "/misc/test-images/collares/rockeros/Espada%20rota.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2010.webp",
    "mainSku": "COL-2010",
    "variants": [
      {"color": "", "sku": "COL-2010", "image": "/misc/test-thumbnails/skus/COL-2010.webp", "stock": [
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
      {"color": "", "sku": "COL-2030", "image": "/misc/test-thumbnails/skus/COL-2030.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188878553,
    "status": 1,
    "images": [
      "/misc/test-images/collares/rockeros/Búho%20con%20esqueleto%201.webp",
      "/misc/test-images/collares/rockeros/Búho%20con%20esqueleto%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2030.webp",
    "subcategory": 2,
    "waLink": "collar%20Búho%20con%20esqueleto",
    "createdAt": null,
    "price": 19.7,
    "category": 1,
    "description": "Collar de Búho, adornado con piedras amarillas en sus ojos, y con huesos de esqueleto en sus patas"
  },
  {
    "id": "m4u2IJAPSPROacIjpawx",
    "price": 20,
    "waLink": "collar%20Amuleto%20de%20dragón%20chino",
    "status": 0,
    "mainSku": "COL-2040",
    "variants": [
      {"color": "", "sku": "COL-2040", "image": "/misc/test-thumbnails/skus/COL-2040.webp", "stock": [
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
      "/misc/test-images/collares/rockeros/Amuleto%20de%20dragón%20chino%201.webp",
      "/misc/test-images/collares/rockeros/Amuleto%20de%20dragón%20chino%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2040.webp"
  },
  {
    "id": "rJltBJ502ZorLhll0BQR",
    "images": [
      "/misc/test-images/collares/rockeros/Ojo%20iluminati%201.webp",
      "/misc/test-images/collares/rockeros/Ojo%20iluminati%202.webp",
      "/misc/test-images/collares/rockeros/Ojo%20iluminati%203.webp",
      "/misc/test-images/collares/rockeros/Ojo%20iluminati%204.webp",
      "/misc/test-images/collares/rockeros/Ojo%20iluminati%205.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2050.webp",
    "name": "Ojo iluminati",
    "variants": [
      {"color": "red", "sku": "COL-2051", "image": "/misc/test-thumbnails/skus/COL-2051.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "blue", "sku": "COL-2052", "image": "/misc/test-thumbnails/skus/COL-2052.webp", "stock": [
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
      "/misc/test-images/collares/rockeros/Amuleto%20de%20león%20chino%201.webp",
      "/misc/test-images/collares/rockeros/Amuleto%20de%20león%20chino%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2060.webp",
    "mainSku": "COL-2060",
    "variants": [
      {"color": "", "sku": "COL-2060", "image": "/misc/test-thumbnails/skus/COL-2060.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "name": "Amuleto de león chino",
    "status": 0,
    "waLink": "collar%20Amuleto%20de%20león%20chino",
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
      "/misc/test-images/collares/rockeros/Collar%20tridente%201.webp",
      "/misc/test-images/collares/rockeros/Collar%20tridente%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2070.webp",
    "createdAt": null,
    "subcategory": 2,
    "mainSku": "COL-2070",
    "variants": [
      {"color": "", "sku": "COL-2070", "image": "/misc/test-thumbnails/skus/COL-2070.webp", "stock": [
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
      {"color": "", "sku": "COL-2080", "image": "/misc/test-thumbnails/skus/COL-2080.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188915650,
    "images": [
      "/misc/test-images/collares/rockeros/Collar%20medusa%201.webp",
      "/misc/test-images/collares/rockeros/Collar%20medusa%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2080.webp",
    "subcategory": 2,
    "category": 1
  },
  {
    "id": "eTYMsEw7QzIHY9bF7qHY",
    "images": [
      "/misc/test-images/collares/rockeros/Máscara%20demonio%20japonés%201.webp",
      "/misc/test-images/collares/rockeros/Máscara%20demonio%20japonés%202.webp",
      "/misc/test-images/collares/rockeros/Máscara%20demonio%20japonés%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2090.webp",
    "updatedAt": 1753188926521,
    "waLink": "collar%20Máscara%20demonio%20japonés",
    "status": 1,
    "category": 1,
    "price": 18.5,
    "name": "Máscara demonio japonés",
    "description": "Collar de máscara de guerrero japonés (Hannya)",
    "subcategory": 2,
    "createdAt": null,
    "mainSku": "COL-2090",
    "variants": [
      {"color": "", "sku": "COL-2090", "image": "/misc/test-thumbnails/skus/COL-2090.webp", "stock": [
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
      {"color": "", "sku": "COL-2100", "image": "/misc/test-thumbnails/skus/COL-2100.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "name": "Ojo malvado",
    "images": [
      "/misc/test-images/collares/rockeros/Ojo%20malvado%203.jpeg"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2100.webp",
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
    "waLink": "collar%20Mariposa%20gótica",
    "price": 21,
    "images": [
      "/misc/test-images/collares/rockeros/Mariposa%20gótica%201.webp",
      "/misc/test-images/collares/rockeros/Mariposa%20gótica%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2110.webp",
    "subcategory": 2,
    "status": 1,
    "name": "Mariposa gótica",
    "updatedAt": 1753188979137,
    "mainSku": "COL-2110",
    "variants": [
      {"color": "", "sku": "COL-2110", "image": "/misc/test-thumbnails/skus/COL-2110.webp", "stock": [
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
      {"color": "", "sku": "COL-2120", "image": "/misc/test-thumbnails/skus/COL-2120.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "status": 0,
    "images": [
      "/misc/test-images/collares/rockeros/Mantra%201.webp",
      "/misc/test-images/collares/rockeros/Mantra%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2120.webp",
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
      {"color": "yellow", "sku": "COL-2131", "image": "/misc/test-thumbnails/skus/COL-2131.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-2132", "image": "/misc/test-thumbnails/skus/COL-2132.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 19.5,
    "images": [
      "/misc/test-images/collares/rockeros/Calavera%20ojos%20rojos%201.webp",
      "/misc/test-images/collares/rockeros/Calavera%20ojos%20rojos%202.webp",
      "/misc/test-images/collares/rockeros/Calavera%20ojos%20rojos%203.webp",
      "/misc/test-images/collares/rockeros/Calavera%20ojos%20rojos%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2130.webp",
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
      {"color": "yellow", "sku": "COL-2141", "image": "/misc/test-thumbnails/skus/COL-2141.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-2142", "image": "/misc/test-thumbnails/skus/COL-2142.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Medalla casco Espartano",
    "images": [
      "/misc/test-images/collares/rockeros/Medalla%20casco%20Espartano%201.webp",
      "/misc/test-images/collares/rockeros/Medalla%20casco%20Espartano%202.webp",
      "/misc/test-images/collares/rockeros/Medalla%20casco%20Espartano%203.webp",
      "/misc/test-images/collares/rockeros/Medalla%20casco%20Espartano%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2140.webp",
    "description": "Collar de medallón con forma de guerrero espartano. Disponible en dorado y en plateado",
    "mainSku": "COL-2140",
    "status": 1,
    "category": 1
  },
  {
    "id": "5QsnMdM3MWSTEYKzor4h",
    "subcategory": 2,
    "images": [
      "/misc/test-images/collares/rockeros/The%20Witcher.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2150.webp",
    "price": 17.5,
    "mainSku": "COL-2150",
    "variants": [
      {"color": "", "sku": "COL-2150", "image": "/misc/test-thumbnails/skus/COL-2150.webp", "stock": [
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
      "/misc/test-images/collares/rockeros/calavera%201.webp",
      "/misc/test-images/collares/rockeros/calavera%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2160.webp",
    "mainSku": "COL-2160",
    "variants": [
      {"color": "", "sku": "COL-2160", "image": "/misc/test-thumbnails/skus/COL-2160.webp", "stock": [
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
      {"color": "", "sku": "COL-2170", "image": "/misc/test-thumbnails/skus/COL-2170.jpeg", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "name": "Alas de ángel",
    "category": 1,
    "waLink": "collar%20Alas%20de%20ángel",
    "images": [
      "/misc/test-images/collares/rockeros/alas%20de%20angel%201.jpeg"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2170.jpeg",
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
      "/misc/test-images/collares/rockeros/Carnero%20con%20valknut%201.webp",
      "/misc/test-images/collares/rockeros/Carnero%20con%20valknut%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2180.webp",
    "price": 20.5,
    "mainSku": "COL-2180",
    "variants": [
      {"color": "", "sku": "COL-2180", "image": "/misc/test-thumbnails/skus/COL-2180.webp", "stock": [
        {"name": "60cm", "quantity": 3}
      ]}
    ],
    "subcategory": 2
  },
  {
    "id": "XwMPY1pouzSPkBLx47le",
    "waLink": "collar%20Medallón%20Fenrir",
    "price": 18.5,
    "status": 0,
    "updatedAt": 1753189088874,
    "category": 1,
    "subcategory": 3,
    "images": [
      "/misc/test-images/collares/vikingos/Medallón%20Fenrir.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3010.webp",
    "name": "Medallón Fenrir",
    "description": "Collar Medallon adornado con la figura del lobo gigante Fenrir, hijo de Loki",
    "mainSku": "COL-3010",
    "variants": [
      {"color": "", "sku": "COL-3010", "image": "/misc/test-thumbnails/skus/COL-3010.webp", "stock": [
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
      {"color": "", "sku": "COL-3020", "image": "/misc/test-thumbnails/skus/COL-3020.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "images": [
      "/misc/test-images/collares/vikingos/Medallón%20de%20lobo%20con%20runas%20y%20hachas%20cruzadas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3020.webp",
    "name": "Medallón de lobo con runas y hachas cruzadas",
    "status": 0,
    "subcategory": 2,
    "updatedAt": null,
    "createdAt": null,
    "price": 20,
    "waLink": "collar%20Medallón%20de%20lobo%20con%20runas%20y%20hachas%20cruzadas"
  },
  {
    "id": "YZnRln8bJVDQETXiIsBP",
    "description": "Collar con cabeza de lobo en relieve, adornado al perímetro con runas nórdicas doradas",
    "updatedAt": 1753189104778,
    "mainSku": "COL-3030",
    "variants": [
      {"color": "", "sku": "COL-3030", "image": "/misc/test-thumbnails/skus/COL-3030.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Medallon%20lobo%20%20vikingo%20con%20runas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3030.webp"
  },
  {
    "id": "WI17HfeBGWrYiiSNWBE9",
    "waLink": "collar%20Medallón%20lobo%20en%20relieve",
    "subcategory": 3,
    "status": 0,
    "category": 1,
    "price": 20,
    "updatedAt": null,
    "description": "Medallón con cabeza de lobo en relieve",
    "mainSku": "COL-3040",
    "variants": [
      {"color": "", "sku": "COL-3040", "image": "/misc/test-thumbnails/skus/COL-3040.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "name": "Medallón lobo en relieve",
    "images": [
      "/misc/test-images/collares/vikingos/Medallón%20lobo%20en%20relieve.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3040.webp"
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
      {"color": "", "sku": "COL-3050", "image": "/misc/test-thumbnails/skus/COL-3050.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "createdAt": null,
    "price": 18.9,
    "images": [
      "/misc/test-images/collares/vikingos/Lobo%20de%20perfil.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3050.webp",
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
      "/misc/test-images/collares/vikingos/Lobo%20de%20ojos%20rojos%201.webp",
      "/misc/test-images/collares/vikingos/Lobo%20de%20ojos%20rojos%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3060.webp",
    "subcategory": 3,
    "category": 1,
    "price": 18.9,
    "mainSku": "COL-3060",
    "variants": [
      {"color": "", "sku": "COL-3060", "image": "/misc/test-thumbnails/skus/COL-3060.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Lobo%20con%20runa%20en%20la%20frente%201.webp",
      "/misc/test-images/collares/vikingos/Lobo%20con%20runa%20en%20la%20frente%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3070.webp",
    "updatedAt": 1753189146146,
    "price": 19.5,
    "category": 1,
    "mainSku": "COL-3070",
    "variants": [
      {"color": "", "sku": "COL-3070", "image": "/misc/test-thumbnails/skus/COL-3070.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%2001.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3080.webp",
    "name": "Martillo de Thor",
    "status": 0,
    "category": 1,
    "description": "Collar con forma de martillo de Thor",
    "mainSku": "COL-3080",
    "variants": [
      {"color": "", "sku": "COL-3080", "image": "/misc/test-thumbnails/skus/COL-3080.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-3101", "image": "/misc/test-thumbnails/skus/COL-3101.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-3102", "image": "/misc/test-thumbnails/skus/COL-3102.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%20dije%20compuesto%201.webp",
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%20dije%20compuesto%202.webp",
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%20dije%20compuesto%203.webp",
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%20dije%20compuesto%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3100.webp"
  },
  {
    "id": "ER2oeWGWdYKKH4vFuqib",
    "mainSku": "COL-3110",
    "variants": [
      {"color": "", "sku": "COL-3110", "image": "/misc/test-thumbnails/skus/COL-3110.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "subcategory": 3,
    "name": "Punta de Lanza con valknut",
    "status": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Punta%20de%20Lanza%20con%20valknut%201.webp",
      "/misc/test-images/collares/vikingos/Punta%20de%20Lanza%20con%20valknut%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3110.webp",
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
      {"color": "yellow", "sku": "COL-3121", "image": "/misc/test-thumbnails/skus/COL-3121.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-3122", "image": "/misc/test-thumbnails/skus/COL-3122.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753189242258,
    "subcategory": 3,
    "createdAt": null,
    "price": 19.7,
    "category": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Vegvisir%20vintage%201.webp",
      "/misc/test-images/collares/vikingos/Vegvisir%20vintage%202.webp",
      "/misc/test-images/collares/vikingos/Vegvisir%20vintage%203.webp",
      "/misc/test-images/collares/vikingos/Vegvisir%20vintage%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3120.webp",
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
      {"color": "", "sku": "COL-3130", "image": "/misc/test-thumbnails/skus/COL-3130.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "collar%20Punta%20de%20hacha",
    "name": "Punta de hacha",
    "description": "Collar con forma de punta de hacha, adornado con detalles y vegvisir",
    "images": [
      "/misc/test-images/collares/vikingos/Punta%20de%20hacha%201.webp",
      "/misc/test-images/collares/vikingos/Punta%20de%20hacha%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3130.webp",
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
      "/misc/test-images/collares/vikingos/Vegvisir%20minimalista%201.webp",
      "/misc/test-images/collares/vikingos/Vegvisir%20minimalista%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3140.webp",
    "status": 1,
    "waLink": "collar%20Vegvisir%20minimalista",
    "mainSku": "COL-3140",
    "variants": [
      {"color": "", "sku": "COL-3140", "image": "/misc/test-thumbnails/skus/COL-3140.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Cráneo%20de%20cuervo%20con%20vegvisir%201.webp",
      "/misc/test-images/collares/vikingos/Cráneo%20de%20cuervo%20con%20vegvisir%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3150.webp",
    "updatedAt": 1753189274169,
    "price": 18.9,
    "category": 1,
    "mainSku": "COL-3150",
    "variants": [
      {"color": "", "sku": "COL-3150", "image": "/misc/test-thumbnails/skus/COL-3150.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "collar%20Cráneo%20de%20cuervo%20con%20vegvisir",
    "subcategory": 3,
    "status": 1
  },
  {
    "id": "nH4Zw0M67BbYJKiuLguL",
    "images": [
      "/misc/test-images/collares/vikingos/Collar%20Jormundgand%201.webp",
      "/misc/test-images/collares/vikingos/Collar%20Jormundgand%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3160.webp",
    "mainSku": "COL-3160",
    "variants": [
      {"color": "", "sku": "COL-3160", "image": "/misc/test-thumbnails/skus/COL-3160.webp", "stock": [
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
      {"color": "", "sku": "COL-3170", "image": "/misc/test-thumbnails/skus/COL-3170.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753189303615,
    "name": "Collar Jormundgand infinito",
    "images": [
      "/misc/test-images/collares/vikingos/Collar%20Jormundgand%20infinito%201.webp",
      "/misc/test-images/collares/vikingos/Collar%20Jormundgand%20infinito%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3170.webp",
    "rating": 0
  },
  {
    "id": "aL7Z0XpbobtXYx2lMCGF",
    "subcategory": 3,
    "description": "Collar tipo medallón con figura de valknut por un lado, y vegvisir por el otro lado",
    "status": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Collar%20valknut%20con%20vegvisir%201.webp",
      "/misc/test-images/collares/vikingos/Collar%20valknut%20con%20vegvisir%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3180.webp",
    "mainSku": "COL-3180",
    "variants": [
      {"color": "", "sku": "COL-3180", "image": "/misc/test-thumbnails/skus/COL-3180.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Collar%20hacha%20con%20valknut%201.webp",
      "/misc/test-images/collares/vikingos/Collar%20hacha%20con%20valknut%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3190.webp",
    "name": "Collar hacha con valknut",
    "category": 1,
    "price": 19.95,
    "subcategory": 3,
    "mainSku": "COL-3190",
    "variants": [
      {"color": "", "sku": "COL-3190", "image": "/misc/test-thumbnails/skus/COL-3190.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "rating": 0
  },
  {
    "id": "DvK5oWaljMFlEn0wWoQJ",
    "waLink": "collar%20Árbol%20de%20la%20vida%20con%20runas",
    "mainSku": "COL-3200",
    "variants": [
      {"color": "", "sku": "COL-3200", "image": "/misc/test-thumbnails/skus/COL-3200.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Árbol%20de%20la%20vida%20con%20runas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3200.webp",
    "updatedAt": 1753189344778
  },
  {
    "id": "6enR8bfNfvBtQ9vierhm",
    "price": 16.75,
    "waLink": "collar%20Medalla%20de%20Odín",
    "mainSku": "COL-3210",
    "variants": [
      {"color": "", "sku": "COL-3210", "image": "/misc/test-thumbnails/skus/COL-3210.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "discount": {"type": 0, "value": 20},
    "name": "Medalla de Odín",
    "createdAt": null,
    "subcategory": 3,
    "images": [
      "/misc/test-images/collares/vikingos/Medalla%20de%20Odín%201.webp",
      "/misc/test-images/collares/vikingos/Medalla%20de%20Odín%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3210.webp",
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
      {"color": "", "sku": "COL-3220", "image": "/misc/test-thumbnails/skus/COL-3220.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "subcategory": 3,
    "images": [
      "/misc/test-images/collares/vikingos/Barra%203D%20de%20runas%201.webp",
      "/misc/test-images/collares/vikingos/Barra%203D%20de%20runas%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3220.webp",
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
      "/misc/test-images/collares/vikingos/Cuerno%20vikingo%20con%20vegvísir%201.webp",
      "/misc/test-images/collares/vikingos/Cuerno%20vikingo%20con%20vegvísir%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3230.webp",
    "price": 17.5,
    "status": 1,
    "category": 1,
    "description": "Collar con forma de cuerno, adornado con runas y vegvisir",
    "updatedAt": 1753189385587,
    "subcategory": 3,
    "waLink": "collar%20Cuerno%20vikingo%20con%20vegvísir",
    "mainSku": "COL-3230",
    "variants": [
      {"color": "", "sku": "COL-3230", "image": "/misc/test-thumbnails/skus/COL-3230.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Aro%20con%20cuervo%201.webp",
      "/misc/test-images/collares/vikingos/Aro%20con%20cuervo%202.webp",
      "/misc/test-images/collares/vikingos/Aro%20con%20cuervo%203.webp",
      "/misc/test-images/collares/vikingos/Aro%20con%20cuervo%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3240.webp",
    "price": 19,
    "mainSku": "COL-3240",
    "status": 1,
    "category": 1,
    "variants": [
      {"color": "yellow", "sku": "COL-3241", "image": "/misc/test-thumbnails/skus/COL-3241.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3242", "image": "/misc/test-thumbnails/skus/COL-3242.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-3251", "image": "/misc/test-thumbnails/skus/COL-3251.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-3252", "image": "/misc/test-thumbnails/skus/COL-3252.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Nudo%20celta%201.webp",
      "/misc/test-images/collares/vikingos/Nudo%20celta%202.webp",
      "/misc/test-images/collares/vikingos/Nudo%20celta%203.webp",
      "/misc/test-images/collares/vikingos/Nudo%20celta%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3250.webp",
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
      "/misc/test-images/collares/vikingos/Hachas%20dobles%20vikingas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3260.webp",
    "status": 1,
    "category": 1,
    "description": "Collar con forma de 2 hachas de guerra cruzadas",
    "waLink": "collar%20Hachas%20dobles%20vikingas",
    "mainSku": "COL-3260",
    "variants": [
      {"color": "", "sku": "COL-3260", "image": "/misc/test-thumbnails/skus/COL-3260.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Medallón%20Hugin%20y%20Munin%201.webp",
      "/misc/test-images/collares/vikingos/Medallón%20Hugin%20y%20Munin%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3270.webp",
    "name": "Medallón Hugin y Munin",
    "status": 1,
    "category": 1,
    "waLink": "collar%20Medallón%20Hugin%20y%20Munin",
    "createdAt": null,
    "description": "Collar tipo medallón, con las figuras de Hugin y Munin, los 2 cuervos compañeros de Odín, dios de la motología nórdica",
    "discount": {"type": 1, "value": 4.1},
    "mainSku": "COL-3270",
    "variants": [
      {"color": "", "sku": "COL-3270", "image": "/misc/test-thumbnails/skus/COL-3270.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ]
  },
  {
    "id": "6gLfqIBa1ceaVxeIiY44",
    "waLink": "collar%20Nudo%20de%20bruja",
    "status": 0,
    "images": [
      "/misc/test-images/collares/vikingos/Nudo%20de%20bruja%201.webp",
      "/misc/test-images/collares/vikingos/Nudo%20de%20bruja%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3280.webp",
    "price": 17.5,
    "category": 1,
    "description": "Collar con forma del nudo de bruja celta",
    "subcategory": 3,
    "createdAt": null,
    "name": "Nudo de bruja",
    "updatedAt": 1753189476051,
    "mainSku": "COL-3280",
    "variants": [
      {"color": "", "sku": "COL-3280", "image": "/misc/test-thumbnails/skus/COL-3280.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ]
  },
  {
    "id": "XEiRA1msNEBq3lZl7GjC",
    "images": [
      "/misc/test-images/collares/vikingos/Lobo%20dorado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3290.webp",
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
      {"color": "", "sku": "COL-3290", "image": "/misc/test-thumbnails/skus/COL-3290.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Rueda%20de%20runas%20vikingas%201.webp",
      "/misc/test-images/collares/vikingos/Rueda%20de%20runas%20vikingas%202.webp",
      "/misc/test-images/collares/vikingos/Rueda%20de%20runas%20vikingas%203.webp",
      "/misc/test-images/collares/vikingos/Rueda%20de%20runas%20vikingas%204.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3300.webp",
    "category": 1,
    "variants": [
      {"color": "yellow", "sku": "COL-3301", "image": "/misc/test-thumbnails/skus/COL-3301.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3302", "image": "/misc/test-thumbnails/skus/COL-3302.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%20con%20valknut%20-%200.webp",
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%20con%20valknut%20-%201.webp",
      "/misc/test-images/collares/vikingos/Martillo%20de%20Thor%20con%20valknut%20-%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3310.webp",
    "status": 1,
    "price": 19.5,
    "subcategory": 3,
    "variants": [
      {"color": "", "sku": "COL-3310", "image": "/misc/test-thumbnails/skus/COL-3310.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-3321", "image": "/misc/test-thumbnails/skus/COL-3321.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3322", "image": "/misc/test-thumbnails/skus/COL-3322.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Collar Doble Hacha Hugin y Munin",
    "images": [
      "/misc/test-images/collares/vikingos/Collar%20Doble%20Hacha%20Hugin%20y%20Munin%20-%200.webp",
      "/misc/test-images/collares/vikingos/Collar%20Doble%20Hacha%20Hugin%20y%20Munin%20-%201.webp",
      "/misc/test-images/collares/vikingos/Collar%20Doble%20Hacha%20Hugin%20y%20Munin%20-%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3320.webp",
    "subcategory": 3,
    "status": 1,
    "category": 1,
  },
  {
    "id": "1KE6Gf2N25uTXwlX9sdk",
    "description": "Medallón con elegante diseño dorado de lobos, con valknut superior, y runas nórdicas perimetrales",
    "updatedAt": 1753189565883,
    "images": [
      "/misc/test-images/collares/vikingos/Lobos%20en%20relieve%2C%20valknut%20y%20runas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3400.webp",
    "category": 1,
    "price": 19,
    "waLink": "Collar%20Lobos%20en%20relieve%2C%20valknut%20y%20runas",
    "mainSku": "COL-3400",
    "variants": [
      {"color": "", "sku": "COL-3400", "image": "/misc/test-thumbnails/skus/COL-3400.webp", "stock": [
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
      {"color": "", "sku": "COL-3410", "image": "/misc/test-thumbnails/skus/COL-3410.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Collar de diente de lobo",
    "images": [
      "/misc/test-images/collares/vikingos/Collar%20de%20diente%20de%20lobo%20-%200.webp",
      "/misc/test-images/collares/vikingos/Collar%20de%20diente%20de%20lobo%20-%201.webp",
      "/misc/test-images/collares/vikingos/Collar%20de%20diente%20de%20lobo%20-%202.webp",
      "/misc/test-images/collares/vikingos/Collar%20de%20diente%20de%20lobo%20-%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3410.webp",
    "price": 21.75,
    "category": 1,
    "waLink": "Collar%20de%20diente%20de%20lobo",
    "description": "Collar plateado con diseño elegante de forma de colmillo de lobo"
  },
  {
    "id": "HGawjU551YC61Or9oObf",
    "mainSku": "COL-3420",
    "variants": [
      {"color": "", "sku": "COL-3420", "image": "/misc/test-thumbnails/skus/COL-3420.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 17.9,
    "subcategory": 3,
    "name": "Collar Guerrero Berseker",
    "status": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Collar%20Guerrero%20Berseker%20-%200.webp",
      "/misc/test-images/collares/vikingos/Collar%20Guerrero%20Berseker%20-%201.webp",
      "/misc/test-images/collares/vikingos/Collar%20Guerrero%20Berseker%20-%202.webp",
      "/misc/test-images/collares/vikingos/Collar%20Guerrero%20Berseker%20-%203.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3420.webp",
    "description": "Elegante collar con forma de guerrero vikingo, y cuervo en su hombro.",
    "waLink": "Collar%20Guerrero%20Berseker",
    "category": 1
  },
  {
    "id": "KIjWV2PqDYr3SttX8z1j",
    "waLink": "reloj%20CURREN%20Marrón",
    "category": 3,
    "description": "Reloj con correa de cuero marrón y cuerpo de acero inoxidable. Reloj automático (no usa baterías)",
    "images": [
      "/misc/test-images/relojes/curren%201.webp",
      "/misc/test-images/relojes/curren%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-0010.webp",
    "createdAt": null,
    "mainSku": "REL-0010",
    "variants": [
      {"color": "", "sku": "REL-0010", "image": "/misc/test-thumbnails/skus/REL-0010.webp", "stock": [
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
      "/misc/test-images/relojes/dorado%201.webp",
      "/misc/test-images/relojes/dorado%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1011.webp",
    "price": 47,
    "name": "OLEVS dorado",
    "category": 3,
    "waLink": "reloj%20OLEVS%20dorado",
    "mainSku": "REL-1011",
    "variants": [
      {"color": "", "sku": "REL-1011", "image": "/misc/test-thumbnails/skus/REL-1011.webp", "stock": [
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
      {"color": "", "sku": "REL-1012", "image": "/misc/test-thumbnails/skus/REL-1012.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "price": 47,
    "description": "Reloj negro de acero inoxidable",
    "waLink": "reloj%20OLEVS%20negro",
    "name": "OLEVS negro",
    "category": 3,
    "images": [
      "/misc/test-images/relojes/reloj%20negro%201.webp",
      "/misc/test-images/relojes/reloj%20negro%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1012.webp"
  },
  {
    "id": "jjr143W5psMhi875zQ8H",
    "updatedAt": null,
    "description": "Reloj de cuerpo dorado y pulsera plateada de acero inoxidable",
    "category": 3,
    "price": 47,
    "images": [
      "/misc/test-images/relojes/dorado%20y%20plateado%201.webp",
      "/misc/test-images/relojes/dorado%20y%20plateado%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1013.webp",
    "waLink": "reloj%20OLEVS%20plateado%20y%20dorado",
    "status": 0,
    "mainSku": "REL-1013",
    "variants": [
      {"color": "", "sku": "REL-1013", "image": "/misc/test-thumbnails/skus/REL-1013.webp", "stock": [
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
      {"color": "", "sku": "REL-1020", "image": "/misc/test-thumbnails/skus/REL-1020.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "description": "Reloj de acero inoxidable, de diseño en rombo y en color plateado",
    "images": [
      "/misc/test-images/relojes/reloj%20plateado%201.webp",
      "/misc/test-images/relojes/reloj%20plateado%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1020.webp",
    "name": "OLEVS plateado rómbico",
    "waLink": "reloj%20OLEVS%20plateado%20rómbico",
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
      "/misc/test-images/relojes/plateado%20con%20azul%201.webp",
      "/misc/test-images/relojes/plateado%20con%20azul%202.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1030.webp",
    "createdAt": null,
    "waLink": "reloj%20OLEVS%20plateado%20y%20azul",
    "description": "Reloj de acero inoxidable, en color plateado y con visor de color azul brillante",
    "status": 0,
    "price": 43,
    "mainSku": "REL-1030",
    "variants": [
      {"color": "", "sku": "REL-1030", "image": "/misc/test-thumbnails/skus/REL-1030.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
  }
]

export const mockProductList:productProps[] = 
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
      {"color": "", "sku": "AAI-0010", "image": "/misc/test-thumbnails/skus/AAI-0010.webp", "stock": [
        {"name": "single", "quantity": 0}
      ]}
    ],
    "images": [
      "/misc/test-images/zarcillos/Piercing negro.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0010.webp",
    "waLink": "Piercing%20negro%20%28a%20presión%29",
    "mainSku": "AAI-0010"
  },
  {
    "id": "gpyYvQqO7tJNYDP99EAc",
    "discount": {"type": 1, "value": 2.2},
    "price": 9,
    "name": "Piercing de cadena (unidad)",
    "variants": [
      {"color": "", "sku": "AAI-0020", "image": "/misc/test-thumbnails/skus/AAI-0020.webp", "stock": [
        {"name": "single", "quantity": 0}
      ]}
    ],
    "category": 4,
    "images": [
      "/misc/test-images/zarcillos/Piercieng de cadena.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0020.webp",
    "description": "Piercing de estilo rockero con pequeña cadena, de color negro, a presión",
    "waLink": "Piercieng%20de%20cadena%20%28a%20presión%29",
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
      "/misc/test-images/zarcillos/Arete de pluma 1.webp",
      "/misc/test-images/zarcillos/Arete de pluma 2.webp",
      "/misc/test-images/zarcillos/Arete de pluma 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0030.webp",
    "updatedAt": 1753186769009,
    "name": "Arete de pluma (unidad)",
    "price": 9,
    "description": "Arete a presión, con pequeña cadena y diseño de pluma elegante. Disponible en plateado y en negro",
    "waLink": "Arete%20de%20pluma%20%28a%20presión%29",
    "variants": [
        {"color": "gray", "sku": "AAI-0031", "image": "/misc/test-thumbnails/skus/AAI-0031.webp", "stock": [
            {"name": "single", "quantity": 1}
        ]},
        {"color": "black", "sku": "AAI-0032", "image": "/misc/test-thumbnails/skus/AAI-0032.webp", "stock": [
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
        {"sku": "AAI-0041", "color": "gray", "image": "/misc/test-thumbnails/skus/AAI-0041.webp", "stock": [
            {"name": "single", "quantity": 6}
        ]},
        {"color": "black", "sku": "AAI-0042", "image": "/misc/test-thumbnails/skus/AAI-0042.webp", "stock": [
            {"name": "single", "quantity": 6}
        ]}
    ],
    "updatedAt": 1753186819756,
    "status": 1,
    "category": 4,
    "name": "Arete de cruz (unidad)",
    "createdAt": null,
    "images": [
      "/misc/test-images/zarcillos/Arete de cruz 1.webp",
      "/misc/test-images/zarcillos/Arete de cruz 2.webp",
      "/misc/test-images/zarcillos/Arete de cruz 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-0040.webp",
    "waLink": "Arete%20de%20cruz%20%28a%20presión%29",
    "mainSku": "AAI-0040"
  },
  {
    "id": "tx44epEpN0MJQ51sXf2f",
    "images": [
        "/misc/test-images/zarcillos/Piercing vegvisir 1.webp",
        "/misc/test-images/zarcillos/Piercing par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3010.webp",
    "name": "Piercing vegvisir túneles nº8 (par)",
    "variants": [
      {"color": "", "sku": "AAI-3010", "image": "/misc/test-thumbnails/skus/AAI-3010.webp", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "mainSku": "AAI-3010",
    "description": "Piercing tipo túnel de 8mm, con diseño de vegvisir a cada lado",
    "createdAt": null,
    "waLink": "Piercing%20vegvisir%20túneles%20n%C2%BA8",
    "updatedAt": 1746966807653,
    "status": 1,
    "price": 10.75,
    "category": 4
  },
  {
    "id": "RSAyLx3cCAu8rhST9tMn",
    "category": 4,
    "images": [
        "/misc/test-images/zarcillos/Piercing valknut 1.webp",
        "/misc/test-images/zarcillos/Piercing valknut 2.webp",
        "/misc/test-images/zarcillos/Piercing par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3020.webp",
    "updatedAt": 1746966814606,
    "price": 10.75,
    "name": "Piercing valknut túneles nº8 (par)",
    "status": 1,
    "variants": [
      {"color": "", "sku": "AAI-3020", "image": "/misc/test-thumbnails/skus/AAI-3020.webp", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "mainSku": "AAI-3020",
    "createdAt": null,
    "description": "Piercing tipo túnel de 8mm, con diseño de valknut a cada lado",
    "waLink": "Piercing%20valknut%20túneles%20n%C2%BA8"
  },
  {
    "id": "QKFrYijfrQndpQ1DID0h",
    "mainSku": "AAI-3030",
    "updatedAt": 1746966823094,
    "createdAt": null,
    "name": "Piercing árbol de la vida túneles nº8 (par)",
    "price": 10.75,
    "variants": [
      {"color": "", "sku": "AAI-3030", "image": "/misc/test-thumbnails/skus/AAI-3030.webp", "stock": [
        {"name": "single", "quantity": 2}
      ]}
    ],
    "waLink": "Piercing%20árbol%20de%20la%20vida%20túneles%20n%C2%BA8",
    "status": 1,
    "description": "Piercing tipo túnel de 8mm, con diseño de Yggdrasil y runas a cada lado",
    "category": 4,
    "images": [
        "/misc/test-images/zarcillos/Árbol de la vida.webp",
        "/misc/test-images/zarcillos/Piercing par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3030.webp",
    "rating": 0
  },
  {
    "id": "mrfJZTypWGJ3vz30yRIw",
    "name": "Piercing lobo túneles nº8 (par)",
    "variants": [
      {"color": "", "sku": "AAI-3040", "image": "/misc/test-thumbnails/skus/AAI-3040.webp", "stock": [
        {"name": "single", "quantity": 1}
      ]}
    ],
    "status": 0,
    "images": [
        "/misc/test-images/zarcillos/Lobo.webp",
        "/misc/test-images/zarcillos/Piercing par.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/AAI-3040.webp",
    "waLink": "Piercing%20lobo%20túneles%20n%C2%BA8",
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
        "/misc/test-images/anillos/León ojos rojos 1.webp",
        "/misc/test-images/anillos/León ojos rojos 2.webp",
        "/misc/test-images/anillos/León ojos rojos 3.webp",
        "/misc/test-images/anillos/León ojos rojos 4.webp",
        "/misc/test-images/anillos/León ojos rojos 5.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0010.webp",
    "price": 18,
    "mainSku": "ANI-0010",
    "variants": [
      {"sku": "ANI-0011", "color": "yellow", "image": "/misc/test-thumbnails/skus/ANI-0011.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 0},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 0},
          {"name": "11", "quantity": 0},
          {"name": "12", "quantity": 0},
          {"name": "13", "quantity": 0}
      ]},
      {"color": "gray", "sku": "ANI-0012", "image": "/misc/test-thumbnails/skus/ANI-0012.webp", "stock": [
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
    "waLink": "anillo%20León%20de%20ojos%20rojos",
    "discount": {type: 1, value: 2.2},
    "subcategory": 0,
    "status": 1,
    "description": "Anillo elegante con diseño de león, con ojos rojos de cristal. Disponible en dorado y en plateado",
    "updatedAt": 1753186975107
  },
  {
    "id": "paav0sOsxMGnyxLlg5Ww",
    "variants": [
      {"sku": "ANI-0021", "color": "yellow", "image": "/misc/test-thumbnails/skus/ANI-0021.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0022", "image": "/misc/test-thumbnails/skus/ANI-0022.webp", "stock": [
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
        "/misc/test-images/anillos/elegantes/Estrella de David 1.webp",
        "/misc/test-images/anillos/elegantes/Estrella de David 2.webp",
        "/misc/test-images/anillos/elegantes/Estrella de David 3.webp",
        "/misc/test-images/anillos/elegantes/Estrella de David 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0020.webp",
    "waLink": "anillo%20Estrella%20de%20David",
    "subcategory": 0
  },
  {
    "id": "uXclq9N2qVu3JVEj91uX",
    "status": 1,
    "createdAt": null,
    "name": "Octogonal de León",
    "category": 0,
    "waLink": "anillo%20Octogonal%20de%20León",
    "updatedAt": 1753187075276,
    "description": "Anillo elegante con diseño de león y forma hexagonal. Disponible en dorado y en plateado",
    "images": [
        "/misc/test-images/anillos/elegantes/Octogonal de León 1.webp",
        "/misc/test-images/anillos/elegantes/Octogonal de León 2.webp",
        "/misc/test-images/anillos/elegantes/Octogonal de León 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0030.webp",
    "variants": [
        {"sku": "ANI-0031", "color": "yellow", "image": "/misc/test-thumbnails/skus/ANI-0031.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
      ]},
        {"sku": "ANI-0032", "color": "gray", "image": "/misc/test-thumbnails/skus/ANI-0032.webp", "stock": [
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
        "/misc/test-images/anillos/elegantes/Elegante lujoso 1.webp",
        "/misc/test-images/anillos/elegantes/Elegante lujoso 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0040.webp",
    "description": "Anillo dorado elegante, adornado con circones",
    "updatedAt": 1753187214862,
    "category": 0,
    "mainSku": "ANI-0040",
    "subcategory": 0,
    "discount": {"type": 1, "value": 4.25},
    "createdAt": null,
    "price": 19,
    "variants": [
      {"sku": "ANI-0040", "color": "", "image": "/misc/test-thumbnails/skus/ANI-0040.webp", "stock": [
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
        {"color": "yellow", "sku": "ANI-0051", "image": "/misc/test-thumbnails/skus/ANI-0051.webp", "stock": [
          {"name": "7", "quantity": 1},
          {"name": "8", "quantity": 1},
          {"name": "9", "quantity": 1},
          {"name": "10", "quantity": 1},
          {"name": "11", "quantity": 1},
          {"name": "12", "quantity": 1},
          {"name": "13", "quantity": 1}
        ]},
        {"color": "black", "sku": "ANI-0052", "image": "/misc/test-thumbnails/skus/ANI-0052.webp", "stock": [
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
        "/misc/test-images/anillos/elegantes/Jaguar 1.webp",
        "/misc/test-images/anillos/elegantes/Jaguar 2.webp",
        "/misc/test-images/anillos/elegantes/Jaguar 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0050.webp",
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
      {"color": "", "sku": "ANI-0060", "image": "/misc/test-thumbnails/skus/ANI-0060.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Manifiesto%20de%20distinción",
    "images": [
        "/misc/test-images/anillos/elegantes/A manifest of distinction 1.webp",
        "/misc/test-images/anillos/elegantes/A manifest of distinction 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0060.webp",
    "price": 18,
    "rating": 0
  },
  {
    "id": "5vm28WkdicTqT9uz3YFy",
    "updatedAt": 1753187309798,
    "images": [
        "/misc/test-images/anillos/elegantes/Nautico 1.webp",
        "/misc/test-images/anillos/elegantes/Nautico 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0070.webp",
    "variants": [
      {"color": "", "sku": "ANI-0070", "image": "/misc/test-thumbnails/skus/ANI-0070.webp", "stock": [
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
    "waLink": "anillo%20Náutico",
    "category": 0,
    "mainSku": "ANI-0070",
    "subcategory": 0,
    "description": "Anillo elegante con diseño de brújula navegante"
  },
  {
    "id": "3QRhVuojOvohgBB1ub40",
    "images": [
        "/misc/test-images/anillos/elegantes/ANI-0080.webp",
        "/misc/test-images/anillos/elegantes/Anillo San Benito Redondo dorado 1.webp",
        "/misc/test-images/anillos/elegantes/Anillo San Benito Redondo dorado 2.webp",
        "/misc/test-images/anillos/elegantes/Anillo San Benito Redondo dorado 3.webp",
        "/misc/test-images/anillos/elegantes/Anillo San Benito Redondo dorado 4.webp",
        "/misc/test-images/anillos/elegantes/Anillo San Benito Redondo plateado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0080.webp",
    "updatedAt": 1753187343710,
    "variants": [
      {"color": "yellow", "sku": "ANI-0081", "image": "/misc/test-thumbnails/skus/ANI-0081.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0082", "image": "/misc/test-thumbnails/skus/ANI-0082.webp", "stock": [
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
      {"color": "yellow", "sku": "ANI-0091", "image": "/misc/test-thumbnails/skus/ANI-0091.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-0092", "image": "/misc/test-thumbnails/skus/ANI-0092.webp", "stock": [
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
        "/misc/test-images/anillos/ANI-0090.webp",
        "/misc/test-images/anillos/Anillo San Benito Octogonal dorado.webp",
        "/misc/test-images/anillos/Anillo San Benito Octogonal mixto.webp",
        "/misc/test-images/anillos/Anillo San Benito Octogonal plateado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0090.webp",
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
      {"color": "yellow", "sku": "ANI-0102", "image": "/misc/test-thumbnails/skus/ANI-0102.webp", "stock": [
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
        "/misc/test-images/anillos/elegantes/Corona de rey.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0102.webp",
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
      {"color": "", "sku": "ANI-0110", "image": "/misc/test-thumbnails/skus/ANI-0110.webp", "stock": [
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
        "/misc/test-images/anillos/elegantes/Plumas refinadas 1.webp",
        "/misc/test-images/anillos/elegantes/Plumas refinadas 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-0110.webp",
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
      {"color": "", "sku": "ANI-1010", "image": "/misc/test-thumbnails/skus/ANI-1010.webp", "stock": [
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
    "waLink": "anillo%20Cruz%20de%20Jerusalén",
    "mainSku": "ANI-1010",
    "images": [
        "/misc/test-images/anillos/masonicos/Cruz de Jerusalén 1.webp",
        "/misc/test-images/anillos/masonicos/Cruz de Jerusalén 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1010.webp",
    "price": 18.75,
    "status": 1
  },
  {
    "id": "YfxYR8wDFVB1cNFohx39",
    "price": 21.3,
    "mainSku": "ANI-1020",
    "name": "Masónico redondo latín",
    "waLink": "anillo%20Masónico%20redondo%20latín",
    "status": 1,
    "variants": [
      {"color": "yellow", "sku": "ANI-1021", "image": "/misc/test-thumbnails/skus/ANI-1021.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-1022", "image": "/misc/test-thumbnails/skus/ANI-1022.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Masónico redondo latín 1.webp",
        "/misc/test-images/anillos/masonicos/Masónico redondo latín 2.webp",
        "/misc/test-images/anillos/masonicos/Masónico redondo latín 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1020.webp",
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
      {"color": "", "sku": "ANI-1030", "image": "/misc/test-thumbnails/skus/ANI-1030.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Masónico%20cuadrado",
    "images": [
        "/misc/test-images/anillos/masonicos/Masónico cuadrado 1.webp",
        "/misc/test-images/anillos/masonicos/Masónico cuadrado 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1030.webp",
    "price": 19.5,
    "createdAt": null,
    "updatedAt": 1753187445039
  },
  {
    "id": "erzHhUs0B6OE4H50iHew",
    "category": 0,
    "price": 21.3,
    "images": [
        "/misc/test-images/anillos/masonicos/Masónico azul 1.webp",
        "/misc/test-images/anillos/masonicos/Masónico azul 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1040.webp",
    "name": "Masónico azul",
    "createdAt": null,
    "status": 1,
    "updatedAt": 1753187455415,
    "subcategory": 1,
    "waLink": "anillo%20Masónico%20azul",
    "variants": [
      {"color": "", "sku": "ANI-1040", "image": "/misc/test-thumbnails/skus/ANI-1040.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Masónico de lujo 1.webp",
        "/misc/test-images/anillos/masonicos/Masónico de lujo 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1050.webp",
    "createdAt": null,
    "mainSku": "ANI-1050",
    "waLink": "anillo%20Masónico%20de%20lujo",
    "updatedAt": 1753187467758,
    "variants": [
      {"color": "", "sku": "ANI-1050", "image": "/misc/test-thumbnails/skus/ANI-1050.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Triángulo masónico 1.webp",
        "/misc/test-images/anillos/masonicos/Triángulo masónico 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1060.webp",
    "description": "Anilo plateado con forma de triángulo y figura del ojo de la Providencia",
    "createdAt": null,
    "mainSku": "ANI-1060",
    "price": 18.3,
    "updatedAt": 1753187478463,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1060", "image": "/misc/test-thumbnails/skus/ANI-1060.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Triángulo%20masónico",
    "category": 0,
    "subcategory": 1,
    "name": "Triángulo masónico",
    "rating": 0
  },
  {
    "id": "Z5DMWmgvQCUqsYxqGN91",
    "category": 0,
    "images": [
        "/misc/test-images/anillos/masonicos/Masónico master 1.webp",
        "/misc/test-images/anillos/masonicos/Masónico master 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1080.webp",
    "mainSku": "ANI-1080",
    "createdAt": null,
    "description": "Anillo de escuadra masónica, de cuerpo redondo ajustado y dorado, y adornado con las palabras 'Master' y 'Mason'",
    "subcategory": 1,
    "name": "Masónico master",
    "price": 18.95,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1080", "image": "/misc/test-thumbnails/skus/ANI-1080.webp", "stock": [
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
    "waLink": "anillo%20Masónico%20master"
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
        "/misc/test-images/anillos/masonicos/Anillo Cruz templarios 1.webp",
        "/misc/test-images/anillos/masonicos/Anillo Cruz templarios 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1090.webp",
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-1090", "image": "/misc/test-thumbnails/skus/ANI-1090.webp", "stock": [
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
        "/misc/test-images/anillos/masonicos/Masónico spin 1.webp",
        "/misc/test-images/anillos/masonicos/Masónico spin 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-1100.webp",
    "updatedAt": 1753187515534,
    "createdAt": null,
    "subcategory": 1,
    "variants": [
      {"color": "yellow", "sku": "ANI-1101", "image": "/misc/test-thumbnails/skus/ANI-1101.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-1102", "image": "/misc/test-thumbnails/skus/ANI-1102.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]}
    ],
    "waLink": "anillo%20Masónico%20spin"
  },
  {
    "id": "MwzKI1WcVr5OTwuH64k9",
    "category": 0,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-2010", "image": "/misc/test-thumbnails/skus/ANI-2010.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Calavera de ojos rojos 1.webp",
      "/misc/test-images/anillos/rockeros/Calavera de ojos rojos 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2010.webp",
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
      "/misc/test-images/anillos/rockeros/Calavera 1.webp",
      "/misc/test-images/anillos/rockeros/Calavera 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2020.webp",
    "price": 19.3,
    "subcategory": 2,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-2020", "image": "/misc/test-thumbnails/skus/ANI-2020.webp", "stock": [
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
      {"color": "", "sku": "ANI-2030", "image": "/misc/test-thumbnails/skus/ANI-2030.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Calavera gritando 1.webp",
      "/misc/test-images/anillos/rockeros/Calavera gritando 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2030.webp",
    "waLink": "anillo%20Calavera%20gritando"
  },
  {
    "id": "vgR04m4rvchCjRlDu0ac",
    "images": [
      "/misc/test-images/anillos/rockeros/Circulos de calavera 1.webp",
      "/misc/test-images/anillos/rockeros/Circulos de calavera 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2040.webp",
    "waLink": "anillo%20Circulos%20de%20calavera",
    "category": 0,
    "variants": [
      {"color": "", "sku": "ANI-2040", "image": "/misc/test-thumbnails/skus/ANI-2040.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Calavera mexicana ojos verdes 1.webp",
      "/misc/test-images/anillos/rockeros/Calavera mexicana ojos verdes 2.webp",
      "/misc/test-images/anillos/rockeros/Calavera mexicana ojos verdes 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2050.webp",
    "price": 18.7,
    "name": "Calavera mexicana ojos verdes",
    "variants": [
      {"color": "", "sku": "ANI-2050", "image": "/misc/test-thumbnails/skus/ANI-2050.webp", "stock": [
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
      {"color": "", "sku": "ANI-2060", "image": "/misc/test-thumbnails/skus/ANI-2060.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Medusa 1.webp",
      "/misc/test-images/anillos/rockeros/Medusa 2.webp",
      "/misc/test-images/anillos/rockeros/Medusa 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2060.webp",
    "subcategory": 2,
    "status": 1,
    "category": 0,
    "numReviews": 0
  },
  {
    "id": "3XMuB3qNC4OdQ424AZfp",
    "category": 0,
    "variants": [
      {"color": "cyan", "sku": "ANI-2081", "image": "/misc/test-thumbnails/skus/ANI-2081.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "blue", "sku": "ANI-2082", "image": "/misc/test-thumbnails/skus/ANI-2082.webp", "stock": [
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
        "/misc/test-images/anillos/rockeros/Ojo malvado azul 1.webp",
        "/misc/test-images/anillos/rockeros/Ojo malvado azul 2.webp",
        "/misc/test-images/anillos/rockeros/Ojo malvado azul 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2080.webp",
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
      {"color": "", "sku": "ANI-2090", "image": "/misc/test-thumbnails/skus/ANI-2090.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Guerrero espartano 1.webp",
      "/misc/test-images/anillos/rockeros/Guerrero espartano 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2090.webp"
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
      {"color": "", "sku": "ANI-2100", "image": "/misc/test-thumbnails/skus/ANI-2100.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Anillo 13 1.webp",
      "/misc/test-images/anillos/rockeros/Anillo 13 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2100.webp",
    "description": "Anillo con el número 13 en frente y de forma cuadrada",
    "status": 1,
    "name": "Anillo 13",
    "createdAt": null
  },
  {
    "id": "RS3qq8FTRtM0NInBZlJp",
    "price": 17.5,
    "images": [
      "/misc/test-images/anillos/rockeros/serpiente enrollada 1.webp",
      "/misc/test-images/anillos/rockeros/serpiente enrollada 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2120.webp",
    "mainSku": "ANI-2120",
    "waLink": "anillo%20Serpiente%20enrollada",
    "updatedAt": 1753187705046,
    "variants": [
      {"color": "", "sku": "ANI-2120", "image": "/misc/test-thumbnails/skus/ANI-2120.webp", "stock": [
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
      "/misc/test-images/anillos/rockeros/Garras con gema azul 3.webp",
      "/misc/test-images/anillos/rockeros/Garras con gema azul 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-2140.webp",
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-2140", "image": "/misc/test-thumbnails/skus/ANI-2140.webp", "stock": [
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
    "waLink": "anillo%20Árbol%20de%20la%20vida",
    "price": 19.9,
    "status": 1,
    "category": 0,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3010", "image": "/misc/test-thumbnails/skus/ANI-3010.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Árbol de la vida 1.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3010.webp"
  },
  {
    "id": "Gt6KQNDKUNEc6N7Xiafz",
    "mainSku": "ANI-3020",
    "name": "Vegvisir con hachas",
    "variants": [
      {"color": "yellow", "sku": "ANI-3021", "image": "/misc/test-thumbnails/skus/ANI-3021.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3022", "image": "/misc/test-thumbnails/skus/ANI-3022.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Vegvisir con hachas 1.webp",
      "/misc/test-images/anillos/vikingos/Vegvisir con hachas 2.webp",
      "/misc/test-images/anillos/vikingos/Vegvisir con hachas 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3020.webp",
    "price": 17.5,
    "createdAt": null
  },
  {
    "id": "GJ1MdaoxklN6SBeurovH",
    "name": "Vikingo vegvisir",
    "variants": [
      {"color": "yellow", "sku": "ANI-3031", "image": "/misc/test-thumbnails/skus/ANI-3031.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3032", "image": "/misc/test-thumbnails/skus/ANI-3032.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Vikingo vegvisir 1.webp",
      "/misc/test-images/anillos/vikingos/Vikingo vegvisir 2.webp",
      "/misc/test-images/anillos/vikingos/Vikingo vegvisir 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3030.webp",
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
      {"color": "yellow", "sku": "ANI-3041", "image": "/misc/test-thumbnails/skus/ANI-3041.webp", "stock": [
        {"name": "7", "quantity": 1},
        {"name": "8", "quantity": 1},
        {"name": "9", "quantity": 1},
        {"name": "10", "quantity": 1},
        {"name": "11", "quantity": 1},
        {"name": "12", "quantity": 1},
        {"name": "13", "quantity": 1}
      ]},
      {"color": "gray", "sku": "ANI-3042", "image": "/misc/test-thumbnails/skus/ANI-3042.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Runas vikingas 1.webp",
      "/misc/test-images/anillos/vikingos/Runas vikingas 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3040.webp",
    "mainSku": "ANI-3040",
    "subcategory": 3,
    "updatedAt": 1753187780184
  },
  {
    "id": "42fIU8cvjdXEBSjcjnVy",
    "variants": [
      {"color": "", "sku": "ANI-3050", "image": "/misc/test-thumbnails/skus/ANI-3050.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Cráneo de cuervo 1.webp",
      "/misc/test-images/anillos/vikingos/Cráneo de cuervo 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3050.webp",
    "mainSku": "ANI-3050",
    "category": 0,
    "status": 1,
    "createdAt": null,
    "subcategory": 3,
    "name": "Cráneo de cuervo",
    "updatedAt": 1753187794008,
    "waLink": "anillo%20Cráneo%20de%20cuervo",
    "price": 17.5,
    "description": "Anillo de cráneo de cuervo, adornado con un vegvisir en la frente",
    "numReviews": 0
  },
  {
    "id": "DrdyUqGNTx7MiHFaYJdV",
    "subcategory": 3,
    "images": [
      "/misc/test-images/anillos/vikingos/Lobo furioso 1.webp",
      "/misc/test-images/anillos/vikingos/Lobo furioso 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3060.webp",
    "updatedAt": 1753187944624,
    "category": 0,
    "mainSku": "ANI-3060",
    "price": 18,
    "status": 1,
    "variants": [
      {"color": "", "sku": "ANI-3060", "image": "/misc/test-thumbnails/skus/ANI-3060.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Lobo extravagante 1.webp",
      "/misc/test-images/anillos/vikingos/Lobo extravagante 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3070.webp",
    "waLink": "anillo%20Lobo%20extravagante",
    "variants": [
      {"color": "", "sku": "ANI-3070", "image": "/misc/test-thumbnails/skus/ANI-3070.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Anillo lobo valknut 1.webp",
      "/misc/test-images/anillos/vikingos/Anillo lobo valknut 2.webp",
      "/misc/test-images/anillos/vikingos/Anillo lobo valknut 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3080.webp",
    "category": 0,
    "price": 17.9,
    "createdAt": null,
    "variants": [
      {"color": "", "sku": "ANI-3080", "image": "/misc/test-thumbnails/skus/ANI-3080.webp", "stock": [
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
      {"color": "", "sku": "ANI-3101", "image": "/misc/test-thumbnails/skus/ANI-3101.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Anillo valknut.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3101.webp"
  },
  {
    "id": "B3fTJvc742g1vx3Lyybp",
    "images": [
      "/misc/test-images/anillos/vikingos/Triqueta.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3130.webp",
    "category": 0,
    "price": 19,
    "updatedAt": 1753188040360,
    "status": 1,
    "name": "Triqueta",
    "mainSku": "ANI-3130",
    "discount": {"type": 1, "value": 4.1},
    "variants": [
      {"color": "", "sku": "ANI-3130", "image": "/misc/test-thumbnails/skus/ANI-3130.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Vegvisir refinado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3141.webp",
    "waLink": "anillo%20Vegvisir%20refinado",
    "discount": {"type": 0, "value": 21},
    "description": "Anillo dorado, adornado con un vegvisir central",
    "updatedAt": 1753188068840,
    "status": 1,
    "mainSku": "ANI-3141",
    "createdAt": null,
    "category": 0,
    "variants": [
      {"color": "", "sku": "ANI-3141", "image": "/misc/test-thumbnails/skus/ANI-3141.webp", "stock": [
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
      "/misc/test-images/anillos/vikingos/Runas con vegvisir (plateado) 1.webp",
      "/misc/test-images/anillos/vikingos/Runas con vegvisir (plateado) 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3152.webp",
    "price": 18.75,
    "variants": [
      {"color": "", "sku": "ANI-3152", "image": "/misc/test-thumbnails/skus/ANI-3152.webp", "stock": [
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
      {"color": "", "sku": "ANI-3161", "image": "/misc/test-thumbnails/skus/ANI-3161.webp", "stock": [
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
        "/misc/test-images/anillos/vikingos/Runas con valknut (dorado) 1.webp",
        "/misc/test-images/anillos/vikingos/Runas con valknut (dorado) 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3161.webp",
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
      {"color": "", "sku": "ANI-3170", "image": "/misc/test-thumbnails/skus/ANI-3170.webp", "stock": [
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
        "/misc/test-images/anillos/vikingos/Anillo Martillo de Thor 1.webp",
        "/misc/test-images/anillos/vikingos/Anillo Martillo de Thor 2.webp",
        "/misc/test-images/anillos/vikingos/Anillo Martillo de Thor 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/ANI-3170.webp",
    "price": 17.5
  },
  {
    "id": "Y4CIXqEzDlJEsSy1ohRQ",
    "category": 2,
    "updatedAt": 1753188207578,
    "images": [
        "/misc/test-images/brazaletes/elegantes/Brazalete elegante de runas vikingo 1.webp",
        "/misc/test-images/brazaletes/elegantes/Brazalete elegante de runas vikingo 2.webp",
        "/misc/test-images/brazaletes/elegantes/Brazalete elegante de runas vikingo 3.webp",
        "/misc/test-images/brazaletes/elegantes/Brazalete elegante de runas vikingo 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0010.webp",
    "name": "Brazalete elegante de runas vikingo",
    "variants": [
      {"color": "yellow", "sku": "BRA-0011", "image": "/misc/test-thumbnails/skus/BRA-0011.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "BRA-0012", "image": "/misc/test-thumbnails/skus/BRA-0012.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "black", "sku": "BRA-0013", "image": "/misc/test-thumbnails/skus/BRA-0013.webp", "stock": [
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
      "/misc/test-images/brazaletes/elegantes/Pulsera piedra de ágata azul esmerilada - 0.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera piedra de ágata azul esmerilada - 1.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0020.webp",
    "variants": [
      {"color": "", "sku": "BRA-0020", "image": "/misc/test-thumbnails/skus/BRA-0020.webp", "stock": [
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
      {"color": "", "sku": "BRA-0030", "image": "/misc/test-thumbnails/skus/BRA-0030.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "mainSku": "BRA-0030",
    "subcategory": 0,
    "images": [
      "/misc/test-images/brazaletes/elegantes/Brazalete piedra de ojo de tigre 01.webp",
      "/misc/test-images/brazaletes/elegantes/Brazalete piedra de ojo de tigre 02.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0030.webp",
    "description": "Elegante brazalete hecho de cuentas de ojo de tigre amarillo, con deparadores y broche en acero inoxidable",
    "status": 1
  },
  {
    "id": "hEyMPh4dQFS65sgFzhb5",
    "price": 14.75,
    "category": 2,
    "images": [
      "/misc/test-images/brazaletes/elegantes/Pulsera piedra volcánica - 0.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera piedra volcánica - 1.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0040.webp",
    "description": "Pulsera de cuentas de piedra volcánica, con separadores y broche de acero inoxidable",
    "mainSku": "BRA-0040",
    "subcategory": 0,
    "status": 1,
    "waLink": "Pulsera%20piedra%20volcánica",
    "name": "Pulsera piedra volcánica",
    "variants": [
      {"color": "", "sku": "BRA-0040", "image": "/misc/test-thumbnails/skus/BRA-0040.webp", "stock": [
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
      {"color": "black", "sku": "BRA-0051", "image": "/misc/test-thumbnails/skus/BRA-0051.webp", "stock": [
        {"name": "19mm", "quantity": 1},
        {"name": "21mm", "quantity": 1}
      ]},
      {"color": "brown", "sku": "BRA-0053", "image": "/misc/test-thumbnails/skus/BRA-0053.webp", "stock": [
        {"name": "19mm", "quantity": 1},
        {"name": "21mm", "quantity": 0}
      ]}
    ],
    "description": "Brazalete de cuero legítimo con broche magnético en acero inoxidable. Disponible en colores marrón y negro. Disponibles en 19cm y 21cm.",
    "price": 17.5,
    "subcategory": 0,
    "status": 1,
    "images": [
      "/misc/test-images/brazaletes/elegantes/Brazalete de cuero legítimo - 0.webp",
      "/misc/test-images/brazaletes/elegantes/Brazalete de cuero legítimo - 1.webp",
      "/misc/test-images/brazaletes/elegantes/Brazalete de cuero legítimo - 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0050.webp"
  },
  {
    "id": "Hbojhb1uG5Qb3dXPXFAi",
    "images": [
      "/misc/test-images/brazaletes/elegantes/Pulsera Twist 4mm - 0.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera Twist 4mm - 1.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera Twist 4mm - 2.webp",
      "/misc/test-images/brazaletes/elegantes/Pulsera Twist 4mm - 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-0060.webp",
    "price": 12.5,
    "updatedAt": 1753188259752,
    "name": "Pulsera Twist 4mm",
    "description": "Pulsera de tejido retorcido, de acero inoxidable. Disponible en dorado y en plateado.",
    "status": 1,
    "category": 2,
    "variants": [
      {"color": "yellow", "sku": "BRA-0061", "image": "/misc/test-thumbnails/skus/BRA-0061.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "BRA-0062", "image": "/misc/test-thumbnails/skus/BRA-0062.webp", "stock": [
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
      "/misc/test-images/brazaletes/masonicos/Brazalete de cuero y compás masónico.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-1010.webp",
    "mainSku": "BRA-1010",
    "variants": [
      {"color": "", "sku": "BRA-1010", "image": "/misc/test-thumbnails/skus/BRA-1010.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 2,
    "status": 1,
    "createdAt": null,
    "subcategory": 1,
    "name": "Brazalete de cuero y compás masónico",
    "updatedAt": 1748353304238,
    "waLink": "Brazalete de cuero y compás masónico",
    "price": 19.75,
    "description": "Brazalete de escuadra masónica en acero inoxidable y correa de cuero negro genuino de calidad",
    "numReviews": 0
  },
  {
    "id": "mr0gjFK3FqWL4x3FtRCX",
    "mainSku": "BRA-3010",
    "variants": [
      {"color": "", "sku": "BRA-3010", "image": "/misc/test-thumbnails/skus/BRA-3010.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete vikingo.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3010.webp",
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
    "waLink": "Brazalete%20de%20cuero%20legítimo%20y%20martillo%20de%20Thor",
    "description": "Brazalete con forma de martillo de Thor en acero inoxidable y correa de cuero negro genuino",
    "createdAt": null,
    "category": 2,
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete de cuero legítimo y martillo de Thor 1.webp",
      "/misc/test-images/brazaletes/vikingos/Brazalete de cuero legítimo y martillo de Thor 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3020.webp",
    "name": "Brazalete de cuero legítimo y martillo de Thor",
    "status": 1,
    "price": 27.7,
    "updatedAt": 1753188324152,
    "variants": [
      {"color": "", "sku": "BRA-3020", "image": "/misc/test-thumbnails/skus/BRA-3020.webp", "stock": [
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
      {"color": "", "sku": "BRA-3030", "image": "/misc/test-thumbnails/skus/BRA-3030.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "Brazalete%20vikingo%20de%20runas",
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete vikingo de runas 1.webp",
      "/misc/test-images/brazaletes/vikingos/Brazalete vikingo de runas 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3030.webp",
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
      {"color": "", "sku": "BRA-3040", "image": "/misc/test-thumbnails/skus/BRA-3040.webp", "stock": [
        {"name": "19cm", "quantity": 1},
        {"name": "21cm", "quantity": 1}
      ]}
    ],
    "createdAt": null,
    "price": 25.7,
    "images": [
      "/misc/test-images/brazaletes/vikingos/collar cadena grande 1.webp",
      "/misc/test-images/brazaletes/vikingos/collar cadena grande 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3040.webp",
    "name": "Brazaletes vikingos de cadena grande plateada"
  },
  {
    "id": "4mnY8PIGa47OpwFZBntA",
    "description": "Brazalete con detalles en negro y plateado, y figura de valknut en el centro de la pieza",
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete sólido valknut 1.webp",
      "/misc/test-images/brazaletes/vikingos/Brazalete sólido valknut 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3050.webp",
    "status": 1,
    "price": 17,
    "createdAt": null,
    "subcategory": 3,
    "name": "Brazalete sólido valknut",
    "updatedAt": 1746919932140,
    "waLink": "Brazalete%20sólido%20valknut",
    "category": 2,
    "mainSku": "BRA-3050",
    "variants": [
      {"color": "", "sku": "BRA-3050", "image": "/misc/test-thumbnails/skus/BRA-3050.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]}
    ],
    "discount": {"type": 0, "value": 20}
  },
  {
    "id": "ZhcVI9vR9SSQfFhSMK9Z",
    "subcategory": 3,
    "images": [
      "/misc/test-images/brazaletes/vikingos/Valknut minimalista 1.webp",
      "/misc/test-images/brazaletes/vikingos/Valknut minimalista 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3060.webp",
    "category": 2,
    "mainSku": "BRA-3060",
    "variants": [
      {"color": "", "sku": "BRA-3060", "image": "/misc/test-thumbnails/skus/BRA-3060.webp", "stock": [
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
      "/misc/test-images/brazaletes/vikingos/Martillo de Thor dorado 1.webp",
      "/misc/test-images/brazaletes/vikingos/Martillo de Thor dorado 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3071.webp",
    "category": 2,
    "name": "Martillo de Thor dorado",
    "createdAt": null,
    "mainSku": "BRA-3071",
    "variants": [
      {"color": "", "sku": "BRA-3071", "image": "/misc/test-thumbnails/skus/BRA-3071.webp", "stock": [
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
      {"color": "brown", "sku": "BRA-3081", "image": "/misc/test-thumbnails/skus/BRA-3081.webp", "stock": [
        {"name": "70mm", "quantity": 1}
      ]},
      {"color": "black", "sku": "BRA-3082", "image": "/misc/test-thumbnails/skus/BRA-3082.webp", "stock": [
        {"name": "70mm", "quantity": 0}
      ]}
    ],
    "updatedAt": 1753188402146,
    "createdAt": null,
    "price": 16.5,
    "images": [
      "/misc/test-images/brazaletes/elegantes/brazalete cuero elegante 1.webp",
      "/misc/test-images/brazaletes/elegantes/brazalete cuero elegante 2.webp",
      "/misc/test-images/brazaletes/elegantes/brazalete cuero elegante 3.webp",
      "/misc/test-images/brazaletes/elegantes/brazalete cuero elegante 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3080.webp",
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
      {"color": "", "sku": "BRA-3090", "image": "/misc/test-thumbnails/skus/BRA-3090.webp", "stock": [
        {"name": "70mm", "quantity": 0}
      ]}
    ],
    "updatedAt": null,
    "images": [
      "/misc/test-images/brazaletes/vikingos/Brazalete vikingo rústico.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/BRA-3090.webp",
    "subcategory": 3,
    "createdAt": null,
    "description": "Brazalete vikingo en tono gris, con detalles ornamentales",
    "waLink": "Brazalete%20vikingo%20rústico"
  },
  {
    "id": "SsAa3ZIXy1IcSHFBynRK",
    "category": 1,
    "subcategory": 0,
    "price": 18.5,
    "status": 1,
    "name": "Collar de ancla",
    "images": [
      "/misc/test-images/collares/elegantes/Collar de ancla 1.webp",
      "/misc/test-images/collares/elegantes/Collar de ancla 2.webp",
      "/misc/test-images/collares/elegantes/Collar de ancla 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0010.webp",
    "mainSku": "COL-0010",
    "variants": [
      {"color": "gray", "sku": "COL-0010", "image": "/misc/test-thumbnails/skus/COL-0010.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "yellow", "sku": "COL-0011", "image": "/misc/test-thumbnails/skus/COL-0011.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-0021", "image": "/misc/test-thumbnails/skus/COL-0021.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0022", "image": "/misc/test-thumbnails/skus/COL-0022.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "black", "sku": "COL-0023", "image": "/misc/test-thumbnails/skus/COL-0023.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "updatedAt": 1748353369209,
    "price": 13.5,
    "images": [
      "/misc/test-images/collares/elegantes/Lobo minimalista 1.webp",
      "/misc/test-images/collares/elegantes/Lobo minimalista 2.webp",
      "/misc/test-images/collares/elegantes/Lobo minimalista 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0020.webp",
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
      {"color": "yellow", "sku": "COL-0031", "image": "/misc/test-thumbnails/skus/COL-0031.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0032", "image": "/misc/test-thumbnails/skus/COL-0032.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0033", "image": "/misc/test-thumbnails/skus/COL-0033.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "name": "Estrella de David",
    "waLink": "collar%20Estrella%20de%20David",
    "images": [
      "/misc/test-images/collares/elegantes/Estrella de David 1.webp",
      "/misc/test-images/collares/elegantes/Estrella de David 2.webp",
      "/misc/test-images/collares/elegantes/Estrella de David 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0030.webp",
    "rating": 0
  },
  {
    "id": "4dypTVvKadKoyt5XsWx1",
    "mainSku": "COL-0040",
    "category": 1,
    "variants": [
      {"color": "gray", "sku": "COL-0041", "image": "/misc/test-thumbnails/skus/COL-0041.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0042", "image": "/misc/test-thumbnails/skus/COL-0042.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "subcategory": 0,
    "name": "Collares geométricos",
    "price": 16,
    "waLink": "Collares%20geométricos",
    "images": [
      "/misc/test-images/collares/elegantes/COL-0040-1.webp",
      "/misc/test-images/collares/elegantes/COL-0040-2.webp",
      "/misc/test-images/collares/elegantes/COL-0040-3.webp",
      "/misc/test-images/collares/elegantes/COL-0040-4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0040.webp",
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
      "/misc/test-images/collares/elegantes/León rey 1.webp",
      "/misc/test-images/collares/elegantes/León rey 2.webp",
      "/misc/test-images/collares/elegantes/León rey 3.webp",
      "/misc/test-images/collares/elegantes/León rey 4.webp",
      "/misc/test-images/collares/elegantes/León rey 5.webp",
      "/misc/test-images/collares/elegantes/León rey 6.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0050.webp",
    "waLink": "collar%20León%20rey",
    "createdAt": null,
    "subcategory": 0,
    "description": "Collar minimalista elegante con forma de rey con corona. Disponible en dorado, plateado o negro",
    "updatedAt": 1753188484168,
    "variants": [
      {"color": "yellow", "sku": "COL-0051", "image": "/misc/test-thumbnails/skus/COL-0051.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0052", "image": "/misc/test-thumbnails/skus/COL-0052.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "black", "sku": "COL-0053", "image": "/misc/test-thumbnails/skus/COL-0053.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "category": 1
  },
  {
    "id": "EQFwoYpUN9y2MdN7cab6",
    "updatedAt": 1753188497737,
    "waLink": "collar%20Brújula",
    "status": 1,
    "mainSku": "COL-0060",
    "variants": [
      {"color": "", "sku": "COL-0060", "image": "/misc/test-thumbnails/skus/COL-0060.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 18.95,
    "description": "Collar elegante con forma de brújula dorada",
    "createdAt": null,
    "images": [
      "/misc/test-images/collares/elegantes/Brújula 1.webp",
      "/misc/test-images/collares/elegantes/Brújula 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0060.webp",
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
      {"color": "gray", "sku": "COL-0071", "image": "/misc/test-thumbnails/skus/COL-0071.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "black", "sku": "COL-0072", "image": "/misc/test-thumbnails/skus/COL-0072.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "category": 1,
    "discount": {"type": 1, "value": 4.6},
    "images": [
      "/misc/test-images/collares/elegantes/Medalla con cruz 1.webp",
      "/misc/test-images/collares/elegantes/Medalla con cruz 2.webp",
      "/misc/test-images/collares/elegantes/Medalla con cruz 3.webp",
      "/misc/test-images/collares/elegantes/Medalla con cruz 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0070.webp"
  },
  {
    "id": "nX5rcPoMRndeJavmBzjl",
    "images": [
      "/misc/test-images/collares/elegantes/Medallon Filipenses.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0080.webp",
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
      {"color": "", "sku": "COL-0080", "image": "/misc/test-thumbnails/skus/COL-0080.webp", "stock": [
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
      {"color": "", "sku": "COL-0090", "image": "/misc/test-thumbnails/skus/COL-0090.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "/misc/test-images/collares/elegantes/Padre nuestro 1.webp",
      "/misc/test-images/collares/elegantes/Padre nuestro 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0090.webp"
  },
  {
    "id": "LA91hlO3nycsK8uKGMb3",
    "name": "Cruz con cadena",
    "status": 1,
    "category": 1,
    "description": "Collar doble de dije de cruz y collar sencillo y elegante",
    "subcategory": 0,
    "images": [
      "/misc/test-images/collares/elegantes/Cruz con cadena 1.webp",
      "/misc/test-images/collares/elegantes/Cruz con cadena 2.webp",
      "/misc/test-images/collares/elegantes/Cruz con cadena 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0100.webp",
    "discount": {"type": 1, "value": 4.6},
    "variants": [
      {"color": "yellow", "sku": "COL-0101", "image": "/misc/test-thumbnails/skus/COL-0101.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0102", "image": "/misc/test-thumbnails/skus/COL-0102.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-0111", "image": "/misc/test-thumbnails/skus/COL-0111.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0112", "image": "/misc/test-thumbnails/skus/COL-0112.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188633401,
    "price": 20,
    "images": [
      "/misc/test-images/collares/elegantes/Medalla de cruz 1.webp",
      "/misc/test-images/collares/elegantes/Medalla de cruz 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0110.webp",
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
      "/misc/test-images/collares/elegantes/Lanza tibetana 1.webp",
      "/misc/test-images/collares/elegantes/Lanza tibetana 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0120.webp",
    "createdAt": null,
    "description": "Collar con dije en forma de lanza de guerra tibetana",
    "category": 1,
    "mainSku": "COL-0120",
    "variants": [
      {"color": "", "sku": "COL-0120", "image": "/misc/test-thumbnails/skus/COL-0120.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ]
  },
  {
    "id": "EQFnOixZarCldkmZ9ZKH",
    "name": "Piedra y cuentas negras",
    "images": [
      "/misc/test-images/collares/elegantes/Piedra y cuentas negras 1.webp",
      "/misc/test-images/collares/elegantes/Piedra y cuentas negras 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0130.webp",
    "category": 1,
    "price": 20,
    "subcategory": 0,
    "discount": {"type": 0, "value": 22},
    "mainSku": "COL-0130",
    "variants": [
      {"color": "", "sku": "COL-0130", "image": "/misc/test-thumbnails/skus/COL-0130.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-0141", "image": "/misc/test-thumbnails/skus/COL-0141.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-0142", "image": "/misc/test-thumbnails/skus/COL-0142.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "discount": {"type": 1, "value": 6.3},
    "images": [
      "/misc/test-images/collares/elegantes/Amuleto ojo de Horus 1.webp",
      "/misc/test-images/collares/elegantes/Amuleto ojo de Horus 2.webp",
      "/misc/test-images/collares/elegantes/Amuleto ojo de Horus 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0140.webp",
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
      "/misc/test-images/collares/elegantes/COL-0150.webp",
      "/misc/test-images/collares/elegantes/Medallón San Benito dorado.webp",
      "/misc/test-images/collares/elegantes/Medallón San Benito mixto.webp",
      "/misc/test-images/collares/elegantes/Medallón San Benito plateado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0150.webp",
    "name": "Medallón San Benito",
    "updatedAt": 1753571810150,
    "waLink": "Medallón%20San%20Benito",
    "status": 1,
    "mainSku": "COL-0150",
    "variants": [
      {"color": "yellow", "sku": "COL-0151", "image": "/misc/test-thumbnails/skus/COL-0151.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-0152", "image": "/misc/test-thumbnails/skus/COL-0152.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "orange", "sku": "COL-0153", "image": "/misc/test-thumbnails/skus/COL-0153.webp", "stock": [
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
      "/misc/test-images/collares/elegantes/COL-0160.webp",
      "/misc/test-images/collares/elegantes/COL-0160 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-0160.webp",
    "category": 1,
    "description": "Medalla conmemorativa de San Benito de Nursia, con cruz en una cara e imagen de Benito de Nursia en la otra cara",
    "status": 0,
    "waLink": "Medalla%20San%20Benito%20dos%20caras",
    "mainSku": "COL-0160",
    "variants": [
      {"color": "yellow", "sku": "COL-0161", "image": "/misc/test-thumbnails/skus/COL-0161.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-0162", "image": "/misc/test-thumbnails/skus/COL-0162.webp", "stock": [
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
      {"color": "gray", "sku": "COL-1011", "image": "/misc/test-thumbnails/skus/COL-1011.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "yellow", "sku": "COL-1012", "image": "/misc/test-thumbnails/skus/COL-1012.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "createdAt": null,
    "status": 1,
    "images": [
      "/misc/test-images/collares/masonicos/Masónico 1.webp",
      "/misc/test-images/collares/masonicos/Masónico 2.webp",
      "/misc/test-images/collares/masonicos/Masónico 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1010.webp",
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
      "/misc/test-images/collares/masonicos/Cruz templaria 1.webp",
      "/misc/test-images/collares/masonicos/Cruz templaria 2.webp",
      "/misc/test-images/collares/masonicos/Cruz templaria 3.webp",
      "/misc/test-images/collares/masonicos/Cruz templaria 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1020.webp",
    "mainSku": "COL-1020",
    "variants": [
      {"color": "", "sku": "COL-1020", "image": "/misc/test-thumbnails/skus/COL-1020.webp", "stock": [
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
    "waLink": "collar%20Medallón%20templario",
    "subcategory": 1,
    "createdAt": null,
    "updatedAt": 1753188810305,
    "description": "Collar de medallón adornado con un guerrero templario",
    "price": 18.5,
    "images": [
      "/misc/test-images/collares/masonicos/Medallón templario 1.webp",
      "/misc/test-images/collares/masonicos/Medallón templario 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1030.webp",
    "mainSku": "COL-1030",
    "variants": [
      {"color": "", "sku": "COL-1030", "image": "/misc/test-thumbnails/skus/COL-1030.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "name": "Medallón templario"
  },
  {
    "id": "oYnTqvVeEyST41nCHiKV",
    "mainSku": "COL-1040",
    "waLink": "collar%20Medallón%20cruz%20templarios",
    "variants": [
      {"color": "yellow", "sku": "COL-1041", "image": "/misc/test-thumbnails/skus/COL-1041.jpeg", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-1042", "image": "/misc/test-thumbnails/skus/COL-1042.jpeg", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "images": [
      "/misc/test-images/collares/masonicos/Medallón cruz templarios 1.jpeg",
      "/misc/test-images/collares/masonicos/Medallón cruz templarios 2.jpeg"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1040.jpeg",
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
      "/misc/test-images/collares/masonicos/Medallón escuadra masónico 1.webp",
      "/misc/test-images/collares/masonicos/Medallón escuadra masónico 2.webp",
      "/misc/test-images/collares/masonicos/Medallón escuadra masónico 3.webp",
      "/misc/test-images/collares/masonicos/Medallón escuadra masónico 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-1050.webp",
    "subcategory": 1,
    "createdAt": null,
    "variants": [
      {"color": "yellow", "sku": "COL-1051", "image": "/misc/test-thumbnails/skus/COL-1051.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-1052", "image": "/misc/test-thumbnails/skus/COL-1052.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "description": "Collar de medallón adornado con una escuadra masónica dorada y con zircones. Disponible en dorado y en plateado",
    "waLink": "collar%20Medallón%20escuadra%20masónico"
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
      "/misc/test-images/collares/rockeros/Espada rota.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2010.webp",
    "mainSku": "COL-2010",
    "variants": [
      {"color": "", "sku": "COL-2010", "image": "/misc/test-thumbnails/skus/COL-2010.webp", "stock": [
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
      {"color": "", "sku": "COL-2030", "image": "/misc/test-thumbnails/skus/COL-2030.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188878553,
    "status": 1,
    "images": [
      "/misc/test-images/collares/rockeros/Búho con esqueleto 1.webp",
      "/misc/test-images/collares/rockeros/Búho con esqueleto 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2030.webp",
    "subcategory": 2,
    "waLink": "collar%20Búho%20con%20esqueleto",
    "createdAt": null,
    "price": 19.7,
    "category": 1,
    "description": "Collar de Búho, adornado con piedras amarillas en sus ojos, y con huesos de esqueleto en sus patas"
  },
  {
    "id": "m4u2IJAPSPROacIjpawx",
    "price": 20,
    "waLink": "collar%20Amuleto%20de%20dragón%20chino",
    "status": 0,
    "mainSku": "COL-2040",
    "variants": [
      {"color": "", "sku": "COL-2040", "image": "/misc/test-thumbnails/skus/COL-2040.webp", "stock": [
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
      "/misc/test-images/collares/rockeros/Amuleto de dragón chino 1.webp",
      "/misc/test-images/collares/rockeros/Amuleto de dragón chino 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2040.webp"
  },
  {
    "id": "rJltBJ502ZorLhll0BQR",
    "images": [
      "/misc/test-images/collares/rockeros/Ojo iluminati 1.webp",
      "/misc/test-images/collares/rockeros/Ojo iluminati 2.webp",
      "/misc/test-images/collares/rockeros/Ojo iluminati 3.webp",
      "/misc/test-images/collares/rockeros/Ojo iluminati 4.webp",
      "/misc/test-images/collares/rockeros/Ojo iluminati 5.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2050.webp",
    "name": "Ojo iluminati",
    "variants": [
      {"color": "red", "sku": "COL-2051", "image": "/misc/test-thumbnails/skus/COL-2051.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "blue", "sku": "COL-2052", "image": "/misc/test-thumbnails/skus/COL-2052.webp", "stock": [
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
      "/misc/test-images/collares/rockeros/Amuleto de león chino 1.webp",
      "/misc/test-images/collares/rockeros/Amuleto de león chino 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2060.webp",
    "mainSku": "COL-2060",
    "variants": [
      {"color": "", "sku": "COL-2060", "image": "/misc/test-thumbnails/skus/COL-2060.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "name": "Amuleto de león chino",
    "status": 0,
    "waLink": "collar%20Amuleto%20de%20león%20chino",
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
      "/misc/test-images/collares/rockeros/Collar tridente 1.webp",
      "/misc/test-images/collares/rockeros/Collar tridente 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2070.webp",
    "createdAt": null,
    "subcategory": 2,
    "mainSku": "COL-2070",
    "variants": [
      {"color": "", "sku": "COL-2070", "image": "/misc/test-thumbnails/skus/COL-2070.webp", "stock": [
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
      {"color": "", "sku": "COL-2080", "image": "/misc/test-thumbnails/skus/COL-2080.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753188915650,
    "images": [
      "/misc/test-images/collares/rockeros/Collar medusa 1.webp",
      "/misc/test-images/collares/rockeros/Collar medusa 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2080.webp",
    "subcategory": 2,
    "category": 1
  },
  {
    "id": "eTYMsEw7QzIHY9bF7qHY",
    "images": [
      "/misc/test-images/collares/rockeros/Máscara demonio japonés 1.webp",
      "/misc/test-images/collares/rockeros/Máscara demonio japonés 2.webp",
      "/misc/test-images/collares/rockeros/Máscara demonio japonés 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2090.webp",
    "updatedAt": 1753188926521,
    "waLink": "collar%20Máscara%20demonio%20japonés",
    "status": 1,
    "category": 1,
    "price": 18.5,
    "name": "Máscara demonio japonés",
    "description": "Collar de máscara de guerrero japonés (Hannya)",
    "subcategory": 2,
    "createdAt": null,
    "mainSku": "COL-2090",
    "variants": [
      {"color": "", "sku": "COL-2090", "image": "/misc/test-thumbnails/skus/COL-2090.webp", "stock": [
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
      {"color": "", "sku": "COL-2100", "image": "/misc/test-thumbnails/skus/COL-2100.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "name": "Ojo malvado",
    "images": [
      "/misc/test-images/collares/rockeros/Ojo malvado 3.jpeg"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2100.webp",
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
    "waLink": "collar%20Mariposa%20gótica",
    "price": 21,
    "images": [
      "/misc/test-images/collares/rockeros/Mariposa gótica 1.webp",
      "/misc/test-images/collares/rockeros/Mariposa gótica 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2110.webp",
    "subcategory": 2,
    "status": 1,
    "name": "Mariposa gótica",
    "updatedAt": 1753188979137,
    "mainSku": "COL-2110",
    "variants": [
      {"color": "", "sku": "COL-2110", "image": "/misc/test-thumbnails/skus/COL-2110.webp", "stock": [
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
      {"color": "", "sku": "COL-2120", "image": "/misc/test-thumbnails/skus/COL-2120.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "status": 0,
    "images": [
      "/misc/test-images/collares/rockeros/Mantra 1.webp",
      "/misc/test-images/collares/rockeros/Mantra 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2120.webp",
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
      {"color": "yellow", "sku": "COL-2131", "image": "/misc/test-thumbnails/skus/COL-2131.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-2132", "image": "/misc/test-thumbnails/skus/COL-2132.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 19.5,
    "images": [
      "/misc/test-images/collares/rockeros/Calavera ojos rojos 1.webp",
      "/misc/test-images/collares/rockeros/Calavera ojos rojos 2.webp",
      "/misc/test-images/collares/rockeros/Calavera ojos rojos 3.webp",
      "/misc/test-images/collares/rockeros/Calavera ojos rojos 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2130.webp",
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
      {"color": "yellow", "sku": "COL-2141", "image": "/misc/test-thumbnails/skus/COL-2141.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-2142", "image": "/misc/test-thumbnails/skus/COL-2142.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Medalla casco Espartano",
    "images": [
      "/misc/test-images/collares/rockeros/Medalla casco Espartano 1.webp",
      "/misc/test-images/collares/rockeros/Medalla casco Espartano 2.webp",
      "/misc/test-images/collares/rockeros/Medalla casco Espartano 3.webp",
      "/misc/test-images/collares/rockeros/Medalla casco Espartano 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2140.webp",
    "description": "Collar de medallón con forma de guerrero espartano. Disponible en dorado y en plateado",
    "mainSku": "COL-2140",
    "status": 1,
    "category": 1
  },
  {
    "id": "5QsnMdM3MWSTEYKzor4h",
    "subcategory": 2,
    "images": [
      "/misc/test-images/collares/rockeros/The Witcher.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2150.webp",
    "price": 17.5,
    "mainSku": "COL-2150",
    "variants": [
      {"color": "", "sku": "COL-2150", "image": "/misc/test-thumbnails/skus/COL-2150.webp", "stock": [
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
      "/misc/test-images/collares/rockeros/calavera 1.webp",
      "/misc/test-images/collares/rockeros/calavera 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2160.webp",
    "mainSku": "COL-2160",
    "variants": [
      {"color": "", "sku": "COL-2160", "image": "/misc/test-thumbnails/skus/COL-2160.webp", "stock": [
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
      {"color": "", "sku": "COL-2170", "image": "/misc/test-thumbnails/skus/COL-2170.jpeg", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "name": "Alas de ángel",
    "category": 1,
    "waLink": "collar%20Alas%20de%20ángel",
    "images": [
      "/misc/test-images/collares/rockeros/alas de angel 1.jpeg"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2170.jpeg",
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
      "/misc/test-images/collares/rockeros/Carnero con valknut 1.webp",
      "/misc/test-images/collares/rockeros/Carnero con valknut 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-2180.webp",
    "price": 20.5,
    "mainSku": "COL-2180",
    "variants": [
      {"color": "", "sku": "COL-2180", "image": "/misc/test-thumbnails/skus/COL-2180.webp", "stock": [
        {"name": "60cm", "quantity": 3}
      ]}
    ],
    "subcategory": 2
  },
  {
    "id": "XwMPY1pouzSPkBLx47le",
    "waLink": "collar%20Medallón%20Fenrir",
    "price": 18.5,
    "status": 0,
    "updatedAt": 1753189088874,
    "category": 1,
    "subcategory": 3,
    "images": [
      "/misc/test-images/collares/vikingos/Medallón Fenrir.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3010.webp",
    "name": "Medallón Fenrir",
    "description": "Collar Medallon adornado con la figura del lobo gigante Fenrir, hijo de Loki",
    "mainSku": "COL-3010",
    "variants": [
      {"color": "", "sku": "COL-3010", "image": "/misc/test-thumbnails/skus/COL-3010.webp", "stock": [
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
      {"color": "", "sku": "COL-3020", "image": "/misc/test-thumbnails/skus/COL-3020.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "images": [
      "/misc/test-images/collares/vikingos/Medallón de lobo con runas y hachas cruzadas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3020.webp",
    "name": "Medallón de lobo con runas y hachas cruzadas",
    "status": 2,
    "isDeleted": true,
    "subcategory": 2,
    "updatedAt": null,
    "createdAt": null,
    "price": 20,
    "waLink": "collar%20Medallón%20de%20lobo%20con%20runas%20y%20hachas%20cruzadas"
  },
  {
    "id": "YZnRln8bJVDQETXiIsBP",
    "description": "Collar con cabeza de lobo en relieve, adornado al perímetro con runas nórdicas doradas",
    "updatedAt": 1753189104778,
    "mainSku": "COL-3030",
    "variants": [
      {"color": "", "sku": "COL-3030", "image": "/misc/test-thumbnails/skus/COL-3030.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Medallon lobo  vikingo con runas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3030.webp"
  },
  {
    "id": "WI17HfeBGWrYiiSNWBE9",
    "waLink": "collar%20Medallón%20lobo%20en%20relieve",
    "subcategory": 3,
    "status": 0,
    "category": 1,
    "price": 20,
    "updatedAt": null,
    "description": "Medallón con cabeza de lobo en relieve",
    "mainSku": "COL-3040",
    "variants": [
      {"color": "", "sku": "COL-3040", "image": "/misc/test-thumbnails/skus/COL-3040.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "createdAt": null,
    "name": "Medallón lobo en relieve",
    "images": [
      "/misc/test-images/collares/vikingos/Medallón lobo en relieve.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3040.webp"
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
      {"color": "", "sku": "COL-3050", "image": "/misc/test-thumbnails/skus/COL-3050.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "createdAt": null,
    "price": 18.9,
    "images": [
      "/misc/test-images/collares/vikingos/Lobo de perfil.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3050.webp",
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
      "/misc/test-images/collares/vikingos/Lobo de ojos rojos 1.webp",
      "/misc/test-images/collares/vikingos/Lobo de ojos rojos 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3060.webp",
    "subcategory": 3,
    "category": 1,
    "price": 18.9,
    "mainSku": "COL-3060",
    "variants": [
      {"color": "", "sku": "COL-3060", "image": "/misc/test-thumbnails/skus/COL-3060.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Lobo con runa en la frente 1.webp",
      "/misc/test-images/collares/vikingos/Lobo con runa en la frente 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3070.webp",
    "updatedAt": 1753189146146,
    "price": 19.5,
    "category": 1,
    "mainSku": "COL-3070",
    "variants": [
      {"color": "", "sku": "COL-3070", "image": "/misc/test-thumbnails/skus/COL-3070.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Martillo de Thor 01.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3080.webp",
    "name": "Martillo de Thor",
    "status": 0,
    "category": 1,
    "description": "Collar con forma de martillo de Thor",
    "mainSku": "COL-3080",
    "variants": [
      {"color": "", "sku": "COL-3080", "image": "/misc/test-thumbnails/skus/COL-3080.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-3101", "image": "/misc/test-thumbnails/skus/COL-3101.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-3102", "image": "/misc/test-thumbnails/skus/COL-3102.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Martillo de Thor dije compuesto 1.webp",
      "/misc/test-images/collares/vikingos/Martillo de Thor dije compuesto 2.webp",
      "/misc/test-images/collares/vikingos/Martillo de Thor dije compuesto 3.webp",
      "/misc/test-images/collares/vikingos/Martillo de Thor dije compuesto 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3100.webp"
  },
  {
    "id": "ER2oeWGWdYKKH4vFuqib",
    "mainSku": "COL-3110",
    "variants": [
      {"color": "", "sku": "COL-3110", "image": "/misc/test-thumbnails/skus/COL-3110.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "category": 1,
    "subcategory": 3,
    "name": "Punta de Lanza con valknut",
    "status": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Punta de Lanza con valknut 1.webp",
      "/misc/test-images/collares/vikingos/Punta de Lanza con valknut 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3110.webp",
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
      {"color": "yellow", "sku": "COL-3121", "image": "/misc/test-thumbnails/skus/COL-3121.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]},
      {"color": "gray", "sku": "COL-3122", "image": "/misc/test-thumbnails/skus/COL-3122.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753189242258,
    "subcategory": 3,
    "createdAt": null,
    "price": 19.7,
    "category": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Vegvisir vintage 1.webp",
      "/misc/test-images/collares/vikingos/Vegvisir vintage 2.webp",
      "/misc/test-images/collares/vikingos/Vegvisir vintage 3.webp",
      "/misc/test-images/collares/vikingos/Vegvisir vintage 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3120.webp",
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
      {"color": "", "sku": "COL-3130", "image": "/misc/test-thumbnails/skus/COL-3130.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "collar%20Punta%20de%20hacha",
    "name": "Punta de hacha",
    "description": "Collar con forma de punta de hacha, adornado con detalles y vegvisir",
    "images": [
      "/misc/test-images/collares/vikingos/Punta de hacha 1.webp",
      "/misc/test-images/collares/vikingos/Punta de hacha 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3130.webp",
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
      "/misc/test-images/collares/vikingos/Vegvisir minimalista 1.webp",
      "/misc/test-images/collares/vikingos/Vegvisir minimalista 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3140.webp",
    "status": 1,
    "waLink": "collar%20Vegvisir%20minimalista",
    "mainSku": "COL-3140",
    "variants": [
      {"color": "", "sku": "COL-3140", "image": "/misc/test-thumbnails/skus/COL-3140.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Cráneo de cuervo con vegvisir 1.webp",
      "/misc/test-images/collares/vikingos/Cráneo de cuervo con vegvisir 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3150.webp",
    "updatedAt": 1753189274169,
    "price": 18.9,
    "category": 1,
    "mainSku": "COL-3150",
    "variants": [
      {"color": "", "sku": "COL-3150", "image": "/misc/test-thumbnails/skus/COL-3150.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "waLink": "collar%20Cráneo%20de%20cuervo%20con%20vegvisir",
    "subcategory": 3,
    "status": 1
  },
  {
    "id": "nH4Zw0M67BbYJKiuLguL",
    "images": [
      "/misc/test-images/collares/vikingos/Collar Jormundgand 1.webp",
      "/misc/test-images/collares/vikingos/Collar Jormundgand 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3160.webp",
    "mainSku": "COL-3160",
    "variants": [
      {"color": "", "sku": "COL-3160", "image": "/misc/test-thumbnails/skus/COL-3160.webp", "stock": [
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
      {"color": "", "sku": "COL-3170", "image": "/misc/test-thumbnails/skus/COL-3170.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "updatedAt": 1753189303615,
    "name": "Collar Jormundgand infinito",
    "images": [
      "/misc/test-images/collares/vikingos/Collar Jormundgand infinito 1.webp",
      "/misc/test-images/collares/vikingos/Collar Jormundgand infinito 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3170.webp",
    "rating": 0
  },
  {
    "id": "aL7Z0XpbobtXYx2lMCGF",
    "subcategory": 3,
    "description": "Collar tipo medallón con figura de valknut por un lado, y vegvisir por el otro lado",
    "status": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Collar valknut con vegvisir 1.webp",
      "/misc/test-images/collares/vikingos/Collar valknut con vegvisir 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3180.webp",
    "mainSku": "COL-3180",
    "variants": [
      {"color": "", "sku": "COL-3180", "image": "/misc/test-thumbnails/skus/COL-3180.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Collar hacha con valknut 1.webp",
      "/misc/test-images/collares/vikingos/Collar hacha con valknut 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3190.webp",
    "name": "Collar hacha con valknut",
    "category": 1,
    "price": 19.95,
    "subcategory": 3,
    "mainSku": "COL-3190",
    "variants": [
      {"color": "", "sku": "COL-3190", "image": "/misc/test-thumbnails/skus/COL-3190.webp", "stock": [
        {"name": "60cm", "quantity": 1}
      ]}
    ],
    "status": 1,
    "rating": 0
  },
  {
    "id": "DvK5oWaljMFlEn0wWoQJ",
    "waLink": "collar%20Árbol%20de%20la%20vida%20con%20runas",
    "mainSku": "COL-3200",
    "variants": [
      {"color": "", "sku": "COL-3200", "image": "/misc/test-thumbnails/skus/COL-3200.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Árbol de la vida con runas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3200.webp",
    "updatedAt": 1753189344778
  },
  {
    "id": "6enR8bfNfvBtQ9vierhm",
    "price": 16.75,
    "waLink": "collar%20Medalla%20de%20Odín",
    "mainSku": "COL-3210",
    "variants": [
      {"color": "", "sku": "COL-3210", "image": "/misc/test-thumbnails/skus/COL-3210.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "discount": {"type": 0, "value": 20},
    "name": "Medalla de Odín",
    "createdAt": null,
    "subcategory": 3,
    "images": [
      "/misc/test-images/collares/vikingos/Medalla de Odín 1.webp",
      "/misc/test-images/collares/vikingos/Medalla de Odín 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3210.webp",
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
      {"color": "", "sku": "COL-3220", "image": "/misc/test-thumbnails/skus/COL-3220.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "subcategory": 3,
    "images": [
      "/misc/test-images/collares/vikingos/Barra 3D de runas 1.webp",
      "/misc/test-images/collares/vikingos/Barra 3D de runas 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3220.webp",
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
      "/misc/test-images/collares/vikingos/Cuerno vikingo con vegvísir 1.webp",
      "/misc/test-images/collares/vikingos/Cuerno vikingo con vegvísir 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3230.webp",
    "price": 17.5,
    "status": 1,
    "category": 1,
    "description": "Collar con forma de cuerno, adornado con runas y vegvisir",
    "updatedAt": 1753189385587,
    "subcategory": 3,
    "waLink": "collar%20Cuerno%20vikingo%20con%20vegvísir",
    "mainSku": "COL-3230",
    "variants": [
      {"color": "", "sku": "COL-3230", "image": "/misc/test-thumbnails/skus/COL-3230.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Aro con cuervo 1.webp",
      "/misc/test-images/collares/vikingos/Aro con cuervo 2.webp",
      "/misc/test-images/collares/vikingos/Aro con cuervo 3.webp",
      "/misc/test-images/collares/vikingos/Aro con cuervo 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3240.webp",
    "price": 19,
    "mainSku": "COL-3240",
    "status": 1,
    "category": 1,
    "variants": [
      {"color": "yellow", "sku": "COL-3241", "image": "/misc/test-thumbnails/skus/COL-3241.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3242", "image": "/misc/test-thumbnails/skus/COL-3242.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-3251", "image": "/misc/test-thumbnails/skus/COL-3251.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]},
      {"color": "gray", "sku": "COL-3252", "image": "/misc/test-thumbnails/skus/COL-3252.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Nudo celta 1.webp",
      "/misc/test-images/collares/vikingos/Nudo celta 2.webp",
      "/misc/test-images/collares/vikingos/Nudo celta 3.webp",
      "/misc/test-images/collares/vikingos/Nudo celta 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3250.webp",
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
      "/misc/test-images/collares/vikingos/Hachas dobles vikingas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3260.webp",
    "status": 1,
    "category": 1,
    "description": "Collar con forma de 2 hachas de guerra cruzadas",
    "waLink": "collar%20Hachas%20dobles%20vikingas",
    "mainSku": "COL-3260",
    "variants": [
      {"color": "", "sku": "COL-3260", "image": "/misc/test-thumbnails/skus/COL-3260.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Medallón Hugin y Munin 1.webp",
      "/misc/test-images/collares/vikingos/Medallón Hugin y Munin 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3270.webp",
    "name": "Medallón Hugin y Munin",
    "status": 1,
    "category": 1,
    "waLink": "collar%20Medallón%20Hugin%20y%20Munin",
    "createdAt": null,
    "description": "Collar tipo medallón, con las figuras de Hugin y Munin, los 2 cuervos compañeros de Odín, dios de la motología nórdica",
    "discount": {"type": 1, "value": 4.1},
    "mainSku": "COL-3270",
    "variants": [
      {"color": "", "sku": "COL-3270", "image": "/misc/test-thumbnails/skus/COL-3270.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ]
  },
  {
    "id": "6gLfqIBa1ceaVxeIiY44",
    "waLink": "collar%20Nudo%20de%20bruja",
    "status": 0,
    "images": [
      "/misc/test-images/collares/vikingos/Nudo de bruja 1.webp",
      "/misc/test-images/collares/vikingos/Nudo de bruja 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3280.webp",
    "price": 17.5,
    "category": 1,
    "description": "Collar con forma del nudo de bruja celta",
    "subcategory": 3,
    "createdAt": null,
    "name": "Nudo de bruja",
    "updatedAt": 1753189476051,
    "mainSku": "COL-3280",
    "variants": [
      {"color": "", "sku": "COL-3280", "image": "/misc/test-thumbnails/skus/COL-3280.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ]
  },
  {
    "id": "XEiRA1msNEBq3lZl7GjC",
    "images": [
      "/misc/test-images/collares/vikingos/Lobo dorado.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3290.webp",
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
      {"color": "", "sku": "COL-3290", "image": "/misc/test-thumbnails/skus/COL-3290.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Rueda de runas vikingas 1.webp",
      "/misc/test-images/collares/vikingos/Rueda de runas vikingas 2.webp",
      "/misc/test-images/collares/vikingos/Rueda de runas vikingas 3.webp",
      "/misc/test-images/collares/vikingos/Rueda de runas vikingas 4.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3300.webp",
    "category": 1,
    "variants": [
      {"color": "yellow", "sku": "COL-3301", "image": "/misc/test-thumbnails/skus/COL-3301.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3302", "image": "/misc/test-thumbnails/skus/COL-3302.webp", "stock": [
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
      "/misc/test-images/collares/vikingos/Martillo de Thor con valknut - 0.webp",
      "/misc/test-images/collares/vikingos/Martillo de Thor con valknut - 1.webp",
      "/misc/test-images/collares/vikingos/Martillo de Thor con valknut - 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3310.webp",
    "status": 1,
    "price": 19.5,
    "subcategory": 3,
    "variants": [
      {"color": "", "sku": "COL-3310", "image": "/misc/test-thumbnails/skus/COL-3310.webp", "stock": [
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
      {"color": "yellow", "sku": "COL-3321", "image": "/misc/test-thumbnails/skus/COL-3321.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]},
      {"color": "gray", "sku": "COL-3322", "image": "/misc/test-thumbnails/skus/COL-3322.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Collar Doble Hacha Hugin y Munin",
    "images": [
      "/misc/test-images/collares/vikingos/Collar Doble Hacha Hugin y Munin - 0.webp",
      "/misc/test-images/collares/vikingos/Collar Doble Hacha Hugin y Munin - 1.webp",
      "/misc/test-images/collares/vikingos/Collar Doble Hacha Hugin y Munin - 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3320.webp",
    "subcategory": 3,
    "status": 1,
    "category": 1,
  },
  {
    "id": "1KE6Gf2N25uTXwlX9sdk",
    "description": "Medallón con elegante diseño dorado de lobos, con valknut superior, y runas nórdicas perimetrales",
    "updatedAt": 1753189565883,
    "images": [
      "/misc/test-images/collares/vikingos/Lobos en relieve%2C valknut y runas.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3400.webp",
    "category": 1,
    "price": 19,
    "waLink": "Collar%20Lobos%20en%20relieve%2C%20valknut%20y%20runas",
    "mainSku": "COL-3400",
    "variants": [
      {"color": "", "sku": "COL-3400", "image": "/misc/test-thumbnails/skus/COL-3400.webp", "stock": [
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
      {"color": "", "sku": "COL-3410", "image": "/misc/test-thumbnails/skus/COL-3410.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "name": "Collar de diente de lobo",
    "images": [
      "/misc/test-images/collares/vikingos/Collar de diente de lobo - 0.webp",
      "/misc/test-images/collares/vikingos/Collar de diente de lobo - 1.webp",
      "/misc/test-images/collares/vikingos/Collar de diente de lobo - 2.webp",
      "/misc/test-images/collares/vikingos/Collar de diente de lobo - 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3410.webp",
    "price": 21.75,
    "category": 1,
    "waLink": "Collar%20de%20diente%20de%20lobo",
    "description": "Collar plateado con diseño elegante de forma de colmillo de lobo"
  },
  {
    "id": "HGawjU551YC61Or9oObf",
    "mainSku": "COL-3420",
    "variants": [
      {"color": "", "sku": "COL-3420", "image": "/misc/test-thumbnails/skus/COL-3420.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "price": 17.9,
    "subcategory": 3,
    "name": "Collar Guerrero Berseker",
    "status": 1,
    "images": [
      "/misc/test-images/collares/vikingos/Collar Guerrero Berseker - 0.webp",
      "/misc/test-images/collares/vikingos/Collar Guerrero Berseker - 1.webp",
      "/misc/test-images/collares/vikingos/Collar Guerrero Berseker - 2.webp",
      "/misc/test-images/collares/vikingos/Collar Guerrero Berseker - 3.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/COL-3420.webp",
    "description": "Elegante collar con forma de guerrero vikingo, y cuervo en su hombro.",
    "waLink": "Collar%20Guerrero%20Berseker",
    "category": 1
  },
  {
    "id": "KIjWV2PqDYr3SttX8z1j",
    "waLink": "reloj%20CURREN%20Marrón",
    "category": 3,
    "description": "Reloj con correa de cuero marrón y cuerpo de acero inoxidable. Reloj automático (no usa baterías)",
    "images": [
      "/misc/test-images/relojes/curren 1.webp",
      "/misc/test-images/relojes/curren 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-0010.webp",
    "createdAt": null,
    "mainSku": "REL-0010",
    "variants": [
      {"color": "", "sku": "REL-0010", "image": "/misc/test-thumbnails/skus/REL-0010.webp", "stock": [
        {"name": "60cm", "quantity": 2}
      ]}
    ],
    "status": 1,
    "name": "CURREN Marrón",
    "updatedAt": 1746054964208,
    "price": 40
  },
  {
    "id": "XPWBsMqLsMJqBUQacnL2",
    "status": 1,
    "description": "Reloj dorado de acero inoxidable",
    "updatedAt": 1746967584712,
    "images": [
      "/misc/test-images/relojes/dorado 1.webp",
      "/misc/test-images/relojes/dorado 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1011.webp",
    "price": 47,
    "name": "OLEVS dorado",
    "category": 3,
    "waLink": "reloj%20OLEVS%20dorado",
    "mainSku": "REL-1011",
    "variants": [
      {"color": "", "sku": "REL-1011", "image": "/misc/test-thumbnails/skus/REL-1011.webp", "stock": [
        {"name": "60cm", "quantity": 1}
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
      {"color": "", "sku": "REL-1012", "image": "/misc/test-thumbnails/skus/REL-1012.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "price": 47,
    "description": "Reloj negro de acero inoxidable",
    "waLink": "reloj%20OLEVS%20negro",
    "name": "OLEVS negro",
    "category": 3,
    "images": [
      "/misc/test-images/relojes/reloj negro 1.webp",
      "/misc/test-images/relojes/reloj negro 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1012.webp"
  },
  {
    "id": "jjr143W5psMhi875zQ8H",
    "updatedAt": null,
    "description": "Reloj de cuerpo dorado y pulsera plateada de acero inoxidable",
    "category": 3,
    "price": 47,
    "images": [
      "/misc/test-images/relojes/dorado y plateado 1.webp",
      "/misc/test-images/relojes/dorado y plateado 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1013.webp",
    "waLink": "reloj%20OLEVS%20plateado%20y%20dorado",
    "status": 0,
    "mainSku": "REL-1013",
    "variants": [
      {"color": "", "sku": "REL-1013", "image": "/misc/test-thumbnails/skus/REL-1013.webp", "stock": [
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
      {"color": "", "sku": "REL-1020", "image": "/misc/test-thumbnails/skus/REL-1020.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
    "description": "Reloj de acero inoxidable, de diseño en rombo y en color plateado",
    "images": [
      "/misc/test-images/relojes/reloj plateado 1.webp",
      "/misc/test-images/relojes/reloj plateado 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1020.webp",
    "name": "OLEVS plateado rómbico",
    "waLink": "reloj%20OLEVS%20plateado%20rómbico",
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
      "/misc/test-images/relojes/plateado con azul 1.webp",
      "/misc/test-images/relojes/plateado con azul 2.webp"
    ],
    "thumbnail": "/misc/test-thumbnails/REL-1030.webp",
    "createdAt": null,
    "waLink": "reloj%20OLEVS%20plateado%20y%20azul",
    "description": "Reloj de acero inoxidable, en color plateado y con visor de color azul brillante",
    "status": 0,
    "price": 43,
    "mainSku": "REL-1030",
    "variants": [
      {"color": "", "sku": "REL-1030", "image": "/misc/test-thumbnails/skus/REL-1030.webp", "stock": [
        {"name": "60cm", "quantity": 0}
      ]}
    ],
  }
]