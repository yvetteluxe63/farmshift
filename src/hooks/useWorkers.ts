
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Worker {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export const useWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setWorkers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching workers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return {
    workers,
    loading,
    error,
    refetch: fetchWorkers
  };
};
