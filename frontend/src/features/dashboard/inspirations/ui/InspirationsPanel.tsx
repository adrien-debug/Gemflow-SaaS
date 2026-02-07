import { FC } from "react";
import { Card } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import "./styles.scss";

const galleryItems = [
  { id: 1, src: "https://picsum.photos/seed/jewel1/400/300", title: "Bague Solitaire", tag: "Tendance" },
  { id: 2, src: "https://picsum.photos/seed/jewel2/400/300", title: "Collier Rivière", tag: "Classique" },
  { id: 3, src: "https://picsum.photos/seed/jewel3/400/300", title: "Bracelet Tennis", tag: "Élégant" },
  { id: 4, src: "https://picsum.photos/seed/jewel4/400/300", title: "Boucles Diamant", tag: "Luxe" },
];

const bottomRowItems = [
  { id: 5, src: "https://picsum.photos/seed/ring5/400/300", title: "Alliance Or Rose", tag: "Mariage" },
  { id: 6, src: "https://picsum.photos/seed/ring6/400/300", title: "Chevalière Homme", tag: "Homme" },
  { id: 7, src: "https://picsum.photos/seed/ring7/400/300", title: "Bague Cocktail", tag: "Soirée" },
  { id: 8, src: "https://picsum.photos/seed/ring8/400/300", title: "Jonc Diamants", tag: "Éternel" },
];

export const InspirationsPanel: FC = () => {
  return (
    <Card
      className="gallery-card gallery-card--dark-header"
      title={
        <span className="gallery-title">
          <CrownOutlined />
          Tendances Joaillerie
        </span>
      }
    >
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <img src={item.src} alt={item.title} />
            <div className="gallery-overlay">
              <span className="gallery-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery-row-separator" />

      <div className="gallery-section-header">
        <span className="gallery-section-title">Collection Exclusive</span>
        <span className="gallery-section-badge">Sélection 2026</span>
      </div>

      <div className="gallery-grid gallery-grid--bottom">
        {bottomRowItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <img src={item.src} alt={item.title} />
            <div className="gallery-overlay">
              <span className="gallery-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InspirationsPanel;
