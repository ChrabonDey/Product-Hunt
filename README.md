# Product Hunt Website ReadMe

Welcome to **Product Hunt**, an innovative platform for discovering and sharing cutting-edge tech products! This platform is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to ensure a robust and seamless user experience.

---

## 🔗 **Live Site URL**
[Visit Product Hunt Live!](https://product-hunt-687fb.web.app/)

---

## 💻 **Key Features**

1. **User Roles & Permissions**:
   - **Normal Users**: Can upvote, report, review, and submit tech products for moderation.
   - **Moderators**: Review submitted products, handle reported items, and mark products as featured.
   - **Admins**: Manage users, monitor site statistics, and oversee coupon management.

2. **Homepage Highlights**:
   - Stunning and responsive design for mobile, tablet, and desktop views.
   - **Featured Products**: Display the latest, most noteworthy products based on timestamps.
   - **Trending Products**: Highlight the most upvoted products.

3. **Product Functionality**:
   - **Upvotes & Reports**: Users can upvote products and report inappropriate content.
   - **Detailed Product Pages**: Comprehensive details including reviews, upvote counts, and tags.

4. **Interactive Dashboard**:
   - Normal users can manage their profiles, add products, and view their submissions.
   - Moderators and Admins have dedicated sections for managing products, users, and coupons.

5. **Secure Authentication**:
   - Firebase-based authentication with JWT for secure token-based access.
   - Social login via Google.

6. **E-commerce Integration**:
   - Membership subscription with payment functionality.
   - Coupon management system for exclusive discounts.

7. **Advanced Features**:
   - Responsive design for an optimal viewing experience.
   - Real-time updates and notifications using toast messages.

---

## 🚀 **Tech Stack**

### Frontend:
- React.js
- Tailwind CSS
- DaisyUI for components

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB

### Tools & Libraries:
- Firebase Authentication
- JWT for secure token management
- React Router for seamless navigation

---

## 🔑 **User Credentials**

### Admin Access:
- **Email**: `chrabondey@gmail.com`
- **Password**: `12345678`

### Moderator Access:
- **Email**: `shahin@gmail.com`
- **Password**: `12345678`

---

## 📂 **Project Structure**

```
ProductHunt/
|-- client/
|   |-- src/
|       |-- components/
|       |-- pages/
|       |-- utils/
|       |-- styles/
|-- server/
|   |-- routes/
|   |-- controllers/
|   |-- models/
|-- README.md
|-- .env
```

---

## 📊 **Admin Dashboard Statistics**
- **Products**: Track total, accepted, pending, and rejected products.
- **Reviews**: View the total number of reviews.
- **Users**: Monitor user engagement and activity.

---

## 🛠️ **Setup Instructions**

1. Clone the repositories:
   - **Frontend**: [Client Repository](https://github.com/ChrabonDey/Product-Hunt?tab=readme-ov-file)
   - **Backend**: [Server Repository](https://github.com/ChrabonDey/Product_Hunt_Server)

2. Install dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - Firebase configuration.
   - MongoDB credentials.

4. Start the servers:
   ```bash
   cd client && npm start
   cd ../server && npm run dev
   ```

5. Open the application in your browser: [http://localhost:3000](http://localhost:3000)

---

## 🌟 **Future Enhancements**

- Implement downvote functionality for products.
- Add a dynamic slider to highlight rising products.
- Integrate Tanstack query mutations for enhanced API handling.
- Explore Framer Motion animations for smoother transitions.

---

## 📧 **Contact Information**

Feel free to reach out for feedback or questions:
- **Email**: `support@producthunt.com`
- **Social Media**: [Facebook](#) | [Twitter](#) | [LinkedIn](#)

---

Thank you for exploring **Product Hunt**! We hope you enjoy the experience as much as we enjoyed building it. 🙌

