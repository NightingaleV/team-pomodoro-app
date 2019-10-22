# Team Pomodori

## Materials

- [Lean Canvas](/docs/lean-canvas.pdf) _([edit link](https://docs.google.com/drawings/d/13XdKlC5qeWsr46io76Is6DUcQgAq4jB3htaObSOBm6U/edit))_
- [Product Backlog](https://trello.com/b/bembhnvN/team-pomodoro-full-product)
- [Wireframes](https://xd.adobe.com/view/2c218b14-f0b8-43f7-4f49-ada701c6e7ad-5a10/)
- [Database Diagram](https://dbdiagram.io/d/5da1e0d1ff5115114db52e48)

## Tools we use

- [MaterializeCSS](https://materializecss.com/)
    - CSS Framework
- [MongoDB](https://www.mongodb.com/)
    - NoSQL Database
- [Postman](https://www.getpostman.com/)
    - API Development
    - Tool for creating requests

## Setup Environment

- install NodeJs
- install Yarn

### Install Dependencies

```bash
# Install Global Project dependencies
# Start in root
yarn install

# Install Backend Dependencies
cd backend
yarn install
cd ..

# Install Frontend Dependencies
cd frontend
yarn install
```

### Secrets

- Create your env file, Inside **root folder run**
    - `echo PORT=5000 > config/dev.env`
    - Will contain the db credentials etc

### Environment Controls

Inside root folder

- `npm run prettier`
    - Reformat code inside the repository
    - **Make sure to run before you commit or use plugin inside you IDE**
- `npm run backend`
    - Runs Express.js server
- `npm run frontend`
    - Runs React app
- `npm run app`
    - Runs both simultaneously - Recommended

## GIT Flow

- Clone repo
- Checkout to  develop
- Pick a task
    - Drag to In progress tab
    - Add yourself as a member inside a task
- Create a branch with name like "feature/task" as  example "user/authentication"
- Write a working code
- Commit code in present simple ("Create component", "Add field to registration for")
- Sync code with whatever is on remote branch
- Drag task to tab "done"
- Create Pull Request (on Github)
    - Your branch  - > develop
    - We would discuss the code there in comments

---

- Issues/Questions - Would be discussed inside trello
- Never touch the master branch