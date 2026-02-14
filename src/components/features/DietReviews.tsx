import React from 'react';
import { DietReview } from '@/data/diets';

interface DietReviewsProps {
    reviews: DietReview[];
}

export const DietReviews: React.FC<DietReviewsProps> = ({ reviews }) => {
    if (!reviews || reviews.length === 0) return null;

    const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);

    return (
        <section className="py-8">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Opinie klientów</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-lg border border-yellow-100">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="font-bold text-yellow-700">{avgRating}</span>
                    <span className="text-sm text-yellow-600/80">({reviews.length} opinii)</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-bold text-gray-900">{review.author}</p>
                                <p className="text-xs text-gray-400">{review.date}</p>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
