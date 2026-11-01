import { useContext } from "react";

export function getRandomAccountNumber(accounts) {
  let randomAccountNumber;
  let doesExist = true;

  do {
    randomAccountNumber = Math.floor(Math.random() * 9000 + 1000);

    let AccountNumberExistness = accounts.find(
      (x) => x.accountNumber === randomAccountNumber,
    );

    if (!AccountNumberExistness) {
      doesExist = false;
    }
  } while (doesExist);

  return randomAccountNumber;
}
