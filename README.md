## Purplegram
A full-stack social media application built with the MERN stack.  
This repository focuses on the **Backend API** for Purplegram.

### 🔗 [Frontend Repository](https://github.com/Vaahne/purplegram_frontend)

---

## 🛠️ Tech Stack

+ MongoDB – NoSQL database
+ Express.js – Node.js web framework
+ Mongoose – ODM for MongoDB
+ dotenv – Environment variable management
+ CORS – Cross-Origin Resource Sharing
+ Socket.io - Live updates for posts, comments, and friend requests
+ JWT Authentication – Secure API access
+ HATEOAS – Hypermedia-driven API responses

---

## 📦 Installation

```bash
npm install express mongoose dotenv cors multer socket.io jsonwebtoken
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
<table> <tr style="background-color:#f2f2f2"> <th>Field Name</th> <th>Type</th> <th>Description</th> </tr> <tr> <td>_id</td> <td>ObjectId</td> <td>Unique identifier</td> </tr> <tr> <td>Name</td> <td>String</td> <td>Full name of the user</td> </tr> <tr> <td>Email</td> <td>String</td> <td>Unique email address</td> </tr> <tr> <td>Friends</td> <td>Array (ObjectId)</td> <td>List of friend user IDs</td> </tr> </table>
---

# Posts
<table> <tr style="background-color:#f2f2f2"> <th>Field Name</th> <th>Type</th> <th>Description</th> </tr> <tr> <td>_id</td> <td>ObjectId</td> <td>Unique identifier</td> </tr> <tr> <td>userId</td> <td>ObjectId</td> <td>Reference to the user</td> </tr> <tr> <td>post_text</td> <td>String</td> <td>Content of the post</td> </tr> <tr> <td>post_photo</td> <td>String (URL)</td> <td>Image associated with the post</td> </tr> <tr> <td>likes</td> <td>Array (ObjectId)</td> <td>List of users who liked the post</td> </tr> </table>

# Comments
<table> <tr style="background-color:#f2f2f2"> <th>Field Name</th> <th>Type</th> <th>Description</th> </tr> <tr> <td>_id</td> <td>ObjectId</td> <td>Unique identifier</td> </tr> <tr> <td>postId</td> <td>ObjectId</td> <td>Reference to the post</td> </tr> <tr> <td>userId</td> <td>ObjectId</td> <td>Reference to the user</td> </tr> <tr> <td>comment_text</td> <td>String</td> <td>Content of the comment</td> </tr> </table>

# Friend Requests
<table> <tr style="background-color:#f2f2f2"> <th>Field Name</th> <th>Type</th> <th>Description</th> </tr> <tr> <td>_id</td> <td>ObjectId</td> <td>Unique identifier</td> </tr> <tr> <td>senderId</td> <td>ObjectId</td> <td>User who sent the request</td> </tr> <tr> <td>receiverId</td> <td>ObjectId</td> <td>User receiving the request</td> </tr> <tr> <td>status</td> <td>String</td> <td>Status: "Pending", "Accepted", "Rejected"</td> </tr> </table>

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
