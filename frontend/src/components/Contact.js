import React from "react";
import './Contact.css';

function Contact(props) {
    const handleDeleteContact = () => {
        props.onDeleteContact(props.id);
    }

    return (
        <tr>
            <td>{props.contactType}</td>
            <td>{props.phoneNumber}</td>
            <td>
                <button className="delete-button" type="button" onClick={handleDeleteContact}>Delete</button>
            </td>
        </tr>
    );
}

export default Contact;

