# ADDING A DATABASE TO HEROKU
- In terminal
heroku create

- If you need a remote type in terminal
git remote add heroku ______ (the blank is the heroku url you get from creating in the previous step)
git remote -v (this can check that the remote was created)

- In server.js file, in const port type const port = process.env.PORT || 5000

- Commit and push

- In terminal
git push heroku master

- Change pool.js file to the if conditional that is in there now

- Add and commit and push to master

- Push to heroku

- In terminal
heroku addons:create heroku-postgresql:hobby-dev

- Push database to heroku in terminal
heroku pg:push weekend-to-do-app DATABASE_URL

- In terminal
heroku restart

## SHOULD BE DONE!!!