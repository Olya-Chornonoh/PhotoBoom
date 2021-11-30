# Base image is Node LTS
# Specifying exact version here to avoid version issues
FROM node:16.7.0

# Create application directory
WORKDIR /app

# Copy dependency specification files
# Wildcard used, to ensure that both
# package.json and package-lock.json are copied
COPY ["package*.json", "./"]

# Install app dependencies
# Install only production dependencies (i.e. in package.json dependencies)
# This step will not change often, so will be cached by docker engine
RUN npm install

# Copy app sources to image
COPY ./src ./src

# Expose port, at which running container will listen for requests
EXPOSE 3000

# This command will be used to start application when
# container will be created from image
CMD ["node", "src/index.js"]
