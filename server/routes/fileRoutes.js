import express from 'express';
import {
  uploadFile,
  deleteFile,
  generateAISummary,   // ✅ import new controller
} from '../controllers/fileCon.js';
import { protect } from '../middlewares/authMiddle.js';
import excelUpload from '../middlewares/fileUploadMiddle.js';

const router = express.Router();

// File operations routes
router.post('/upload', protect, excelUpload, uploadFile);
router.delete('/delete/:id', protect, deleteFile);

// ✅ New AI summary route
router.post('/summary', protect, generateAISummary);

export default router;
