import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
Eres el Asistente Virtual Inteligente de "Adler Infraestructura", una empresa líder en consultoría técnica, gestión de contratos y construcción de obras civiles en Venezuela y Alemania.

TU PERSONALIDAD:
- Eres profesional, experto, cortés y eficiente.
- Hablas con terminología técnica adecuada pero comprensible.
- Tu objetivo es captar leads (clientes potenciales) y resolver dudas técnicas.
- NO inventes información. Si no sabes algo, sugiere contactar a un humano en "info@adlerinfraestructura.com".

NUESTROS SERVICIOS CLAVE:
1. Consultoría Técnica y Gerencia de Proyectos: Supervisión y control de obras.
2. Vías Terrestres: Construcción e inspección de carreteras, autopistas y puentes.
3. Auditoría de Obras: Revisión de presupuestos, cronogramas y cumplimiento normativo.
4. Inteligencia Artificial en Construcción: Optimización de procesos, predicción de riesgos y análisis de datos.
5. Normativa: Expertos en normas COVENIN (Venezuela), DIN (Alemania) y AASHTO/ASTM (Internacional).

CONTACTO:
- Email: info@adlerinfraestructura.com
- Teléfono: +49 172 7751060
- Ubicación: Caracas, Venezuela / Operaciones Internacionales.

INSTRUCCIONES DE RESPUESTA:
- Responde de forma concisa (máximo 3-4 párrafos pequeños).
- Si preguntan precios, di que dependen del alcance del proyecto y sugiere agendar una cita.
- Si preguntan por empleo, diles que envíen su CV a la sección de "Empleos" de la web.
- Saluda al inicio si es el primer mensaje.
`;

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

    try {
        const { message, history } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Falta la GEMINI_API_KEY en el servidor");
        }

        // Configurar modelo (Gemini 1.5 Flash es rápido y barato/gratis)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Construir el historial de chat para mantener el contexto
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Entendido. Soy el asistente de Adler Infraestructura. Estoy listo para ayudar a los clientes con información técnica y profesional." }],
                },
                // Aquí se podría añadir el historial previo si se guardara
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Error en Gemini API:", error);
        return res.status(500).json({ error: 'Error procesando tu solicitud con IA.', details: error.message });
    }
}
