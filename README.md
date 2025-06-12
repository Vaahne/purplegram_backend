## Purplegram
A full-stack social media application built with the MERN stack.  
This repository focuses on the **Backend API** for Purplegram.

### 🔗 [Frontend Repository](https://github.com/Vaahne/purplegram_frontend)

install mongoose, express, dotenv, cors , multer
---

## 🛠️ Tech Stack

- **MongoDB** – NoSQL database
- **Express.js** – Node.js web framework
- **Mongoose** – ODM for MongoDB
- **dotenv** – Environment variable management
- **CORS** – Cross-Origin Resource Sharing
- **Socket.io** - live updates

---

## 📦 Installation

```bash
npm install express mongoose dotenv cors multer
```

---

## 🗃️ Collections

- `users`
- `notifications`
- `posts`
- `friendrequest`
- `comments`

## Schema
Users 
<table>
  <tr style="background-color:#f2f2f2">
    <th>Feild Name</th>
    <th>Type </th>
    <th>Description</th>
  </tr>
  <tr style="background-color:#ffffff">
    <td>_id</td>
    <td>object uniquely </td>
    <td>unique identifier</td>
  </tr>
  <tr style="background-color:#f2f2f2">
    <td>Name</td>
    <td>String</td>
    <td>Name of the user</td>
  </tr>
  <tr style="background-color:#ffffff">
    <td>Email</td>
    <td>String</td>
    <td>unique email id for each user</td>
  </tr>
  <tr style="background-color:#f2f2f2">
    <td>Friends</td>
    <td>user ids</td>
    <td>Array of friend userids </td>
  </tr>
</table>
---
    
# Routes
 | Feature                         | Method | Route                                  | Description                            |
|---------------------------------|--------|----------------------------------------|----------------------------------------|
| Create User                     | POST   | `/api/users`                           | Register a new user                    |
| Delete User                     | DELETE | `/api/users/:id`                       | Delete a user by ID                    |
| Update User                     | PUT    | `/api/users/:id`                       | Update user profile                    |
| Get User                        | GET    | `/api/user/:id`                        | Fetch a single user by ID              |
| Get All Users                   | GET    | `/api/users`                           | Fetch all users                        |
| Change Password                 | POST   | `/api/users/changePassword`            | Change a user's password               |
| Search Users                    | GET    | `/api/users/search`                    | Search for users                       |
| Create Post                     | POST   | `/api/posts`                           | Create a new post                      |
| Delete Post                     | DELETE | `/api/posts/:id`                       | Delete a post by ID                    |
| Update Post                     | POST   | `/api/posts/:id`                       | Update a post by ID                    |
| Get Single Post                 | GET    | `/api/posts/:id`                       | Get details of a single post           |
| Get Friends' Posts              | GET    | `/api/posts/getposts`                  | Get posts from all user’s friends      |
| Like/Unlike a Post              | PUT    | `/api/posts/:postId`                   | Toggle like for a post                 |
| Get Comments on a Post          | GET    | `/api/comments/:postId`                | Get all comments for a post            |
| Add Comment to a Post           | POST   | `/api/comments/:postId`                | Add a comment to a post                |
| Delete a Comment                | DELETE | `/api/comments/:commentId`             | Delete a specific comment              |
| Update a Comment                | PUT    | `/api/comments/:commentId`             | Update a specific comment              |

---
## 📁 Project Structure

```
purplegram_backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── uploads/
├── sockets/
├── .env
├── server.js
└── package.json
```

## 💡 Author

Created by [Vaahne](https://github.com/Vaahne)
