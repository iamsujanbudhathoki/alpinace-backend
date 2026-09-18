
- to run the app in the prod
# 1. Stop and remove any current instance
pm2 delete alpineace-api
# 2. Start using npm run start:prod
pm2 start npm --name "alpineace-api" -- run start:prod