import { useState } from "react";
import api from "../services/api";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [predictionType, setPredictionType] =
    useState("fabric");

  const [prediction, setPrediction] =
    useState("");

  const [confidence, setConfidence] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleFileChange = (event) => {
    setSelectedFile(
      event.target.files[0]
    );

    // Clear the previous result
    setPrediction("");
    setConfidence("");
  };


  const handlePredictionTypeChange = (
    event
  ) => {

    setPredictionType(
      event.target.value
    );

    // Clear the previous result
    setPrediction("");
    setConfidence("");
  };


  const handleUpload = async () => {
    
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    const endpoint =
      predictionType === "fabric"
        ? "/api/predict/fabric"
        : "/api/predict/defect";
      
    try {
      
      setLoading(true);
      
      const response = await api.post(
        endpoint,
        formData
      );
      
      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);
    
    } catch (error) {
      
      console.log(error);
      
      alert(
        error.response?.data?.error ||
        "Image prediction failed."
      );
    
    } finally {
      
      setLoading(false);
    
    }
  };


  return (

    <div className="container mt-5">

      <h2>
        Textile AI Prediction
      </h2>


      <p>
        Select a prediction model and
        upload a textile image.
      </p>


      <div
        className="card p-4 mt-4"
        style={{
          maxWidth: "600px"
        }}
      >


        {/* Select AI model */}

        <label className="form-label">

          <b>
            Select Prediction Model
          </b>

        </label>


        <select
          className="form-select mb-3"
          value={predictionType}
          onChange={
            handlePredictionTypeChange
          }
        >

          <option value="fabric">

            Fabric Classification

          </option>


          <option value="defect">

            Fabric Defect Classification

          </option>

        </select>


        {/* Show information based on selected model */}

        {predictionType === "fabric" ? (

          <p>

            Upload a textile image to
            identify its fabric type.

          </p>

        ) : (

          <p>

            Upload a fabric image to
            identify possible defects.

          </p>

        )}


        {/* Image input */}

        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={
            handleFileChange
          }
        />


        {/* Selected image */}

        {selectedFile && (

          <p>

            Selected image:

            {" "}

            <b>
              {selectedFile.name}
            </b>

          </p>

        )}


        {/* Prediction button */}

        <button
          className="btn btn-success"
          onClick={handleUpload}
          disabled={loading}
        >

          {loading

            ? "Predicting..."

            : predictionType === "fabric"

              ? "Predict Fabric"

              : "Detect Fabric Defect"

          }

        </button>


        {/* Prediction result */}

        {prediction && (

          <div
            className="alert alert-success mt-4"
          >

            <h4>
              Prediction Result
            </h4>


            <p>

              <b>

                {predictionType === "fabric"

                  ? "Fabric"

                  : "Defect"

                }:

              </b>

              {" "}

              {prediction}

            </p>


            <p>

              <b>
                Confidence:
              </b>

              {" "}

              {confidence}%

            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Upload;