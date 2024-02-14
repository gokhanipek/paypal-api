/* global paypal */
import React, { useEffect, useRef } from 'react';
import "./app.css";

export default function App() {
  const paypalRef = useRef();

  useEffect(()=>{
    paypalRef.current = paypal.Buttons();
    paypalRef.current.render('#paypal-button-container');
  }, [])

  const onClickHandler = () => {
    paypalRef.current.getState().then(data => {
      fetch("https://tuz.at/lab/gentoken/classic/setec_ba/")
        .then(function(response) {
            return response.text();
        })
        .then(function(token) {
            var button = paypal.Buttons({
                createOrder: function(data, actions) {
                    console.log(data);
                    return token;
                },
                onApprove: function(data, actions) {
                    alert('success');
                },
                onCancel: function(data, actions) {
                  alert('error');
                }
            });
            if (button.isEligible()) {
                button.render('#paypal-button-container');
            }
        });
    })
  };

  return (
    <>
      <div
        onClick={onClickHandler}
        id="paypal-button-container"
      >
        Paypal
      </div>
    </>
  );
}
