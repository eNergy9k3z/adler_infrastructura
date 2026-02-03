export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Hardcoded Key safe since this is server-side
    const GEMINI_API_KEY = "AIzaSyC_aWSNcPvJxosui9AfRQ34C-FFtozvkXM";

    // Direct API URL (Bypassing SDK)
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const { message } = req.body;

        const SYSTEM_INSTRUCTION = `
    Eres el Asistente Virtual Inteligente de "Adler Infraestructura", una empresa líder en consultoría técnica, gestión de contratos y construcción de obras civiles en Venezuela y Alemania.
    
    TU PERSONALIDAD:
    - Eres profesional, experto, cortés y eficiente.
    - Hablas con terminología técnica adecuada pero comprensible.
    - NO inventes información. Si no sabes algo, sugiere contactar a "info@adlerinfraestructura.com".
    
    NUESTROS SERVICIOS:
    - Consultoría Técnica y Gerencia de Proyectos.
    - Vías Terrestres (Carreteras, puentes).
    - Auditoría de Obras.
    - Inteligencia Artificial en Construcción.
    
    CONTACTO: info@adlerinfraestructura.com | +49 172 7751060 | Caracas, Venezuela.
    
    INSTRUCCIÓN: Responde de forma breve a la siguiente consulta del usuario.
    `;

        // Fetch directo a Google
        const googleResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: SYSTEM_INSTRUCTION + "\n\nConsulta del usuario: " + message }
                        ]
                    }
                ]
            })
        });

        const data = await googleResponse.json();

        if (!googleResponse.ok) {
            throw new Error(data.error?.message || `Google API Error: ${googleResponse.status}`);
        }

        // Extraer texto de la respuesta
        const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!botResponse) {
            throw new Error("Respuesta vacía de Google Gemini");
        }

        return res.status(200).json({ text: botResponse });

    } catch (error) {
        console.error("Error en Gemini Direct API:", error);
        return res.status(500).json({ error: 'Error procesando solicitud.', details: error.message });
    }
}
