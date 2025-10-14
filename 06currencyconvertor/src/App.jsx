import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  // States to store user input and conversion results
  const [amount, setAmount] = useState(0);              // amount entered by user
  const [from, setFrom] = useState("usd");              // currency to convert from
  const [to, setTo] = useState("inr");                  // currency to convert to
  const [convertedAmount, setConvertedAmount] = useState(0); // converted result

  // Get exchange rate info for selected "from" currency
  const currencyInfo = useCurrencyInfo(from);

  // Get all available currency options (like USD, INR, EUR, etc.)
  const options = Object.keys(currencyInfo);

  // Function to swap "from" and "to" currencies
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  // Function to convert amount using exchange rate
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/465375462/photo/financial-background.jpg?s=1024x1024&w=is&k=20&c=vXyAkS6b4H3w8Lf2Pa_7UGLnBxN9TRKdzL1ehmQyaAQ=)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          {/* Form for currency conversion */}
          <form
            onSubmit={(e) => {
              e.preventDefault(); // stop page from refreshing
              convert(); // run conversion
            }}
          >
            {/* Input box for 'From' currency */}
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(value) => setAmount(value)}
              />
            </div>

            {/* Swap button between 'From' and 'To' */}
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            {/* Input box for 'To' currency */}
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisabled // disable amount input for "To" field
              />
            </div>

            {/* Convert button */}
            <button 
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              type="submit" 
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
