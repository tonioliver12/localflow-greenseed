# LocalFlow — Plantilla maestra

Plantilla base para landing pages de negocios locales (jardinería, talleres,
electricistas, fontaneros, etc.), pensada para clonarse y adaptarse rápido a
cada cliente nuevo.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS, desplegado en Vercel.

- **Hero** a pantalla completa con imagen de fondo, degradado y titular con
  énfasis en cursiva (marca la palabra entre asteriscos en `hero.headline`)
- **Trust Bar** con palabra animada (fundido) + estadísticas, incluyendo el
  rating medio de Google
- **Servicios** en cards con overlay al hover
- **Portfolio** con slider antes/después por proyecto (`react-compare-slider`)
  que enlaza a una página de detalle propia (`/work/[slug]`) con galería y
  lightbox al hacer click
- **Testimonios** con reseñas reales traídas de la Google Places API
- **Contacto** con formulario que envía un email al negocio vía Resend, a
  través de una función serverless propia (sin servicios de terceros)
- Colores y tipografía configurables por cliente sin tocar componentes

## Primeros pasos

```bash
npm install
cp .env.example .env.local   # y rellena las claves (ver abajo)
npm run dev
```

Este proyecto se ha escrito a mano sin ejecutar `npm install` / `npm run
build` en el entorno donde se generó (sin acceso a red). Es muy probable que
funcione tal cual, pero al ejecutarlo por primera vez revisa la consola por
si hay que ajustar alguna versión de dependencia o algún tipo de TypeScript.

## Cómo adaptar la plantilla a un cliente nuevo (workflow con Claude Code)

Todo lo que cambia entre clientes vive en **`config/site.config.ts`**. El
flujo pensado es:

1. Duplica esta carpeta como punto de partida del proyecto del nuevo cliente.
2. Dale a Claude Code el contenido de `config/site.config.ts` junto con la
   información real del negocio (nombre, teléfono, email, servicios, textos,
   Place ID de Google) y pídele que actualice ese archivo — no debería tocar
   nada de `/components` salvo que el cliente pida algo que la plantilla no
   soporte todavía.
3. Sustituye las imágenes de `https://placehold.co/...` en el config por las
   fotos reales del negocio (puedes subirlas a `/public/images` y apuntar
   ahí, o usar URLs externas).
4. Consigue el **Place ID** de Google del negocio
   (https://developers.google.com/maps/documentation/places/web-service/place-id)
   y ponlo en `google.placeId`.
5. Elige el `theme.fontPreset` (`"elegante"`, `"moderno"` o `"clasico"` — ver
   `lib/fonts.ts`) y los dos colores (`primary`, `accent`) que mejor encajen
   con la marca del cliente.
6. Configura las variables de entorno en Vercel (ver siguiente sección) y
   despliega.

## Variables de entorno

Ver `.env.example`. Resumen:

| Variable | Para qué sirve | Dónde conseguirla |
|---|---|---|
| `GOOGLE_PLACES_API_KEY` | Traer reseñas y rating de Google | Google Cloud Console (activar "Places API") |
| `RESEND_API_KEY` | Enviar el email del formulario de contacto | resend.com (plan gratuito) |
| `CONTACT_FROM_EMAIL` | Dirección "from" verificada en Resend | Un dominio propio verificado en Resend |

Sin estas variables el sitio sigue funcionando (no rompe la build): la
sección de testimonios simplemente no se muestra y el formulario avisa de
que el envío no está configurado todavía. Esto permite maquetar y enseñar el
sitio a un cliente potencial antes de tener las claves reales.

## Añadir una nueva pareja de tipografías

`next/font/google` exige imports estáticos, así que las combinaciones de
fuente viven como "presets" cerrados en `lib/fonts.ts` en vez de strings
libres en el config. Para añadir una nueva pareja: importa las dos fuentes
en `lib/fonts.ts`, añade la entrada al objeto `fontPresets`, y añade el
nombre al type `FontPreset` en `config/site.config.ts`.

## Páginas de servicio adicionales (SEO)

Si un cliente necesita posicionar varios servicios por separado en Google
(ej. un taller que quiere rankear tanto para "cambio de aceite" como para
"reparación de frenos"), se pueden añadir páginas extra bajo `app/servicios/
[slug]/page.tsx` reutilizando los mismos componentes y colores del config.
La landing de una sola página sigue siendo la base por defecto.
