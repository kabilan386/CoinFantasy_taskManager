# CoinFantasy TODO app with websocket :

## information

I have pushed env file for frontend and backend application for testing purpose you can use either update new details.

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (version 20)
- NPM (for backend)
- Yarn (for frontend)

# Installation
Clone the repository:

```bash
git clone https://github.com/kabilan386/coinFantasy_interview.git

cd task_manger

```

# User panel : 

## Backend

file path for backend : User_backend 

To install node_module 

```bash 
# use server file for run backend
npm install 
```
To run user backend for development 
```bash
npm run dev 
```
To run user backend for production 
```bash
npm run start 
```

## Frontend

file path for admin UI : client

```bash
yarn install 
```

update env file or use env.example file 
```bash
REACT_APP_API_URL=your_user_backend_endpoint  // http://localhost:5000/
```

To run user UI 
```bash
yarn run start 
```

To get build user UI
```bash
yarn run build 
```

## Running the Application with Docker-compose
```bash
cd task-manager
docker-compose up --build
```

## Stop the Application with Docker-compose
```bash
docker-compose down
```


##### info 
if you have any queries for testing purpose. Please contact to me kabilankabi386@gmail.com