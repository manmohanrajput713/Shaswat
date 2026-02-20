import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { eventId, passId } = body;

        // Optional: Save registration to Supabase if you have a 'registrations' table
        // const { data, error } = await supabase.from('registrations').insert([
        //   { event_id: eventId, pass_id: passId, status: 'pending_payment' }
        // ]);
        // if (error) throw error;

        return NextResponse.json({ success: true, message: 'Registration initiated successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process registration' }, { status: 500 });
    }
}
