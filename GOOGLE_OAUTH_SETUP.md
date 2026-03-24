# Google OAuth 2.0 Setup Guide for DexAura

This guide explains how to set up Google OAuth 2.0 authentication for the DexAura application.

## Overview

The application supports Google Sign-In for both login and registration. Users can:
- Sign in with their Google account on the Login page
- Sign up with their Google account on the Register tab
- Use Google Sign-In on the Instant Quote page

## Prerequisites

- A Google Cloud Console account
- Access to the Google Cloud Console: https://console.cloud.google.com

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter "DexAura" as the project name
5. Click "Create"

### 2. Enable Google+ API

1. In the Google Cloud Console, search for "Google+ API" in the search bar
2. Click on "Google+ API" in the results
3. Click "Enable"

### 3. Create OAuth 2.0 Credentials

1. In the left sidebar, go to "Credentials"
2. Click "Create Credentials" button
3. Select "OAuth client ID"
4. If prompted, configure the OAuth consent screen first:
   - Select "External" for user type
   - Fill in the required fields:
     - App name: "DexAura"
     - User support email: your-email@example.com
     - Developer contact information: your-email@example.com
   - On the "Scopes" page, add these scopes:
     - `email`
     - `profile`
     - `openid`
   - Save and continue

### 4. Create OAuth 2.0 Client ID

1. After consent screen setup, go back to "Create Credentials"
2. Select "OAuth client ID"
3. Choose "Web application" as the application type
4. Under "Authorized redirect URIs", add:
   - `http://localhost:3000` (for local development)
   - `http://127.0.0.1:3000` (alternative localhost)
   - Your production domain (e.g., `https://dexaura.com`)

5. Click "Create"
6. Copy the **Client ID** (you'll need this)

### 5. Configure the Frontend

1. Open `frontend/.env`
2. Add/Update the following line:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
   ```
   Replace `YOUR_CLIENT_ID_HERE` with the Client ID you copied

3. Save the file

### 6. Configure the Backend (Google Authentication Endpoint)

The backend `/auth/google` endpoint expects:
```json
{
  "google_id": "string",
  "email": "string",
  "name": "string",
  "picture": "string (optional)"
}
```

The backend will:
1. Check if a user with this `google_id` exists
2. If yes, authenticate them
3. If no, create a new user account with the Google data
4. Return access token and customer data

### 7. Test the Setup

1. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

2. Go to http://localhost:3000
3. Click on the Login tab
4. Scroll down to find the "Google" button
5. Click it to test Google Sign-In

### 8. Testing Google Sign-In

#### Test Case 1: New User Registration
1. Click "Register" tab
2. Click "Google" button
3. Sign in with a Google account that hasn't been registered
4. Verify that a new account is created
5. Verify you're redirected to `/teamspace`

#### Test Case 2: Existing User Login
1. Click "Login" tab
2. Click "Google" button
3. Sign in with the same Google account
4. Verify you're logged in as the existing user

#### Test Case 3: Error Handling
1. If Google Sign-In fails or client ID is invalid
2. You should see an error toast notification
3. The page should remain on the login screen

## Troubleshooting

### "Google Sign-In library not loaded"
- Ensure the Google Sign-In script is loading from `https://accounts.google.com/gsi/client`
- Check your browser's network tab for script loading errors
- Make sure there are no CSP (Content Security Policy) violations

### "Invalid Client ID"
- Verify the Client ID in `frontend/.env` is correct
- Make sure you copied the entire Client ID without extra spaces
- Restart the development server after updating `.env`

### "Unauthorized redirect URI"
- Check that your current domain is in the "Authorized redirect URIs" list
- For local development, make sure `http://localhost:3000` is listed
- Restart the Google Cloud console after making changes

### CORS Issues
- Google Sign-In handles CORS differently than traditional OAuth
- If you see CORS errors, make sure your backend allows requests from the frontend origin
- The backend doesn't actually call Google; it only validates the JWT token from the frontend

### User Not Created After Google Sign-In
- Check the backend logs for errors
- Verify the backend `/auth/google` endpoint is working
- Test it with curl:
  ```bash
  curl -X POST http://127.0.0.1:8000/api/auth/google \
    -H "Content-Type: application/json" \
    -d '{
      "google_id": "test_id",
      "email": "test@example.com",
      "name": "Test User"
    }'
  ```

## Security Considerations

1. **Never commit the .env file**: The `frontend/.env` file contains your Client ID. Keep it in `.gitignore`

2. **Use HTTPS in production**: Always use HTTPS URLs in production OAuth configurations

3. **Client ID exposure**: The Client ID is safe to expose in the frontend as it's meant to be public

4. **Token validation**: The backend should validate the JWT token signature if needed (though Google's token is already verified by the frontend)

5. **Scopes**: Only request the minimum scopes needed (`email`, `profile`, `openid`)

## Environment Variables Summary

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### Backend (.env)
No additional environment variables needed for basic Google OAuth setup

## API Endpoint Reference

### POST /api/auth/google
Authenticates or creates a user with Google credentials.

**Request Body:**
```json
{
  "google_id": "string (required)",
  "email": "string (required)",
  "name": "string (required)",
  "picture": "string (optional)"
}
```

**Response:**
```json
{
  "customer": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "BUYER|ADMIN",
    "is_active": true,
    ...
  },
  "access_token": "string",
  "token_type": "bearer"
}
```

## Integration Points

### Login Page (pages/Login.jsx)
- Login tab with email/password
- Register tab with email/password
- Google Sign-In button on both tabs

### Instant Quote Page (pages/InstantQuotePage.js)
- Google Sign-In integration for authenticated quote generation

### Auth Context (context/AuthContext.jsx)
- `googleLogin()` function handles Google authentication
- Automatically creates or retrieves user account
- Sets token and user state on success

## Additional Resources

- [Google Sign-In for Web Documentation](https://developers.google.com/identity/gsi/web)
- [Google Cloud Console](https://console.cloud.google.com)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)

---

**Last Updated:** January 27, 2026
