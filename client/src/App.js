import React, { useState, useCallback } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Paper,
  Alert,
  useTheme
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const theme = useTheme();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid video file');
      setSelectedFile(null);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

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
    <Container maxWidth="md">
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Simple Video Upload App
        </Typography>
        
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Upload in Seconds. No Hassle.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="primary" />
            <Typography>Select a file</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RocketLaunchIcon color="primary" />
            <Typography>Upload quickly</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SecurityIcon color="primary" />
            <Typography>Secure storage</Typography>
          </Box>
        </Box>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 3,
            border: isDragging ? `2px dashed ${theme.palette.primary.main}` : '2px dashed #ccc',
            backgroundColor: isDragging ? theme.palette.action.hover : 'background.paper',
            transition: 'all 0.3s ease'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
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
              size="large"
              sx={{ mb: 2 }}
            >
              Choose Video File
            </Button>
          </label>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            or drag and drop your video here
          </Typography>

          {selectedFile && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Selected: {selectedFile.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={uploading}
                size="large"
              >
                {uploading ? <CircularProgress size={24} /> : 'Upload Video'}
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

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          No complex setup. No extra steps. Just fast, frictionless uploads.
        </Typography>
      </Box>
    </Container>
  );
}

export default App; 