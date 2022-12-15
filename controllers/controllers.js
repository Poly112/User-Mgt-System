const { User } = require("../models/index");

exports.get_home = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.render("home", { users });
    } catch (error) {
        next(error);
    }
};

exports.find = async (req, res, next) => {
    const { search } = req.body;
    try {
        const user = await User.findOne({
            where: { first_name: search },
        });
        res.render("home", { users: [user] });
    } catch (error) {
        next(error);
    }
};

exports.post_addUser = async (req, res, next) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    try {
        await User.create({ first_name, last_name, email, comments, phone });
        const users = await User.findAll();
        res.redirect("/");
    } catch (error) {
        res.render("addUser", { failure: error.message });
        console.log(error);
    }
};
exports.get_addUser = async (req, res, next) => {
    res.render("addUser");
};

exports.get_edit = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const user = await User.findOne({ where: { uuid } });
        res.render("edit", { user });
    } catch (error) {
        next(error);
    }
};
exports.post_edit = async (req, res, next) => {
    const { uuid } = req.params;
    const { first_name, last_name, email, phone, comments } = req.body;
    try {
        await User.update(
            { first_name, last_name, email, phone, comments },
            { where: { uuid } }
        );

        const users = await User.findAll();

        res.redirect("/");
    } catch (error) {
        res.render(`/edit/:${uuid}`, { alert: error.message });
        console.log(error);
    }
};

exports.delete = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const user = await User.findOne({
            where: { uuid },
        });

        await user.destroy();
        res.redirect("/");
    } catch (error) {
        const users = await User.findAll();
        console.log(error);
        res.render("home", { users, failure: "Deletion of User failed" });
    }
};

exports.get_user = async (req, res, next) => {
    const { uuid } = req.params;
    try {
        const user = await User.findOne({
            where: { uuid },
        });

        res.render("user", { user });
    } catch (error) {
        next(error);
    }
};
