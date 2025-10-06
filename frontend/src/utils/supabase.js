import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrbuqljzhobegxxwfsgo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYnVxbGp6aG9iZWd4eHdmc2dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTQ2NzIwNywiZXhwIjoyMDc1MDQzMjA3fQ.01sIdfczWc96VfzHdZScnPMdzApTsQI7GsKOgx1XP1c';

export const supabase = createClient(supabaseUrl, supabaseKey);