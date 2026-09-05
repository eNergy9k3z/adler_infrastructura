# Adler Infrastructura

Sitio de consultoría en infraestructura, gestión contractual, materiales e inteligencia artificial aplicada a empresas en Venezuela.

## Desarrollo

Requiere Node.js compatible con Vite 7 y npm.

```sh
npm ci
npm run dev
```

## Comprobación y publicación

```sh
npm run build
npm run lint
```

La integración existente de GitHub con Vercel publica los cambios de la rama principal. Se conserva `vercel.json` para las rutas de la aplicación y las funciones de API.

## Servicios e integraciones

- Los servicios y sus fichas imprimibles comparten la información de `src/data/services.js`.
- El formulario de contacto conserva la integración con Supabase.
- La página de clientes permite coordinar documentación por contacto directo. El antiguo inicio de sesión era una simulación; no se ofrece autenticación hasta implementar un portal real.
- El asistente informativo usa respuestas locales sobre los servicios. No se presenta como un análisis técnico o jurídico de un caso.
- La función `api/chat.js` es independiente de ese asistente y requiere su configuración de servidor.

## Contenido

El nombre de marca es Adler Infrastructura. Las imágenes de infraestructura se presentan como ilustrativas. Las cifras comerciales, testimonios y acreditaciones solo deben incorporarse con respaldo documental.

La actualización de septiembre de 2026 renueva la portada, navegación, servicios, fichas y páginas de presentación; incluye IA aplicada a empresas y conserva las rutas del proyecto, corrige las solicitudes de auditoría y sustituye la simulación del portal por información de contacto.
