This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# NextStep — Frontend Guia de instalacion

Aplicación web desarrollada para Programación III (UTN).

**Stack:** Next.js 16 + TypeScript + Tailwind CSS + NextAuth

**Repositorio:** https://github.com/FloritoM/NextStep_TP

---

## Requisitos previos

- Node.js v18 o superior
- npm v9 o superior
- Backend corriendo en `http://localhost:3001`

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/FloritoM/NextStep_TP.git
cd NextStep_TP
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crear el archivo `.env.local` en la raíz del proyecto:

```env
# URL del backend (debe estar corriendo en el puerto 3001)
NEXT_PUBLIC_API_URL=http://localhost:3001
BACKEND_URL=http://localhost:3001

# NextAuth
AUTH_SECRET=tu_secreto_nextauth_aqui
AUTH_TRUST_HOST=true
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (opcional — para login con Google)
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

> **AUTH_SECRET:** puede ser cualquier string aleatorio. Para generarlo: `openssl rand -base64 32`

> **Google OAuth:** si no se configuran las credenciales de Google, el login con email y contraseña sigue funcionando normalmente.

### 4. Levantar la aplicación

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`

---

## Estructura de rutas

```
app/
├── (roles-view)/
│   ├── admin/dashboard/          ← Dashboard administrador
│   ├── applicant/dashboard/      ← Dashboard candidato
│   └── recruiter/
│       └── dashboard/
│           ├── page.tsx          ← Lista de job offers
│           └── jobs/
│               └── [id]/
│                   ├── page.tsx  ← Detalle de job con stages
│                   └── candidates/
│                       └── [candidateId]/
│                           └── page.tsx  ← Feedback + scorecards del candidato
├── dashboard/                    ← Redirección según rol
├── login/                        ← Pantalla de login
├── register/                     ← Registro de usuario
└── home/                         ← Vista pública de ofertas
```

---

## Flujo de navegación

```
Login / Registro
      ↓
 /dashboard  →  detecta el rol del usuario
      ↓
recruiter  →  /recruiter/dashboard
applicant  →  /applicant/dashboard
admin      →  /admin/dashboard
```

---

## Notas importantes

- El archivo `.env.local` **no está en el repositorio** — hay que crearlo manualmente.
- Para login con Google, agregar `http://localhost:3000/api/auth/callback/google` como URI de redirección autorizada en Google Cloud Console.
- En Next.js 16, `params` es una `Promise` — usar `const { id } = await params`.

---

## Troubleshooting frecuente

**Login no funciona (ECONNREFUSED)**
- Verificar que el backend esté corriendo en el puerto 3001
- Verificar que `BACKEND_URL` en `.env.local` sea `http://localhost:3001`

**Puerto en uso**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```