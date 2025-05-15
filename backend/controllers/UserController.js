// const User = require('../models/UserModel');
const User = require('../models/AdminUserModel');
// const bcrypt = require('bcryptjs');
const UserUtil = require('../helpers/UserUtil')

class UserController {
    static async index(req, res) {
        const userModel = new User()
        const users = await userModel.getAll()
        return res.status(200).json(users);
    }


    static async view(req, res) {
        try {
            const userModel = new User();
            const user = await userModel.findOne(req.user.id) // find by ID
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async create(req, res) {
        try{
        UserUtil.createUser(req.body);
        return res.status(201).json({message: 'User created', user: req.body});
        }catch(err){
            res.status(400).json({error: 'Something went wrong'});
        }
    }

    static async update(req, res) {
        const userModel = new User()
        try{
            const user = await userModel.update(req.user.id, req.body)
            return res.status(200).json(user);
        }catch(err){
            console.log(err)
            return res.status(500).json({error: 'Something went wrong'});
        }        
    }

    static async delete(req, res) {
        try {
            const userModel = new User()
            const deletedUser = await userModel.delete(req.user.id);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }

    // static async getAdminName(req, res) {
    //     try {
    //         const adminUserModel = new AdminUser();
    //         const name = await adminUserModel.getName(req.params.id)
    //         res.json({name});
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({ error: 'Something went wrong' });
    //     }
    // }
}


module.exports = UserController;
