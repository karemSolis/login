import { usersModel } from '../models/users.js'

class UserManager {
    constructor() {
        this.userModel = new usersModel();

    }


    async addUser(user) {
        try {
            const newUser = new this.userModel(user);
            await newUser.save();
            return 'Usuario creado correctamente';
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return 'Error al crear el usuario';
        }
    }


    async updateUser(id, updatedUser) {
        try {
            const userToUpdate = await this.userModel.findById(id);

            if (!userToUpdate) {
                return 'Usuario no encontrado';
            }


            userToUpdate.set(updatedUser);

            await userToUpdate.save();

            return 'Usuario actualizado correctamente';
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return 'Error al actualizar el usuario';
        }
    }



    async getUsers() {
        try {
            const users = await this.userModel.find({});
            return users;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            return [];
        }
    }


    async getUserById(id) {
        try {
            const user = await this.userModel.findById(id).lean();
            if (!user) {
                return 'Usuario no encontrado';
            }
            return user;
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            return 'Error al obtener usuario por ID: ' + error.message;
        }
    }


    async deleteUser(id) {
        try {
            const user = await this.userModel.findById(id);

            if (!user) {
                return 'Usuario no encontrado';
            }

            await user.remove();
            return 'Usuario eliminado correctamente';
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return 'Error al eliminar el usuario: ' + error.message;
        }
    }


    async validateUser(email) {
        try {
            const user = await this.userModel.findOne({ email });

            if (!user) {
                return 'Usuario no encontrado';
            }

            return user;
        } catch (error) {
            console.error('Error al validar usuario:', error);
            return 'Error al validar usuario: ' + error.message;
        }
    }

}
export default UserManager;