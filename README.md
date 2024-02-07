# r/place Duplicate using AWS

This project aims to replicate the functionality of Reddit's "<a href="https://www.reddit.com/r/place/">r/place</a>" using resources provided by <a href="https://aws.amazon.com/">Amazon Web Services (AWS)</a>. "r/place" was a collaborative online canvas where users could place pixels on a large grid, creating pixel art and designs together.

## What is r/place?

"r/place" was a social experiment conducted by Reddit in April 2017. It consisted of a large grid (1000x1000 pixels) where users could place colored pixels. Each user could place one pixel every 5-20 minutes, and the canvas would update in real-time.

## Project Overview

This project aims to recreate the interactive canvas experience of "r/place" using AWS services. By leveraging AWS, we can deploy a scalable and robust platform capable of handling thousands of simultaneous users.

## Technologies Used

- **AWS (Amazon Web Services):** The project utilizes various AWS services such as EC2 (Elastic Compute Cloud), S3 (Simple Storage Service), DynamoDB (NoSQL Database), and Lambda (Serverless Computing) to create and manage the infrastructure.
  
- **HTML/CSS/JavaScript:** The frontend of the application is built using standard web technologies to create an interactive canvas interface similar to "r/place".

## Deployment

The project is deployed on AWS infrastructure, making use of services like EC2 for hosting the backend server, S3 for storing static assets (HTML, CSS, JavaScript), DynamoDB for storing canvas state and user interactions, and Lambda functions for handling specific tasks.
