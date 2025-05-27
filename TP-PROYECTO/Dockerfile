# Construcción del frontend
FROM node:20 AS frontend
WORKDIR /app
COPY ./my-app ./my-app
WORKDIR /app/my-app
RUN npm install
RUN npm run build

# Preparacion del backend con Express
FROM node:20
WORKDIR /app

COPY ./my-backend ./my-backend

WORKDIR /app/my-backend

# Copiar dist del frontend al backend/public
COPY --from=frontend /app/my-app/dist ./public

RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
