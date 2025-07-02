
-- Create farms table
CREATE TABLE public.farms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workers table
CREATE TABLE public.workers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shifts table
CREATE TABLE public.shifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
  farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
  shift_date DATE NOT NULL,
  shift_type TEXT NOT NULL CHECK (shift_type IN ('Morning', 'Evening', 'Night', 'Off')),
  start_time TIME,
  end_time TIME,
  notes TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can modify these later based on your auth requirements)
CREATE POLICY "Allow all operations on farms" ON public.farms FOR ALL USING (true);
CREATE POLICY "Allow all operations on workers" ON public.workers FOR ALL USING (true);
CREATE POLICY "Allow all operations on shifts" ON public.shifts FOR ALL USING (true);

-- Insert sample data
INSERT INTO public.farms (name, location, type) VALUES
('Dairy Farm A', 'North Sector', 'Dairy'),
('Livestock Farm B', 'West Pasture', 'Livestock'),
('Poultry Farm C', 'East Wing', 'Poultry');

INSERT INTO public.workers (name, email, phone) VALUES
('John Doe', 'john@example.com', '+1234567890'),
('Sarah Smith', 'sarah@example.com', '+1234567891'),
('Mike Johnson', 'mike@example.com', '+1234567892'),
('Emma Wilson', 'emma@example.com', '+1234567893'),
('Tom Brown', 'tom@example.com', '+1234567894');

-- Insert sample shifts for the next few days
INSERT INTO public.shifts (worker_id, farm_id, shift_date, shift_type, start_time, end_time, notes) VALUES
((SELECT id FROM public.workers WHERE name = 'John Doe'), (SELECT id FROM public.farms WHERE name = 'Dairy Farm A'), CURRENT_DATE, 'Morning', '05:00', '13:00', 'Regular milking routine, check cow #47'),
((SELECT id FROM public.workers WHERE name = 'Sarah Smith'), (SELECT id FROM public.farms WHERE name = 'Livestock Farm B'), CURRENT_DATE, 'Evening', '13:00', '21:00', 'Feed preparation and barn cleaning'),
((SELECT id FROM public.workers WHERE name = 'Mike Johnson'), (SELECT id FROM public.farms WHERE name = 'Dairy Farm A'), CURRENT_DATE, 'Night', '21:00', '05:00', 'Night watch and emergency care'),
((SELECT id FROM public.workers WHERE name = 'Emma Wilson'), (SELECT id FROM public.farms WHERE name = 'Dairy Farm A'), CURRENT_DATE + INTERVAL '1 day', 'Morning', '05:00', '13:00', 'Health checks and maintenance'),
((SELECT id FROM public.workers WHERE name = 'Tom Brown'), NULL, CURRENT_DATE + INTERVAL '1 day', 'Off', NULL, NULL, 'Scheduled rest day'),
((SELECT id FROM public.workers WHERE name = 'John Doe'), (SELECT id FROM public.farms WHERE name = 'Poultry Farm C'), CURRENT_DATE + INTERVAL '2 days', 'Morning', '06:00', '14:00', 'Egg collection and feeding'),
((SELECT id FROM public.workers WHERE name = 'Sarah Smith'), (SELECT id FROM public.farms WHERE name = 'Dairy Farm A'), CURRENT_DATE + INTERVAL '2 days', 'Evening', '14:00', '22:00', 'Evening milking session');
