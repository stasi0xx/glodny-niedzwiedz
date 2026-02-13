import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPage() {
    return (
        <div className="py-12 bg-white min-h-screen">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Blog Niedźwiedzia 🐻</h1>
                    <p className="text-gray-600">Porady dietetyczne, ciekawostki i nowości.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <article key={post.id} className="flex flex-col rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gray-200 w-full relative">
                                {/* Placeholder Img */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-gray-200 flex items-center justify-center text-3xl font-bold text-emerald-800/20">
                                    {post.title.substring(0, 1)}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs text-gray-500 mb-2">{post.date}</div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className="text-emerald-600 font-medium text-sm hover:underline mt-auto">
                                    Czytaj dalej →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </div>
    );
}
