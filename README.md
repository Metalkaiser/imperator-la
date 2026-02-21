# Imperator LA — Catálogo + Panel de Administración

Aplicación web para catálogo de productos con panel de administración. Incluye multi‑idioma con `next-intl`, proveedores de datos intercambiables (Firebase, MongoDB, SQL/Prisma, mock), y carrito opcional con conversión de moneda.

## Stack principal
- Next.js 15.3.x
- React 19
- Tailwind CSS 4
- Prisma (opcional)
- Firebase (opcional)
- MongoDB (opcional)

## Características
- Catálogo con categorías/subcategorías y ficha de producto
- Panel admin con inventario, órdenes (si el carrito está habilitado), configuración y usuarios
- i18n con `next-intl`
- Múltiples proveedores de datos (`firebase | mongo | sql | mock`)
- Carrito opcional con conversión de moneda

## Requisitos
- Node.js LTS

## Scripts
- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run start` — servidor de producción
- `npm run lint` — lint

## Instalación rápida
1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Copia variables de entorno desde `.env.example`
4. Ejecuta: `npm run dev`

## Variables de entorno

> Importante: **no comitees credenciales**. Usa `.env.*.local`.

### Generales
- `NODE_ENV` — `development | production | test`
- `DATA_PROVIDER` — `firebase | mongo | sql | mock`
- `NEXT_PUBLIC_BASE_URL` — base URL para llamadas client‑side

### i18n
> El código utiliza `NEXT_PUBLIC_LANG_*` (ver `src/i18n/routing.tsx`).
- `NEXT_PUBLIC_LANG_LOCALES` — lista separada por comas (ej: `es,en`)
- `NEXT_PUBLIC_LANG_DEFAULTLOCALES` — locale por defecto (ej: `es`)

### Carrito
- `NEXT_PUBLIC_CART_ENABLED` — `true | false`
- `NEXT_PUBLIC_CART_EXPIRATION_DAYS` — días de expiración
- `NEXT_PUBLIC_CART_SESSION_NAME` — nombre de sesión
- `NEXT_PUBLIC_CART_MAIN_CURRENCY` — moneda principal
- `NEXT_PUBLIC_EXCHANGE_CURRENCY` — moneda de conversión
- `NEXT_PUBLIC_EXCHANGE_ENABLED` — `true | false`
- `NEXT_PUBLIC_EXCHANGE_RATE_TYPE` — `fixed | api`

### Firebase (client)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `MEASUREMENT_ID`

### Firebase (admin/server)
- `FIREBASE_SERVICE_ACCOUNT_KEY` — JSON del service account **en una sola línea**
- `GOOGLE_APPLICATION_CREDENTIALS` — ruta al JSON de credenciales (alternativa)

### MongoDB
- `MONGODB_URI`
- `MONGODB_DB`

### SQL / Prisma
- `DATABASE_URL`
- `DATABASE_PROVIDER` — `postgresql | mysql | sqlite`

### Auth
- `AUTH_JWT_SECRET` — necesario si `authConfigs.source = custom`

## Configuración clave

### Proveedor de datos
- Se controla con `DATA_PROVIDER`.
- Implementaciones en `src/services/`:
  - `FirebaseProductService.tsx`
  - `MongoProductService.tsx`
  - `SQLProductService.tsx`
  - `MockProductService.tsx`
- Selector: `src/config/productServiceInstance.ts`

### Autenticación (admin)
- Configuración en `src/config/websiteConfig/authConfig.ts` (`authConfigs.source`).
- Cliente implementado: `firebase` y `mock`.
- Server‑side soporta `custom` (JWT) en rutas API.

### i18n
- Configuración en `src/i18n/`.
- Mensajes en `src/app/lang/<locale>/index.ts` + JSON en `translations/`.

### Carrito
- Flags principales via env (`NEXT_PUBLIC_CART_*`, `NEXT_PUBLIC_EXCHANGE_*`).
- Config base en `src/config/shoppingCartConfig.tsx`.

## Estructura de carpetas
- Catálogo: `src/app/[locale]/(catalog)`
- Admin: `src/app/admin`
- API routes: `src/app/api`
- Config: `src/config`

## Despliegue

### Vercel
- Build estándar con `npm run build` y `npm run start`.
- Configura variables de entorno en el panel de Vercel.

### Firebase Hosting (export estático)
- En `next.config.ts`, setea:
  ```ts
  const nextConfig = { output: 'export' };
  ```
- Ejecuta `npm run build` y despliega con Firebase Hosting.
- Nota: debes manejar rutas dinámicas con parámetros estáticos.

## Notas y troubleshooting
- `.env.example` puede quedar desfasado frente a variables usadas realmente. Revisa `src/i18n/routing.tsx` y `src/app/[locale]/(catalog)/layout.tsx` para confirmar los nombres actuales.
- Para Firebase Admin, asegúrate de tener credenciales válidas (`FIREBASE_SERVICE_ACCOUNT_KEY` o `GOOGLE_APPLICATION_CREDENTIALS`).
