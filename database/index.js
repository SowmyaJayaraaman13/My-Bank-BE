const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://koxyqiynnkfzyfitprty.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtveHlxaXlubmtmenlmaXRwcnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3ODMzODUsImV4cCI6MjA0MTM1OTM4NX0.X2DXTkdJW1A0_NVyKNlrcEtSOdR2K4IJAKgmSD2JLeY';
const dbConnection = createClient(supabaseUrl, supabaseKey)

module.exports = { 
    dbConnection
};