# Everestminds Technical Task

#### Developed with :

- Nodejs
- Express
- React
- MariaDB-MySQL (Sequelize ORM)

#### The github repo contains the following:

- Source code for task
- ERD Diagram
- Questions answers text file
- REST API Documentation available at apidoc/index.html

### Backend Development

Requires MariaDB server running. Create necessary config files from .example files in config folder.

Start backend server with the following command:

```
npm run dev
```

### Frontend Development

Start frontend development server with the following command:

```
npm start
```

### Generate REST API Docs command

```
npx apidoc -i ..\fashionate\ -o apidoc/ -e node_modules client
```

### Testing/Evaluation hosted server:

```
http://fashionate.hopto.org:3000/
```

Dummy Accounts:

- account: user1, password: user1234
- account: admin1, password: admin1234

Note: This server is hosted on my personal computer and as such I cannot host it indefinitely. It will be taken down after 24-6-2021.
