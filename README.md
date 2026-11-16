# Lab 12 - Desarrollo Empresarial

Proyecto de integración de una API Django (laboratorio 8) con un frontend React (laboratorio 11) usando Axios.

## Estructura
- `backend/`: API REST en Django + Django REST Framework (recurso principal: exámenes).
- `frontend/`: aplicación React + Vite que consume la API (listado, alta y eliminación).
- `entregable/`: entregable del laboratorio con tabla de estados y evidencias de errores provocados.

## Puesta en marcha
### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
API base: `http://127.0.0.1:8000/api/` (recursos: `examenes/`, `preguntas/`, `opciones/`).

### Frontend
```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```
Abrir `http://127.0.0.1:5173/`.

## Notas
- CORS configurado para los orígenes de desarrollo de Vite (`http://localhost:5173`, `http://127.0.0.1:5173`).
- El cliente Axios centraliza la URL base en `frontend/src/api/client.js` y las operaciones en `frontend/src/api/examenes.js`.
