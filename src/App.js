import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Importing CSS for styling
import { Oval } from 'react-loader-spinner';  // Importing a spinner component

const FormComponent = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    address: '',
    city: '',
    postal_code: '',
    country: '',
    state: '',
    website: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);  // Set loading state to true when form is submitted
  //   try {
  //     const response = await axios.post('https://serene-fjord-94378-999379287239.herokuapp.com/submit', formData);
  //     console.log('Form submitted:', response.data);
  //     setSubmissionStatus('success');
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     setSubmissionStatus('error');
  //   } finally {
  //     setIsLoading(false);  // Set loading state to false after form submission
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Set loading state to true when form is submitted
    try {
      const response = await axios.post('https://serene-fjord-94378-999379287239.herokuapp.com/submit', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Form submitted:', response.data);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setSubmissionStatus('error');
    } finally {
      setIsLoading(false);  // Set loading state to false after form submission
    }
  };
  
  
  


  return (
    <div className="form-wrapper">
      {submissionStatus === '' && (
        <form className="form-container" onSubmit={handleSubmit}>
          <h1 className="form-title">Form Submission</h1>
          {Object.keys(formData).map((key) => (
            <div className="form-field" key={key}>
              <label className="form-label">
                {key.replace('_', ' ')}:
                <input
                  className="form-input"
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </label>
            </div>
          ))}
          <button className="submit-button" type="submit">Submit</button>
          {isLoading && (
            <div className="loading-spinner">
              <Oval
                height={40}
                width={40}
                color="#007bff"
                ariaLabel="loading"
              />
            </div>
          )}
        </form>
      )}
      {submissionStatus === 'success' && (
        <p className="success-message">
          Form submitted successfully! Check your email to download your CGV
        </p>
      )}
      {submissionStatus === 'error' && (
        <div className="error-container">
          <p className="error-message">Error submitting form. Please try again.</p>
          <button className="retry-button" onClick={() => setSubmissionStatus('')}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormComponent />
      </header>
    </div>
  );
}

export default App;
