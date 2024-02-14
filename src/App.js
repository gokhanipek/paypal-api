/* global paypal */
import React, { useEffect, useRef, useState } from "react";
import "./app.css";

export const amountValues = [5, 10, 20, 50, 100];

export default function App() {
  const paypalRef = useRef();
  const [amount, setAmount] = useState(5);

  useEffect(() => {
    const button = paypal.Buttons({
      onClick: (e) => {
        fetch("https://tuz.at/lab/gentoken/classic/setec_ba/")
          .then(function (response) {
            return response.text();
          })
          .then({
            createOrder: function (data, actions) {
              console.log(amount);
              return data;
            },
            onApprove: function (data, actions) {
              alert()
            },
            onCancel: function (data, actions) {
              //redirect to which url was provided in the response
            },
          });
      },
    });
    button.render("#paypal-button-container");
  }, [amount]);

  const onClickHandler = (val) => {
    setAmount(val);
  };

  // paypalRef.current.getState().then((data) => {
  //   fetch("https://tuz.at/lab/gentoken/classic/setec_ba/")
  //     .then(function (response) {
  //       return response.text();
  //     })
  //     .then(function (token) {
  //       var button = paypal.Buttons({
  //
  //       if (button.isEligible()) {
  //         button.render("#paypal-button-container");
  //       }
  //     });
  // });

  return (
    <>
      <form onChange={onClickHandler}>
        {amountValues.map((amount) => {
          return (
            <>
              <label>{amount}</label>
              <input value={amount} type="radio" />
            </>
          );
        })}
        <div ref={paypalRef} id="paypal-button-container">
          Paypal
        </div>
      </form>
    </>
  );
}
