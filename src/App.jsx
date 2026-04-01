import { Component } from "react";
import "./App.css";
import PersonList from "./components/PersonList/PersonList";
import PersonForm from "./components/personForm/PersonForm";
import { nanoid } from "nanoid";

export class App extends Component {
  state = {
    contact: [],
    activeContact: null,
  };
  componentDidMount() {
    const saveContact = localStorage.getItem("contacts");
    if (saveContact) {
      this.setState({ contact: JSON.parse(saveContact) });
    } else {
      this.setState({ contact: [] });
    }
  }

  creareAmptyContact() {
    return { firstName: "", lastName: "", phone: "", email: "", id: null };
  }
  addPerson = (contact) => {
    contact.id = nanoid();
    this.setState(
      {
        contact: [...this.state.contact, contact],
      },
      () => this.save(),
    );
  };

  updatePerson = (updatedContact) => {
    this.setState(
      {
        contact: this.state.contact.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact,
        ),
      },
      () => this.save(),
    );
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
    this.setState(
      {
        contact: this.state.contact.filter((contact) => contact.id !== id),
        activeContact: this.creareAmptyContact(),
      },
      () => this.save(),
    );
  };
  isActive = (contact) => {
    this.setState({
      activeContact: contact,
    });
  };

  onNew = () => {
    this.setState({ activeContact: this.creareAmptyContact() });
  };
  resetForm = () => {
    if (this.state.activeContact && this.state.activeContact.id) {
      this.deletePerson(this.state.activeContact.id);
    }
    this.onNew();
  };
  save = () => {
    localStorage.setItem("contacts", JSON.stringify(this.state.contact));
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
            onNew={this.onNew}
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
