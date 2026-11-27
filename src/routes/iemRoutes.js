const express = require('express');
const router = express.Router();
const {
  getAllIems,
  getIemById,
  createIem,
  updateIem,
  deleteIem,
} = require('../controllers/iemController');

router.get('/', getAllIems);
router.get('/:id', getIemById);
router.post('/', createIem);
router.put('/:id', updateIem);
router.delete('/:id', deleteIem);

module.exports = router;