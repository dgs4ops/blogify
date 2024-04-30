
# Blogify

Setup and functionality

`git clone https://github.com/dgs4ops/blogify.git`

Setup Frontend

    cd ./blogify-dev

    pnpm i

    cd ./blogify-frontend

    ng serve

Setup Backend

    cd ./blogify-backend

    sh ./migrations/setup_initial_local_database.sh

    pnpm start

How to Use:

`localhost:4200/articles`: Here you can see all the articles that have been created and open them

`localhost:4200/login`: You can log in with 2 accounts `test@hotmail.com / Hallo.123` / `test2@hotmail.com / Hallo.123`

After logging in, you can create new articles with Markdown or edit and delete previously created ones.
