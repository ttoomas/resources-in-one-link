export const logoutRes = (req, res) => {
    res.clearCookie("access_token");
    res.end();
}