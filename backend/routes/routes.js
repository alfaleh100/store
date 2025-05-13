const express = require('express');
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
// const ProductController = require("../controllers/ProductController");
const auth = require('../middlewares/authMiddleware').userAuth;
const adminAuth = require('../middlewares/authMiddleware').adminAuth;
// const upload = require("../helpers/uploadFiles");
const AdminController = require('../controllers/AdminController');
const router = express.Router();

//login/register
router.post('/login/', AuthController.login);
router.post('/register/', AuthController.register);

//user routes
router.get('/admin/users/', auth, adminAuth,  UserController.index);//need admin role
router.get('/user/', auth, UserController.view);
router.post('/admin/user/create', auth, adminAuth, UserController.create);
router.put('/user/update/', auth, UserController.update);
router.delete('/user/delete/', auth, UserController.delete);

//admin routes
// router.get('/admins/users', auth, adminAuth,  AdminController.index);
router.get('/admin/user/:id', auth, adminAuth, AdminController.view);
// router.post('/admins/create', auth, adminAuth, UserController.create);
router.put('/admin/users/update/:id', auth, adminAuth,  AdminController.update);
router.delete('/admin/users/delete/:id', auth, adminAuth, AdminController.delete)


module.exports = router;
