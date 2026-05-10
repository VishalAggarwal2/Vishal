import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrettyCode from 'rehype-pretty-code';
import { components } from '../components/mdx';

export interface BlogPost {
  metadata: Metadata;
  slug: string;
  readingTime?: number;
}

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tag: string;
  image: string;
  draft: boolean;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    return {
      metadata: {
        title: 'Untitled',
        publishedAt: new Date(0).toISOString(),
        summary: '',
        tag: '',
        image: '',
        draft: true,
      },
      content: fileContent.trim(),
    };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1');
    const trimmedKey = key.trim() as keyof Metadata;
    if (trimmedKey === 'draft') {
      metadata[trimmedKey] = value === 'true';
    } else {
      (metadata as Record<string, string>)[trimmedKey] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), 'app/blogs/posts');
  const mdxFiles = getMDXFiles(dir);

  const posts = mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    return { metadata, slug, readingTime };
  });

  return posts
    .filter((post) => !post.metadata.draft)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );
}

export async function getPostFromSlug(slug: string) {
  const filePath = path.join(process.cwd(), 'app/blogs/posts', `${slug}.mdx`);
  const exists = await fs.promises
    .access(filePath)
    .then(() => true)
    .catch(() => false);
  if (!exists) return null;

  const source = await fs.promises.readFile(filePath, 'utf-8');

  const { content, frontmatter } = await compileMDX<Metadata>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'dracula',
            },
          ],
        ],
      },
    },
    components: components,
  });

  const rawText = source.replace(/---[\s\S]*?---/, '').trim();
  const readingTime = Math.max(1, Math.ceil(rawText.split(/\s+/).length / 200));

  return { metadata: frontmatter, content, readingTime };
}

export function formatDate(date: string) {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  return new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
