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

  const [weight, setWeight] =
    useState(2);

  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    setPrediction("");
    setConfidence("");
    setAnalysis(null);
  };

  const handlePredictionTypeChange = (event) => {
    setPredictionType(event.target.value);

    setPrediction("");
    setConfidence("");
    setAnalysis(null);
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

      const predictedMaterial =
        response.data.prediction;

      const predictedConfidence =
        response.data.confidence;

      setPrediction(predictedMaterial);
      setConfidence(predictedConfidence);

      /*
       * Sustainability analysis is only performed
       * for fabric classification.
       */
      if (predictionType === "fabric") {
        const analysisResponse =
          await api.post(
            `/api/analysis/full?material=${encodeURIComponent(
              predictedMaterial
            )}&confidence=${predictedConfidence}&weight=${weight}`
          );

        setAnalysis(analysisResponse.data);
      }

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
    <div className="container mt-5 mb-5">

      {/* Page Header */}
      <div className="text-center mb-4">

        <h2 className="fw-bold">
          Textile AI Analysis
        </h2>

        <p className="text-muted">
          Identify fabric, analyze sustainability,
          and get recycling recommendations.
        </p>

      </div>


      {/* Upload Card */}
      <div
        className="card shadow-sm mx-auto p-4"
        style={{ maxWidth: "700px" }}
      >

        {/* Prediction Model */}

        <label className="form-label fw-bold">
          Select Prediction Model
        </label>

        <select
          className="form-select mb-3"
          value={predictionType}
          onChange={handlePredictionTypeChange}
        >

          <option value="fabric">
            Fabric Classification
          </option>

          <option value="defect">
            Fabric Defect Classification
          </option>

        </select>


        {/* Description */}

        <p className="text-muted">

          {predictionType === "fabric"
            ? "Upload a textile image to identify its fabric type and analyze its sustainability."
            : "Upload a fabric image to identify possible defects."
          }

        </p>


        {/* Weight */}

        {predictionType === "fabric" && (

          <>

            <label className="form-label fw-bold">
              Textile Weight (kg)
            </label>

            <input
              type="number"
              min="0.1"
              step="0.1"
              className="form-control mb-3"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />

            <small className="text-muted">
              Used for environmental impact calculation.
            </small>

          </>

        )}


        {/* File */}

        <label className="form-label fw-bold mt-3">
          Upload Textile Image
        </label>

        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleFileChange}
        />


        {/* Selected File */}

        {selectedFile && (

          <div className="alert alert-secondary">

            <b>Selected image:</b>{" "}
            {selectedFile.name}

          </div>

        )}


        {/* Button */}

        <button
          className="btn btn-success w-100"
          onClick={handleUpload}
          disabled={loading}
        >

          {loading
            ? "Analyzing..."
            : predictionType === "fabric"
              ? "Predict & Analyze"
              : "Detect Fabric Defect"
          }

        </button>

      </div>


      {/* Prediction Result */}

      {prediction && (

        <div
          className="card shadow-sm mx-auto mt-4 p-4"
          style={{ maxWidth: "700px" }}
        >

          <h4 className="fw-bold mb-3">
            AI Prediction
          </h4>

          <div className="row">

            <div className="col-md-6">

              <p>
                <b>
                  {predictionType === "fabric"
                    ? "Fabric"
                    : "Defect"
                  }
                </b>
              </p>

              <h5>
                {prediction}
              </h5>

            </div>

            <div className="col-md-6">

              <p>
                <b>Confidence</b>
              </p>

              <h5>
                {confidence}%
              </h5>

            </div>

          </div>

        </div>

      )}


      {/* Sustainability Analysis */}

      {analysis && (

        <>

          {/* Sustainability */}

          <div
            className="card shadow-sm mx-auto mt-4 p-4"
            style={{ maxWidth: "700px" }}
          >

            <h4 className="fw-bold mb-4">
              Sustainability Analysis
            </h4>

            <div className="text-center mb-4">

              <h5>
                Sustainability Score
              </h5>

              <h1 className="fw-bold">
                {analysis.sustainability?.sustainabilityScore}
              </h1>

                <p className="text-muted">
                  out of 100
                </p>

            </div>


            <div className="row text-center">

              <div className="col-md-4 mb-3">

                <b>Recyclability</b>

                <p>
                  {analysis.sustainability?.recyclability}
                </p>

              </div>


              <div className="col-md-4 mb-3">

                <b>Reusability</b>

                <p>
                  {analysis.sustainability?.reusability}
                </p>

              </div>


              <div className="col-md-4 mb-3">

                <b>Biodegradability</b>

                <p>
                  {analysis.sustainability?.biodegradability}
                </p>

              </div>

            </div>


            <p className="text-center">

              <b>Environmental Impact:</b>{" "}

              {analysis.sustainability?.environmentalImpact}

            </p>

          </div>


          {/* Environmental Impact */}

          <div
            className="card shadow-sm mx-auto mt-4 p-4"
            style={{ maxWidth: "700px" }}
          >

            <h4 className="fw-bold mb-4">
              Environmental Impact
            </h4>

            <div className="row text-center">

              <div className="col-md-6 mb-3">

                <b>Weight</b>

                <p>
                  {analysis.environmentalImpact?.weight} kg
                </p>

              </div>


              <div className="col-md-6 mb-3">

                <b>Water Impact</b>

                <p>
                  {analysis.environmentalImpact?.waterImpact}
                </p>

              </div>


              <div className="col-md-6 mb-3">

                <b>Carbon Impact</b>

                <p>
                  {analysis.environmentalImpact?.carbonImpact}
                </p>

              </div>


              <div className="col-md-6 mb-3">

                <b>Waste Impact</b>

                <p>
                  {analysis.environmentalImpact?.wasteImpact}
                </p>

              </div>

            </div>


            <div className="text-center mt-3">

              <h5>
                Overall Impact Score
              </h5>

              <h2 className="fw-bold">
                {analysis.environmentalImpact?.overallImpactScore}
              </h2>

              <p>

                <b>Impact Level:</b>{" "}

                {analysis.environmentalImpact?.impactLevel}

              </p>

            </div>

          </div>


          {/* Recycling Recommendation */}

          <div
            className="card shadow-sm mx-auto mt-4 p-4"
            style={{ maxWidth: "700px" }}
          >

            <h4 className="fw-bold mb-4">
              Recycling Recommendation
            </h4>

            <h5>
              {analysis.recommendation?.recommendation}
            </h5>

            <hr />

            <p>
              <b>Recommended Action:</b>
            </p>

            <p>
              {analysis.recommendation?.recommendedAction}
            </p>

            <p>
              <b>Reason:</b>
            </p>

            <p>
              {analysis.recommendation?.reason}
            </p>

          </div>

        </>

      )}

    </div>
  );
}

export default Upload;