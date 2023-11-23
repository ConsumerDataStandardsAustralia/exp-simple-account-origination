FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Do a clean install of node_modules
RUN --mount=type=ssh,id=github npm ci

# Bundle app source
COPY dist dist

# Set production environment
ENV PORT=80
ENV NODE_ENV=production
ENV API_APP_ENV=exp

# Expose the port used
EXPOSE 80

# Start command
CMD [ "node", "dist/index.js" ]
