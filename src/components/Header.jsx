import { useEffect, useState } from "react";
import getUSDRate from "../utils/getUSDRate.js";

function Header() {
  const [usdRate, setUsdRate] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getUSDRate()
      .then((rate) => {
        if (isMounted) setUsdRate(rate);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header>
      <h1>Bank Account</h1>
      {usdRate && <h4>USD Rate: {usdRate} ILS</h4>}
    </header>
  );
}

export default Header;
