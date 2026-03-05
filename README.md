# 🚀Commitive - Own Your Commits.
### A unified dashboard to track GitHub issues and pull requests across multiple repositories — in one clean interface.

## 📌 Overview

- Commitive is a developer-focused dashboard that aggregates your GitHub activity across repositories. Instead of switching between multiple repo tabs, you get a centralized view of:

- Open & closed pull requests
- Assigned issues
- Repository-wise contributions
- Review status tracking
- Built for individual developers and teams who want better visibility into their GitHub workflow.

## ✨ Features

- 🔎 Cross-repository issue tracking
- 🔁 Pull request monitoring
- 📊 Unified dashboard view
- ⚡ Fast UI with Next.js App Router

## 🏗️ Tech Stack

- Frontend: Next.js (App Router)
- UI: HeroUI + Tailwind CSS
- Backend: Next.js API routes
- Database ORM: Prisma
- GitHub Integration: GitHub REST API

## 📂 Project Structure
```
├── app/
│   ├── api/
│   ├── dashboard/
│   └── generated/
├── components/
├── lib/
├── prisma/
│   └── schema.prisma
└── package.json
```

- app/ → Application routes and API handlers
- components/ → Reusable UI components
- lib/ → Utilities and services
- prisma/ → Database schema & migrations

## ⚙️ Setup Instructions
1. Clone the Repository
```bash
  git clone https://github.com/your-username/commitive.git
  cd commitive
```
2. Install Dependencies
``` npm install ```
3. Configure Environment Variables
4. Create a .env file in the root directory:

- DATABASE_URL="your_database_url"
- GITHUB_TOKEN="your_github_token"
- NEXTAUTH_SECRET="your_secret"
-  AUTH_URL="http://localhost:3000"

4. Setup Prisma

--- Generate the Prisma client:

``` npx prisma generate ```

Run database migrations:

```npx prisma migrate dev```
5. Start Development Server
```npm run dev```

Application runs at:

http://localhost:3000

🗄️ Prisma Notes

- Keep schema.prisma inside /prisma
- Run npx prisma generate after every schema change
- Use npx prisma studio to inspect your database

## 🔐 GitHub API Setup

To fetch issues and PRs:
- Create a GitHub Personal Access Token
- Enable scopes:
- repo
- read:user
- Add it to .env as GITHUB_TOKEN

## 📈 Roadmap

- Repository filtering
- PR analytics dashboard
- Real-time updates
- Notifications system
- Team-based views

🛠 Available Scripts
```
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production server
npx prisma studio  # Open Prisma database GUI
```

## 🤝 Contributing

- Fork the repository
- Create a feature branch
- Commit changes
- Open a Pull Request
