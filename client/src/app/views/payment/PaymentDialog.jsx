import React, { Component } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { Elements } from "react-stripe-elements";
import PaymentForm from "./PaymentForm";

const PaymentDialog = ({ open, handleClose, plan }) => {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Elements>
          <PaymentForm plan={plan} handleClose={handleClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
