import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Home.css";
import bikeImg from "../../img/bike.svg";
import carImg from "../../img/car.svg";
import busImg from "../../img/bus.svg";
import trainImg from "../../img/train.svg";
import Vehicle from "../Vehicle/Vehicle";

const Home = () => {
  const vehicleItems = [
    { name: "bike", img: bikeImg },
    { name: "car", img: carImg },
    { name: "bus", img: busImg },
    { name: "train", img: trainImg },
  ];
  return (
    <section className="home-vehicle">
      <Container>
        <Row>
          {vehicleItems.map((vehicle, idx) => (
            <Vehicle key={idx} vehicle={vehicle.name} img={vehicle.img} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Home;
