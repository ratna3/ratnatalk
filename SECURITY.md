# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of RK Talks seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:
- Open a public GitHub issue about the vulnerability
- Disclose the vulnerability publicly before it has been addressed
- Test vulnerabilities on production systems

### Please DO:

1. **Email us at**: [ratnakirtiscr@gmail.com](mailto:ratnakirtiscr@gmail.com)

2. **Include the following in your report**:
   - Type of vulnerability (e.g., XSS, SQL injection, authentication bypass)
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue, including how an attacker might exploit it

3. **Response expectations**:
   - We will acknowledge receipt within 48 hours
   - We will provide a detailed response within 7 days
   - We will work to fix verified vulnerabilities promptly
   - We will notify you when the vulnerability is fixed

## Security Best Practices

This project follows these security practices:

- ✅ **Environment Variables**: All sensitive data (API keys, database URLs, secrets) are stored in environment variables and never committed to version control
- ✅ **Password Hashing**: User passwords are hashed using bcrypt before storage
- ✅ **Input Validation**: All user inputs are validated and sanitized
- ✅ **HTTPS**: Production deployment enforces HTTPS
- ✅ **Dependency Updates**: Regular updates to patch known vulnerabilities
- ✅ **No Secrets in Code**: No hardcoded credentials or API keys

## Security-Related Configuration

When deploying this application, ensure:

1. **Environment variables are properly set** and not exposed
2. **Database connections use SSL** in production
3. **CORS is properly configured** for your domain
4. **Rate limiting is enabled** on API routes
5. **Error messages don't leak sensitive information**

## Acknowledgments

We appreciate responsible disclosure of security vulnerabilities. Contributors who help us maintain security will be acknowledged (with their permission) in our project documentation.

---

Thank you for helping keep RK Talks and its users safe!
