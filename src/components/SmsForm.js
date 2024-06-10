



// importimg `React` object and the`useState` hook from the 'react' library.
import React, { useState } from 'react';


/* The `const styles` object in the code snippet is defining a set of CSS styles as inline
styles for different elements within a React component. Each key within the `styles` object
corresponds to a specific element or component style, and the nested objects define the CSS
properties for that element. */

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'black',
    color: '#c9d1d9',
  },
  formWrapper: {
    background: '#161b22',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid',
   //#30363d',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    outline: 'none',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1.3px solid',
   // borderColor: '#30363d',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#121481',   
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '40%',
  
    
  },
};

/**
 * The `App` function defines a React component that allows users to send an SMS message by providing a
 * phone number and message, with error handling for the sending process.
 * @returns The `App` component is being returned. It contains a form for sending SMS messages with
 * input fields for the phone number and message, a submit button to trigger the `sendMessage`
 * function, and error handling for displaying alerts in case of success or failure.
 */
function App() {
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

/**
 * The `sendMessage` function sends an SMS message using a POST request to the specified endpoint and
 * displays the response message in an alert.
 */
  const sendMessage = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      alert('Internal frontend error');
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.formWrapper}>

        <h1 style={styles.title}>Send SMS</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <div>
              <label style={styles.label}>Patient's Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Patient's phone number"
                style={styles.input}
              />
          </div>

          <div>
              <label style={styles.label}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                style={styles.textArea}
              />
          </div>

          <button type="submit" style={styles.button}>Send</button>

        </form>

      </div>
      
    </div>
  );
}

export default App;
