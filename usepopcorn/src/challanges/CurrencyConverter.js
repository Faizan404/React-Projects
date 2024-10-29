import React, { useEffect, useState } from "react";

function CurrencyConverter() {
  const [rates, setRates] = useState(0);
  const [formData, setFormData] = useState({
    amount: 0,
    from: "",
    to: "",
  });

  useEffect(
    function () {
      (async function convert() {
        try {
          if (!formData.amount && !formData.from && !formData.to) {
            setFormData({
              amount: 0,
              from: "",
              to: "",
            });
            return;
          }
          const res = await fetch(
            `http://api.frankfurter.app/latest?amount=${formData.amount}&from=${formData.from}&to=${formData.to}`
          );
          const data = await res.json();
          setRates(data.rates);
        } catch (error) {
          console.error(error);
        }
      })();
    },
    [formData.to]
  );

  return (
    <>
      <div>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <select
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          value={formData.form}
        >
          <option value="">From</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          value={formData.to}
        >
          <option value="">To</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div>
        {formData.from !== formData.to ? (
          <>
            {formData.to === "USD" && <span>{rates.USD} $$</span>}
            {formData.to === "EUR" && <span>{rates.EUR} EUR</span>}
            {formData.to === "CAD" && <span>{rates.CAD} $$</span>}
            {formData.to === "INR" && <span>{rates.INR} Rs</span>}
          </>
        ) : (
          <p>
            You get the same result in case converted courency is same as the
            your currency
          </p>
        )}
      </div>
    </>
  );
}

export default CurrencyConverter;
