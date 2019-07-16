import React from "react";

const LoaderBounce = () => {
  return (
    <div class="loader-bounce">
      <div class="spinner">
        <div
          class="double-bounce1 mat-bg-primary"
          style="background: #fcc02e"
        />
        <div class="double-bounce2 mat-bg-accent" style="background: #03a9f4" />
      </div>
    </div>
  );
};

export default LoaderBounce;
