const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shift.controller');
const { authenticateToken, isAdmin, authenticateUser } = require('../middleware/auth.middleware');

// All shift routes require authentication
router.use(authenticateToken);

// Create new shift (admin only)
router.post('/', isAdmin, shiftController.createShift);

// Get all shifts (admin can see all, employees only see their own)
router.get('/', shiftController.getAllShifts);

// Get shift by ID
router.get('/:id', shiftController.getShiftById);

// Get shifts by employee
router.get('/employee/:employeeId', authenticateUser, shiftController.getShiftsByEmployee);

// Update shift (admin only)
router.put('/:id', isAdmin, shiftController.updateShift);

// Delete shift (admin only)
router.delete('/:id', isAdmin, shiftController.deleteShift);

module.exports = router;