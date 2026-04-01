import { Component } from "react";
import "./PersonItem.css";

export class PersonItem extends Component {
  onPersonDelete = (e) => {
    e.stopPropagation();
    this.props.deletePerson(this.props.contact.id);
  };

  render() {
    const { firstName, lastName } = this.props.contact;

    return (
      <div
        className="person-item "
        onDoubleClick={() => this.props.isActive(this.props.contact)}
      >
        <p className="content">{firstName + " " + lastName}</p>
        <span className="delete-btn" onClick={this.onPersonDelete}>
          X
        </span>
      </div>
    ); 
  }
}

export default PersonItem;
