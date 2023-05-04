import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => (
    <ul className={css.ContactList}>
        {contacts.map((contact, id) => (
            <li
                key={contact.id}
                className={css.item}>
                {contact.name} : {contact.number}
                <button
                    type="button"
                    className={css.btnContactList}
                    onClick={() => onDeleteContact(contact.id)}
                >
                    Delete
                </button>
            </li>
        ))}
    </ul>
);

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;