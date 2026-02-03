<div align="center">

# 🎙️ RK Talks

### A Premium Personal Portfolio & Blog Platform

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-rktalks.vercel.app-00C7B7?style=for-the-badge)](https://rktalks.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>A visually stunning, feature-rich personal website built with cutting-edge web technologies featuring immersive 3D experiences, smooth animations, and interactive elements.</strong>
</p>

</div>

---

## ✨ Features

### 🎨 **Immersive Visual Experience**
- **Custom Cursor** - Elegant golden cursor with trail effects and hover interactions
- **3D Landscapes** - React Three Fiber powered 3D backgrounds
- **Particle Systems** - Dynamic particle fields using tsParticles
- **Liquid Animations** - Smooth liquid background effects
- **Lottie Animations** - High-quality vector animations throughout

### 🚀 **Modern Architecture**
- **Next.js 16 App Router** - Latest Next.js features with server components
- **React 19** - Cutting-edge React with concurrent features
- **TypeScript** - Full type safety across the codebase
- **Tailwind CSS 4** - Next-generation utility-first styling

### 🎮 **Interactive Features**
- **Achievement System** - Gamified user experience with unlockable achievements
- **Hidden Collectibles** - Easter eggs scattered throughout the site
- **Theme System** - Immersive theming with dynamic backgrounds
- **Smooth Scrolling** - Lenis-powered buttery smooth scroll experience

### 📱 **Core Sections**
- **Home** - Stunning hero section with animated elements
- **About** - Personal information and background
- **Services** - Professional services offered
- **Blog** - Markdown-powered blog with rich content
- **Certifications** - Professional certifications showcase
- **Contact** - Email integration with Resend API

### 🔧 **Technical Features**
- **Neon Database** - Serverless PostgreSQL for data persistence
- **GSAP Animations** - Professional-grade animations
- **API Routes** - Serverless API endpoints
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags and structured data

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16, React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, CSS Modules |
| **3D Graphics** | React Three Fiber, Three.js, Drei |
| **Animations** | GSAP, Lottie React, tsParticles |
| **Database** | Neon (Serverless PostgreSQL) |
| **Email** | Resend API |
| **State Management** | Zustand |
| **Scrolling** | Lenis |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ratna3/ratnatalk.git
   cd ratnatalk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database (Neon PostgreSQL)
   DATABASE_URL=your_neon_database_url
   
   # Email Service (Resend)
   RESEND_API_KEY=your_resend_api_key
   
   # Optional: Admin credentials
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ratnatalk/
├── public/              # Static assets
├── scripts/             # Utility scripts
├── src/
│   ├── animations/      # Lottie animation files
│   ├── app/
│   │   ├── (site)/      # Main site routes
│   │   │   ├── about/
│   │   │   ├── blogs/
│   │   │   ├── certifications/
│   │   │   ├── contact/
│   │   │   └── services/
│   │   ├── admin/       # Admin dashboard
│   │   ├── api/         # API routes
│   │   └── globals.css  # Global styles
│   ├── components/
│   │   ├── interactive/ # Interactive elements
│   │   ├── landscape/   # 3D landscape components
│   │   ├── navigation/  # Navigation components
│   │   ├── theme/       # Theme system
│   │   └── ui/          # UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   └── stores/          # Zustand stores
├── .env.local           # Environment variables (create this)
├── next.config.ts       # Next.js configuration
├── package.json
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

---

## 🔐 Security

### Reporting Vulnerabilities

If you discover a security vulnerability, please **do not** create a public issue. Instead:

1. **Email**: Send details to [ratnakirtiscr@gmail.com](mailto:ratnakirtiscr@gmail.com)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

We take security seriously and will respond within 48 hours.

### Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ Password hashing with bcrypt
- ✅ Input validation on API routes
- ✅ HTTPS enforced in production
- ✅ No sensitive data in client-side code

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- 📝 Follow the existing code style
- 🧪 Test your changes thoroughly
- 📖 Update documentation if needed
- 🎯 Keep PRs focused and small
- 💬 Write clear commit messages

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding tests |
| `chore` | Maintenance tasks |

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Ratna Kirti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D rendering
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vercel](https://vercel.com/) - Deployment platform
- [Neon](https://neon.tech/) - Serverless Postgres

---

## 👨‍💻 Author

<div align="center">

### **Ratna Kirti**

[![Website](https://img.shields.io/badge/🌐_Website-rktalks.vercel.app-00C7B7?style=for-the-badge)](https://rktalks.vercel.app/)

[![Email](https://img.shields.io/badge/Email-ratnakirtiscr%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ratnakirtiscr@gmail.com)
[![Discord](https://img.shields.io/badge/Discord-Ratna%20For%20Nerds-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/n2Zrr4c5NU)
[![GitHub](https://img.shields.io/badge/GitHub-%40ratna3-181717?style=for-the-badge&logo=github)](https://github.com/ratna3)
[![Twitter](https://img.shields.io/badge/X-%40RatnaKirti1-000000?style=for-the-badge&logo=x)](https://x.com/RatnaKirti1)

</div>

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

Made with ❤️ by [Ratna Kirti](https://github.com/ratna3)

</div>
