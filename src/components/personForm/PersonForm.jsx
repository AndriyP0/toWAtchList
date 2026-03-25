import { Component } from "react";
import "./PersonForm.css";

export class PersonForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    id: null,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.activeContact !== this.props.activeContact) {
      this.setState({ ...this.props.activeContact });
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className="person-form" onSubmit={this.onFormSubmit}>
        <div className="form-input">
          <div className="inp">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.onInputChange}
            />
          </div>

          <div className="inp">
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.onInputChange}
            />
          </div>

          <div className="inp">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </div>

          <div className="inp">
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              value={this.state.phone}
              onChange={this.onInputChange}
            />
          </div>
        </div>

        <div className="form-btn">
          <button type="submit">Save</button>
          {this.props.activeContact && this.props.activeContact.id ? (
            <button
              type="button"
              onClick={() => {
                this.props.resetForm();
              }}
            >
              Delete
            </button>
          ) : null}
        </div>
      </form>
    );
  }
}

export default PersonForm;
