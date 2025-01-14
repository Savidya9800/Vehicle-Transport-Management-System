import React from "react";
import "./MaintenanceHome.scoped.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="card-container1">
        <div className="box1">
          <img src="./images/service.jpg" alt="" className="card-image" />
          <p>
            "Ensure your fleet stays in top condition with our comprehensive
            vehicle services. From routine maintenance to specialized repairs,
            we offer reliable solutions that enhance performance, extend vehicle
            lifespan, and minimize downtime. Trust our expert technicians to
            keep your vehicles running smoothly, ensuring safety and efficiency
            on the road."
          </p>
          <br />
          <Link to="/ServiceDr">
            <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 transition duration-200">
              Services
            </button>
          </Link>
        </div>
      </div>

      <div className="card-container1">
        <div className="box2">
          <img src="./images/repair.jpeg" alt="" className="card-image1" />
          <p>
            "Get fast and efficient vehicle repair services to minimize downtime
            and get your vehicles back on the road. Our skilled technicians
            handle everything from minor fixes to major repairs, using
            high-quality parts and advanced tools to ensure reliable,
            long-lasting results."
          </p>
          <br />
          <Link to="/RepairDr">
            <button className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-500 transition duration-200">
              Repairs
            </button>
          </Link>
        </div>
      </div>

      <div className="card-container1">
        <div className="box1">
          <img src="./images/beeakdown.jpg" alt="" className="card-image" />
          <p>
            "Quickly resolve unexpected vehicle breakdowns with our responsive
            repair services. Our expert team provides on-site and off-site
            assistance to ensure your vehicles are back in operation swiftly,
            minimizing disruptions and keeping your business moving."
          </p>
          <br />
          <Link to="/BreakdownDR">
            <button className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500 transition duration-200">
              Breakdowns
            </button>
          </Link>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Home;
