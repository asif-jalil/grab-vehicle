import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Alert } from "react-bootstrap";
import { useParams } from "react-router";
import "./VehicleBook.css";
import fakeData from "../../fakeData/data.json";
import VehicleInfo from "../VehicleInfo/VehicleInfo";
import GoogleMap from "../GoogleMap/GoogleMap";

const VehicleBook = () => {
  const { vName } = useParams();
  const [pickLocation, setPickLocation] = useState({
    isSearched: false,
    from: "",
    to: "",
    date: "",
    message: false,
  });
  const [vehicleInfo, setVehicleInfo] = useState([]);

  useEffect(() => {
    setVehicleInfo(fakeData[vName]);
  }, [vName]);

  const handleLocation = (event) => {
    const newPickLocation = { ...pickLocation };
    newPickLocation[event.target.name] = event.target.value;
    setPickLocation(newPickLocation);
  };

  const handleSubmit = (event) => {
    if (pickLocation.from && pickLocation.to && pickLocation.date) {
      const newPickLocation = { ...pickLocation };
      newPickLocation.isSearched = true;
      newPickLocation.message = false;
      setPickLocation(newPickLocation);
      document.getElementById("booking-form").reset();
    } else {
      const newPickLocation = { ...pickLocation };
      newPickLocation.message = true;
      setPickLocation(newPickLocation);
    }
    event.preventDefault();
  };

  return (
    <section className="vehicle-book">
      <Container>
        <Row>
          <Col xl={4} lg={5} md={6}>
            <Card bg="light" className="border-0">
              <Card.Body>
                {!pickLocation.isSearched && (
                  <form id="booking-form" onSubmit={handleSubmit} action="">
                    {pickLocation.message && <Alert variant="danger">Please fill all field</Alert>}
                    <div className="mb-3">
                      <label className="form-label">Pick From</label>
                      <input name="from" onChange={handleLocation} type="text" className="form-control" placeholder="Ex: Mirpur 1" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Pick To</label>
                      <input name="to" onChange={handleLocation} type="text" className="form-control" placeholder="Ex: Mirpur 10" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Travel Date</label>
                      <input name="date" onChange={handleLocation} type="date" className="form-control" placeholder="Ex: Mirpur 10" />
                    </div>
                    <button className="btn main-btn w-100">Search</button>
                  </form>
                )}
                {pickLocation.isSearched && (
                  <>
                    <div className="location-tree-wrap shadow">
                      <h5 className="mb-3 text-white">On {pickLocation.date}</h5>
                      <div className="location-tree">
                        <h6>{pickLocation.from}</h6>
                        <h6>{pickLocation.to}</h6>
                      </div>
                    </div>
                    <div className="search-result">
                      {vehicleInfo.map((vehicle) => (
                        <VehicleInfo key={vehicle.id} vehicle={vehicle}></VehicleInfo>
                      ))}
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col xl={8} lg={7} md={6}>
            <div className="map">
              <GoogleMap />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default VehicleBook;
