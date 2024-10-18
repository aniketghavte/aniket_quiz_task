# Quiz Web App - Internship Task Submission

## Quiz Task by Aniket Ghavte

This repository contains a Quiz Web App developed as part of an internship task assigned by a company. The application is built using Next.js and MongoDB, showcasing various technical features and best practices in web development.

[Deployed on Vercel]([https://quiz-web-app-aniket.vercel.app/](https://vercel.live/link/quiz-upraised-bice.vercel.app?via=project-dashboard-alias-list&p=1))


## References

- [Task Instructions Document](https://drive.google.com/file/d/12MWlB6WKTdSg78j38zy0Rd-dxiyoclOH/view)
- [Figma Design File](https://www.figma.com/file/sz65ABV7RBrLzgIp8OQSB4/Frontend-Assignment)

These references provide the original task instructions and design specifications for the Quiz Web App project.

## Project Overview

The Quiz Web App is designed to evaluate users' skills across various domains. It presents a series of 15 questions, each with 15 sections to answer. The app incorporates the following key features:

- User authentication via a dummy account (one-click login for demo purposes)
- Dynamic question rendering
- Real-time score tracking
- Responsive design based on the provided Figma mockups

### Key Technical Features

- Next.js for server-side rendering and API routes
- Server Actions for efficient server-client communication
- Dynamic Rendering for optimal performance
- MongoDB for data persistence
- RESTful API design
- React for building interactive UI components
- Docker for containerization and easy deployment

## Bonus Task Completion

In addition to the core requirements, this project also includes a containerized application using Docker, demonstrating proficiency in modern deployment practices.

### Additional featues
- One-click dummy user login for quick application testing
- 30-second countdown per question
- Auto-progression when time expires
- Visual time indicator


## Deployment

The Quiz Web App is deployed and accessible online using Vercel. You can view and interact with the live application at the following URL:

[Quiz Web App Live Demo](https://quiz-web-app-aniket.vercel.app/)

This deployment showcases the fully functional application in a production environment, allowing for easy testing and demonstration of the project's features.

## Getting Started

For local development:

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Schema

The app utilizes the following REST API endpoints:

- `GET /api/user/createDummyUser`: Create's dummy user to logIn into application
- `POST /api/quiz/start`: Initiates a new quiz session
- `POST /api/quiz/submit`: Submits answers for each question
- `GET /api/quiz/finish`: Completes the quiz and retrieves the final score

## With Docker

To run the application using Docker:

1. Build the Docker image: `docker build -t quiz-app .`
2. Run the container: `docker run -p 3000:3000 quiz-app`


