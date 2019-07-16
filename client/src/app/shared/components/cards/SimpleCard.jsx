import React from "react";
import { Card } from "@material-ui/core";

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <Card elevation={3} className="px-24 py-20 h-100">
      <div className="card-title">{title}</div>
      <div className="card-subtitle">{subtitle}</div>
      <div className="mt-16">{children}</div>
    </Card>
  );
};

export default SimpleCard;
