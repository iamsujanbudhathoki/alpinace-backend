# Use Node 22 Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for caching)
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy app source code
COPY . .

# Build the TypeScript code and generate TSOA routes (creates dist/server.js)
RUN pnpm run build

# Expose the port your app runs on
EXPOSE 5000

# Start the compiled application
CMD ["pnpm", "start"]

