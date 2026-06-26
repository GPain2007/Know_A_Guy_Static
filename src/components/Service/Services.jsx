import "./Service.css";

const SERVICES = [
  {
    icon: "🌿",
    title: "Lawn Mowing & Maintenance",
    description:
      "Professional lawn mowing, edging, and seasonal clean-ups to keep your yard pristine year-round.",
  },
  {
    icon: "🌳",
    title: "Landscaping & Design",
    description:
      "Custom landscape design and installation — from flower beds to hardscaping, we bring your vision to life.",
  },
  {
    icon: "✂️",
    title: "Tree & Shrub Trimming",
    description:
      "Expert pruning and trimming to shape trees, hedges, and shrubs for both health and curb appeal.",
  },
];

const CAROUSEL_ITEMS = [
  { bg: "linear-gradient(135deg,#dcf9cf,#a8e0a0)", label: "Fresh Cut Lawn" },
  { bg: "linear-gradient(135deg,#e29cb4,#f5c6d8)", label: "Garden Design" },
  { bg: "linear-gradient(135deg,#a8e0a0,#dcf9cf)", label: "Hedge Trimming" },
  { bg: "linear-gradient(135deg,#f5c6d8,#e29cb4)", label: "Tree Service" },
  { bg: "linear-gradient(135deg,#b8f0c8,#dcf9cf)", label: "Mulching" },
  { bg: "linear-gradient(135deg,#e29cb4,#c97090)", label: "Seasonal Clean-Up" },
];

export const Services = () => {
  return (
    <section className="services-section">
      <h2 className="services-heading">What We Do</h2>

      <div className="service-cards">
        {SERVICES.map((s) => (
          <div className="service-card" key={s.title}>
            <span className="service-icon">{s.icon}</span>
            <h3 className="service-card-title">{s.title}</h3>
            <p className="service-card-desc">{s.description}</p>
          </div>
        ))}
      </div>

      <div className="carousel-wrapper">
        <div className="carousel carousel-left">
          <div className="carousel-track track-forward">
            {[...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS].map((item, i) => (
              <div
                className="carousel-item"
                key={i}
                style={{ background: item.bg }}
              >
                <span className="carousel-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel carousel-right">
          <div className="carousel-track track-reverse">
            {[...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS].map((item, i) => (
              <div
                className="carousel-item"
                key={i}
                style={{ background: item.bg }}
              >
                <span className="carousel-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
