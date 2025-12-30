const express = require('express');
const router = express.Router();
const BudgetList = require('../models/BudgetList');

router.post("/", async (req,res)=> {
    try{ 
        const newBudgetList = await BudgetList.create(req.body)
        res.status(201).json(newBudgetList);
 }catch (error){
        res.status(500).json({message: "Error creating budget list", error});

    };

});

router.get("/", async (req,res) => {
    try {
        const budgetLists = await BudgetList.find();
        res.status(200).json(budgetLists);
    }catch (error) {
        res.status(500).json({message: "Error fetching budget lists", error});
}
});

router.get("/:id", async (req,res) => {
    try {
        const budgetList = await  budgetList.findById(req.params.id);
        if(!budgetList){
            return res.status(404).json({message: "Budget list not found"});
        }
        res.status(200).json(budgetList);
    }catch (error) {
        res.status(500).json({message: "Error fettching budget list", error});
    }
});

router.put("/:id", async (req,res) => {
    try {
        const updateBudgetList = await BudgetList.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updateBudgetList){
            return res.status(404).json({message: "Budget list not found"});
        }
        res.status(200).json(updateBudgetList);
    }catch (error){
        res.status(500).json({message: "Error updating budget list", error});}
});

router.delete("/:id", async (req,res) => {
    try{
        const deleteBudgetList = await BudgetList.findByIdAndDelete(req.params.id)
        if(!deleteBudgetList){
            return res.status(404).json({message: "Budget list not found"});
        }
        res.status(200).json({message: "Budget list deleted Suscessfully"});

    }catch (error) {
        res.status(500).json({message: "Error deleting budget list", error});
}
});
module.exports = router;