#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patterns = [
  'singleton', 'prototype', 'builder', 'factory-method', 'abstract-factory',
  'adapter', 'bridge', 'composite', 'decorator', 'facade', 'flyweight', 'proxy',
  'chain-of-responsibility', 'command', 'interpreter', 'iterator', 'mediator',
  'memento', 'observer', 'state', 'strategy', 'template-method', 'visitor'
];

const categoryMap = {
  'singleton': 'Creational',
  'prototype': 'Creational',
  'builder': 'Creational',
  'factory-method': 'Creational',
  'abstract-factory': 'Creational',
  'adapter': 'Structural',
  'bridge': 'Structural',
  'composite': 'Structural',
  'decorator': 'Structural',
  'facade': 'Structural',
  'flyweight': 'Structural',
  'proxy': 'Structural',
  'chain-of-responsibility': 'Behavioral',
  'command': 'Behavioral',
  'interpreter': 'Behavioral',
  'iterator': 'Behavioral',
  'mediator': 'Behavioral',
  'memento': 'Behavioral',
  'observer': 'Behavioral',
  'state': 'Behavioral',
  'strategy': 'Behavioral',
  'template-method': 'Behavioral',
  'visitor': 'Behavioral',
};

const nameMap = {
  'singleton': 'Singleton',
  'prototype': 'Prototype',
  'builder': 'Builder',
  'factory-method': 'Factory Method',
  'abstract-factory': 'Abstract Factory',
  'adapter': 'Adapter',
  'bridge': 'Bridge',
  'composite': 'Composite',
  'decorator': 'Decorator',
  'facade': 'Facade',
  'flyweight': 'Flyweight',
  'proxy': 'Proxy',
  'chain-of-responsibility': 'Chain of Responsibility',
  'command': 'Command',
  'interpreter': 'Interpreter',
  'iterator': 'Iterator',
  'mediator': 'Mediator',
  'memento': 'Memento',
  'observer': 'Observer',
  'state': 'State',
  'strategy': 'Strategy',
  'template-method': 'Template Method',
  'visitor': 'Visitor',
};

function extractCodePreview(code, maxLines = 15) {
  const lines = code.split('\n');
  const previewLines = lines.slice(0, maxLines);
  return previewLines.join('\n');
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function extractDescription(dataContent) {
  // Try to extract the Intent paragraph from the explanation
  const intentMatch = dataContent.match(/<p>\s*([^<]+?)\s*<\/p>/);
  if (intentMatch) {
    return intentMatch[1].trim();
  }
  return 'Design pattern description';
}

async function generatePreviewFile(patternId) {
  const patternsDir = path.join(__dirname, '..', 'src', 'patterns');
  const patternDir = path.join(patternsDir, patternId);
  const dataFilePath = path.join(patternDir, 'data.tsx');
  const previewFilePath = path.join(patternDir, 'preview.ts');

  try {
    // Read the data.tsx file
    const dataContent = fs.readFileSync(dataFilePath, 'utf-8');

    // Extract the code export - try both camelCase and without dashes
    const codeVarName = toCamelCase(patternId) + 'Code';
    const codeMatch = dataContent.match(new RegExp(`export const ${codeVarName} = \`([\\s\\S]*?)\`;`, 'm'));
    
    if (!codeMatch) {
      console.warn(`⚠️  Could not find code export for ${patternId} (tried ${codeVarName})`);
      return;
    }

    const fullCode = codeMatch[1];
    const codePreview = extractCodePreview(fullCode, 15);
    const description = extractDescription(dataContent);

    // Generate the preview.ts content with proper camelCase
    const camelCaseId = patternId.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const previewContent = `export const ${camelCaseId}Preview = {
  id: '${patternId}',
  name: '${nameMap[patternId]}',
  category: '${categoryMap[patternId]}' as const,
  description: \`${description}\`,
  codePreview: \`${codePreview}\`,
};
`;

    // Write the preview file
    fs.writeFileSync(previewFilePath, previewContent);
    console.log(`✅ Generated preview for ${patternId}`);
  } catch (error) {
    console.error(`❌ Error generating preview for ${patternId}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Generating preview files for all patterns...\n');

  for (const patternId of patterns) {
    await generatePreviewFile(patternId);
  }

  console.log('\n✨ Preview generation complete!');
}

main();
