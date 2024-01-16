import { useState } from 'react';
import styled from 'styled-components';
import axios from "axios"
import DownloadSrs from './DownloadSrs';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledForm = styled.form`
  max-width: 450px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  margin-bottom:110px
`;

const FormTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
  resize: vertical; /* Allow vertical resizing */
`;

const StyledHeading = styled.h1`
text-align:center;

`


export const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;



const FormComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id,setId]=useState(null)



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://127.0.0.1:5000/api/generate", {
            title: title,
            description: description,
          });
            setId(response.data.id)
          console.log(response.data);
    
            if (response.status >= 200 && response.status < 300) {
                <DownloadSrs id={id} />
          } else {
            console.error('Server error:', response.status);
            // Handle other statuses as needed
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    
    return (
        <>
            <StyledHeading>SRS GENERATOR</StyledHeading>
            <PageContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <FormTitle>ENTER DETAILS TO GENERATE SRS</FormTitle>
                    <StyledInput
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <StyledTextArea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4" // Adjust the number of rows as needed
                        required
                    />
                    <StyledButton type="submit">Submit</StyledButton>

                </StyledForm>
            </PageContainer>
        </>
    );
};

export default FormComponent;
