const User = require("../models/user");
module.exports.signUpForm =(req, res) => {
    res.render("user/signup.ejs"); 
};

module.exports.signUp = async (req, res) => {
    let { username, email, password } = req.body;
    try {
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        // console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to wonderlust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm =(req, res) => {
    res.render("user/login.ejs");
};

module.exports.logIn = async (req, res) => {
    req.flash("success", "welcome back to wonderlust!");
    let redirectUrl =res.locals.redirectUrl||"/listings"
    res.redirect(redirectUrl);
};

module.exports.logOut =(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged");
        res.redirect("/listings");
    })
};