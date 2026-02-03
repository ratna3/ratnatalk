# Contributing to RK Talks

First off, thank you for considering contributing to RK Talks! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ratnatalk.git
   cd ratnatalk
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ratna3/ratnatalk.git
   ```

## Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables.

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open http://localhost:3000** in your browser

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please:

- **Check existing issues** for similar suggestions
- **Provide a clear description** of the feature
- **Explain the use case** and benefits
- **Consider implementation complexity**

### Code Contributions

1. **Choose an issue** or create one for discussion
2. **Comment on the issue** to let others know you're working on it
3. **Create a feature branch** from `main`
4. **Make your changes** following our style guidelines
5. **Test thoroughly** before submitting
6. **Submit a Pull Request**

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure all tests pass**
3. **Follow our commit message convention**
4. **Link the related issue** in your PR description
5. **Request review** from maintainers
6. **Address review comments** promptly

### PR Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes locally
- [ ] Any dependent changes have been merged and published

## Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow existing code patterns
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for public APIs

### CSS

- Use **CSS Modules** for component styles
- Follow existing naming conventions
- Keep styles scoped and modular
- Use CSS custom properties for theming

### Components

- Use **functional components** with hooks
- Keep components small and reusable
- Separate logic from presentation when possible
- Add proper TypeScript types/interfaces

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no feature/fix |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `chore` | Build process, dependencies |

### Examples

```bash
feat(blog): add markdown code highlighting
fix(cursor): resolve trail animation lag
docs: update installation instructions
refactor(theme): simplify color system
```

---

## Questions?

Feel free to reach out:

- 📧 Email: [ratnakirtiscr@gmail.com](mailto:ratnakirtiscr@gmail.com)
- 💬 Discord: [Ratna For Nerds](https://discord.gg/n2Zrr4c5NU)

Thank you for contributing! 🙏
