import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acoarlacbeoqoaodnykf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjb2FybGFjYmVvcW9hb2RueWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MDA3OTYsImV4cCI6MjA3OTQ3Njc5Nn0.B8HY_CQsQHdBylF8tueyhNhFmMSJWbNel0LfDKBWMn8'.trim();

export const supabase = createClient(supabaseUrl, supabaseKey);