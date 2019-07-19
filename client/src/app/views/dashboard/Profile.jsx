import React, { Component } from "react";
import { Grid, Card } from "@material-ui/core";
import Breadcrumb from "../../shared/components/Breadcrumb";
import { connect } from "react-redux";

class Profile extends Component {
  state = {};

  componentWillReceiveProps({ user }) {
    if (user.uid && !user.name) {
      this.props.history.push("/dashboard/edit-profile");
    }
  }

  componentWillMount() {
    let { user } = this.props;
    if (user.uid && !user.name) {
      this.props.history.push("/dashboard/edit-profile");
    }
  }

  render() {
    let {
      name,
      abn,
      phone,
      address,
      photoUrl,
      subscription,
      candidates
    } = this.props.user;

    return (
      <div className="analytics">
        <div className="pb-30 hide-on-mobile">
          <Breadcrumb
            routeSegments={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Profile" }
            ]}
          />
        </div>

        {/* addd new code here */}
        <Card className="px-16 py-24">
          <Grid container spacing={4} alignContent="center" alignItems="center">
            <Grid item md={6} xs={12}>
              <h4 className="mb-20">{name}</h4>
              <h5 className="mb-12">
                ABN: <span className="font-weight-normal">{abn}</span>
              </h5>
              <h5 className="mb-12">
                Contact No: <span className="font-weight-normal">{phone}</span>
              </h5>
              <h5 className="mb-12">
                Address: <span className="font-weight-normal">{address}</span>
              </h5>
              <h5 className="my-16">
                Plan:{" "}
                <span className="font-weight-normal">
                  {subscription ? subscription.plan : ""}
                </span>
              </h5>
              <h5 className="mb-12">
                Candidate-1:{" "}
                <span className="font-weight-normal">
                  {candidates ? candidates.one.seat1 : ""}
                </span>
              </h5>
              <h5 className="mb-12">
                Candidate-2:{" "}
                <span className="font-weight-normal">
                  {candidates ? candidates.two.seat2 : ""}
                </span>
              </h5>
            </Grid>

            <Grid item md={6} xs={12}>
              <div className="flex flex-center">
                <img
                  className="big-circular-image"
                  src={photoUrl ? photoUrl : "/assets/images/user.jpg"}
                  alt="user"
                />
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
