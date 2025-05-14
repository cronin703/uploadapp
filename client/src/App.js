import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Paper,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid video file');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('video', selectedFile);

    setUploading(true);
    setError(null);
    setUploadStatus(null);

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus({
        success: true,
        message: 'Video uploaded successfully!',
        url: response.data.fileUrl
      });
    } catch (err) {
      setError(err.response?.data?.details || 'Error uploading video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Video Upload App
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <input
            accept="video/*"
            style={{ display: 'none' }}
            id="video-upload"
            type="file"
            onChange={handleFileSelect}
          />
          <label htmlFor="video-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              disabled={uploading}
            >
              Select Video
            </Button>
          </label>

          {selectedFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Selected: {selectedFile.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={uploading}
                sx={{ mt: 2 }}
              >
                {uploading ? <CircularProgress size={24} /> : 'Upload'}
              </Button>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {uploadStatus && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {uploadStatus.message}
              {uploadStatus.url && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    Video URL: {uploadStatus.url}
                  </Typography>
                </Box>
              )}
            </Alert>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 