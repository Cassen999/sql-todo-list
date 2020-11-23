# ADDING A DATABASE TO HEROKU
- In terminal
heroku create

- If you need a remote

- In terminal
heroku addons:create heroku-postgresql:hobby-dev

- Push database to heroku in terminal
heroku pg:push weekend-to-do-app DATABASE_URL

- In terminal
heroku restart