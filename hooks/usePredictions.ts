
import { useState, useEffect, useMemo } from 'react';
import { Prediction, Category } from '../types/index';
import { predictionService } from '../services/predictionService';
import { useAppContext } from '../context/AppContext';

export const usePredictions = (initialFilter: Category | 'All' = 'All') => {
  const { predictions, setPredictions } = useAppContext();
  const [filter, setFilter] = useState<Category | 'All'>(initialFilter);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await predictionService.getPredictions();
        setPredictions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to synchronize with prediction nodes');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [setPredictions]);

  const filteredPredictions = useMemo(() => {
    return filter === 'All' 
      ? predictions 
      : predictions.filter(p => p.category === filter);
  }, [predictions, filter]);

  return {
    predictions: filteredPredictions,
    filter,
    setFilter,
    loading,
    error
  };
};
