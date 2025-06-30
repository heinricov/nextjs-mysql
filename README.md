### Install Next Js

```bash
npx create-next-app@latest
```

### Shadcn ui

```bash
npx shadcn@latest init
```

- components

```bash
npx shadcn@latest add button input textarea card label table badge
```

- dark mode

```bash
npm install next-themes
```

- buat file [theme-provider.tsx](./components/theme-provider.tsx) di dalam folder components/

- bungkus root layout dengan ThemeProvider di folder /app/[layout.tsx](./app/layout.tsx)

### installasi Database

- Install Dependency

```bash
npm install prisma @prisma/client
npm install mysql2
```

- <span style="color:red">Install MySQL</span>

```bash
brew install mysql
```

- <span style="color:red">Start MySQL server</span>

```bash
brew services start mysql
```

- <span style="color:red">Cek status MySQL</span>

```bash
brew services list
```

- <span style="color:red">Tes koneksi MySQL</span>

```bash
mysql -u root -p
```

- <span style="color:red">Stop MySQL server</span>

```bash
brew services stop mysql
```

- Initialize Prisma

```bash
npx prisma init
```

- Migrasi Database

```bash
npx prisma migrate dev --name init
```

- pastikan koneksi ke database lokal sudah benar
  bisa cek dengan DBngin + tableplus, MAMP, atau XAMPP

- edit file .env dengan sesuai contoh

```bash
DATABASE_URL="mysql://root:@localhost:3306/blog"
```

### Created Client Prisma

- Gunakan Prisma di Route Handler (App Router) dengan membuat file lib/prisma.ts untuk reusable client di folder /lib/[prisma.ts](./lib/prisma.ts)

### Created API Route Handler

- Buat API Route Handler di folder /app/api/[route.ts](./app/api/route.ts)

### Pemanggilan API dari Komponen

- buat File di folder /components/[PostForm.tsx](./components/PostForm.tsx)

- buat File di folder /components/[PostTable.tsx](./components/PostTable.tsx)

- Edit file /app/[page.tsx](./app/page.tsx)

### Deploy ke vercel

- buat repository di github

- edit file package.json

```json
"scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate",
    "lint": "next lint"
  },
```

- isi Environment Variable di vercel

```bash
DATABASE_URL="mysql://root:@localhost:3306/blog"
```
