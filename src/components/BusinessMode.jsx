import { useState, useEffect, useRef } from 'react'; // Importing necessary hooks from React
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom for navigation
import Header from './Header.jsx'; // Importing Header component from './Header.jsx'
import styles from '../style.js'; // Importing styles object from '../style.js'
import './businessstyles.css'; // Importing additional CSS styles for BusinessMode component

// BusinessMode component definition
const BusinessMode = () => {
  const [view, setView] = useState(''); // State hook for managing the view mode
  const [code, setCode] = useState(''); // State hook for managing the code
  const [loading, setLoading] = useState(false); // State hook for managing loading state
  const fetchedCode = useRef(false); // Ref hook to keep track of whether code has been fetched
  const Navigate = useNavigate(); // Initialize useHistory hook for navigation

  // Function to fetch code from the server
  const fetchCode = async () => {
    if (fetchedCode.current) {
      return;
    }

    try {
      const response = await fetch('https://flask-backend-codeverse.azurewebsites.net/business');
      if (!response.ok) {
        throw new Error('Failed to fetch code');
      }
      console.log('Data sent successfully2');
      const data = await response.text();
      setCode(data);
    } catch (err) {
      console.error('Failed to fetch code: ', err);
      setCode('Failed to fetch code');
    }

    fetchedCode.current = true;
  };

  // Effect hook to fetch code on component mount
  useEffect(() => {
    fetchCode();
  }, []);

  // Function to handle change in view mode
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Function to handle change in code textarea
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  // Function to copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code: ', err);
      alert('Failed to copy code to clipboard.');
    }
  };

  // Function to execute user command
  const executeCommand = async () => {
    if (loading) return;

    setLoading(true);

    const userInput = document.getElementById('userInput').value;

    try {
      const response = await fetch('https://flask-backend-codeverse.azurewebsites.net/userinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to server');
      }

      console.log('Data sent successfully');

      const codeResponse = await fetch('https://flask-backend-codeverse.azurewebsites.net/business');
      if (!codeResponse.ok) {
        throw new Error('Failed to fetch code');
      }

      const codeData = await codeResponse.text();
      setCode(codeData);
    } catch (error) {
      console.error('Error sending data to server:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to Education Mode
  const navigateToEducationMode = () => {
    Navigate('/EducationMode');
  };

  // Function to render different views based on the selected mode
  const renderView = () => {
    if (view === 'desktop') {
      return (
        <div className={`text-purple-500 flex items-center justify-center border-purple-500`} style={{ minHeight: "85vh", width: '100%' }}>
          {/* Desktop view */}
          <div className="container mx-auto" style={{ width: '80%',height: '80%' }}>
            <div className="bg-white border-4 border-gray-300 rounded-md overflow-hidden shadow-md flex justify-center align-center" style={{ maxHeight: '85vh', minHeight:'75vh'}}>
              <div dangerouslySetInnerHTML={{ __html: code }} style={{ width: '100%', overflow: 'auto',height:'100%' }} />
            </div>
          </div>
        </div>
      );
    
    } else if (view === 'mobile') {
      return (
        <div className={`text-purple-500 flex items-center justify-center border-purple-500`} style={{ minHeight: "85vh" }}>
          {/* Mobile view */}
          <div className="container mx-auto flex justify-center items-center" style={{ height: '70%', width: '23%' }}>
            <div className="bg-white border-4 border-gray-300 rounded-md overflow-auto shadow-md" style={{ minHeight: '75vh', maxHeight: '90vh', width: '100%' }}>
              <div className="w-full" dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={"  text-gray-500 flex flex-col items-center justify-center border-purple-500"} style={{ minHeight: "85vh" }}>
          {/* Default view */}
          <div className="container mx-auto">
            <div className="text-center">
              <div className="flex justify-end mb-2">
                <input type="text" id='userInput' className="border border-gray-300 px-2 py-1" style={{ width: '100%' }} placeholder="Enter command" />
                <button className={`bg-gray-800 text-gray-50 px-4 py-2 rounded-md ml-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={executeCommand} disabled={loading}>
                  {loading ? 'Loading...' : 'Proceed'}
                </button>
              </div>
              <div className="relative w-full">
                <textarea className="w-full h-96 bg-color4 border border-gray-300 text-gray-200" value={code} onChange={handleCodeChange} />
                <button className="absolute right-0 bottom-0 hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 rounded-md mb-2 mr-2" onClick={copyToClipboard}>
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };


  // JSX rendering
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <div className={`${styles.boxWidth}`}></div>
      <Header/>
      <div className="flex justify-left mt-10">
        <button className={`tab-button ${view === 'code' && 'active'}`} onClick={() => handleViewChange('')}>Code</button>
        <button className={`tab-button ${view === 'desktop' && 'active'}`} onClick={() => handleViewChange('desktop')}>Desktop</button>
        <button className={`tab-button ${view === 'mobile' && 'active'}`} onClick={() => handleViewChange('mobile')}>Mobile</button>
        <button className="tab-button" onClick={navigateToEducationMode}>Education Mode</button> {/* Button for navigation to Education Mode */}
      </div>
      {renderView()} 
    </div>
  );
};

export default BusinessMode;
