import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xfpxwvdptdwactwerfln.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmcHh3dmRwdGR3YWN0d2VyZmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzg3MTksImV4cCI6MjA2NDcxNDcxOX0.KRcHQlIZscNQKFpK2nJGty2ie-scRbopDhlv7dMeibw'
export const supabase = createClient(supabaseUrl, supabaseKey);