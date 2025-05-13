const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserUtil = require('../helpers/UserUtil');
require('dotenv').config();

class AuthController {
    static async login(req, res){
        const { email, password } = req.body;
        const userModel = new User();
        
        const user = (await userModel.whereMore({email}))?.[0];
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email, role:user.role, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await userModel.update(user.id, {lastLogin : new Date()})//update last login date to now 
        res.json({ token });
    }

    static async register(req, res) {
        // const {email, password, fullName, role, phone} = req.body;
        // const userModel = new User();
        // const userExists = (await userModel.whereMore({email}))?.[0];
        // if (userExists) return res.status(400).json({message: 'User already exists'});

        // const hashedPassword = await bcrypt.hash(password, 10);
        // await userModel.create({email, password: hashedPassword, fullName, role, phone})

        try{
            await UserUtil.createUser(req.body);        
            res.status(201).json({message: 'User registered successfully'});        
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
}

module.exports = AuthController;
