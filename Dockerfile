FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npx prisma db push  
RUN npm run build
ENV NEXT_PUBLIC_HOST=http://86.57.135.50:8080
CMD [ "npm", "start" ]
EXPOSE 3000