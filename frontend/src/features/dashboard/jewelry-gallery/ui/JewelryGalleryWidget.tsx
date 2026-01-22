import { FC, useState } from "react";
import { Card, Image, Space, Typography, Tag } from "antd";
import { 
  CrownOutlined, 
  LeftOutlined, 
  RightOutlined,
  HeartOutlined,
  EyeOutlined 
} from "@ant-design/icons";
import "./styles.scss";

const { Text } = Typography;

interface JewelryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  color: string;
}

const jewelryItems: JewelryItem[] = [
  {
    id: 1,
    src: "/images/jewelry/sapphire-bracelet.jpg",
    title: "Bracelet Saphir Royal",
    category: "Bracelet",
    color: "blue",
  },
  {
    id: 2,
    src: "/images/jewelry/diamond-ring.jpg",
    title: "Bague Diamant Éternité",
    category: "Bague",
    color: "default",
  },
  {
    id: 3,
    src: "/images/jewelry/ruby-necklace.jpg",
    title: "Collier Rubis Passion",
    category: "Collier",
    color: "red",
  },
  {
    id: 4,
    src: "/images/jewelry/emerald-earrings.jpg",
    title: "Boucles Émeraude",
    category: "Boucles d'oreilles",
    color: "green",
  },
  {
    id: 5,
    src: "/images/jewelry/gold-bracelet.jpg",
    title: "Bracelet Or 24K",
    category: "Bracelet",
    color: "gold",
  },
  {
    id: 6,
    src: "/images/jewelry/pearl-necklace.jpg",
    title: "Collier Perles Akoya",
    category: "Collier",
    color: "default",
  },
  {
    id: 7,
    src: "/images/jewelry/luxury-ring.jpg",
    title: "Bague Prestige",
    category: "Bague",
    color: "purple",
  },
  {
    id: 8,
    src: "/images/jewelry/diamond-necklace.jpg",
    title: "Rivière de Diamants",
    category: "Collier",
    color: "cyan",
  },
];

export const JewelryGalleryWidget: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, jewelryItems.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleItems = jewelryItems.slice(currentIndex, currentIndex + itemsPerPage);

  const handlePreview = (src: string) => {
    setPreviewImage(src);
    setPreviewVisible(true);
  };

  return (
    <Card
      className="jewelry-gallery-widget"
      title={
        <Space>
          <CrownOutlined style={{ color: "#d4af37", fontSize: 20 }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            Inspirations Joaillerie
          </span>
        </Space>
      }
      extra={
        <Space>
          <button
            className="gallery-nav-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <LeftOutlined />
          </button>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, jewelryItems.length)} / {jewelryItems.length}
          </Text>
          <button
            className="gallery-nav-btn"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            <RightOutlined />
          </button>
        </Space>
      }
    >
      <div className="jewelry-gallery-grid">
        {visibleItems.map((item) => (
          <div key={item.id} className="jewelry-item">
            <div className="jewelry-image-wrapper">
              <img
                src={item.src}
                alt={item.title}
                className="jewelry-image"
                onClick={() => handlePreview(item.src)}
              />
              <div className="jewelry-overlay">
                <button className="overlay-btn" onClick={() => handlePreview(item.src)}>
                  <EyeOutlined />
                </button>
                <button className="overlay-btn favorite">
                  <HeartOutlined />
                </button>
              </div>
            </div>
            <div className="jewelry-info">
              <Text strong ellipsis className="jewelry-title">
                {item.title}
              </Text>
              <Tag color={item.color} style={{ marginTop: 4 }}>
                {item.category}
              </Tag>
            </div>
          </div>
        ))}
      </div>

      <Image
        style={{ display: "none" }}
        preview={{
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: (visible) => setPreviewVisible(visible),
        }}
      />
    </Card>
  );
};

export default JewelryGalleryWidget;
