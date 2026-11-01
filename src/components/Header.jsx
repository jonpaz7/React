import getUSDRate from "../utils/getUSDRate.js";

function Header() {
  let USDRate = getUSDRate();

  return (
    <>
      <h1>Bank Account</h1>

      {/*<div>
        <h4>USD Rate: {USDRate}</h4>
      </div>*/}
    </>
  );
}

export default Header;
