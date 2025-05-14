# Video Upload Application

A modern web application for uploading videos to AWS S3, built with React and Node.js.

## Features

- Video file upload with drag-and-drop support
- Real-time upload progress indication
- AWS S3 integration for secure video storage
- Modern, responsive UI using Material-UI
- Error handling and success notifications

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- AWS Account with S3 bucket
- AWS Access Key ID and Secret Access Key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd uploadapp
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
```
PORT=3001
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name
```

## Running the Application

1. Start the backend server (from the root directory):
```bash
npm run dev
```

2. Start the frontend development server (from the client directory):
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

- `POST /api/upload`: Upload a video file
  - Accepts multipart/form-data
  - Field name: 'video'
  - Returns: JSON with upload status and file URL

- `GET /api/health`: Health check endpoint
  - Returns: JSON with server status

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios
  - Emotion (for styling)

- Backend:
  - Node.js
  - Express
  - AWS SDK
  - Multer
  - Multer-S3

## Security Considerations

- The application uses environment variables for sensitive AWS credentials
- File uploads are restricted to video files only
- Maximum file size is limited to 100MB
- CORS is enabled for development purposes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 