import { notFound } from 'next/navigation';
import { formatDate, getPostFromSlug } from '../utils';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostFromSlug(params.slug);
  if (!post) return {};
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostFromSlug(params.slug);

  if (!post) notFound();

  const { metadata, content } = post;

  return (
    <section>
      <div className="mb-2">
        <span className="inline-block rounded-full bg-primary-100 dark:bg-primary-900 px-3 py-0.5 text-xs font-medium text-primary-700 dark:text-primary-300">
          {metadata.tag}
        </span>
      </div>
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
        {metadata.title}
      </h1>
      <p className="mt-2 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        {formatDate(metadata.publishedAt)}
      </p>
      <article className="prose md:max-w-5xl dark:prose-invert">{content}</article>
    </section>
  );
}
