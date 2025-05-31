//src/filter.js
import { verifyToken } from "./utils/jwt.js";


export const doFilter = async (req, res, next) => {
    if(req.path === '/auth/login'){
        next();
        return;
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    req.user_data = decoded;
    next();
}