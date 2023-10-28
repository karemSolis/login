import UserManager from "../controllers/UserManager.js";
import { Router } from "express";

const user = new UserManager();
const userRouter = Router();

userRouter.post("/formRegister", async (req, res) => {
    try {
        console.log("Datos recibidos del formulario:", req.body);
        const newUser = req.body;
        console.log("Nuevo usuario recibido:", newUser);
        const result = await user.addUser(newUser);
        console.log("Resultado de addUser:", result);
        res.redirect("/login");
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send("Error al registrar el usuario: " + error.message);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log("Intento de inicio de sesión con email:", email);

        const user = await user.validateUser(email);
        console.log("Usuario validado:", user);

        if (user.password === password) {
            req.session.emailUsuario = user.email;
            req.session.rolUsuario = user.rol;
            req.session.age = user.age;

            if (user.rol === 'admin') {
                req.session.nomUsuario = user.first_name;
                req.session.apeUsuario = user.last_name;
                res.redirect("userProfile");
            } else {
                res.redirect("/products");
            }
        } else {
            res.redirect("../../login");
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send("Error al iniciar sesión: " + error.message);
    }
});


userRouter.get("/logout", (req, res) => { //En este caso, "/logout" es una ruta que se utiliza para gestionar el cierre de sesión de un usuario
    req.session.destroy((error) => {
        if (error) {
            return res.json({ status: 'Cerrar sesión Error', body: error });
        }
        res.redirect('../../login');
    });
});

export default userRouter;
