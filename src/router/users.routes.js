import UserManager from "../controllers/UserManager.js";
import { Router } from "express";


const userRouter = Router();
const user = new UserManager();

userRouter.post("/formRegister", async (req, res) => {
    try {
        const newUser = req.body;
        const result = await user.addUser(newUser);
        res.redirect("/login");
    } catch (error) {
        res.status(500).send("Error al registrar el usuario: " + error.message);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await user.validateUser(email);

        if (user.password === password) {
            req.session.emailUsuario = email;
            req.session.rolUsuario = user.rol;

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
        res.status(500).send("Error al iniciar sesión: " + error.message);
    }
});


userRouter.get("/logout", (req, res) => { //En este caso, "/logout" es una ruta que se utiliza para gestionar el cierre de sesión de un usuario
    req.session.destroy((error) => {
        if (error) {
            return res.json({ status: 'Logout Error', body: error });
        }
        res.redirect('../../login');
    });
});

export default userRouter;
