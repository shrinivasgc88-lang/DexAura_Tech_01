# Frontend-Backend Connection Setup

## ✅ Connection Status: CONFIGURED AND WORKING

## Configuration Summary

### Backend Configuration
- **Server URL**: `http://127.0.0.1:8000`
- **Database**: MongoDB Atlas (dexaura_technologies)
- **CORS**: Configured to allow all origins (`*`)
- **Status**: ✅ Running and responding

### Frontend Configuration
- **Backend URL**: `http://127.0.0.1:8000` (configured in `.env`)
- **API Base URL**: `http://127.0.0.1:8000/api`
- **Fallback**: Default URL added in code if env variable is missing
- **Status**: ✅ Configured

## Files Modified/Created

### Backend
1. ✅ `backend/.env` - Already exists with MongoDB connection
2. ✅ `backend/start_server.py` - New script to start server easily
3. ✅ `backend/test_frontend_backend_connection.py` - Connection test script
4. ✅ `backend/server.py` - Fixed duplicate app creation bug

### Frontend
1. ✅ `frontend/.env` - Created with `REACT_APP_BACKEND_URL=http://127.0.0.1:8000`
2. ✅ `frontend/src/utils/api.js` - Added fallback URL
3. ✅ `frontend/src/context/AuthContext.jsx` - Added fallback URL

## How to Start

### Start Backend Server
```bash
cd backend
python start_server.py
```

Or using uvicorn directly:
```bash
cd backend
uvicorn server:app --host 127.0.0.1 --port 8000 --reload
```

### Start Frontend
```bash
cd frontend
yarn start
```

The frontend will automatically connect to the backend at `http://127.0.0.1:8000`.

## Testing the Connection

Run the test script:
```bash
cd backend
python test_frontend_backend_connection.py
```

This will verify:
- ✅ Backend server is running
- ✅ API endpoints are accessible
- ✅ Database connection is working
- ✅ Frontend .env file is configured

## API Endpoints Available

The frontend can access these backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user

### Quotes
- `POST /api/quotes/instant` - Create instant quote
- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/{quote_id}` - Get specific quote

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `GET /api/orders/{order_id}` - Get specific order

### Blog
- `GET /api/blog/posts` - Get all blog posts
- `GET /api/blog/posts/{slug}` - Get specific blog post

### Contact
- `POST /api/contact` - Submit contact form

### Admin (requires admin role)
- Various admin endpoints for leads, projects, suppliers, etc.

## Troubleshooting

### Backend not starting
1. Check if port 8000 is already in use
2. Verify MongoDB connection in `backend/.env`
3. Ensure all dependencies are installed: `pip install -r requirements.txt`

### Frontend can't connect to backend
1. Verify backend is running on `http://127.0.0.1:8000`
2. Check `frontend/.env` file exists and has `REACT_APP_BACKEND_URL`
3. Restart frontend after changing `.env` file
4. Check browser console for CORS errors

### CORS Errors
- Backend CORS is configured to allow all origins
- If you see CORS errors, check that `CORS_ORIGINS` in backend `.env` includes your frontend URL

## Environment Variables

### Backend (.env)
```
MONGO_URL="mongodb+srv://..."
DB_NAME="dexaura_technologies"
CORS_ORIGINS="*"
JWT_SECRET="..."
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
```

## Notes

- The frontend code includes fallback URLs, so it will work even if `.env` is missing
- Backend must be running before frontend can make API calls
- Database connection is verified and working
- All test scripts pass successfully

