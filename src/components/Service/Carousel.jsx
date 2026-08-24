import { CAROUSEL_LEFT, CAROUSEL_RIGHT } from "./carouselData";

const CarouselItem = ({ bg, label }) => (
  <div className="carousel-item" style={{ background: bg }}>
    <span className="carousel-label">{label}</span>
  </div>
);

const CarouselReviewItem = ({ bg, name, review, rating }) => (
  <div
    className="carousel-item carousel-item-review"
    style={{ background: bg }}
  >
    <div className="carousel-review-card">
      <span className="carousel-review-name">{name}</span>
      <span className="carousel-review-text">{review}</span>
      <span className="carousel-review-rating">{rating}</span>
    </div>
  </div>
);

export const Carousel = () => {
  return (
    <div className="carousel-wrapper">
      <div className="carousel carousel-left">
        <div className="carousel-track track-forward">
          {[...CAROUSEL_LEFT, ...CAROUSEL_LEFT, ...CAROUSEL_LEFT].map(
            (item, i) => (
              <CarouselItem key={i} {...item} />
            ),
          )}
        </div>
      </div>

      <div className="carousel carousel-right">
        <div className="carousel-track track-reverse">
          {[...CAROUSEL_RIGHT, ...CAROUSEL_RIGHT].map((item, i) => (
            <CarouselReviewItem key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
