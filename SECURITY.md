# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to the project maintainer. All security vulnerabilities will be promptly addressed.

## Security Best Practices Used

1. **No sensitive data in code** - All API keys and credentials should be stored in `.env` files
2. **Input validation** - User inputs are validated before processing
3. **No eval()** - Code does not use eval() or similar dangerous functions
4. **Dependencies audit** - Regular `npm audit` to check for vulnerabilities

## Disclaimer

This is a **prototype** project and should not be used in production without proper security review.
