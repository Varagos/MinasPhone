'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      setError('Παρακαλώ εισάγετε έναν αριθμό παραγγελίας');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Here you could validate if the order exists before redirecting
      // For now, we'll just redirect to the order page
      router.push(`/orders/${orderNumber}`);
    } catch (err) {
      setError('Δεν βρέθηκε παραγγελία με αυτόν τον αριθμό');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 my-42 sm:px-6 lg:px-8 py-16">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-medium text-primary-dark mb-3">
            Παρακολούθηση Παραγγελίας
          </h1>
          <p className="text-base text-gray-600">
            Εισάγετε τον αριθμό παραγγελίας που λάβατε στο email σας
          </p>
        </div>

        <div className="bg-secondary-light p-8 rounded-lg shadow-md border border-secondary-dark">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="orderNumber"
                className="block text-base font-medium text-primary-dark mb-2"
              >
                Αριθμός Παραγγελίας
              </label>
              <input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className={`w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  error ? 'border-error' : 'border-secondary-dark'
                }`}
                placeholder="π.χ. ORD-12345"
              />
              {error && <p className="mt-2 text-sm text-error">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-primary-contrast py-3 px-6 text-base font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 shadow-sm"
            >
              {isLoading ? 'Αναζήτηση...' : 'Αναζήτηση Παραγγελίας'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
