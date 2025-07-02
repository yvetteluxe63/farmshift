
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Shift {
  id: string;
  worker_id: string;
  farm_id: string | null;
  shift_date: string;
  shift_type: 'Morning' | 'Evening' | 'Night' | 'Off';
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  status: 'scheduled' | 'completed' | 'cancelled';
  worker: {
    name: string;
    email: string;
  };
  farm: {
    name: string;
    location: string;
  } | null;
}

export const useShifts = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('shifts')
        .select(`
          *,
          worker:workers(name, email),
          farm:farms(name, location)
        `)
        .order('shift_date', { ascending: true });

      if (error) throw error;
      
      // Type assertion to ensure proper typing
      const typedData = (data || []).map(shift => ({
        ...shift,
        shift_type: shift.shift_type as 'Morning' | 'Evening' | 'Night' | 'Off',
        status: shift.status as 'scheduled' | 'completed' | 'cancelled'
      }));
      
      setShifts(typedData as Shift[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching shifts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createShift = async (shiftData: Omit<Shift, 'id' | 'worker' | 'farm'>) => {
    try {
      const { data, error } = await supabase
        .from('shifts')
        .insert([shiftData])
        .select(`
          *,
          worker:workers(name, email),
          farm:farms(name, location)
        `)
        .single();

      if (error) throw error;
      
      const typedData = {
        ...data,
        shift_type: data.shift_type as 'Morning' | 'Evening' | 'Night' | 'Off',
        status: data.status as 'scheduled' | 'completed' | 'cancelled'
      };
      
      setShifts(prev => [...prev, typedData as Shift]);
      return { data: typedData, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create shift';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const updateShift = async (id: string, updates: Partial<Omit<Shift, 'id' | 'worker' | 'farm'>>) => {
    try {
      const { data, error } = await supabase
        .from('shifts')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          worker:workers(name, email),
          farm:farms(name, location)
        `)
        .single();

      if (error) throw error;
      
      const typedData = {
        ...data,
        shift_type: data.shift_type as 'Morning' | 'Evening' | 'Night' | 'Off',
        status: data.status as 'scheduled' | 'completed' | 'cancelled'
      };
      
      setShifts(prev => prev.map(shift => shift.id === id ? typedData as Shift : shift));
      return { data: typedData, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update shift';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  const deleteShift = async (id: string) => {
    try {
      const { error } = await supabase
        .from('shifts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setShifts(prev => prev.filter(shift => shift.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete shift';
      setError(errorMessage);
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return {
    shifts,
    loading,
    error,
    refetch: fetchShifts,
    createShift,
    updateShift,
    deleteShift
  };
};
