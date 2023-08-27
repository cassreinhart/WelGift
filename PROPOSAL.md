# Final Capstone Project Proposal: WelGift
## Tech Stack
I will primarily use the React framework for the front-end development of my project. For the back-end, I will use Node.js and implement the Pocket API to handle bookmarking of URLs.

### Project Focus
The focus is to create a Full Stack Web Application.

### Project Type
This project is a web-based application specifically designed for desktop and mobile browsers.

### Project Goal
Every year, close to $10 billion is spent on unsolicited gifts. The goal of this site is to make gift-giving more efficient and sustainable by making it easier to shop for others and ensuring that your money doesn’t go to waste or the gift doesn't end up in a landfill.

### User Demographics
The demographic is targeted towards anyone who is planning on doing gift shopping online for friends and family.

### Data Usage
I plan to use url data, and user data. The url data will be manually entered into the system for this project's scope, whereas user data will be collected during user sign up and login.

I implement Pocket API to ‘bookmark’ links that the user saves. This requires authorization from Pocket API using a user token, which will be stored in the user's session.

## Project Approach
### Database Schema
The database will have two primary tables: Users and Friendships. The Users table will include fields like user ID, name, email, and password (hashed and salted for security), and user token ? . The Friendships table will contain requestUserID, userID, approved.

```
Users Table:
+---------+-------+-------+----------+---------+-------+
| userID  | name  | email | password | address | token |
+---------+-------+-------+----------+---------+-------+

//below needed if using pocket?
<!-- Wishlists Table:
+-----------+------+-------------+---------+
| wishlistID | name | description | userID |
+-----------+------+-------------+---------+ -->

Friendships Table:
+--------------+--------+----------+
| requestUserID| userID | approved | 
+--------------+--------+----------+
```

### Potential API Issues
I am using Pocket API to store URL bookmarks so potential issues might include handling Oauth2 implementation as well as keeping user lists organized and secure. I will implement testing and thoroughly read the documentation before I begin to design database schema.

### Security of Sensitive Information
The only sensitive information being stored are passwords. Passwords will be hashed and salted using and all data transfers will be secure through HTTPS.

### App Functionality
The app will include user registration and login, adding friends, creating wishlists, updating wishlists, deleting from wishlists, viewing friends wishlists and crossing off from friends wishlists.

### User Flow
Users will start by registering or logging into their account. Then they will be able to see any existing wishlists or create a new wishlist. They will also be able to search for friends and family and add them to share their wishlists.x
```
Start
  -->[ User visits site ]
  -->[ User logs in or registers ]
  -->[ User browses wishlists ]
  -->[ User adds/updates/deletes items to wishlist ]
  -->[ User searches for friends ]
  -->[ User sends/approves friend request ]
  -->[ User browses friends wishlists ]
  -->[ User marks off items from friend wishlists ]
End
```

### Special Features and Stretch Goals
Beyond typical CRUD operations, I plan to implement adding a social element allowing users to actually share their lists with friends and family.

Stretch goals include integrating a chrome extension/ mobile app to allow users to easily add items to their wishlist from their browser or from their mobile device. 