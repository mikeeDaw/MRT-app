import express, { response } from 'express';
import { adminModel } from '../models';
import { login, register, isAuthenticated } from "../controller/authentication";
import { generateCard, getAllCards, deleteCard, updateLoad } from '../controller/beepCard';
import { makeStation } from '../controller/trainStation';

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


router.post('/authVerify/xd', isAuthenticated, (req, res) => { 
    res.status(200).json({message: 'Authenticated'})
})

// Card Operations
router.post('/beep/generate',isAuthenticated, generateCard)
router.get('/beep/fetchAll',isAuthenticated, getAllCards)
router.delete('/beep/deleteCard', isAuthenticated, deleteCard )
router.patch('/beep/load', isAuthenticated, updateLoad)

// Station Operations
router.post('/station/add', isAuthenticated, makeStation)

export default router;