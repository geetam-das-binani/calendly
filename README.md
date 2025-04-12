

# Calendly Clone

A full-stack calendar scheduling application built with Next.js, Prisma, and Nylas integration.

## Features

- 🔐 Authentication with NextAuth
- 📅 Create and manage event types
- 🤝 Instant meeting scheduling
- 📹 Google Meet integration
- 🔒 Enterprise-grade security with Nylas
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Calendar Integration:** Nylas
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** Conform
- **File Upload:** Next-cloudinary
- **Cloud Storage:** Cloudinary
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Nylas API credentials
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd calendly
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```env
DATABASE_URL="your_postgresql_url"
DIRECT_URL="your_direct_postgresql_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
NYLAS_API_KEY="your_nylas_api_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                  # Next.js app router pages
├── components/          # Reusable components
├── lib/                 # Utility functions and configurations
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── actions/            # Server actions
```

