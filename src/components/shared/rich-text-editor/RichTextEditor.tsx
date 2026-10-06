'use client';

import type { Editor, JSONContent } from '@tiptap/core';
import { Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef } from 'react';

import styles from './RichTextEditor.module.css';

const EMPTY_DOCUMENT: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

export type RichTextEditorProps = {
  value?: JSONContent | null;
  defaultValue?: JSONContent;
  onChange?: (document: JSONContent) => void;
  editable?: boolean;
  showToolbar?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
};

type ToolbarAction = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  run: () => void;
};

function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      bold: currentEditor.isActive('bold'),
      italic: currentEditor.isActive('italic'),
      heading2: currentEditor.isActive('heading', { level: 2 }),
      heading3: currentEditor.isActive('heading', { level: 3 }),
      bulletList: currentEditor.isActive('bulletList'),
      orderedList: currentEditor.isActive('orderedList'),
      blockquote: currentEditor.isActive('blockquote'),
      canUndo: currentEditor.can().undo(),
      canRedo: currentEditor.can().redo(),
    }),
  });

  const formatting: ToolbarAction[] = [
    { label: 'Bold', active: state.bold, run: () => editor.chain().focus().toggleBold().run() },
    {
      label: 'Italic',
      active: state.italic,
      run: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: 'Heading 2',
      active: state.heading2,
      run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: 'Heading 3',
      active: state.heading3,
      run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: 'Bullet list',
      active: state.bulletList,
      run: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Numbered list',
      active: state.orderedList,
      run: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: 'Quote',
      active: state.blockquote,
      run: () => editor.chain().focus().toggleBlockquote().run(),
    },
  ];

  const history: ToolbarAction[] = [
    { label: 'Undo', disabled: !state.canUndo, run: () => editor.chain().focus().undo().run() },
    { label: 'Redo', disabled: !state.canRedo, run: () => editor.chain().focus().redo().run() },
  ];

  return (
    <div
      className={styles.toolbar}
      role="toolbar"
      aria-label="Text formatting"
    >
      {formatting.map(({ label, active, run }) => (
        <button
          key={label}
          type="button"
          className={styles.toolbarButton}
          aria-label={label}
          aria-pressed={active}
          onClick={run}
        >
          {label}
        </button>
      ))}
      <span
        className={styles.divider}
        aria-hidden="true"
      />
      {history.map(({ label, disabled, run }) => (
        <button
          key={label}
          type="button"
          className={styles.toolbarButton}
          aria-label={label}
          disabled={disabled}
          onClick={run}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function RichTextEditor({
  value,
  defaultValue,
  onChange,
  editable = true,
  showToolbar = true,
  placeholder = 'Start writing...',
  ariaLabel = 'Rich text editor',
  className,
}: RichTextEditorProps) {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder })],
    content: value ?? defaultValue ?? EMPTY_DOCUMENT,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        'aria-label': ariaLabel,
        class: styles.content,
      },
    },
    onUpdate: ({ editor: updatedEditor }) => {
      onChangeRef.current?.(updatedEditor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor || value === undefined) return;

    const nextDocument = value ?? EMPTY_DOCUMENT;
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(nextDocument)) {
      editor.commands.setContent(nextDocument, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {editor && editable && showToolbar && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
