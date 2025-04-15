FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install  --legacy-peer-deps

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Start the application
CMD ["npm", "run","dev"]