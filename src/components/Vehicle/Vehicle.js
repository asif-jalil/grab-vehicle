import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Vehicle.css";

const Vehicle = ({ vehicle, img }) => {
  const history = useHistory();
  const handleVehicle = () => {
    history.push(`vehicle/${vehicle}`);
  };

  return (
    <Col lg={3} sm={6}>
      <Card onClick={handleVehicle} className="vehicle-item border-0 shadow-lg">
        <Card.Body>
          <img src={img} alt="" />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Vehicle;
