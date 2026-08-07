import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h1>Textile Waste Management Dashboard</h1>

        <p className="lead">
          AI-powered textile classification and waste management system
        </p>
      </div>

      <div className="row justify-content-center">

        {/* Fabric Classification */}

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h3>Fabric Classification</h3>

              <p>
                Upload a textile image and identify its fabric type.
              </p>

              <Link
                to="/upload"
                className="btn btn-success"
              >
                Classify Fabric
              </Link>

            </div>

          </div>
        </div>


        {/* Fabric Defect Detection */}

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h3>Fabric Defect Detection</h3>

              <p>
                Upload a fabric image and detect possible defects.
              </p>

              <Link
                to="/defect"
                className="btn btn-danger"
              >
                Detect Defect
              </Link>

            </div>

          </div>
        </div>


        {/* Sustainability Dashboard */}

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">

            <div className="card-body text-center">

              <h3>Sustainability Analytics</h3>

              <p>
                View sustainability, environmental impact,
                recycling and circular economy analytics.
              </p>

              <Link
                to="/sustainability"
                className="btn btn-primary"
              >
                View Sustainability
              </Link>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;