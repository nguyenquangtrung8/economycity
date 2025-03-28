import React, { useState } from 'react';
import Layout from '@theme/Layout';
import ProjectLayout from '../../components/ProjectLayout/ProjectLayout';
import TypicalFloor from '../../components/TypicalFloor/TypicalFloor';
import { Globe, FileText } from 'lucide-react';

import styles from './layout.module.css';

export default function LayoutViewer() {
  const [activeLayout, setActiveLayout] = useState('project');
  
  return (
    <Layout
      title="Layout Viewer | Economy City Văn Lâm"
      description="Xem và so sánh các layout của dự án Economy City Văn Lâm"
      wrapperClassName={styles.fullWidthWrapper}
    >
      <div className={styles.pageContainer}>
        {/* Sidebar Menu */}
        <div className={styles.sidebarMenu}>
          <div className={styles.menuContainer}>
            <button
              className={`${styles.menuItem} ${activeLayout === 'project' ? styles.activeMenuItem : ''}`}
              onClick={() => setActiveLayout('project')}
            >
              <div className={styles.menuIcon}><Globe size={20} /></div>
              <span className={styles.menuLabel}>Toàn dự án</span>
            </button>
            
            <button
              className={`${styles.menuItem} ${activeLayout === 'typical' ? styles.activeMenuItem : ''}`}
              onClick={() => setActiveLayout('typical')}
            >
              <div className={styles.menuIcon}><FileText size={20} /></div>
              <span className={styles.menuLabel}>Mặt bằng điển hình</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className={styles.contentArea}>
          {activeLayout === 'project' && (
            <div className={styles.layoutWrapper}>
              <ProjectLayout />
            </div>
          )}
          
          {activeLayout === 'typical' && (
            <div className={styles.layoutWrapper}>
              <TypicalFloor />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}