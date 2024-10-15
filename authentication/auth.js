
const passport = require('passport');



const authMiddleWareHandler = async (req, res, next) => {

    const path = req.path;

    try {

        if (path.includes('/public')) {
            next();
        } else {

            passport.authenticate('jwt', (err, user, info) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(401).json('User is not authenticated!!!!')
                }

                // req.user = user;
                next();
            })(req, res, next);

        }

    } catch (error) {
        console.log(`Error in authMiddleWareHandler`);
        res.status(401).json({ error: error.message });
    }
}




// const auth = (req, res, next) => {
//     let responseObj = {
//         statusCode: 0, 
//         errorMsg: "",
//         data: {}
//     };

//     passport.authenticate('jwt', (err, user, info) => {
//        if (err) { 
//           return next(err);
//        }
//        if (!user) {
//            responseObj.data = info.message 
//            responseObj.statusCode = 401 
//            responseObj.errorMsg = "User is not authenticated!!!!"
//            return res.status(responseObj.statusCode).json(responseObj)
//        }
//        req.user = user;
//        next();
//     })(req, res, next);
//     }



module.exports = { authMiddleWareHandler };