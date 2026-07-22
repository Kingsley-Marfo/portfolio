import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, Clock } from "lucide-react";
import { getPost, getPostSlugs, getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/mdx";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name },
    url: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl py-14 sm:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All posts
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="size-1 rounded-full bg-border" />
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {post.readingTime}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Badge key={t} variant="primary">
                {t}
              </Badge>
            ))}
          </div>
        </header>

        <article className="mt-8">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </article>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Keep reading
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {r.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
