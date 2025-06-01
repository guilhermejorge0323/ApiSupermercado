module.exports = (password) => {
    const passwordStr = String(password).trim();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(passwordStr);
};
