import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  mobileId: string;
  initialRating?: number;
  readOnly?: boolean;
}

export function StarRating({ mobileId, initialRating = 0, readOnly = false }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRatings();
  }, [mobileId]);

  const fetchRatings = async () => {
    try {
      const res = await fetch(`/api/ratings/${mobileId}`);
      if (res.ok) {
        const data = await res.json();
        setAvgRating(data.averageRating);
        setTotalRatings(data.totalRatings);
        if (data.userRating) setRating(data.userRating);
      }
    } catch (err) {
      console.error("Error fetching ratings:", err);
    }
  };

  const handleRate = async (value: number) => {
    if (readOnly || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_id: mobileId, rating: value })
      });

      if (res.ok) {
        setRating(value);
        fetchRatings();
      } else if (res.status === 401) {
        // Trigger login flow
        window.dispatchEvent(new CustomEvent('TRIGGER_LOGIN'));
      }
    } catch (err) {
      console.error("Error rating:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={cn(
              "transition-all duration-150 transform hover:scale-110",
              (readOnly || isSubmitting) ? "cursor-default" : "cursor-pointer"
            )}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            onClick={() => handleRate(star)}
            disabled={readOnly || isSubmitting}
          >
            <Star
              className={cn(
                "h-6 w-6",
                (hover || rating) >= star 
                  ? "fill-[#ffc107] text-[#ffc107]" 
                  : "text-gray-300"
              )}
            />
          </button>
        ))}
        <span className="ml-2 text-sm font-bold text-[#1a3a5a]">
          {avgRating > 0 ? avgRating.toFixed(1) : 'No rating'}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tight">
        {totalRatings} {totalRatings === 1 ? 'Rating' : 'Ratings'}
      </p>
    </div>
  );
}
