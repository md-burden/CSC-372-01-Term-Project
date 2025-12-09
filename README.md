Matthew Burden</br>
CSC-372-01


# Links
[MVP Demo Video](https://uncg-my.sharepoint.com/:v:/g/personal/mdburden_uncg_edu/IQAteyFw-39hTay3rNz4W16KAfMiLesS3KzdpWGIzBJhsYg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=2qzLmC)

[Deployed Site](https://csc-372-01-term-project.onrender.com/)

# Local Deployment 

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Google OAuth credentials

## Setup Steps
1. Clone the Repository
```
git clone https://github.com/md-burden/CSC-372-01-Term-Project.git
cd CSC-372-01-Term-Project
```

2. Install Backend Dependencies
```
npm install 
```

3. Install Frontend Dependencies
```
cd react-client
npm install
cd ..
```

4. Configure ENV Variables
Create a `.env` file in the root directory:
```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name

# Google OAuth
clientID=your_google_client_id
clientSecret=your_google_client_secret

# Session
SESSION_SECRET=your_random_secret_key

# Frontend URL
CLIENT_BASE_URL=http://localhost:5173

# Server Port
PORT=3000

# External API
FFXIV_API=https://ffxivcollect.com/api

```

5. Start the Backend Server
```
node server.js
```

6. Start the Frontend Dev Server
```
cd react-client
npm run dev
```

Frontend will run on `http://localhost:5173`

# Render Deployment


## Prerequisites
- Render account (https://render.com)
- PostgreSQL database
- Google OAuth credentials (with production callback URLs)

## Deployment Steps
1. Create a Web Service
    1. Click "New + " -> "Web Service"
    2. Connect to GitHub Repo
    3. Configure
        - **build command** `npm install && npm run build:frontend:force`
        - **start command** `node server.js`

2. Add Backend Env Variables
In the `Environment` tab, add the following 
```
DATABASE_URL=<your_render_postgres_internal_url>
clientID=<your_google_client_id>
clientSecret=<your_google_client_secret>
SESSION_SECRET=<generate_a_random_secret>
CLIENT_BASE_URL=https://<your-frontend-name>.onrender.com
PORT=3000
FFXIV_API=https://ffxivcollect.com/api
```

3. Update Google OAuth Settings
    1. Add authorized redirect URL:
    ```
    https://<your-backend-name>.onrender.com/auth/google/callback
    ```
    2. Add authorized origins:
    ```
    https://<your-frontend-name>.onrender.com
    ```
4. Wait for deployment to complete and test

# Reflection Write-Up

## Design Choices
I chose React for the front end and Express/node.js for the backend. I am more familiar with these than any other web frameworks. This made most of the development pretty easy and straightforward. My database was created in Neon with PostgreSQL. 

For my database schema, I originally planned to only have user and goals. However, I ran out of time to implement showing a user's character's owned mounts/minions. To keep this feature in some form I added two more tables to track what mounts and what minions a user has. 

## Challenges
There were two things that were really challenging in this project.
1. Getting all of the CSS to behave. I had a lot of ideas for how I wanted this to look and UI is not my forte. Trying to figure out this stuff was a bit of a pain, but I think it turned out ok in the end.
2. For some reason I had a lot of issues with the deployment. Nothing crazy, but it was still annoying. Took a couple of hours and I finally got everything working correctly.

# Learning Outcomes
Full stack development is a real challenge. You have to really plan out what needs to be done and stick to that plan. You have to think ahead about how all of the components fit and work together. It is especially challenging since all of it is on you. Sure you can talk to other people to get ideas and opinions, but everything is on you.

# Future Work
If I was to continue working on this in the future I would add/improve the following:
- Add all other collectibles, not just mounts and minions
- Allow users to track per character and not track their collection myself
- Improve UI and CSS


