
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Farm {
  id: string;
  name: string;
  location: string | null;
  type: string | null;
  created_at: string;
}

export const useFarms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setFarms(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching farms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return {
    farms,
    loading,
    error,
    refetch: fetchFarms
  };
};
