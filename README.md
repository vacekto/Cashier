#### about

simple angular / java interview task implementing restaurant cashier. The app holds web socket connection with the server, sends updates via few REST endpoints to the server, which in turn sends updates via web socket connection to all connected clients. That way all waiters can have their own app running and in sync with each other. App is also responsive, so can be viewd on tablet or even phone.

#### how to run

either
- ng serve(in frontend folder)
- mvn exec:java (in backend folder)

or
- docker build -t cashier . (in backend folder)
- docker run --rm -it -p 3000:3000 -p 3001:3001 \                                                                                                                                ✔ 
  -e HTTP_PORT=3000 -e WS_PORT=3001 \
  cashier2
