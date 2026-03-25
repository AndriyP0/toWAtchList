import { Component } from "react";
import "./App.css";
import PersonList from "./components/PersonList/PersonList";
import PersonForm from "./components/personForm/PersonForm";
import { nanoid } from "nanoid";

export class App extends Component {
  state = {
    contact: [
      {
        id: 1,
        firstName: "And",
        lastName: "Pop",
        email: "And@gmail.com",
        phone: "777777777",
      },
    ],
    activeContact: null,
  };
  creareAmptyContact() {
    return { firstName: "", lastName: "", phone: "", email: "", id: null };
  }
  addPerson = (contact) => {
    contact.id = nanoid();
    this.setState({
      contact: [...this.state.contact, contact],
    });
  };

  updatePerson = (updatedContact) => {
    this.setState({
      contact: this.state.contact.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact,
      ),
    });
  };

  onSubmit = (contact) => {
    if (contact.id) {
      this.updatePerson(contact);
      this.setState({ activeContact: contact });
    } else {
      this.addPerson(contact);
      this.resetForm();
    }
  };

  deletePerson = (id) => {
    this.setState({
      contact: this.state.contact.filter((contact) => contact.id !== id),
      activeContact: this.creareAmptyContact(),
    });
  };
  isActive = (contact) => {
    this.setState({
      activeContact: contact,
    });
  };

  resetForm = () => {
    if (this.state.activeContact && this.state.activeContact.id) {
      this.deletePerson(this.state.activeContact.id);
    }
    this.setState({ activeContact: this.creareAmptyContact() });
  };

  render() {
    return (
      <div className="contact-list">
        <h3>Contact list</h3>
        <div className="flex-container">
          <PersonList
            contact={this.state.contact}
            deletePerson={this.deletePerson}
            isActive={this.isActive}
          />
          <PersonForm
            onSubmit={this.onSubmit}
            creareAmptyContact={this.creareAmptyContact}
            activeContact={this.state.activeContact}
            resetForm={this.resetForm}
          />
        </div>
      </div>
    );
  }
}

export default App;
