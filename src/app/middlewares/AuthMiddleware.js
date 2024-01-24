const jwt = require('jsonwebtoken');
const User = require('../models/User');

const keySecret = 'jwt-secret';

// Check cookie jwt
function authMiddleware(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, keySecret, async (err, decodedToken) => {
            if (err) {
                // console.log(err.message)
                res.locals.userEmail = null;
                if (!['/auth/sign-in', '/auth/sign-up'].includes(req.url)) {
                    res.redirect('/auth/sign-up');
                } else {
                    next();
                }
            } else {
                // console.log(decodedToken)
                let user = await User.findOne({ _id: decodedToken.id });
                res.locals.name = user.name;
                if (['/auth/sign-in', '/auth/sign-up'].includes(req.url)) {
                    res.redirect('/');
                } else {
                    if(user.name != "Admin" && (req.url.includes('/me/') || req.url.includes('/create') || req.url.includes('/edit'))) {/////////////////
                        res.redirect('/');
                    } else {
                        next();
                    }
                }
                
            }
        });
    } else {
        res.locals.userEmail = null;
        if (!['/auth/sign-in', '/auth/sign-up'].includes(req.url)) {
            res.redirect('/auth/sign-in');
        } else {
            next();
        }
    }
}

module.exports = authMiddleware;
