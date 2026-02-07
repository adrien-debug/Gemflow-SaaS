import { FC, ReactNode } from "react";
import Typography from "antd/es/typography";
import "./styles.scss";

const { Title, Text } = Typography;

interface PageHeroProps {
  icon: ReactNode;
  badge: string;
  title: string;
  subtitle: string;
  stats?: Array<{
    icon: ReactNode;
    value: string | number;
    label: string;
  }>;
}

const PageHero: FC<PageHeroProps> = ({ icon, badge, title, subtitle, stats }) => {
  return (
    <div className="page-hero">
      <div className="page-hero__content">
        <div className="page-hero__badge">
          {icon}
          <span>{badge}</span>
        </div>
        <Title level={2} className="page-hero__title">
          {title}
        </Title>
        <Text className="page-hero__subtitle">{subtitle}</Text>
        {stats && stats.length > 0 && (
          <div className="page-hero__stats">
            {stats.map((stat, index) => (
              <div key={index} className="page-hero__stat-group">
                {index > 0 && <div className="page-hero__divider" />}
                <div className="page-hero__stat">
                  {stat.icon}
                  <div>
                    <Text className="page-hero__stat-value">{stat.value}</Text>
                    <Text className="page-hero__stat-label">{stat.label}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHero;
