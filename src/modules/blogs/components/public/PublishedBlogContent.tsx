'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PostShare } from '@/components/pages/blog/post-sections/PostShare';
import { RichTextEditor, type RichTextDocument } from '@/components/shared/rich-text-editor';
import { ArticleToc } from '@/components/ui/ArticleToc';
import type { TiptapDocument } from '@/types';
import { getBlogHeadings } from '../../utils/get-blog-headings';
import styles from './PublishedBlogContent.module.css';

export function PublishedBlogContent({
  content,
  title,
}: {
  content: TiptapDocument;
  title: string;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const [readyDocument, setReadyDocument] = useState<TiptapDocument | null>(null);
  const headings = useMemo(() => getBlogHeadings(content), [content]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article || !headings.length) return;

    let active = true;
    const assignHeadingIds = () => {
      if (!active) return;
      const renderedHeadings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (renderedHeadings.length !== headings.length) return;

      renderedHeadings.forEach((heading, index) => {
        heading.id = headings[index].id;
        (heading as HTMLElement).style.scrollMarginTop = 'var(--header-offset)';
      });
      observer.disconnect();
      setReadyDocument(content);
    };

    const observer = new MutationObserver(assignHeadingIds);
    observer.observe(article, { childList: true, subtree: true });
    queueMicrotask(assignHeadingIds);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [content, headings]);

  return (
    <section className="relative bg-[var(--dark-2)] pb-16 pt-16 md:pt-20">
      <div className="aurora-bg-section pointer-events-none absolute inset-0" />
      <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
          <article
            ref={articleRef}
            className={`${styles.article} min-w-0 max-w-[68ch] text-[1.0625rem] leading-relaxed text-blue-100/75`}
          >
            <RichTextEditor
              value={content as RichTextDocument}
              editable={false}
              showToolbar={false}
              headingLevels={[2, 3]}
              ariaLabel="Blog article"
              className="!border-0 !bg-transparent !text-inherit [&_.tiptap]:!min-h-0 [&_.tiptap]:!p-0"
            />
          </article>
          <aside className="sticky top-[var(--header-offset)] hidden self-start space-y-6 lg:block">
            {readyDocument === content && <ArticleToc items={headings} />}
            <div className={headings.length ? 'border-t border-white/10 pt-5' : ''}>
              <PostShare title={title} />
            </div>
          </aside>
        </div>
        <div className="mt-12 lg:hidden">
          <PostShare title={title} />
        </div>
      </div>
    </section>
  );
}
