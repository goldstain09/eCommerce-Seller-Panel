Project Name - "ECOMMERCE's Seller Panel"

Frontend (ReactJS):

Description:
The Seller Panel of our e-commerce platform is a robust tool designed to empower sellers in efficiently managing their products and orders. Developed using React, this panel streamlines order handling, providing sellers with a seamless experience.

Key Features:
Efficient Order Handling:
Sellers can efficiently manage and process orders, ensuring a streamlined and organized workflow.

Product Management:
Easily add, update, or remove products, giving sellers full control over their inventory.

Order Tracking:
Sellers have real-time visibility into order statuses, enhancing transparency and facilitating quick responses.

Intuitive Interface:
The Seller Panel features an intuitive interface, making it user-friendly and accessible for sellers of all levels.

Installation & Usage Steps:
cd seller-panel
npm install
npm start

but before this you need to start backend server OR
create build by using "npm run build", and set it in backend's /build;

Folder Structure:
└── /src
├── /components- Contains reusable React components, Pages and their corresponding SCSS files.
| ├──/SCSS- Holds SCSS files for styling.
| | ├──Component1.scss
| | ├──Component2.scss
| | └── ...
│ ├── Component1.jsx
│ ├── Component2.jsx
│ └── ...
├── /media- Stores main images and logos used in the application.
│ ├── image1.jpg
│ ├── image2.png
│ └── ...
├── /redux- Manages state using Redux and Redux Saga.
│ ├── actions- Contains Redux action creators.
│ ├── constants- Defines action types and constants.
│ ├── reducers- Implements Redux reducers.
│ ├── sagas- Manages Redux Sagas for asynchronous actions.
│ ├── services- Contains service files for API interactions.
│ └── store.js- Configures the Redux store.
├── index.js- Main entry point for React application.
└── router.js- Manages all routes within application.

Technologies used (Frontend)

- React
- React-Redux
- Redux Saga {Toolkit}
- React Router Dom
- Bootstrap
- Axios
- SCSS

Dependencies:
"axios": "^1.6.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-redux": "^8.1.3",
"react-router-dom": "^6.17.0",
"react-scripts": "5.0.1",
"react-spinners": "^0.13.8",
"redux": "^4.2.1",
"redux-saga": "^1.2.3",
"sass": "^1.69.5"
"react-toastify": "^9.1.3",


Backend (NodeJS & ExpressJS) Database- MongoDB:

Description:
The backend of our Seller Panel, a crucial component of our e-commerce platform, is constructed with the MERN stack, utilizing Express.js and Node.js for robust server-side operations. User authentication is fortified with JWT (JSON Web Tokens) for secure authorization, while bcrypt encryption ensures password protection.

MongoDB Atlas is the designated database, seamlessly interacting with Mongoose for efficient data modeling and query execution. The database stores pivotal information, encompassing seller accounts, product details, and order management.

Backend API endpoints meticulously handle seller operations, order processing, and product management. The architecture seamlessly integrates with the frontend, ensuring smooth interactions and real-time updates for enhanced seller experience.

Stringent security measures are implemented to uphold the integrity and confidentiality of seller data. The combination of MongoDB Atlas and Mongoose offers a scalable and performant solution, ensuring efficient data storage and retrieval for our Seller Panel.

Installation & Usage Steps:
cd backend-ecommerce
npm install
npm run dev

Before starting server make your react build in build folder is up to date or not!

Folder Structure:
├── /Controller- Contains API routes functions.
│ ├── Product.js
│ ├── Seller.js
│ └── ... Files for handling specific API routes.
├── /Model- Contains schema files for database interactions.
│ ├── Product.js
│ ├── Seller.js
│ └── ... Files defining data models.
├── /Routes- Manages route files.
│ ├── Product.js
│ ├── Seller.js
│ └── ... Files defining API routes.
├── /build- Static folder containing React build files.
│ └── (React Build Files)
├── index.js- Main entry point for the backend server.
└── ...

Technologies used (Backend)

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt

Dependencies:
"bcrypt": "^5.1.1",
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.2",
"mongodb": "^6.2.0",
"mongoose": "^8.0.0"
