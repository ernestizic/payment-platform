# PAYMENT PLATFORM

## Requirements

A fintech solution to help users in Nigeria register and fund their accounts, after which they can make payments on any international website/platform (Ebay, Amazon e.t.c) 

## Tech Stack

- [Nodejs](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/) - Nodejs framework
- [MongoDB](https://mongodb.com/) - storge
- [Joi validator](https://joi.dev/api/) - For validations
- [JWT](https://jwt.io/) - For authorization

## API endpoints

- User Registration
- Account Funding
- User Details
- Make payments

## User Registration

Registration details includes: 
- Username
- Firstname
- Lastname
- Email
- Phone number
- Password

## Business Logic

1. When a user is created, a wallet is also created for the user 
    * Wallet contains the following information
        * user: id of user
        * balance: initial balance of Zero
2. If for any reason the user creation process fails, wallet created is deleted.
3. JWT bearer token is returned alongside user data created with which user can make requests to susequent endoints that require authorization. Token contains userId and walletId and it expires in 24hrs.

## Account Funding

The amount is captured when a user wants to fund their account

### Validations
1. Ensuring user record provided for registration does not already exist.
2. Ensuring that password provided is a strong one.
3. Ensuring that any parameter not specified is stripped out from the post request (Create object validation pipe with Joi validator and strip unknown values).
4. Ensuring the amount field has a value greater than or equal to 1000.
5. Ensuring that the token passed in the header is valid and has not expired.