# GOBank

GOBank is a banking application that provides seamless banking and investment services to users. It is built with Django for the backend API and React for the frontend. GOBank allows users to manage their accounts, view transactions, and perform various banking and investment operations seamlessly.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Features

- User authentication and authorization
- Account creation and management
- Join investment accounts
- View account balances
- Perform transactions (e.g., deposits, transfers, withdrawals)
- Real-time transaction updates
- Secure API endpoints using Django Rest Framework

## Tech Stack

- **Frontend**: React, JavaScript, HTML, Tailwind CSS
- **Backend**: Django, Django Rest Framework, Python
- **Database**: PostgreSQL
- **Containerization**: Docker
- **CI/CD**: GitHub Actions, DockerHub

## Installation

### Prerequisites

- [Python 3.x](https://www.python.org/)
- [Node.js and npm](https://nodejs.org/en/)
- [Docker](https://www.docker.com/) (optional but recommended)

### Backend Setup

1. Clone the repository and navigate to the backend folder:

  ```bash
  git clone https://github.com/Gad-Ongoro/GO_Bank.git
  cd GO_Bank/server
  ```

2. Create a virtual environment and install dependencies:

  ```bash
  python3 -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
  pip install -r requirements.txt
  ```


3. Set up the database:

  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

4. Create a superuser:

  ```bash
  python manage.py createsuperuser
  ```

5. Start the backend server:

  ```bash
  python manage.py runserver
  ```

### Frontend Setup
1. Navigate to the frontend folder:

  ```bash
  cd GO_Bank/client
  ```
2. Install the dependencies:

  ```bash
  npm install
  ```
3. Start the frontend development server:

  ```bash
  npm start
  The app should now be running at http://localhost:3000 (frontend) and http://localhost:8000 (backend).
  ```

### Docker Setup
1. Build and run the containers:

  ```bash
  docker-compose up --build
  ```
2. Access the app via http://localhost:3000 (frontend) and http://localhost:8000 (backend).

### Environment Variables
The app requires the following environment variables to be set:

For the backend, create a .env file in the backend directory with the following:

  ```bash
  SECRET_KEY=your-secret-key
  DEBUG=True
  DATABASE_URL=postgres://user:password@localhost:5432/gobank
  ```
For the frontend, create a .env file in the frontend directory with:

  ```bash
  REACT_APP_API_URL=http://localhost:8000/api
  ```

### API Documentation
The API is documented using Django Rest Framework's browsable API. Once the server is running, you can access the documentation at:

http://localhost:8000/api/

### Contributing
Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature/your-feature)
5. Create a new Pull Request
