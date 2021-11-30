# Base image is Node LTS
# Specifying exact version here to avoid version issues
# First stage is building source code
FROM node:16.7.0 AS builder

# Create application directory
WORKDIR /app

# Copy dependency specification files
# Wildcard used, to ensure that both
# package, angular, typescript specifications are copied
COPY *.json ./

# Install app dependencies
# This step will not change often, so will be cached by docker engine
RUN npm install

# Copy app sources to image
COPY ./src ./src

# Build static assets
RUN npm run build

# Base image is Nginx
# Specifying exact version here to avoid version issues
# Second stage is copying built assets and setup serving
FROM nginx:1.18.0

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY nginx.conf /etc/nginx/nginx.conf

# Copy built sources to nginx's serving folder
COPY --from=builder /app/dist/Frontend .

# Start Nginx in foreground mode
ENTRYPOINT ["nginx", "-g", "daemon off;"]