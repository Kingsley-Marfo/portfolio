import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on FinTech, secure authentication, database design, APIs, software architecture and accessibility.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes on building production software."
        description="Essays on the engineering decisions behind the systems I build — payments, security, architecture and the craft in between."
      />

      <Section>
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">Posts are on the way.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i % 2}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 sm:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="size-1 rounded-full bg-border" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" /> {post.readingTime}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold tracking-tight">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                      <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
