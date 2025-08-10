FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm i --omit=dev
COPY src ./src
EXPOSE 8080
ENV NODE_ENV=production
CMD ["npm", "start"]
