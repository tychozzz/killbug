/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig)
