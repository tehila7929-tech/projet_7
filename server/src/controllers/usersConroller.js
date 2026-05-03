const UsersService = require('../services/usersService');

const UserController = {

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await UsersService.login(username, password);
                        res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },

    getUserInfo: async (req, res) => {
        try {
            const userId = req.params.userId;
            const userInfo = await UsersService.getUserInfo(userId);
            
            res.status(200).json(userInfo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    checkUserExists: async (req, res) => {
        try {
            const userId = req.params.userId;
            const exists = await UsersService.checkUserExists(userId);
            
            res.status(200).json({ exists });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = UserController;