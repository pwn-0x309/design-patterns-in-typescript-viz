import React, { useState } from 'react';
import { Save, RotateCcw, Clock, FileText } from 'lucide-react';
import styles from './Demo.module.css';

// Memento
class EditorMemento {
  constructor(private content: string, private date: string) {}

  public getContent(): string {
    return this.content;
  }

  public getDate(): string {
    return this.date;
  }
}

// Originator
class Editor {
  private content: string = '';

  public setContent(content: string) {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }

  public save(): EditorMemento {
    return new EditorMemento(this.content, new Date().toLocaleTimeString());
  }

  public restore(memento: EditorMemento) {
    this.content = memento.getContent();
  }
}

// Caretaker
class History {
  private mementos: EditorMemento[] = [];
  private editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  public backup() {
    this.mementos.push(this.editor.save());
  }

  public undo() {
    if (!this.mementos.length) return;
    const memento = this.mementos.pop();
    if (memento) {
      this.editor.restore(memento);
    }
  }

  public getHistory(): EditorMemento[] {
    return this.mementos;
  }

  public restoreTo(index: number) {
    const memento = this.mementos[index];
    if (memento) {
      this.editor.restore(memento);
      // Optional: remove future history if we restore to a past point
      // this.mementos = this.mementos.slice(0, index + 1);
    }
  }
}

export const MementoDemo: React.FC = () => {
  const [editor] = useState(new Editor());
  const [history] = useState(new History(editor));
  const [content, setContent] = useState('');
  const [snapshots, setSnapshots] = useState<EditorMemento[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    editor.setContent(newContent);
  };

  const handleSave = () => {
    history.backup();
    setSnapshots([...history.getHistory()]);
  };

  const handleRestore = (index: number) => {
    history.restoreTo(index);
    setContent(editor.getContent());
  };

  return (
    <div className={styles.container}>
      <div className={styles.editorArea}>
        <div className={styles.toolbar}>
          <div className={styles.title}>
            <FileText size={18} />
            <span>Untitled Document</span>
          </div>
          <button onClick={handleSave} className={styles.saveBtn}>
            <Save size={16} /> Save Snapshot
          </button>
        </div>
        <textarea
          value={content}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Start typing..."
        />
      </div>

      <div className={styles.sidebar}>
        <div className={styles.historyHeader}>
          <Clock size={18} />
          <span>History Snapshots</span>
        </div>
        <div className={styles.historyList}>
          {snapshots.length === 0 && <span className={styles.empty}>No snapshots saved</span>}
          {snapshots.map((snap, index) => (
            <div key={index} className={styles.snapshotItem}>
              <div className={styles.snapshotInfo}>
                <span className={styles.snapshotTime}>{snap.getDate()}</span>
                <span className={styles.snapshotPreview}>
                  {snap.getContent().substring(0, 20) || '(Empty)'}...
                </span>
              </div>
              <button 
                onClick={() => handleRestore(index)} 
                className={styles.restoreBtn}
                title="Restore this version"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
