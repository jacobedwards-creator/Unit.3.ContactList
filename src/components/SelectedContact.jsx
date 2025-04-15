import { useState, useEffect } from 'react';

export default function SelectedContact({ contactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${contactId}`
        );
        const data = await response.json();
        setContact(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchContact();
  }, [contactId]);

  if (loading) return <div>Loading contact details...</div>;
  if (error) return <div>Error loading contact</div>;
  if (!contact) return <div>No contact found</div>;

  return (
    <div className="selected-contact">
      <h2>{contact.name}</h2>
      <div className="contact-details">
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Website:</strong> {contact.website}</p>
        
        <div className="address">
          <h3>Address</h3>
          <p>{contact.address?.street}</p>
          <p>{contact.address?.suite}</p>
          <p>{contact.address?.city}, {contact.address?.zipcode}</p>
        </div>
        
        <div className="company">
          <h3>Company</h3>
          <p>{contact.company?.name}</p>
          <p>{contact.company?.catchPhrase}</p>
        </div>
      </div>
      
      <button 
        onClick={() => setSelectedContactId(null)}
        className="back-button"
      >
        Back to Contacts
      </button>
    </div>
  );
}