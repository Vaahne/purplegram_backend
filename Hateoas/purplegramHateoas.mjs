// basic links to be displayed for library
function purplegramHateoas(req, res){
    return res.json({
        links : [
            {
                href: '/api/',
                rel: 'purplegram', 
                type: 'GET'
            },
            {
                href: 'api/users',
                rel:'users',
                type:'GET'
            },
            {
                href:'api/posts',
                rel:'posts',
                type:'GET'
            },
            {
                href:'api/friendreq',
                rel:'friendreq',
                type:'GET'
            },
            {
                href: 'api/notifications',
                rel:'notification',
                type:'GET'
            }
        ]
    });
}
// links for users
function userHateoas(req,res){
    return  [
             {
                href: '/api/users',
                rel: 'users', 
                type: 'POST'
            },
            {
                href: '/api/users',
                rel: 'users', 
                type: 'PUT'
            },
             {
                href: '/api/users/changepwd',
                rel: 'user',
                type: 'PUT'
            },
             {
                href: '/api/users/auth',
                rel: 'user',
                type: 'POST'
            }
        ]
}

// links for transactions
function postHateoas(){
    return  [
        {
                href: '/api/posts',
                rel: 'post',
                type: 'POST'
            },
            {
                href: '/api/posts/getposts',
                rel: 'post',
                type: 'GET'
            }    
        ];
}
function commentHateoas(){
    return [
         {
                href: '/api/comments/:commentId',
                rel: 'comment',
                type: 'PUT'
            },
             {
                href: '/api/comments/:commentId',
                rel: 'comment',
                type: 'DELETE'
            },
             {
                href: '/api/comments/:postId',
                rel: 'comment',
                type: 'GET'
            },
            {
                href: '/api/comments/:postId',
                rel: 'comment',
                type: 'POST'
            }
    ];
}
function friendreqHateoas(){
    return [
        {
                href: '/api/friendreq/:receiverId',
                rel: 'friendreq',
                type: 'POST'
            },
            {
                href: '/api/friendreq/update',
                rel: 'friendreq',
                type: 'PUT'
            },
            {
                href: '/api/friendreq/',
                rel: 'friendreq',
                type: 'GET'
            },
            {
                href: '/api/friendreq/:sender_id',
                rel: 'friendreq',
                type: 'PUT'
            }
    ];
}
function notificationHateoas(){
    return [ {
                href: '/api/notification',
                rel: 'notification',
                type: 'POST'
            },
            {
                href: '/api/notification',
                rel: 'notification',
                type: 'GET'
            },
            {
                href: '/api/notification',
                rel: 'notification',
                type: 'DELETE'
            },
            {
                href: '/api/notification',
                rel: 'notification',
                type: 'PUT'
            }];
}
function getUserLinks(userId){
    return {
        self: { href: `/api/users/${userId}` },
        update: { href: `/api/users/${userId}`, method: "PATCH" },
        delete: { href: `/api/users/${userId}`, method: "DELETE" },
        all: { href: "/api/users", method: "GET" }
    };  
}

function getBookLinks(bookId){
    return {
        self: { href: `/api/books/${bookId}` },
        update: { href: `/api/books/${bookId}`, method: "PATCH" },
        delete: { href: `/api/books/${bookId}`, method: "DELETE" },
        all: { href: "/api/books", method: "GET" }
    };
}

function getTransactionLinks(transaction_id) {
    return {
        self: { href: `/api/transactions/${transaction_id}` },
        update: { href: `/api/transactions/${transaction_id}`, method: "PATCH" },
        delete: { href: `/api/transactions/${transaction_id}`, method: "DELETE" },
        all: { href: "/api/transactions", method: "GET" }
    };
}
export default { userHateoas,postHateoas,purplegramHateoas,commentHateoas,friendreqHateoas,getBookLinks,getUserLinks};