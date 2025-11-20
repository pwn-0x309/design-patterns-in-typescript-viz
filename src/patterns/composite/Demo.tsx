import React, { useState } from 'react';
import { Folder, File, FileText, Image, Music, ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react';
import styles from './Demo.module.css';

// Component Interface
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
  render(depth: number): React.ReactNode;
}

// Leaf
class FileItem implements FileSystemComponent {
  constructor(private name: string, private size: number, private type: 'text' | 'image' | 'audio') {}

  public getName() { return this.name; }
  public getSize() { return this.size; }

  public render(depth: number) {
    const icon = this.type === 'text' ? <FileText size={16} /> : 
                 this.type === 'image' ? <Image size={16} /> : <Music size={16} />;
    
    return (
      <div className={styles.fileItem} style={{ paddingLeft: `${depth * 20}px` }}>
        <span className={styles.fileIcon}>{icon}</span>
        <span className={styles.fileName}>{this.name}</span>
        <span className={styles.fileSize}>{this.size} KB</span>
      </div>
    );
  }
}

// Composite
class Directory implements FileSystemComponent {
  private children: FileSystemComponent[] = [];
  private isOpen = true;

  constructor(private name: string) {}

  public add(component: FileSystemComponent) {
    this.children.push(component);
  }

  public remove(component: FileSystemComponent) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  public getName() { return this.name; }
  
  public getSize() {
    return this.children.reduce((acc, child) => acc + child.getSize(), 0);
  }

  public toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  public render(depth: number): React.ReactNode {
    return (
      <div key={this.name}>
        <div 
          className={styles.directoryItem} 
          style={{ paddingLeft: `${depth * 20}px` }}
          onClick={() => this.toggleOpen()} // In a real app, we'd need a way to trigger re-render
        >
          <span className={styles.dirIcon}>
            {this.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder size={16} fill={this.isOpen ? "#fbbf24" : "none"} color="#fbbf24" />
          </span>
          <span className={styles.dirName}>{this.name}</span>
          <span className={styles.dirSize}>{this.getSize()} KB</span>
        </div>
        {this.isOpen && (
          <div className={styles.children}>
            {this.children.map((child, index) => (
              <React.Fragment key={index}>
                {child.render(depth + 1)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export const CompositeDemo: React.FC = () => {
  // We need to reconstruct the tree on every render to handle state properly in this simple demo
  // In a real app, the data structure would be separate from the view components
  const [structure, setStructure] = useState<any>({
    name: 'root',
    type: 'dir',
    children: [
      { name: 'Project A', type: 'dir', children: [
        { name: 'report.docx', type: 'file', fileType: 'text', size: 120 },
        { name: 'logo.png', type: 'file', fileType: 'image', size: 2500 },
      ]},
      { name: 'Music', type: 'dir', children: [
        { name: 'track1.mp3', type: 'file', fileType: 'audio', size: 4500 },
        { name: 'track2.mp3', type: 'file', fileType: 'audio', size: 3200 },
      ]},
      { name: 'notes.txt', type: 'file', fileType: 'text', size: 2 },
    ]
  });

  // Helper to build the Composite tree from state
  const buildTree = (node: any): FileSystemComponent => {
    if (node.type === 'file') {
      return new FileItem(node.name, node.size, node.fileType);
    }
    const dir = new Directory(node.name);
    node.children.forEach((child: any) => {
      dir.add(buildTree(child));
    });
    return dir;
  };

  const root = buildTree(structure);

  // Force update for interactivity
  const [, setTick] = useState(0);
  const forceUpdate = () => setTick(t => t + 1);

  // We monkey-patch the toggleOpen method of the root directory instance created in render
  // to trigger a React re-render. This is a bit hacky but visualizes the pattern well.
  // A better approach would be to separate the data model from the Composite classes.
  
  return (
    <div className={styles.container}>
      <div className={styles.browser}>
        <div className={styles.header}>
          <div className={styles.dots}>
            <span></span><span></span><span></span>
          </div>
          <div className={styles.addressBar}>/root</div>
        </div>
        <div className={styles.content}>
          {root.render(0)}
        </div>
        <div className={styles.footer}>
          Total Size: {root.getSize()} KB
        </div>
      </div>

      <div className={styles.explanation}>
        <h3>Composite Structure</h3>
        <p>
          The <code>Directory</code> (Composite) and <code>FileItem</code> (Leaf) classes both implement the <code>FileSystemComponent</code> interface.
        </p>
        <p>
          This allows clients to treat individual objects and compositions of objects uniformly. 
          Notice how the <code>getSize()</code> method works recursively for directories, summing up the sizes of all children, while for files it just returns their size.
        </p>
      </div>
    </div>
  );
};
