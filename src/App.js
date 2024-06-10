

/**
 * The App component renders the GlobalStyle component and the SmsForm component within a div.
 * @returns The `App` component is being returned, which contains the `GlobalStyle` component and the
 * `SmsForm` component wrapped in a `div` element.
 */
import React from 'react';
import GlobalStyle from './components/Globalstyles';
import SmsForm from './components/SmsForm';


const App = () => {
  return (
    <div>
       <GlobalStyle />
       <SmsForm />
    </div>
  );
};



export default App;




