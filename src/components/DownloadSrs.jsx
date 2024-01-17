import styled from "styled-components";
import { StyledButton } from "./Form";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const DownloadSrs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [srsData, setSrsData] = useState([]);
  const { state } = useLocation();
  const timerRef = useRef(null);

  const id = state.id;
  console.log("hello " + id);
  const fetchData = async () => {
    try {
      // Call your API here and set the data
      console.log(`Fetching SRS for ${id}`);
      const response = await axios.get(`http://127.0.0.1:5000/api/srs/${id}`);
      const result = response.data;
      console.log("result", result);

      if (result.data.is_completed && result.data.file_url !== "") {
        setSrsData(result.data);
        setIsLoading(false);
        clearInterval(timerRef.current);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const polling = () => {
    console.log("Start polling for SRS data");
    // Set up a recurring timer using setTimeout
    const timerId = setInterval(fetchData, 1000 * 30); // 2 minutes in milliseconds

    timerRef.current = timerId;

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(timerId);
  };

  useEffect(() => {
    return polling();
  }, [id]);

  const CenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `;

  const DownloadButton = styled(StyledButton)`
    background-color: #008cba;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #0077a8;
      transform: translateY(0);
    }
  `;

  const handleDownloadPDF = () => {
    // Check if data is available
    if (srsData && srsData.file_url !== "") {
      // Convert the data to a blob
      fetch(srsData.file_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          
          // Create a link element
          const link = document.createElement("a");

          // Set the download attribute and create a URL for the blob
          link.href = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
          link.download = `${Date.now()}.pdf`;

          // Append the link to the document, trigger a click, and remove the link
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    } else {
      alert("Data is still loading. Please wait.");
    }
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
};
export default DownloadSrs;
