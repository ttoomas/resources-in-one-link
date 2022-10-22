export const loginRes = (req, res) => {
    console.log(req.body);
    res.send('backend connected successfully');
}