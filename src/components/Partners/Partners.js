// Partners.js - Component đối tác phát triển dự án Economy City Văn Lâm
import React from 'react';
import { Shield, Award, TrendingUp, Users, Building } from 'lucide-react';
import { developerInfo, distributors, banks, constructionPartners } from './PartnersData';
import styles from './Partners.module.css';

const Partners = () => {
  // Hàm hiển thị icon dựa vào tên
  const renderIcon = (iconName, className) => {
    switch(iconName) {
      case 'Building':
        return <Building className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.partnersContainer}>
      <div className={styles.innerContainer}>
        {/* Heading Section */}
        <div className={styles.header}>
          <h2 className={styles.title}>Đối tác phát triển dự án</h2>
          <p className={styles.subtitle}>
            Economy City Văn Lâm được phát triển bởi các đối tác hàng đầu, cam kết mang đến chất lượng và giá trị bền vững cho cộng đồng cư dân
          </p>
        </div>

        {/* Section 1: Main Developer */}
        <div className={styles.developerSection}>
          <div className={styles.developerCard}>
            <div className={styles.developerContent}>
              {/* Logo & Company Info */}
              <div className={styles.developerInfo}>
                <div className={styles.logoContainer}>
                  <span className={styles.logoText}>{developerInfo.logo}</span>
                </div>
                <h3 className={styles.developerName}>{developerInfo.name}</h3>
                <p className={styles.developerRole}>{developerInfo.role}</p>
              </div>
              
              {/* Company Achievements */}
              <div className={styles.achievementsContainer}>
                <h4 className={styles.achievementsTitle}>Thành tựu & Kinh nghiệm</h4>
                
                <div className={styles.achievementsGrid}>
                  {developerInfo.achievements.map((achievement) => (
                    <div key={achievement.id} className={styles.achievementItem}>
                      <div className={styles.iconContainer}>
                        {renderIcon(achievement.icon, styles.icon)}
                      </div>
                      <div>
                        <h5 className={styles.achievementTitle}>{achievement.title}</h5>
                        <p className={styles.achievementDescription}>{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.developerDescription}>
                  <p>{developerInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Partners in 3 columns */}
        <div className={styles.partnersGrid}>
          {/* Column 1: Distribution Partners */}
          <div className={styles.partnerColumn}>
            <h3 className={styles.columnTitle}>
              <Users className={styles.columnIcon} /> Đơn vị phân phối
            </h3>
            
            <div className={styles.partnersList}>
              {distributors.map((partner) => (
                <div key={partner.id} className={styles.partnerCard}>
                  <div className={styles.partnerHeader}>
                    <div className={styles.partnerLogo}>
                      <span className={styles.partnerLogoText}>{partner.logo}</span>
                    </div>
                    <h4 className={styles.partnerName}>{partner.name}</h4>
                  </div>
                  <p className={styles.partnerRole}>{partner.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2: Banking Partners */}
          <div className={styles.partnerColumn}>
            <h3 className={styles.columnTitle}>
              <Shield className={styles.columnIcon} /> Đối tác ngân hàng
            </h3>
            
            <div className={styles.partnersList}>
              {banks.map((partner) => (
                <div key={partner.id} className={styles.partnerCard}>
                  <div className={styles.partnerHeader}>
                    <div className={styles.partnerLogo}>
                      <span className={styles.partnerLogoText}>{partner.logo}</span>
                    </div>
                    <h4 className={styles.partnerName}>{partner.name}</h4>
                  </div>
                  <p className={styles.partnerRole}>{partner.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 3: Construction Partners */}
          <div className={styles.partnerColumn}>
            <h3 className={styles.columnTitle}>
              <Building className={styles.columnIcon} /> Đối tác thiết kế & xây dựng
            </h3>
            
            <div className={styles.partnersList}>
              {constructionPartners.map((partner) => (
                <div key={partner.id} className={styles.partnerCard}>
                  <div className={styles.partnerHeader}>
                    <div className={styles.partnerLogo}>
                      <span className={styles.partnerLogoText}>{partner.logo}</span>
                    </div>
                    <h4 className={styles.partnerName}>{partner.name}</h4>
                  </div>
                  <p className={styles.partnerRole}>{partner.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className={styles.certificateSection}>
          <div className={styles.certificateHeader}>
            <Shield className={styles.certificateIcon} />
            <span className={styles.certificateTitle}>Dự án được thẩm định và cam kết chất lượng</span>
          </div>
          <p className={styles.certificateText}>
            Economy City Văn Lâm được phát triển theo đúng quy định pháp luật, với sự thẩm định chặt chẽ từ các ngân hàng hàng đầu Việt Nam, đảm bảo tính minh bạch và giá trị bền vững.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partners;