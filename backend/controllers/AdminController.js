const User = require('../models/UserModel');
const AdminUser = require('../models/AdminUserModel');
const bcrypt = require('bcryptjs');

class AdminController {
    // static async index(req, res) {
    //     const userModel = new User()
    //     const users = await userModel.getAll()
    //     return res.status(200).json(users);
    // }


    static async view(req, res) {
        try {
            const userModel = new User();
            const user = await userModel.findOne(req.params.id) // get ID from query 
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async name(req, res) {
        try {
            const userModel = new User();
            const name = await userModel.getName(req.params.id)
            res.json({name});
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    // static async create(req, res) {
    //     const {email, password} = req.body;
    //     const userModel = new User()
    //     //let password = req.body.password;
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     //req.body.password = hashedPassword;
    //      await userModel.create({email, password: hashedPassword})
    //     return res.status(201).json({message: 'User created', user: req.body});
    // }

    static async update(req, res) {
        const userModel = new User()
        const user = await userModel.update(req.params.id, req.body)
        return res.status(200).json(user);
    }

    static async delete(req, res) {
        try {
            const userModel = new User()
            const deletedUser = await userModel.delete(req.params.id);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }

    static async getAdminName(req, res) {
        try {
            const adminUserModel = new AdminUser();
            const name = await adminUserModel.getName(req.params.id)
            res.json({name});
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}


module.exports = AdminController;
