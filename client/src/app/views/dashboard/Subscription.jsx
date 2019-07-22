import React, { Component, Fragment } from "react";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Icon,
  Fab,
  Button,
  LinearProgress
} from "@material-ui/core";
import { connect } from "react-redux";
import PaymentDialog from "../payment/PaymentDialog";
import Breadcrumb from "../../shared/components/Breadcrumb";
import { cancelSubscription } from "./DashboardService";

class Subscription extends Component {
  state = {
    open: false,
    loading: false,
    shouldShowCancelSubscription: false
  };

  pricingList = [
    {
      title: "Basic",
      subtitle: "Basic Solution",
      price: 24.99,
      allowedOfferIndexList: [0, 1],
      offerList: [
        "Upload 1 Track",
        "50km Starting Radius",
        "View and Analyze Listener Interactions",
        "1 Boost Per Month"
      ],
      buttonText: "Get Started"
    },
    {
      title: "Premium",
      subtitle: "Basic Solution",
      price: 24.99,
      allowedOfferIndexList: [0, 1],
      offerList: [
        "Upload 1 Track",
        "50km Starting Radius",
        "View and Analyze Listener Interactions",
        "1 Boost Per Month"
      ],
      buttonText: "Get Started"
    },
    {
      title: "Gold",
      subtitle: "Advanced Platform",
      price: 49.99,
      allowedOfferIndexList: [0, 1, 2],
      offerList: [
        "Upload 5 Track",
        "100km Starting Radius",
        "View and Analyze Listener Interactions",
        "1 Boost Per Month"
      ],
      buttonText: "7 Day Free Trial"
    },
    {
      title: "Pro",
      subtitle: "Unlimited Platform",
      price: 69.99,
      allowedOfferIndexList: [0, 1, 2, 3],
      offerList: [
        "Upload Unlimited Track",
        "250km Starting Radius",
        "View and Analyze Listener Interactions",
        "1 Boost Per Month"
      ],
      buttonText: "7 Day Free Trial"
    }
  ];

  handleChoice = plan => {
    this.setState({ open: true, plan: plan });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps({ user }) {
    if (user.subscription.status === "active")
      this.setState({
        shouldShowCancelSubscription: true
      });
    else {
      this.setState({
        shouldShowCancelSubscription: false
      });
    }
  }

  componentWillMount() {
    let { user } = this.props;
    if (user.subscription)
      if (user.subscription.status === "active")
        this.setState({
          shouldShowCancelSubscription: true
        });
      else {
        this.setState({
          shouldShowCancelSubscription: false
        });
      }
  }

  cancelSubscription = () => {
    this.setState({ loading: true });
    cancelSubscription(this.props.user.subscription.id).then(data => {
      this.setState({ loading: false });
    });
  };

  render() {
    let { loading, shouldShowCancelSubscription } = this.state;
    return (
      <Fragment>
        <div className="pb-30 hide-on-mobile">
          <Breadcrumb
            routeSegments={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Subscription" }
            ]}
          />
        </div>
        {loading && <LinearProgress color="primary" variant="indeterminate" />}
        {shouldShowCancelSubscription ? (
          <Button
            className="capitalize py-8 mt-16"
            variant="contained"
            color="primary"
            onClick={this.cancelSubscription}
          >
            cancel subscription
          </Button>
        ) : (
          <Fragment>
            <div className="pricing" id="pricing">
              <Grid justify="space-between" container spacing={4}>
                {this.pricingList.map(plan => {
                  let {
                    title,
                    subtitle,
                    price,
                    allowedOfferIndexList,
                    offerList,
                    buttonText
                  } = plan;

                  return (
                    <Grid item lg={4} md={4} sm={12} xs={12} key={title}>
                      <Card className="text-center card-hover">
                        <CardHeader
                          className="pricing__card-header"
                          title={<strong>{title}</strong>}
                          subheader={subtitle}
                        />
                        <Divider />
                        <CardContent className="pricing__card-content px-16">
                          <h1 className="mt-16">${price}</h1>
                          <h4 className="mb-32">Per Month</h4>
                          {offerList.map((offer, index) => (
                            <div
                              key={index}
                              className="flex flex-middle flex-center pb-16"
                            >
                              {allowedOfferIndexList.includes(index) ? (
                                <Icon color="primary" fontSize="small">
                                  done
                                </Icon>
                              ) : (
                                <Icon color="error" fontSize="small">
                                  close
                                </Icon>
                              )}
                              <div className="pl-8 pb-3" key={index}>
                                {offer}
                              </div>
                            </div>
                          ))}

                          <div className="text-center pt-16">
                            <Fab
                              size="large"
                              className="capitalize px-24"
                              color="primary"
                              variant="extended"
                              onClick={() => this.handleChoice(plan)}
                            >
                              {buttonText}
                            </Fab>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              <PaymentDialog handleClose={this.handleClose} {...this.state} />
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Subscription);
