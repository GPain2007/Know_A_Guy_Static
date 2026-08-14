import "./Service.css";
import { ServiceCards } from "./ServiceCard";
import { Carousel } from "./Carousel";

export const Services = () => {
  return (
    <section className="services-section">
      <h2 className="services-heading">What We Do</h2>
      <ServiceCards />
      <Carousel />
    </section>
  );
};
