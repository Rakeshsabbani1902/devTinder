# DevTinder APIs


## AuthRouter
- POST /signup
- POST /login
- POST /loginout

## profileRouter
- GET /profile/video
- PATCH /profile/edit
- PATCH /profile/password   //Forget password API 


## connectionrequestRouter
- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId


## userRouter
- GET/user/connections
- GET/user/requests/received
- GET/user/feed - Gets you the profiles of other users on platforms 


 
Status : ignore , interested , accepted , rejected 






