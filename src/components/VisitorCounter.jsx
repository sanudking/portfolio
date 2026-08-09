import React, { useEffect, useState } from 'react';
import { Counter } from 'counterapi';

const counter = new Counter({ workspace: 'my-portfolio-workspace' });

const VisitorCounter = () => {
  const [views, setViews] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function trackVisit() {
      try {
        const result = await counter.up('portfolio-page-views');
        console.log('CounterAPI Response:', result);

        const countValue = result.value ?? result.data?.value ?? result.data?.up_count ?? result.data?.count ?? result.count;
        setViews(countValue);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setError('Unavailable');
      } finally {
        setLoading(false);
      }
    }

    trackVisit();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading visits...</p>
      ) : (
        <p>👀 Total Portfolio Visits: <strong>{views ?? error ?? 'N/A'}</strong></p>
      )}
    </div>
  );
};

export default VisitorCounter;