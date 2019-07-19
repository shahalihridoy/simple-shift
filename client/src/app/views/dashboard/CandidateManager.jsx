import React, { Component, Fragment } from "react";
import {
  Card,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  LinearProgress
} from "@material-ui/core";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Breadcrumb from "../../shared/components/Breadcrumb";
import { signupWithEmailAndPassword } from "../sessions/SessionService";
import { setCandidate, createCandidateAccount } from "./DashboardService";

class CadidateManager extends Component {
  state = {
    seat1: "",
    seat2: "",
    pass1: "",
    pass2: "",
    loading: false,
    agreement: false,
    subscription: "active"
  };

  handleChange = event => {
    let field = event.target;
    this.setState({
      [field.name]: field.value
    });
  };

  handleCheck = event => {
    let user = this.props.user;

    if (event.target.checked)
      this.setState({
        seat1: user.email,
        agreement: event.target.checked
      });
    else
      this.setState({
        seat1: "",
        agreement: event.target.checked
      });
  };

  handleSubmit = () => {
    let user = this.props.user;
    let { seat1, seat2, pass1, pass2 } = this.state;
    this.setState({ loading: true });

    createCandidateAccount({ seat1, seat2, pass1, pass2 }).catch(e => {});

    setCandidate(this.state, user.uid).finally(() => {
      this.setState({ loading: false });
    });

    // if (this.state.agreement) {
    //   signupWithEmailAndPassword(seat2, pass2).finally(() => {
    //     setCandidate(this.state, user.uid).finally(() => {
    //       this.setState({ loading: false });
    //     });
    //   });
    // } else {
    //   createCandidateAccount({seat1,seat2,pass1,pass2});
    //   Promise.all(
    //     signupWithEmailAndPassword(seat1, pass1),
    //     signupWithEmailAndPassword(seat2, pass2)
    //   )
    //     .catch(err => {})
    //     .finally(() => {
    //       setCandidate(this.state, user.uid).finally(() => {
    //         this.setState({ loading: false });
    //       });
    //     });
    // }
  };

  componentWillReceiveProps({ user }) {
    if (!user.subscription) return;
    if (user.subscription.status !== "active") {
      this.setState({
        subscription: "inactive"
      });
      this.props.history.push("/dashboard/subscription");
    } else if (user.candidates) {
      this.setState({
        ...user.candidates.one,
        ...user.candidates.two
      });
    }
  }

  componentWillMount() {
    let { user } = this.props;
    if (!user.subscription) return;
    if (user.subscription.status !== "active") {
      this.setState({ subscription: "inactive" });
      this.props.history.push("/dashboard/subscription");
    } else if (user.candidates) {
      this.setState({
        ...user.candidates.one,
        ...user.candidates.two
      });
    }
  }

  render() {
    let { seat1, seat2, pass1, pass2, loading } = this.state;
    return (
      <Fragment>
        <div className="pb-30 hide-on-mobile">
          <Breadcrumb
            routeSegments={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Manage Candidate" }
            ]}
          />
        </div>
        {loading && <LinearProgress color="primary" variant="indeterminate" />}
        <Card className="p-16">
          <ValidatorForm
            ref="form"
            className="flex-column w-100"
            onSubmit={this.handleSubmit}
            onError={errors => null}
          >
            <Grid container spacing={4}>
              <Grid item lg={6} md={6} xs={12} sm={12}>
                <h4 className="mb-12">Candidate-1</h4>
                <TextValidator
                  className="my-8 w-100"
                  label="Email"
                  onChange={this.handleChange}
                  name="seat1"
                  value={seat1}
                  variant="outlined"
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Email is not valid"
                  ]}
                />
                <TextValidator
                  className="my-8 w-100"
                  label="Password"
                  onChange={this.handleChange}
                  name="pass1"
                  value={pass1}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={12}>
                <h4 className="mb-12">Candidate-2</h4>
                <TextValidator
                  className="my-8 w-100"
                  label="Email"
                  onChange={this.handleChange}
                  name="seat2"
                  value={seat2}
                  variant="outlined"
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Email is not valid"
                  ]}
                />
                <TextValidator
                  className="my-8 w-100"
                  label="Password"
                  onChange={this.handleChange}
                  name="pass2"
                  value={pass2}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <FormControlLabel
              name="agreement"
              onChange={this.handleCheck}
              control={<Checkbox />}
              label="Add yourself as a candidate"
            />

            <div className="flex flex-end py-16">
              <Button
                className="capitalize"
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                Save
              </Button>
            </div>
          </ValidatorForm>
        </Card>
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
)(CadidateManager);
