# Lab 12 - Consumo de API con React y Axios

## 1. API Django (laboratorio 8) y CORS
- API levantada desde `backend/` (proyecto del laboratorio 8) con `python manage.py migrate` y `python manage.py runserver 8000`.
- Se instaló y declaró `django-cors-headers` en `backend/requirements.txt` e `INSTALLED_APPS` (`corsheaders`).
- Se añadió `corsheaders.middleware.CorsMiddleware` justo después de `django.middleware.security.SecurityMiddleware` en `MIDDLEWARE`.
- Se autorizó el origen del proyecto React (Vite): `http://localhost:5173` y `http://127.0.0.1:5173` en `CORS_ALLOWED_ORIGINS`.
- Para el consumo desde el frontend del laboratorio se configuró `DEFAULT_PERMISSION_CLASSES` con `AllowAny`.

## 2. Comprobación de la API y recursos
- Dirección base (respuesta en navegador): **http://127.0.0.1:8000/api/**
- Recursos que se consumen:
  - Exámenes (usado en el frontend): **http://127.0.0.1:8000/api/examenes/**
  - Preguntas: **http://127.0.0.1:8000/api/preguntas/**
  - Opciones: **http://127.0.0.1:8000/api/opciones/**

Ejemplo de respuesta de `/api/`:
```json
{"examenes":"http://127.0.0.1:8000/api/examenes/","preguntas":"http://127.0.0.1:8000/api/preguntas/","opciones":"http://127.0.0.1:8000/api/opciones/"}
```

## 3-8. Frontend React (copiado desde laboratorio 11) con Axios
- Proyecto React/Vite en `frontend/`.
- Dependencias instaladas: `axios` y `react-router-dom` (`npm install axios react-router-dom`).
- **Módulo cliente API** (dirección base en un solo sitio, sin URLs en componentes):
  - `frontend/src/api/client.js`: instancia Axios con `baseURL = http://localhost:8000/api`.
  - `frontend/src/api/examenes.js`: funciones `listarExamenes()`, `crearExamen(examen)`, `eliminarExamen(id)`.
- **Página de listado** (`frontend/src/pages/ExamenesList.jsx`): estados `examenes`, `cargando`, `error`; petición GET lanzada en `useEffect` al montar; renderiza los tres estados; botón eliminar llama a `eliminarExamen(id)` y refresca la lista.
- **Página de alta** (`frontend/src/pages/ExamenForm.jsx`): entradas controladas, `onSubmit` con `preventDefault`, `POST` con el cuerpo y navegación al listado (`navigate('/')`) al terminar; muestra el mensaje de validación devuelto por la API.

## 12. Tabla de la pantalla (listado de exámenes)

| Aspecto | Detalle |
|---|---|
| **Petición al entrar** | `GET http://localhost:8000/api/examenes/` disparada en `useEffect` al montar el componente `ExamenesList`. |
| **Estado: carga** | `cargando === true`: se muestra el texto "Cargando exámenes..." y un esqueleto de carga (filas animadas) con `role="status"`. |
| **Estado: datos (éxito)** | `!cargando && !error`: se muestra la tabla con columnas ID, Título, Descripción, Activo, Preguntas y Acciones (botón Eliminar). Si no hay registros se indica "No hay exámenes registrados." |
| **Estado: error** | `!cargando && error`: se muestra un mensaje de error con `role="alert"` y el botón **Reintentar** que vuelve a ejecutar la carga. |

## 9. Error de CORS provocado y documentado
- **Provocación:** se quitó el origen autorizado dejando `CORS_ALLOWED_ORIGINS = []` en `backend/config/settings.py` y se recargó el frontend.
- **Mensaje en consola del navegador (leído/documentado):**
  - `Access to XMLHttpRequest at 'http://localhost:8000/api/examenes/' from origin 'http://127.0.0.1:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
  - `Failed to load resource: net::ERR_FAILED`
- **Efecto en UI:** estado de error "No se pudo conectar con el servidor. Verifica que la API esté en ejecución." con botón Reintentar.
- **Restauración:** se volvió a habilitar `CORS_ALLOWED_ORIGINS` con `http://localhost:5173` y `http://127.0.0.1:5173`.
- Evidencia: `entregable/evidence/cors-error.txt`.

## 10. Error de validación provocado y mostrado en la interfaz
- **Provocación:** en el formulario de alta se envió el campo obligatorio `titulo` vacío.
- **Petición:** `POST http://localhost:8000/api/examenes/` con cuerpo `{"titulo":"","descripcion":"","activo":true}`.
- **Respuesta de la API:** `400 Bad Request` con `{"titulo":["This field may not be blank."]}`.
- **Interfaz:** el formulario muestra el mensaje devuelto por la API: **"Error de la API: titulo: This field may not be blank."**
- Evidencia: `entregable/evidence/validacion-error.txt`.

## 11. Servidor Django apagado con la aplicación React abierta
- **Provocación:** se detuvo `python manage.py runserver` y se recargó el listado en el frontend.
- **Resultado:** la pantalla muestra el estado de error "No se pudo conectar con el servidor. Verifica que la API esté en ejecución." con botón **Reintentar** (no aparece pantalla en blanco).
- Evidencia: `entregable/evidence/servidor-apagado.txt`.

## Evidencias
- `entregable/evidence/cors-error.txt` — mensaje de consola y descripción del error de CORS.
- `entregable/evidence/validacion-error.txt` — petición/respuesta y mensaje mostrado por validación.
- `entregable/evidence/servidor-apagado.txt` — comprobación del estado de error sin servidor.

## Ejecución
**Backend:**
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```
Abrir `http://127.0.0.1:5173/`.
