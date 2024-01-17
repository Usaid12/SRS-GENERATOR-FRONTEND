import styled,{keyframes} from 'styled-components';
import { StyledButton } from './Form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';
import PropTypes from "prop-types"


const DownloadSrs = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [srsData, setSrsData] = useState([])
  const { state } = useLocation()
  const id = state.id;
console.log("hello " + id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call your API here and set the data
                const response = await axios.get(`http://127.0.0.1:5000/api/srs/:${id}`);
                const result = await response.json();
                setSrsData(result);
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        const fetchDataPeriodically = () => {
            // Call the fetchData function initially
            fetchData();
    
            // Set up a recurring timer using setTimeout
            const timerId = setInterval(() => {
                // fetchData();
            }, 2 * 60 * 1000); // 2 minutes in milliseconds
    
            // Cleanup function to clear the interval when the component is unmounted
            return () => clearInterval(timerId);
        };
    
        fetchDataPeriodically();
    
    }, [id]);
    const CenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `;
  
  const bounceAnimation = keyframes`
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  `;
  
  const DownloadButton = styled(StyledButton)`
    background-color: #008CBA;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;
  
    &:hover {
      background-color: #0077A8;
      animation: ${bounceAnimation} 0.8s ease infinite;
      transform: translateY(0);
    }
  `;
  
  const handleDownloadPDF = () => {
    isLoading ? <Loader /> : alert('Downloading PDF');
  };
  
  return (
    <CenteredContainer>
      {!isLoading ? (
        <DownloadButton type="button" onClick={handleDownloadPDF}>
          Download PDF
        </DownloadButton>
      ) : (
        <Loader />
      )}
    </CenteredContainer>
  );
}
export default DownloadSrs;
DownloadSrs.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  