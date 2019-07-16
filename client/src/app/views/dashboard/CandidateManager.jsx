import React, { Component, Fragment } from "react";
import { Card, Button, Divider, Grid } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Breadcrumb from "../../shared/components/Breadcrumb";

class CadidateManager extends Component {
  state = {};

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {};

  render() {
    let { email, password, loading } = this.state;
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
                  name="email"
                  value={email}
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
                  type="password"
                  name="password"
                  value={password}
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
                  name="email"
                  value={email}
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
                  type="password"
                  name="password"
                  value={password}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />
              </Grid>
            </Grid>

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

export default CadidateManager;
