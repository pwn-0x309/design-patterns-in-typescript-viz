import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code, Box, Layers, LayoutTemplate, Activity } from 'lucide-react';
import styles from './PatternPreview.module.css';

interface PatternPreviewData {
  id: string;
  name: string;
  category: 'Creational' | 'Structural' | 'Behavioral';
  description: string;
  codePreview: string;
}

interface PatternPreviewProps {
  patternId: string | null;
  position: { x: number; y: number };
  isVisible: boolean;
}

const categoryIcons = {
  Creational: <Box size={16} />,
  Structural: <LayoutTemplate size={16} />,
  Behavioral: <Activity size={16} />,
};

const categoryColors = {
  Creational: '#3b82f6',
  Structural: '#8b5cf6',
  Behavioral: '#ec4899',
};

export const PatternPreview: React.FC<PatternPreviewProps> = ({
  patternId,
  position,
  isVisible,
}) => {
  const [previewData, setPreviewData] = useState<PatternPreviewData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!patternId || !isVisible) {
      setPreviewData(null);
      return;
    }

    // Dynamically import the preview data
    import(`../../patterns/${patternId}/preview.ts`)
      .then((module) => {
        const camelCaseId = patternId.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        const previewKey = `${camelCaseId}Preview`;
        setPreviewData(module[previewKey] || null);
      })
      .catch((error) => {
        console.error(`Failed to load preview for ${patternId}:`, error);
        setPreviewData(null);
      });
  }, [patternId, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Calculate tooltip position with smart positioning
    const tooltipWidth = 500;
    const tooltipHeight = 400;
    const offset = { x: 20, y: 10 };
    const padding = 20;

    let x = position.x + offset.x;
    let y = position.y + offset.y;

    // Flip horizontally if too close to right edge
    if (x + tooltipWidth > window.innerWidth - padding) {
      x = position.x - tooltipWidth - offset.x;
    }

    // Flip vertically if too close to bottom edge
    if (y + tooltipHeight > window.innerHeight - padding) {
      y = position.y - tooltipHeight - offset.y;
    }

    // Ensure tooltip doesn't go off-screen on the left
    if (x < padding) {
      x = padding;
    }

    // Ensure tooltip doesn't go off-screen on the top
    if (y < padding) {
      y = padding;
    }

    setTooltipPosition({ x, y });
  }, [position, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && previewData && (
        <motion.div
          className={styles.preview}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{previewData.name}</h3>
              <div 
                className={styles.categoryBadge}
                style={{ backgroundColor: categoryColors[previewData.category] }}
              >
                {categoryIcons[previewData.category]}
                <span>{previewData.category}</span>
              </div>
            </div>
            <p className={styles.description}>{previewData.description}</p>
          </div>

          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <Code size={14} />
              <span>Code Preview</span>
            </div>
            <div className={styles.codeContainer}>
              <SyntaxHighlighter
                language="typescript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '12px',
                  fontSize: '12px',
                  lineHeight: '1.5',
                  borderRadius: '4px',
                  maxHeight: '250px',
                  overflow: 'auto',
                }}
                showLineNumbers={false}
              >
                {previewData.codePreview}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className={styles.footer}>
            <Layers size={12} />
            <span>Click to view full pattern</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
