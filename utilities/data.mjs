const Users = [
    {
      "name": "Alice Smith",
      "email": "alice@example.com",
      "password": "Passw0rd!",
      "gender": "female",
      "age": 25,
      "userId": "user001",
      "photo": "alice.jpg",
      "friends": ["user002", "user003"],
      "timestamp": Date.now()
    },
    {
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "password": "Secur3P@ss!",
      "gender": "male",
      "age": 30,
      "userId": "user002",
      "photo": "bob.jpg",
      "friends": ["user001", "user004"],
      "timestamp": Date.now()
    },
    {
      "name": "Carol White",
      "email": "carol@example.com",
      "password": "StrongP@ss1!",
      "gender": "female",
      "age": 28,
      "userId": "user003",
      "photo": "carol.jpg",
      "friends": ["user001"],
      "timestamp": Date.now()
    },
    {
      "name": "David Brown",
      "email": "david@example.com",
      "password": "MyP@ssw0rd1!",
      "gender": "male",
      "age": 22,
      "userId": "user004",
      "photo": "david.jpg",
      "friends": ["user002"],
      "timestamp": Date.now()
    },
    {
      "name": "Eve Wilson",
      "email": "eve@example.com",
      "password": "TestP@ss123!",
      "gender": "female",
      "age": 35,
      "userId": "user005",
      "photo": "eve.jpg",
      "friends": [],
      "timestamp": Date.now()
    },
    {
      "name": "Frank Moore",
      "email": "frank@example.com",
      "password": "MyP@ssword5!",
      "gender": "male",
      "age": 27,
      "userId": "user006",
      "photo": "frank.jpg",
      "friends": [],
      "timestamp": Date.now()
    },
    {
      "name": "Grace Hall",
      "email": "grace@example.com",
      "password": "P@ssword6!!",
      "gender": "female",
      "age": 20,
      "userId": "user007",
      "photo": "grace.jpg",
      "friends": [],
      "timestamp": Date.now()
    },
    {
      "name": "Henry Lee",
      "email": "henry@example.com",
      "password": "Sup3rP@ss!!",
      "gender": "male",
      "age": 29,
      "userId": "user008",
      "photo": "henry.jpg",
      "friends": [],
      "timestamp": Date.now()
    },
    {
      "name": "Ivy Kim",
      "email": "ivy@example.com",
      "password": "T3stP@ssword!",
      "gender": "female",
      "age": 24,
      "userId": "user009",
      "photo": "ivy.jpg",
      "friends": [],
      "timestamp": Date.now()
    },
    {
      "name": "Jack Patel",
      "email": "jack@example.com",
      "password": "JackP@ssw0rd!",
      "gender": "male",
      "age": 33,
      "userId": "user010",
      "photo": "jack.jpg",
      "friends": [],
      "timestamp": Date.now()
    }
  ];

  const Posts = [
    {
      "postId": "post001",
      "userId": "user001",
      "postType": "text",
      "post_text": "Loving the sunshine today!",
      "likes": ["user002", "user003"],
      "comments": ["comment001", "comment002"],
      "timestamp": Date.now()
    },
    {
      "postId": "post002",
      "userId": "user002",
      "postType": "photo",
      "post_photo": "beach.png",
      "likes": ["user001", "user004"],
      "comments": ["comment003"],
      "timestamp": Date.now()
    },
    {
      "postId": "post003",
      "userId": "user003",
      "postType": "text",
      "post_text": "Just finished a great book.",
      "likes": ["user001"],
      "comments": [],
      "timestamp": Date.now()
    },
    {
      "postId": "post004",
      "userId": "user004",
      "postType": "photo",
      "post_photo": "mountain.jpg",
      "likes": ["user002"],
      "comments": ["comment004"],
      "timestamp": Date.now()
    },
    {
      "postId": "post005",
      "userId": "user005",
      "postType": "text",
      "post_text": "Weekend vibes!",
      "likes": [],
      "comments": [],
      "timestamp": Date.now()
    },
    {
      "postId": "post006",
      "userId": "user006",
      "postType": "photo",
      "post_photo": "coffee.jpg",
      "likes": ["user001", "user005"],
      "comments": ["comment005"],
      "timestamp": Date.now()
    },
    {
      "postId": "post007",
      "userId": "user007",
      "postType": "text",
      "post_text": "Early morning run completed!",
      "likes": ["user003"],
      "comments": [],
      "timestamp": Date.now()
    },
    {
      "postId": "post008",
      "userId": "user008",
      "postType": "photo",
      "post_photo": "sunset.jpg",
      "likes": [],
      "comments": [],
      "timestamp": Date.now()
    },
    {
      "postId": "post009",
      "userId": "user009",
      "postType": "text",
      "post_text": "Happy Monday!",
      "likes": [],
      "comments": [],
      "timestamp": Date.now()
    },
    {
      "postId": "post010",
      "userId": "user010",
      "postType": "photo",
      "post_photo": "cityscape.png",
      "likes": ["user001"],
      "comments": ["comment006"],
      "timestamp": Date.now()
    }
  ];

  const Notifications = [
    { "notification_id": "notif001", "userId": "user001", "notification_type": "like", "read": false,"timestamp": Date.now() },
    { "notification_id": "notif002", "userId": "user001", "notification_type": "comment", "read": false,"timestamp": Date.now()  },
    { "notification_id": "notif003", "userId": "user002", "notification_type": "friendReq", "read": true ,"timestamp": Date.now() },
    { "notification_id": "notif004", "userId": "user003", "notification_type": "like", "read": true,"timestamp": Date.now()  },
    { "notification_id": "notif005", "userId": "user004", "notification_type": "comment", "read": false,"timestamp": Date.now()  },
    { "notification_id": "notif006", "userId": "user005", "notification_type": "friendReq", "read": false ,"timestamp": Date.now() },
    { "notification_id": "notif007", "userId": "user006", "notification_type": "like", "read": true ,"timestamp": Date.now() },
    { "notification_id": "notif008", "userId": "user007", "notification_type": "comment", "read": false,"timestamp": Date.now()  },
    { "notification_id": "notif009", "userId": "user008", "notification_type": "like", "read": false ,"timestamp": Date.now() },
    { "notification_id": "notif010", "userId": "user009", "notification_type": "friendReq", "read": true ,"timestamp": Date.now() }
  ];

  const FriendRequests = [
    { "sender_id": "user001", "receiver_id": "user005", "status": "Pending" ,"timestamp": Date.now() },
    { "sender_id": "user002", "receiver_id": "user006", "status": "Accepted" ,"timestamp": Date.now() },
    { "sender_id": "user003", "receiver_id": "user007", "status": "Rejected" ,"timestamp": Date.now() },
    { "sender_id": "user004", "receiver_id": "user008", "status": "Pending" ,"timestamp": Date.now() },
    { "sender_id": "user005", "receiver_id": "user009", "status": "Accepted" ,"timestamp": Date.now() },
    { "sender_id": "user006", "receiver_id": "user010", "status": "Pending" ,"timestamp": Date.now() },
    { "sender_id": "user007", "receiver_id": "user001", "status": "Rejected" ,"timestamp": Date.now() },
    { "sender_id": "user008", "receiver_id": "user002", "status": "Accepted" ,"timestamp": Date.now() },
    { "sender_id": "user009", "receiver_id": "user003", "status": "Pending" ,"timestamp": Date.now() },
    { "sender_id": "user010", "receiver_id": "user004", "status": "Accepted","timestamp": Date.now()  }
  ];

  const Comments = [
    { "comment_id": "comment001", "comment_text": "Great post!", "post_id": "post001" },
    { "comment_id": "comment002", "comment_text": "I agree!", "post_id": "post001" },
    { "comment_id": "comment003", "comment_text": "Nice photo!", "post_id": "post002" },
    { "comment_id": "comment004", "comment_text": "Beautiful view.", "post_id": "post004" },
    { "comment_id": "comment005", "comment_text": "Love this!", "post_id": "post006" },
    { "comment_id": "comment006", "comment_text": "Awesome pic.", "post_id": "post010" },
    { "comment_id": "comment007", "comment_text": "Cool!", "post_id": "post003" },
    { "comment_id": "comment008", "comment_text": "Amazing!", "post_id": "post004" },
    { "comment_id": "comment009", "comment_text": "Fantastic.", "post_id": "post002" },
    { "comment_id": "comment010", "comment_text": "Wow!", "post_id": "post001" }
  ];

  export default {Users,Posts,Notifications,FriendRequests,Comments};