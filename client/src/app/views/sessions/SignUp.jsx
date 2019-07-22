import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  LinearProgress
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { setUser } from "./../../redux/actions/AuthActions";
import { PropTypes } from "prop-types";
import { signupWithEmailAndPassword } from "./SessionService";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    agreement: false,
    loading: false
  };

  handleChange = (event,type) => {
    event.persist();
    if(type === "agreement") {
      this.setState({
        agreement: event.target.checked
      })
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    if(!this.state.agreement) return;
    this.setState({ loading: true });
    signupWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.props.setUser({ user: { ...user }, isUserLoggedIn: true });
        localStorage.setItem("authenticated", "true");
        this.props.history.push("/");
      })
      .catch(error => {
        this.props.setUser({ isUserLoggedIn: false });
        localStorage.setItem("authenticated", "false");
        this.setState({ loading: false });
      });
  };

  render() {
    let { email, password, loading, agreement } = this.state;
    return (
      <div className="signup flex flex-center w-100 h-100vh bg-light-gray">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            {loading && (
              <LinearProgress color="primary" variant="indeterminate" />
            )}
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <FormControlLabel
                      name="agreement"
                      checked={agreement}
                      onChange={(event)=>this.handleChange(event,"agreement")}
                      control={<Checkbox />}
                      label="I have read and agree to the terms of service."
                    />
                    <div className="mt-16 flex flex-middle">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Sign up
                      </Button>
                      <span className="ml-16 mr-8">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        Sign in
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setUser: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { setUser }
)(SignUp);
