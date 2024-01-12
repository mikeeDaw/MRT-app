import express, { response } from 'express';
import { adminModel } from '../models';
import { login, register, isAuthenticated } from "../controller/authentication";

const router = express.Router();

router.get('/:station', (req, res) => {
    let a = req.params
    res.json({msg: a.station })
 });

// Add new admin document
router.post('/', async (req, res) => {
    const {email, password} = req.body;

    try{
        // .create() returns the created document.
        const admin = await adminModel.create({email, password});
        res.status(200).json({admin});
    }catch(error){
        res.status(400).json({error: error.message})
    }
    res.json()
})

// Admin registration
router.post('/auth/register', register)

// Admin Login
router.post('/auth/login', login)

router.patch('/:station/:id', (req, res) => {

})

router.post('/authVerify/xd', isAuthenticated, (req, res) => { 
    res.status(200).json({message: 'Authenticated'})
})

export default router;