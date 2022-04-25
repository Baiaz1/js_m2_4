const $rate = document.getElementById("rate");
const $swap = document.getElementById("swap");
const $amountOne = document.getElementById("amount-one");
const $amountTwo = document.getElementById("amount-two");
const $currencyOne = document.getElementById("currency-one");
const $currencyTwo = document.getElementById("currency-two");

console.log($rate, $swap, $amountOne, $amountTwo, $currencyOne, $currencyTwo);

const dataFromBack = {
  uploaded: false,
};

async function getResource() {
  const { value: currencyTwo } = $currencyTwo;
  const { value: currencyOne } = $currencyOne;

  await fetch(
    `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      dataFromBack.conversion_rates = data.conversion_rates;
      dataFromBack.uploaded = true;

      calculateCurrency(dataFromBack, currencyOne, currencyTwo);
    });
}

async function calculateCurrency(data, currencyOne, currencyTwo) {
  const rate = data.conversion_rates[currencyTwo];
  $amountTwo.value = +$amountOne.value * rate;
  $rate.innerText = `1${currencyOne} = ${rate + " " + currencyTwo},`;
  console.log(rate);
}

async function runCalculate() {
  const { value: currencyTwo } = $currencyTwo;
  const { value: currencyOne } = $currencyOne;
  await calculateCurrency(dataFromBack, currencyOne, currencyTwo);
}

getResource();
console.log(dataFromBack);

$amountOne.addEventListener("input", runCalculate);
$amountTwo.addEventListener("input", runCalculate);
$currencyOne.addEventListener("change", runCalculate);
$currencyTwo.addEventListener("change", getResource);
