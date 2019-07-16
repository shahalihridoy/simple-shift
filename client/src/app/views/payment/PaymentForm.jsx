import React, { Fragment } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardCVCElement,
  CardExpiryElement
} from "react-stripe-elements";
import { Button, LinearProgress } from "@material-ui/core";
import { createNewSubscription } from "./PaymentService";
import { connect } from "react-redux";

const PaymentForm = ({ handleClose, plan, stripe, user }) => {
  const [loading,setLoading] = React.useState(false);

  const handleSubmit = ev => {
    setLoading(true);
    ev.preventDefault();
    if (stripe) {
      stripe.createSource({
        type: 'card',
        currency: 'USD',
    }).then(({source}) => {
        createNewSubscription(source.id,user.customerId, plan.title).then(()=>{
          setLoading(false);
          handleClose();
        })
      })
    } else {
      setLoading(false);
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  return (
    <Fragment>
      {loading && (
      <LinearProgress color="primary" variant="indeterminate" />
    )}
    <form onSubmit={handleSubmit} className="p-16">
      <div className="flex flex-center pb-24">
        <img
          style={{ height: "64px" }}
          src="/assets/images/mock-logo-1.png"
          alt="logo"
        />
      </div>
      <label>
        Card number
        <CardNumberElement className="payment-field" />
      </label>
      <div className="py-8" />
      <label>
        Expiration date
        <CardExpiryElement className="payment-field" />
      </label>
      <div className="py-8" />
      <label>
        CVC
        <CardCVCElement className="payment-field" />
      </label>
      <div className="py-8" />
      <div className="flex flex-center">
        <Button className="capitalize mr-16" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="capitalize"
          type="submit"
          variant="contained"
          color="primary"
        >
          Pay ${plan.price}/Month
        </Button>
      </div>
    </form>
    </Fragment>
  );
};


const mapStateToProps = state => ({
  user: state.auth
});

export default 
  connect(
    mapStateToProps,
    {}
  )(injectStripe(PaymentForm))

