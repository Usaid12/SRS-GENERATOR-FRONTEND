import styled from 'styled-components';
import { StyledButton } from './Form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const DownloadSrs = ({id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [srsData,setSrsData]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Call your API here and set the data
            const response = await axios.get('https://api.example.com/data');
            const result = await response.json();
            setSrsData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        const fetchDataPeriodically = () => {
          // Call the fetchData function initially
          fetchData();
    
          // Set up a recurring timer using setTimeout
          const timerId = setInterval(() => {
            fetchData();
          }, 2 * 60 * 1000); // 2 minutes in milliseconds
    
          // Cleanup function to clear the interval when the component is unmounted
          return () => clearInterval(timerId);
        };
    
        fetchDataPeriodically(); 
    
      }, []);

const DownloadButton = styled(StyledButton)`
  background-color: #008CBA;

  &:hover {
    background-color: #0077A8;
  }
`;
    const handleDownloadPDF = () => {
        isLoading?<Loader/>:
        alert('Downloading PDF');
    }
  return (
    <div>
       <DownloadButton type="button" onClick={handleDownloadPDF}>
          Download PDF
        </DownloadButton>
    </div>
  )
}

export default DownloadSrs
