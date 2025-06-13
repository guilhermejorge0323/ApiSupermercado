const { verify, decode } = require('jsonwebtoken');
const jsonSecret = require('../database/config/jsonSecret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const [, accessToken] = token.split(' ');

    try {
        // Verifica se o token é válido
        verify(accessToken, jsonSecret.secret);

        // Decodifica os dados do token
        const { id, email } = decode(accessToken);

        req.userId = id;
        req.email = email;

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
