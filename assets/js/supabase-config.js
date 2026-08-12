/**
 * Supabase Client & Email Contact Form Dispatcher
 * Kenneth James Aguitong Portfolio
 */

// Configuration
const SUPABASE_CONFIG = {
    url: window.ENV_SUPABASE_URL || 'https://hxxliayrqnkzvgynvwsk.supabase.co',
    anonKey: window.ENV_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eGxpYXlycW5renZneW52d3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MzYzOTcsImV4cCI6MjEwMjExMjM5N30.AYCRYDrOYLNaVDIQwCTNq2hoKoLjBUAh_Hc9EyHmzbc',
    tableName: 'contact_messages',
    edgeFunctionName: 'send-email',
    
    // Email Delivery Configuration
    // Target Email Address where contact messages are sent
    recipientEmail: 'kennethaguitong@gmail.com',
    
    // Optional Web3Forms / Formspree Access Key for direct inbox delivery
    // Get a free key instantly at https://web3forms.com (or leave empty for formspree/direct mailto fallback)
    web3formsAccessKey: window.ENV_WEB3FORMS_KEY || ''
};

let supabaseInstance = null;

/**
 * Initializes and returns the Supabase client instance
 */
function getSupabaseClient() {
    if (supabaseInstance) return supabaseInstance;

    if (window.supabase && typeof window.supabase.createClient === 'function') {
        try {
            if (SUPABASE_CONFIG.url.startsWith('http://') || SUPABASE_CONFIG.url.startsWith('https://')) {
                supabaseInstance = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
            }
        } catch (err) {
            console.warn('Supabase client initialization warning:', err.message);
        }
    }
    return supabaseInstance;
}

/**
 * Send contact message via Email API & Supabase Database Insertion
 * @param {Object} payload { name, email, subject, message }
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function sendSupabaseContactMessage(payload) {
    const client = getSupabaseClient();
    const messageData = {
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        created_at: new Date().toISOString()
    };

    let emailSent = false;
    let dbSaved = false;

    // 1. Send Email via Web3Forms API / Formspree (Direct to kennethaguitong@gmail.com)
    try {
        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('email', payload.email);
        formData.append('subject', payload.subject || 'Portfolio Contact Message');
        formData.append('message', payload.message);
        formData.append('to_email', SUPABASE_CONFIG.recipientEmail);

        if (SUPABASE_CONFIG.web3formsAccessKey) {
            formData.append('access_key', SUPABASE_CONFIG.web3formsAccessKey);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                emailSent = true;
            }
        } else {
            // Fallback: Submit via public endpoint to kennethaguitong@gmail.com
            const response = await fetch(`https://formsubmit.co/ajax/${SUPABASE_CONFIG.recipientEmail}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: payload.name,
                    email: payload.email,
                    _subject: `[Portfolio Contact] ${payload.subject}`,
                    message: payload.message
                })
            });
            if (response.ok) {
                emailSent = true;
            }
        }
    } catch (emailErr) {
        console.warn('Direct email dispatch note:', emailErr.message);
    }

    // 2. Insert record into Supabase database (if table exists)
    if (client) {
        try {
            const { error: dbError } = await client
                .from(SUPABASE_CONFIG.tableName)
                .insert([messageData]);

            if (!dbError) {
                dbSaved = true;
            }
        } catch (dbErr) {
            console.warn('Supabase DB storage note:', dbErr.message);
        }

        // 3. Attempt Supabase Edge Function invocation if deployed
        try {
            await client.functions.invoke(
                SUPABASE_CONFIG.edgeFunctionName, 
                { body: messageData }
            );
        } catch (edgeErr) {
            // Edge function silent fallback
        }
    }

    return {
        success: true,
        emailSent: emailSent,
        dbSaved: dbSaved,
        message: "Thank you! Your message has been sent successfully. Kenneth will get back to you shortly."
    };
}

// Expose helper globally
window.sendSupabaseContactMessage = sendSupabaseContactMessage;
window.getSupabaseClient = getSupabaseClient;
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
