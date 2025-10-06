

studybox-backend/
├─ .env.example
├─ .gitignore
├─ package.json
├─ server.js
├─ src/
│  ├─ app.js                 # Express app setup
│  ├─ config/
│  │  └─ db.js               # MongoDB connection
│  ├─ models/                # Mongoose schemas
│  │  ├─ User.js
│  │  ├─ Branch.js
│  │  ├─ Semester.js
│  │  ├─ Subject.js
│  │  ├─ Unit.js
│  │  ├─ Topic.js
│  │  ├─ Resource.js
│  │  └─ Feedback.js
│  ├─ routes/                # Route definitions
│  │  ├─ auth.js
│  │  ├─ admin.js            # all admin resource mgmt
│  │  └─ student.js          # browse + feedback
│  ├─ controllers/           # Route handlers
│  │  ├─ authController.js
│  │  ├─ adminController.js
│  │  └─ studentController.js
│  ├─ middlewares/
│  │  ├─ auth.js             # JWT verify, admin guard
│  │  └─ errorHandler.js
│  ├─ services/
│  │  └─ storage.js          # Cloudinary/Supabase upload
│  ├─ utils/
│  │  ├─ apiResponse.js
│  │  └─ asyncHandler.js
│  └─ tests/                 # optional
│     └─ auth.test.js

1️⃣ Initialize npm project (if not already done)
npm init -y


This creates a basic package.json if you haven’t done it already.

2️⃣ Install dependencies
npm install express mongoose dotenv bcrypt jsonwebtoken cors helmet joi multer morgan


Explanation:

express → backend framework

mongoose → MongoDB ORM

dotenv → load .env variables

bcrypt → password hashing

jsonwebtoken → JWT authentication

cors → enable frontend to call backend

helmet → security headers

joi → input validation

multer → file upload

morgan → HTTP request logging

3️⃣ Install dev dependencies
npm install --save-dev nodemon eslint jest supertest


Explanation:

nodemon → auto-restart server on code changes

eslint → code linting

jest → testing framework

supertest → API testing



1. Auth Routes

POST /api/auth/signup → Register student/admin

POST /api/auth/login → Login and get JWT

✅ Check: Returns token and user object

2. Admin Routes (JWT + admin)

Branch:

POST /api/admin/branch → Add branch

PUT /api/admin/branch/:branchId → Update branch

DELETE /api/admin/branch/:branchId → Delete branch

Year:

POST /api/admin/branch/:branchId/year → Add year

PUT /api/admin/year/:yearId → Update year

DELETE /api/admin/year/:yearId → Delete year

Semester:

POST /api/admin/year/:yearId/semester → Add semester

PUT /api/admin/semester/:semesterId → Update semester

DELETE /api/admin/semester/:semesterId → Delete semester

Subject:

POST /api/admin/semester/:semesterId/subject → Add subject

PUT /api/admin/subject/:subjectId → Update subject

DELETE /api/admin/subject/:subjectId → Delete subject

Unit:

POST /api/admin/subject/:subjectId/unit → Add unit

PUT /api/admin/unit/:unitId → Update unit

DELETE /api/admin/unit/:unitId → Delete unit

Topic:

POST /api/admin/:subjectOrUnitId/topic → Add topic

PUT /api/admin/topic/:topicId → Update topic

DELETE /api/admin/topic/:topicId → Delete topic

Resource:

POST /api/admin/topic/:topicId/resource → Add resource (PDF optional)

PUT /api/admin/resource/:resourceId → Update resource (PDF optional)

DELETE /api/admin/resource/:resourceId → Delete resource

GET /api/admin/resources → Get all resources

✅ Check: All routes should respond correctly, with proper error handling for missing/duplicate data.

3. Student Routes (JWT + student)

GET /api/student/branches → Get all branches

GET /api/student/years/:branchId → Get years of a branch

GET /api/student/semesters/:yearId → Get semesters of a year

GET /api/student/subjects/:semesterId → Get subjects of a semester

GET /api/student/units/:subjectId → Get units of a subject

GET /api/student/topics/:unitId → Get topics of a unit

GET /api/student/resources/:topicId → Get resources of a topic

GET /api/student/resources/search?q=keyword → Search resources

Interactions:

POST /api/student/resource/:id/like → Like a resource

POST /api/student/resource/:id/rate → Rate a resource

POST /api/student/resource/:id/view → Increment view

POST /api/student/feedback/:resourceId → Add feedback

GET /api/student/feedback/:resourceId → Get feedback

✅ Check: JWT authentication required for student routes.


Backend Structure 

Project Structure
studybox-backend/
├─ .env.example
├─ .gitignore
├─ package.json
├─ server.js
├─ src/
│  ├─ app.js                 # Express app setup
│  ├─ config/
│  │  └─ db.js               # MongoDB connection
│  ├─ models/                # Mongoose schemas
│  │  ├─ User.js
│  │  ├─ Branch.js
│  │  ├─ Semester.js
│  │  ├─ Subject.js
│  │  ├─ Unit.js
│  │  ├─ Topic.js
│  │  ├─ Resource.js
│  │  └─ Feedback.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ admin.js            # Admin resource management
│  │  └─ student.js          # Browse + feedback
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ adminController.js
│  │  └─ studentController.js
│  ├─ middlewares/
│  │  ├─ auth.js             # JWT verify, admin guard
│  │  └─ errorHandler.js
│  ├─ services/
│  │  └─ storage.js          # Cloudinary/Supabase upload
│  ├─ utils/
│  │  ├─ apiResponse.js
│  │  └─ asyncHandler.js
│  └─ tests/
│     └─ auth.test.js

Dependencies
npm install express mongoose dotenv bcrypt jsonwebtoken cors helmet joi multer morgan
npm install --save-dev nodemon eslint jest supertest


express → backend framework

mongoose → MongoDB ORM

dotenv → environment variables

bcrypt → password hashing

jsonwebtoken → JWT auth

cors → frontend calls

helmet → security headers

joi → input validation

multer → file upload (PDFs)

morgan → request logging

Dev:

nodemon → auto-restart server

eslint → code linting

jest + supertest → testing

Route Summary

1️⃣ Auth Routes

POST /api/auth/signup → Register student/admin

POST /api/auth/login → Login & get JWT

2️⃣ Admin Routes (JWT + admin)

Branch: CRUD /api/admin/branch

Year: CRUD /api/admin/branch/:branchId/year

Semester: CRUD /api/admin/year/:yearId/semester

Subject: CRUD /api/admin/semester/:semesterId/subject

Unit: CRUD /api/admin/subject/:subjectId/unit

Topic: CRUD /api/admin/:subjectOrUnitId/topic

Resource: CRUD /api/admin/topic/:topicId/resource (PDF optional)

GET /api/admin/resources → List all resources

3️⃣ Student Routes (JWT + student)

Browse hierarchy: Branch → Year → Semester → Subject → Unit → Topic → Resource

Search: /api/student/resources/search?q=keyword

Interactions:

Like → /api/student/resource/:id/like

Rate → /api/student/resource/:id/rate

Increment view → /api/student/resource/:id/view

Feedback: Add /api/student/feedback/:resourceId, Get /api/student/feedback/:resourceId

✅ Backend Finalization Notes

PDF upload implemented via Multer + Cloudinary

Summary, YouTube links, tags, difficulty fields supported

Proper error handling (404, validation, duplicate)

JWT auth implemented for both admin & student routes