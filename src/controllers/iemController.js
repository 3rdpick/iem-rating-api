const mongoose = require('mongoose');
const IemReview = require('../models/IemReview');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllIems = async (req, res) => {
  try {
    const { search, brand, signature, minRating } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { modelName: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { driverConfig: { $regex: search, $options: 'i' } },
      ];
    }

    if (brand) {
      filter.brand = { $regex: `^${brand}$`, $options: 'i' };
    }

    if (signature) {
      filter.soundSignature = signature;
    }

    if (minRating !== undefined) {
      const parsedMin = Number(minRating);
      if (Number.isNaN(parsedMin)) {
        return res.status(400).json({
          success: false,
          message: 'Query minRating harus berupa angka',
        });
      }
      filter.overallRating = { $gte: parsedMin };
    }

    const items = await IemReview.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data rating IEM',
      error: error.message,
    });
  }
};

const getIemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Format ID tidak valid',
      });
    }

    const item = await IemReview.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Data IEM tidak ditemukan',
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail data IEM',
      error: error.message,
    });
  }
};

const createIem = async (req, res) => {
  try {
    const newItem = await IemReview.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Data rating IEM berhasil ditambahkan',
      data: newItem,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validasi data gagal',
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan data rating IEM',
      error: error.message,
    });
  }
};

const updateIem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Format ID tidak valid',
      });
    }

    const updatedItem = await IemReview.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Data IEM tidak ditemukan untuk diperbarui',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data rating IEM berhasil diperbarui',
      data: updatedItem,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validasi pembaruan data gagal',
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data rating IEM',
      error: error.message,
    });
  }
};

const deleteIem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Format ID tidak valid',
      });
    }

    const deletedItem = await IemReview.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Data IEM tidak ditemukan untuk dihapus',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data rating IEM berhasil dihapus',
      data: deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus data rating IEM',
      error: error.message,
    });
  }
};

module.exports = {
  getAllIems,
  getIemById,
  createIem,
  updateIem,
  deleteIem,
};
