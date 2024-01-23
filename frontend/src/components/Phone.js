import { useState, useEffect } from "react";
import Contact from "./Contact";
import './Phone.css';

function Phone(props) {
    const [contactType, setContactType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [contactInfo, setContactInfo] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/api/contacts/${props.id}/phones`)
            .then(response => response.json())
            .then(phones => {
                setContactInfo(phones);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }, [props.id]);

    function onChangeContactType(event) {
        setContactType(event.target.value);
    }

    function onChangePhoneNumber(event) {
        setPhoneNumber(event.target.value);
    }

    const handleSave = () => {
        if (!contactType || !phoneNumber) {
            console.error('Contact type and phone number are required.');
            return;
        }

        fetch(`http://localhost/api/contacts/${props.id}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contactType, phoneNumber, contactId: props.id })
        })
            .then(response => response.json())
            .then(data => {
                setContactInfo([...contactInfo, data]);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        setContactType("");
        setPhoneNumber("");
    }

    const handleDeletePhone = (phoneId) => {
        fetch(`http://localhost/api/contacts/${props.id}/phones/${phoneId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setContactInfo(contactInfo.filter(phone => phone.id !== phoneId));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="phones-container">
            <div className="input-group">
                <input className="contact-type-input" type="text" placeholder="Enter contact type" value={contactType} onChange={onChangeContactType}></input>
                <input className="phone-number-input" type="text" placeholder="Enter phone number" value={phoneNumber} onChange={onChangePhoneNumber}></input>
                <button className="add-button" type="button" onClick={handleSave}>Add</button>
            </div>


            {contactInfo && contactInfo.length > 0 && (
                <div className="table-container">
                    <table className="contact-table">
                        <thead>
                            <tr>
                                <th>Contact type</th>
                                <th>Phone number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactInfo.length > 0 && contactInfo.map((phone, index) => (
                                <Contact
                                    key={index}
                                    id={phone.id}
                                    contactType={phone.contactType}
                                    phoneNumber={phone.phoneNumber}
                                    onDeleteContact={() => handleDeletePhone(phone.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Phone;