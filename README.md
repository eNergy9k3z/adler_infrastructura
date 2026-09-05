# Adler Infrastructura

Consultoría en infraestructura, gestión contractual, materiales e inteligencia artificial aplicada a empresas en Venezuela. React, Vite, Vercel y Supabase.

## Desarrollo y comprobación

```sh
npm ci
npm run dev
npm run lint
npm run build
```

La integración de GitHub con Vercel publica `main`. `vercel.json` conserva las rutas de React y las funciones de API.

## Consultas y acceso privado

- El formulario público guarda `name`, `email`, `phone`, `company` y `message` en `contacts`. El interés por un servicio se incorpora al mensaje original.
- `/login` solicita un enlace de Supabase Auth para una cuenta ya existente; no crea usuarios. `/dashboard` muestra la bandeja de consultas al administrador.
- La autorización se comprueba en PostgreSQL mediante `adler_admins`, permisos por columna y RLS. Una sesión de Supabase por sí sola no concede acceso a las consultas.
- El administrador puede buscar, filtrar, paginar y modificar exclusivamente estado y notas internas. Cada guardado comprueba `revision` para detectar cambios concurrentes.
- No se borran consultas desde la interfaz. Las notas no se envían por correo al contacto.
- La migración `supabase/migrations/20260905_private_inbox.sql` se aplica una vez. Conserva las consultas existentes, reemplaza las políticas anteriores y no crea administradores automáticamente.

### Configuración de Supabase

Mantener el registro público y el acceso anónimo de Auth desactivados. Crear/invitar al propietario desde la administración de Supabase y añadir exclusivamente su UUID verificado a `adler_admins`. No usar metadata editable por el usuario para conceder acceso.

Site URL: `https://adler-infrastructura.vercel.app`. Redirect URL permitida: `https://adler-infrastructura.vercel.app/login`. Para otros entornos, añadir únicamente las direcciones necesarias.

Las credenciales incluidas en el cliente son públicas (anon); la privacidad depende de RLS. Es posible sustituirlas mediante `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. Nunca añadir una clave `service_role` o una clave de IA a una variable `VITE_*`.

El correo de Auth necesita configuración y límites adecuados al uso previsto. El servicio de correo predeterminado de Supabase está limitado; configurar SMTP propio antes de ampliar accesos. El formulario de consultas no genera notificaciones por correo ni incluye todavía un control externo contra spam.

## Asistente y contenido

El asistente informativo responde localmente sobre los servicios. El endpoint heredado `/api/chat` está desactivado (HTTP 410); se retiró su clave incrustada y la dependencia de Gemini. Retirar una clave del código actual no la revoca ni la elimina del historial: debe revocarse en el proveedor.

Los servicios y fichas comparten `src/data/services.js`. Las imágenes son ilustrativas. Incorporar casos, cifras o acreditaciones únicamente con respaldo documental.

## Referencias

[Permisos RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Acceso por correo](https://supabase.com/docs/guides/auth/auth-email-passwordless) · [Configuración de correo](https://supabase.com/docs/guides/auth/auth-smtp)
