import DownloadSrs from "./components/DownloadSrs"
import Form from "./components/Form"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/download-srs" element={<DownloadSrs/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
