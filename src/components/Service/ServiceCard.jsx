import { SERVICES } from "./serviceData";

export const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="service-card">
      <span className="service-icon">{icon}</span>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc">{description}</p>
    </div>
  );
};

export const ServiceCards = () => {
  return (
    <div className="service-cards">
      {SERVICES.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
};
