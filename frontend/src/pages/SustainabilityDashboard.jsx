import { useEffect, useState } from "react";
import api from "../services/api";

function SustainabilityDashboard() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const response = await api.get(
          "/api/analytics/circular-economy"
        );

        setAnalytics(response.data);

      } catch (error) {

        console.error(error);

        setError(
          "Unable to load sustainability analytics."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchAnalytics();

  }, []);


  if (loading) {

    return (
      <div className="container mt-5 text-center">
        <h3>Loading Sustainability Dashboard...</h3>
      </div>
    );

  }


  if (error) {

    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );

  }


  if (!analytics) {

    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          No analytics data available.
        </div>
      </div>
    );

  }


  return (

    <div className="container mt-5">

      {/* Header */}

      <div className="text-center mb-5">

        <h1>
          Sustainability Dashboard
        </h1>

        <p className="lead">
          Circular economy and environmental analytics
        </p>

      </div>


      {/* Statistics Cards */}

      <div className="row">

        <div className="col-md-4 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h5>
                Textiles Analyzed
              </h5>

              <h2 className="text-primary">
                {analytics.totalTextilesAnalyzed}
              </h2>

            </div>

          </div>

        </div>


        <div className="col-md-4 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h5>
                Recommendations
              </h5>

              <h2 className="text-success">
                {analytics.totalRecommendations}
              </h2>

            </div>

          </div>

        </div>


        <div className="col-md-4 mb-4">

          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h5>
                Environmental Assessments
              </h5>

              <h2 className="text-danger">
                {analytics.totalEnvironmentalAssessments}
              </h2>

            </div>

          </div>

        </div>

      </div>


      {/* Average Scores */}

      <div className="row mt-2">

        <div className="col-md-6 mb-4">

          <div className="card shadow">

            <div className="card-body text-center">

              <h4>
                Average Sustainability Score
              </h4>

              <h2 className="text-success">

                {analytics.averageSustainabilityScore}

              </h2>

              <p className="text-muted">
                Overall sustainability performance
              </p>

            </div>

          </div>

        </div>


        <div className="col-md-6 mb-4">

          <div className="card shadow">

            <div className="card-body text-center">

              <h4>
                Average Environmental Impact
              </h4>

              <h2 className="text-danger">

                {analytics.averageEnvironmentalImpact}

              </h2>

              <p className="text-muted">
                Average calculated impact score
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Material Distribution */}

      <div className="card shadow mt-3 mb-5">

        <div className="card-body">

          <h3 className="mb-4">
            Material Distribution
          </h3>


          {Object.keys(
            analytics.materialDistribution || {}
          ).length === 0 ? (

            <p className="text-muted">
              No material data available.
            </p>

          ) : (

            Object.entries(
              analytics.materialDistribution
            ).map(([material, count]) => (

              <div
                key={material}
                className="mb-3"
              >

                <div className="d-flex justify-content-between">

                  <strong>
                    {material}
                  </strong>

                  <span>
                    {count}
                  </span>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width: `${
                        Math.min(
                          count /
                            analytics.totalTextilesAnalyzed *
                            100,
                          100
                        )
                      }%`
                    }}
                  >
                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default SustainabilityDashboard;