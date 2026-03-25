import { Component } from "react";
import PersonItem from "../PersonItem/PersonItem";
import "./PersonList.css";

export class PersonList extends Component {
  render() {
    const contact = this.props.contact;
    return (
      <div className="person-section">
        <div className="person-list">
          {contact.map((contact) => (
            <PersonItem
              key={contact.id}
              contact={contact}
              deletePerson={this.props.deletePerson}
              isActive={this.props.isActive}
            />
          ))}
        </div>
        <button className="list-btn">New</button>
      </div>
    );
  }
}

export default PersonList;
