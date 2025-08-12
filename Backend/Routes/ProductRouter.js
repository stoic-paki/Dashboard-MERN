import { Router } from "express";
import { ensureAuthenticated } from "../Middlewares/Auth.js";

const router = Router();
router.get('/',ensureAuthenticated ,(req, res) => {
    console.log(`---logged in user detail--- \n ${req.user}`, req.user)
    res.status(200).json([
        {
            productName: 'mobile',
            price: 10000,
        },
        {
            productName: 'tv',
            price: 40000,
        },
        {
            productName: 'headphone',
            price: 5000,
        },
        {
            productName: 'ipod',
            price: 15000,
        },
    ])
});

export default router;
