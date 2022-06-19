import express from "express";

const router = express.Router();

let users = [
  {
    id: "1",
    cash: 3000,
    credit: 500,
  },
  {
    id: "2",
    cash: 0,
    credit: 500,
  },
];

router.get("/all", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  //get user
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});

router.delete("/:id", (req, res) => {
  //delete user
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`user with the id ${id} was deleted`);
});

router.post("/", (req, res) => {
  const { id, cash, credit } = req.body;
  const user = req.body;
  const isUserDuplicated = true && users.find((user) => user.id === id);
  if (isUserDuplicated) {
    res.send(`the user with the id ${id} already exists`);
  } else {
    users.push(user);
    res.send(`a new user with the id ${id} was added to the bank database`);
  }
});

//balance routes

router.put("/balance/deposit/:id", (req, res) => {
  const { id } = req.params;
  const { cashDepositAmount } = req.body;

  const user = users.find((user) => user.id === id);

  user.cash = user.cash + cashDepositAmount;

  res.send(
    `User with the id ${id} has been updated:depositing  ${cashDepositAmount}`
  );
});

router.put("/balance/credit/:id", (req, res) => {
  const { id } = req.params;
  const { creditAmountToAdd } = req.body;

  const user = users.find((user) => user.id === id);

  if (user.credit > 0 && creditAmountToAdd > 0) {
    user.credit = user.credit + creditAmountToAdd;
    res.send(`User with the id ${id} has been updated:credit update`);
  } else {
    res.send(`User with the id ${id} cannot be updated: negative value`);
  }
});

router.put("/balance/withdraw/:id", (req, res) => {
  const { id } = req.params;
  const { amountToWithdraw } = req.body;

  const user = users.find((user) => user.id === id);

  if (user.cash + user.credit < amountToWithdraw) {
    res.send(" the amount is higher than the user balance ");
  } else if (amountToWithdraw < user.cash) {
    user.cash = user.cash - amountToWithdraw;
    res.send(
      `the amount of ${amountToWithdraw} was withdrawed from user id ${id} `
    );
  } else {
    user.credit = user.credit + (user.cash - amountToWithdraw);
    user.cash = 0;
    res.send(
      `the amount of ${amountToWithdraw} was withdrawed from user id ${id} `
    );
  }
});

router.put("/balance/transfer/:id", (req, res) => {
  const { id } = req.params;
  const { secondUserId } = req.body;
  const { amountToTransfer } = req.body;

  const firstUser = users.find((user) => user.id === id);
  const secondUser = users.find((secondUser) => secondUser.id === secondUserId);

  if (firstUser.cash + firstUser.credit < amountToTransfer) {
    res.send(
      "The transfer failed: the amount is higher than the user balance "
    );
  } else if (amountToTransfer < firstUser.cash) {
    firstUser.cash = firstUser.cash - amountToTransfer;
    secondUser.cash = secondUser.cash + amountToTransfer;
    res.send(
      `the amount of ${amountToTransfer} was transferred from user id ${id} to user id ${secondUserId} `
    );
  } else {
    firstUser.credit = firstUser.credit + (firstUser.cash - amountToTransfer);
    firstUser.cash = 0;
    secondUser.cash = secondUser.cash + amountToTransfer;
    res.send(
      `the amount of ${amountToTransfer}  was transferred from user id ${id} to user id ${secondUserId} `
    );
  }

  res.send(
    ` the amount ${amountToTransfer} was transfered from user id ${id} to user id ${secondUserId}`
  );
});

export default router;
