import { useState } from "react";
import axios from "axios";

function Defect() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    // Clear the previous result
    setPrediction("");
    setConfidence("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a fabric image first.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/predict/defect",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.error ||
        "Fabric defect prediction failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <h2>Fabric Defect Detection</h2>

      <p>
        Upload a fabric image to detect the type of defect.
      </p>

      <div
        className="card p-4 mt-4"
        style={{ maxWidth: "600px" }}
      >

        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p>
            Selected image: <b>{selectedFile.name}</b>
          </p>
        )}

        <button
          className="btn btn-danger"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Detecting..." : "Detect Defect"}
        </button>

        {prediction && (
          <div className="alert alert-warning mt-4">

            <h4>Defect Detection Result</h4>

            <p>
              <b>Detected Defect:</b> {prediction}
            </p>

            <p>
              <b>Confidence:</b> {confidence}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Defect;