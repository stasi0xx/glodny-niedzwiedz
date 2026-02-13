import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { blogPosts } from '@/data/blogPosts';

// Fix: Params handling for Next.js 15+
interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) notFound();

    return (
        <div className="py-20 bg-white min-h-screen">
            <Container className="max-w-3xl">
                <Link href="/blog" className="text-sm text-emerald-600 hover:underline mb-8 block">← Wróć do bloga</Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-12 border-b pb-8">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>3 min czytania</span>
                </div>

                <div className="prose prose-lg prose-emerald max-w-none text-gray-700">
                    <p className="text-xl leading-relaxed font-serif text-gray-500 mb-8 border-l-4 border-emerald-500 pl-4 italic">
                        {post.excerpt}
                    </p>
                    {/* Mock splitting content for length */}
                    {post.content.split('\n').map((p, i) => (
                        <p key={i} className="mb-4">{p}</p>
                    ))}
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </Container>
        </div>
    );
}
