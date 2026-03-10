# Lynkerr Travel Experience Platform (Technical Challenge)

Live Demo:  
https://lynkerr-challenge.vercel.app

GitHub Repository:  
https://github.com/MiyuRuu22/lynkerr-challenge

---

# Project Overview

Lynkerr is a mini travel experience platform where users can discover and share travel activities.

Users can register, log in, and create travel listings that include a title, location, image, description, and price. These experiences appear in a public feed where other users can browse, search, and view detailed information about each listing.

Users can also save listings they find interesting, and listing owners can edit or delete their own posts.

The goal of this project was to build a simple but complete full-stack application demonstrating authentication, database storage, API development, and a clean frontend interface.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- React
- Tailwind CSS

## Backend
- Next.js API Routes
- Node.js

## Authentication
- JSON Web Tokens (JWT)

## Database
- MongoDB Atlas
- Mongoose

## Image Upload
- Cloudinary

## Deployment
- Vercel

---

# Setup Instructions

## 1 Clone the repository

```bash
git clone https://github.com/MiyuRuu22/lynkerr-challenge.git
cd lynkerr-challenge
```

## 2 Install dependencies

```bash
npm install
```
## 3 Create environment variables

Create a .env.local file in the project root and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 4 Run the development server

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```
---

# Features Implemented

## Core Features

- User registration
- User login
- User logout
- Create travel listings
- Public listings feed
- Listing detail page
- Listings sorted from newest to oldest

## Additional Features Implemented

During development I implemented additional improvements beyond the minimum requirements to improve usability and make the application feel more complete.

These include:

- Edit listing (owner only)
- Delete listing (owner only)
- Save / unsave listings
- Search listings by title or location
- Image upload using Cloudinary instead of requiring image URLs
- Landing page with hero section
- Responsive layout improvements
- Improved navigation and user flow

# Architecture & Key Decisions

## Why I chose this technology stack
    
I chose this stack because I was already somewhat familiar with React and modern JavaScript frameworks from previous projects and coursework. Because of that experience, Next.js felt like a natural choice.

Next.js allows both frontend and backend logic to exist in a single project, which simplifies development and project structure. It also provides built-in routing and API handling which makes it easier to build full-stack applications quickly.

Before starting the challenge, I also looked up whether this stack would be suitable for the requirements. Next.js, MongoDB, and JWT authentication are commonly used together for modern web applications and integrate well with deployment platforms like Vercel.

MongoDB Atlas was selected because it is easy to connect with Node.js applications and allows flexible document storage, which works well for travel listings.

Mongoose was used to define schemas and simplify database operations.

For image uploads, Cloudinary was chosen so users can upload images directly rather than needing to paste image URLs. This improves the overall user experience.

## How authentication works in the application

Authentication is implemented using JSON Web Tokens (JWT).

When a user registers, their password is hashed and stored in MongoDB.

When the user logs in successfully, the server generates a JWT token and sends it to the client.

The token is stored in the browser's localStorage and included in the Authorization header when making requests to protected API routes.

The backend verifies this token before allowing actions such as:

- Creating listings
- Editing listings
- Deleting listings
- Saving listings

This ensures only authenticated users can perform these actions.

## How travel listings are stored in the database

Travel listings are stored in MongoDB using a Mongoose schema.

Each listing document contains:

- Title
- Location
- Description
- Image URL
- Price
- Creator ID
- Creator Name
- Created Date

When a user uploads an image while creating a listing, the image is uploaded to Cloudinary first. Cloudinary then returns a hosted image URL, which is stored in the MongoDB listing document.

This approach keeps the database lightweight while allowing images to be delivered quickly through Cloudinary's CDN.

## One improvement I would implement if I had more time

If I had more time, I would improve the application by implementing better loading states and user feedback.

For example, I would add toast notifications for actions such as creating, saving, editing, or deleting listings so users receive immediate feedback.

I would also add skeleton loaders while data is being fetched so the interface feels smoother and more responsive.

Another improvement would be implementing a more secure authentication method using HTTP-only cookies instead of storing tokens in localStorage.

## Product Thinking Question

If this platform contained around 10,000 travel listings, several improvements would be needed to maintain performance and a good user experience.

First, I would implement pagination or infinite scrolling so the application does not attempt to load every listing at once. Loading large datasets at once would slow down the page significantly.

Second, I would improve the search and filtering functionality so users can easily narrow down results by location, title, or other relevant attributes.

On the database side, I would create indexes for commonly queried fields such as createdAt, location, and title to improve query performance.

API responses could also be optimized to return only the data needed for listing previews instead of full listing details.

Finally, caching frequently requested data and continuing to serve images through Cloudinary would help keep the application fast even as the number of listings grows.

# Development Notes

During development I first implemented the core requirements and then continued improving the application step by step.

I regularly tested the application locally, fixed issues as they appeared, and refined both the UI and functionality. After completing the base requirements, I added several additional improvements such as image uploads, search functionality, saved listings, and listing management to make the application feel more complete.