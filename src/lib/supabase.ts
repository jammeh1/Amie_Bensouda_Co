import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://xsxlsynodcuklnuojgom.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjcwMWM2ZjFiLWNiMTYtNDA5OC05YTA0LTM5YjVkYzdkZmI4NiJ9.eyJwcm9qZWN0SWQiOiJ4c3hsc3lub2RjdWtsbnVvamdvbSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc4MzM1MzUxLCJleHAiOjIwOTM2OTUzNTEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.9ur57M2BDd1nfahA-0h_W6-D-OM8sBG7nktUMx2dA9s';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };