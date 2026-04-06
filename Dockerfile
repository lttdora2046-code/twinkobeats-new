FROM node:22-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Build the frontend
RUN npm run build

# Start the application
CMD ["node", "--experimental-strip-types", "server.ts"]
