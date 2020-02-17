The general idea is to send credentials to the server that give back a token to be stored by the Angular App. Then, the token will be sent for every request to the server that validates it.

Interceptors can be used to inject the token into the requests.

localStorage can be used to store the token.

Guard can be used to protect the routes if we're not authenticated.