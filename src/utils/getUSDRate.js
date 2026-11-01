export default async function getUSDRate() {
  const USDRateResponse = await fetch("https://open.er-api.com/v6/latest/USD");
  const USDRateData = await USDRateResponse.json();

  return USDRateData.rates.ILS;
}
