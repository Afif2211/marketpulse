const validateEmail = (email) => {
    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
};

const validatePassword = (password) => {
    return password.length >= 8;
};

module.exports = {
    validateEmail,
    validatePassword,
};