/*
 * Frontend Configuration
 * Contains all configuration for the client-side application
 */

// Server Configurations
const SERVER_CONFIG = {
    frontend: {
        port: 3000,
        url: 'http://localhost:3000'
    },
    backend: {
        port: 8000,
        url: 'http://localhost:8000'
    }
};

// Project Information
const PROJECT_INFO = {
    name: 'ThriftStore',
    version: '1.0.0',
    description: 'E-commerce platform for vintage and thrifted clothing',
    author: 'ThriftStore Team'
};

// Quick Links
const LINKS = {
    pages: {
        home: '/index.html',
        shop: '/collections.html',
        admin: '/admin.html'
    },
    external: {
        github: 'https://github.com/yourusername/thriftstore',
        twitter: 'https://twitter.com/thriftstoreapp',
        instagram: 'https://instagram.com/thriftstoreapp'
    }
};

// Development Helpers
console.log('%c🎨 ThriftStore Frontend v' + PROJECT_INFO.version, 'color: #e74c3c; font-size: 16px; font-weight: bold;');
console.log('%cBackend API: ' + API_BASE_URL, 'color: #27ae60; font-size: 12px;');
