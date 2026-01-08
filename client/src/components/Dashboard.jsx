import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronRight, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reviews:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-stone-500">Loading reflections...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl text-stone-800">Your Reflections</h2>
        <Link 
          to="/new" 
          className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-md hover:bg-stone-700 transition-colors"
        >
          <Plus size={18} />
          New Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center">
          <p className="text-stone-500 mb-6 italic">“Waste no more time arguing what a good person should be. Be one.”</p>
          <p className="text-stone-400">You haven't started any reflections yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map(review => (
            <Link 
              key={review.id} 
              to={`/review/${review.id}`}
              className="group bg-white border border-stone-200 p-6 rounded-lg flex justify-between items-center hover:border-stone-400 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="bg-stone-100 p-3 rounded-full text-stone-500 group-hover:bg-stone-800 group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-stone-800">
                    {new Date(review.date).toLocaleDateString(undefined, { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <p className="text-sm text-stone-500">Weekly Stoic Review</p>
                </div>
              </div>
              <ChevronRight className="text-stone-300 group-hover:text-stone-800 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
