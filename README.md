## Purplegram
 [Front End](https://github.com/Vaahne/purplegram_frontend)

install mongoose, express, dotenv, cors , multer

collections : 
    users
    notifications
    posts
    friendrequst
    comments
    
# Routes
 | Name   |  Route |
 | create User  |  /api/users   |   post
 | delete user  | /api/users/:id    | delete
 | update user  | /api/users/:id    | put
 | get user |   /api/user/:id   |   get
 | get all users    |   /api/users  |   get
 | create post  | /api/posts    |   post
 | delete post  | /api/posts/:id    |   delete
 | update post  | /api/posts/:id    |   post
 | get post |   /api/posts/:id  |   get
 | get all posts by user friends    |   /api/posts/getposts  |  get
 | change password  | /api/users/changePassword |   post
 | search users | /api/users/search |   get
 | add likes to post | /api/posts/:postId | put
 | get all the comments of a post | /api/comments/:postId | get
 | add a comment to a post | /api/comments/:postId | post 