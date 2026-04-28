import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  mobileId: string;
  initialRating?: number;
  readOnly?: boolean;
}

export function StarRating({ mobileId, initialRating = 0, readOnly = false }: StarRatingProps) {
  const [userRating, setUserRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRatings();
  }, [mobileId]);

  const fetchRatings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/ratings/${mobileId}`);
      if (res.ok) {
        const data = await res.json();
        setAvgRating(data.averageRating);
        setTotalRatings(data.totalRatings);
        if (data.userRating) setUserRating(data.userRating);
      }
    } catch (err) {
      console.error("Error fetching ratings:", err);
    }
  };

  const handleRate = async (value: number) => {
    if (readOnly || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_id: mobileId, rating: value })
      });

      if (res.ok) {
        setUserRating(value);
        fetchRatings();
      } else if (res.status === 401) {
        window.dispatchEvent(new CustomEvent('TRIGGER_LOGIN'));
      }
    } catch (err) {
      console.error("Error rating:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStarFill = (starIndex: number) => {
    if (hover > 0) return hover >= starIndex ? 100 : 0;
    if (userRating > 0 && !hover) return userRating >= starIndex ? 100 : 0;
    
    // Default: Show average
    const diff = avgRating - (starIndex - 1);
    if (diff >= 1) return 100;
    if (diff <= 0) return 0;
    return diff * 100;
  };

  const getStarColor = (val: number) => {
    if (val >= 4) return "text-[#ffc107]";
    if (val >= 3) return "text-[#ff9800]";
    return "text-[#ff5252]";
  };

  const activeColor = getStarColor(hover || userRating || avgRating);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercent = getStarFill(star);
          return (
            <button
              key={star}
              type="button"
              className={cn(
                "relative transition-all duration-150 transform hover:scale-110 p-0.5",
                (readOnly || isSubmitting) ? "cursor-default" : "cursor-pointer"
              )}
              onMouseEnter={() => !readOnly && setHover(star)}
              onMouseLeave={() => !readOnly && setHover(0)}
              onClick={() => handleRate(star)}
              disabled={readOnly || isSubmitting}
            >
              <Star className="h-5 w-5 text-gray-200 fill-gray-200" />
              <div 
                className="absolute inset-0 p-0.5 overflow-hidden pointer-events-none"
                style={{ width: `${fillPercent}%` }}
              >
                <Star className={cn("h-5 w-5 fill-current", activeColor)} />
              </div>
            </button>
          );
        })}
        <span className={cn("ml-2 text-base font-black", activeColor)}>
          {avgRating > 0 ? avgRating.toFixed(1) : '0.0'}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tight">
          {totalRatings} {totalRatings === 1 ? 'Rating' : 'Ratings'}
        </p>
        {userRating > 0 && (
          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0 rounded font-bold uppercase">Your Rating: {userRating}</span>
        )}
      </div>
    </div>
  );
}
