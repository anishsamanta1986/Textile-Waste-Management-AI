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

  // Milestone 3 results
  const [sustainability, setSustainability] =
    useState(null);

  const [environmentalImpact, setEnvironmentalImpact] =
    useState(null);

  const [recommendation, setRecommendation] =
    useState(null);

  const [weight, setWeight] =
    useState(1);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    // Clear previous results
    setPrediction("");
    setConfidence("");
    setSustainability(null);
    setEnvironmentalImpact(null);
    setRecommendation(null);
  };

  const handlePredictionTypeChange = (event) => {
    setPredictionType(event.target.value);

    // Clear previous results
    setPrediction("");
    setConfidence("");
    setSustainability(null);
    setEnvironmentalImpact(null);
    setRecommendation(null);
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

      // Step 1: AI prediction
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

      // Step 2: Run Milestone 3 analysis
      // Only fabric classification is used
      // for sustainability analysis.
      if (predictionType === "fabric") {

        const analysisResponse =
          await api.post(
            "/api/analysis/full",
            null,
            {
              params: {
                material: predictedMaterial,
                confidence: predictedConfidence,
                weight: weight
              }
            }
          );

        const analysis =
          analysisResponse.data;

        setSustainability(
          analysis.sustainability
        );

        setEnvironmentalImpact(
          analysis.environmentalImpact
        );

        setRecommendation(
          analysis.recommendation
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Image prediction or analysis failed."
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
          maxWidth: "700px"
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

        {/* Information */}

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

        {/* Weight */}

        {predictionType === "fabric" && (

          <div className="mb-3">

            <label className="form-label">
              <b>
                Textile Weight (kg)
              </b>
            </label>

            <input
              type="number"
              className="form-control"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />

            <small className="text-muted">
              Used for environmental impact
              calculation.
            </small>

          </div>

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

            ? "Analyzing..."

            : predictionType === "fabric"

              ? "Predict & Analyze"

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

        {/* Sustainability Analysis */}

        {sustainability && (

          <div className="card mt-4 p-3">

            <h4>
              Sustainability Analysis
            </h4>

            <p>
              <b>
                Sustainability Score:
              </b>{" "}
              {sustainability.sustainabilityScore}
            </p>

            <p>
              <b>
                Recyclability:
              </b>{" "}
              {sustainability.recyclability}
            </p>

            <p>
              <b>
                Reusability:
              </b>{" "}
              {sustainability.reusability}
            </p>

            <p>
              <b>
                Biodegradability:
              </b>{" "}
              {sustainability.biodegradability}
            </p>

            <p>
              <b>
                Environmental Impact:
              </b>{" "}
              {sustainability.environmentalImpact}
            </p>

          </div>

        )}

        {/* Environmental Impact */}

        {environmentalImpact && (

          <div className="card mt-4 p-3">

            <h4>
              Environmental Impact
            </h4>

            <p>
              <b>
                Weight:
              </b>{" "}
              {environmentalImpact.weight} kg
            </p>

            <p>
              <b>
                Water Impact:
              </b>{" "}
              {environmentalImpact.waterImpact}
            </p>

            <p>
              <b>
                Carbon Impact:
              </b>{" "}
              {environmentalImpact.carbonImpact}
            </p>

            <p>
              <b>
                Waste Impact:
              </b>{" "}
              {environmentalImpact.wasteImpact}
            </p>

            <p>
              <b>
                Overall Impact Score:
              </b>{" "}
              {environmentalImpact.overallImpactScore}
            </p>

            <p>
              <b>
                Impact Level:
              </b>{" "}
              {environmentalImpact.impactLevel}
            </p>

          </div>

        )}

        {/* Recycling Recommendation */}

        {recommendation && (

          <div className="card mt-4 p-3">

            <h4>
              Recycling Recommendation
            </h4>

            <p>
              <b>
                Recommendation:
              </b>{" "}
              {recommendation.recommendation}
            </p>

            <p>
              <b>
                Recommended Action:
              </b>{" "}
              {recommendation.recommendedAction}
            </p>

            <p>
              <b>
                Reason:
              </b>{" "}
              {recommendation.reason}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Upload;