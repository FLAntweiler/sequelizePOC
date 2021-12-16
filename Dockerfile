FROM node:16
COPY . .
RUN npm install
CMD ["node", "simpleServer/app.js"]