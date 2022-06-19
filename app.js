import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";
// import balanceRoutes from "./routes/balance.js";

const app = express(); //to initilaize it

app.use(bodyParser.json());

app.use("/users", usersRoutes);
// app.use("/balance", balanceRoutes);

const PORT = process.env.PORT || 5050;

//   // if exists will not add it

//   //add to array of users:
//   //1.readfile (users.json)=>array
//   //2.check if exist (if not add to the array)
//   //3.write to file
// });

app.listen(PORT, (error) => {
  if (error) console.error(error);
  else console.log(`Server is running on port:http://localhost${PORT}`);
});
