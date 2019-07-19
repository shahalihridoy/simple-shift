import React, { Component, Fragment } from "react";
import {
  Card,
  Button,
  Fab,
  Icon,
  Grid,
  LinearProgress
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { uploadProfilePhoto, sendUserDataInFirebase } from "./DashboardService";
import Breadcrumb from "../../shared/components/Breadcrumb";
import { connect } from "react-redux";

class ProfileEditor extends Component {
  state = {
    name: "",
    abn: "",
    address: "",
    loading: false,
    photoUrl: "",
    uid: "",
    phone: "",
    file: null
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleImageSelect = event => {
    let file = event.target.files[0];
    if (!file) return;
    let url = URL.createObjectURL(file);
    this.setState({ photoUrl: url, file: file });
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    let { uid, file } = this.state;
    if (uid === "") return this.setState({ loading: false });
    if (file) {
      let uploadTask = uploadProfilePhoto(file, uid);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(photoUrl => {
            this.setState({ photoUrl });
            this.postDataToFirebase();
          });
        }
      );
    } else {
      this.postDataToFirebase();
    }
  };

  postDataToFirebase = () => {
    let { uid, name, email, abn, phone, address, photoUrl } = this.state;

    sendUserDataInFirebase(
      { name, email, abn, phone, address, photoUrl },
      uid
    ).then(() => {
      this.props.history.push("/dashboard/profile");
    });

    this.setState({ loading: false });
  };

  componentWillReceiveProps({ user }) {
    this.setState({ ...user });
  }

  componentWillMount() {
    let { user } = this.props;
    this.setState({ ...user });
  }

  render() {
    let { name, abn, address, photoUrl, phone, loading } = this.state;

    return (
      <Fragment>
        <div className="pb-30 hide-on-mobile">
          <Breadcrumb
            routeSegments={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Profile Editor" }
            ]}
          />
        </div>
        {loading && <LinearProgress color="primary" variant="indeterminate" />}
        <Card className="px-16 py-24">
          <Grid container spacing={4}>
            <Grid item lg={4} md={4} sm={3} xs={12}>
              <div className="flex flex-center">
                <div className="flex-column">
                  <img
                    className="big-circular-image"
                    src={photoUrl ? photoUrl : "/assets/images/user.jpg"}
                    alt="user"
                  />
                  <label htmlFor="upload-image">
                    <Fab
                      className="capitalize mt-12"
                      color="primary"
                      component="span"
                      variant="extended"
                    >
                      <Icon className="pr-8">camera_alt</Icon>
                      <span>upload image</span>
                    </Fab>
                  </label>
                  <input
                    className="display-none"
                    accept="image/*"
                    onChange={this.handleImageSelect}
                    id="upload-image"
                    type="file"
                  />
                </div>
              </div>
            </Grid>

            <Grid item lg={8} md={8} sm={9} xs={12}>
              <ValidatorForm
                ref="form"
                className="flex-column w-100"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                  className="mb-8 w-100"
                  label="Organisation Name"
                  onChange={this.handleInputChange}
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />

                <TextValidator
                  className="my-8 mr-8 w-100"
                  label="ABN"
                  onChange={this.handleInputChange}
                  name="abn"
                  value={abn}
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                />

                <TextValidator
                  className="my-8 w-100"
                  label="Contact Number"
                  onChange={this.handleInputChange}
                  name="phone"
                  value={phone}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  variant="outlined"
                />

                <TextValidator
                  className="my-8 w-100"
                  label="Address"
                  onChange={this.handleInputChange}
                  name="address"
                  value={address}
                  variant="outlined"
                  multiline
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                />

                <div className="flex flex-end py-16">
                  <Button
                    onClick={this.handleCancel}
                    type="button"
                    className="capitalize mr-16"
                    variant="text"
                  >
                    Cancel
                  </Button>
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
            </Grid>
          </Grid>
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
)(ProfileEditor);
