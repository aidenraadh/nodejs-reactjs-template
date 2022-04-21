const models     = require('../models/index')
const User       = models.User
const bcrypt     = require('bcrypt') 
const Joi        = require('joi')
const filterKeys = require('../utils/filterKeys')
const logger     = require('../utils/logger')

exports.update = async (req, res) => {
    try{
        // Validate the input
        const {values, errMsg} = await validateInput(req, [
            'name', 'oldPassword', 'newPassword'
        ]) 
        if(errMsg){
            return res.status(400).send({message: errMsg})
        }        
        // Get user
        const user = await User.findOne({
            where: {id: req.user.id},
        })         
        // Update the user
        user.name = values.name
        if(values.newPassword !== ''){
            user.password = values.newPassword
        }
        await user.save()

        res.send({
            user: user,
            message: 'Success updating profile'
        })     
    }catch(err){
        logger.error(err, {errorObj: err})
        res.status(500).send({message: err.message})
    }  
}

/**
 * 
 * @param {object} req - The request body
 * @param {array} input - Key name of the user input
 * @returns {object} - Validated and sanitized input with error message
 */

 const validateInput = async (req, inputKeys) => {
    try {
        const input = filterKeys(req.body, inputKeys)
        const rules = {         
            // Validate the user's name
            name: Joi.string().required().trim().max(100).messages({
                'string.max': "The user's name must below 100 characters",
            }),             
            // Make the user's old password match
            oldPassword: Joi.string().required().trim().allow('', null).external(async (value, helpers) => {
                console.log(req.user.password)
                if(value === ''){ return value }
                if(!await bcrypt.compare(value, req.user.password)){
                    throw {message: "The old password doesn't match"}
                }                
                return value
            }),     
            // Make the user's new password is different from old password
            newPassword: Joi.string().required().trim().allow('', null).external(async (value, helpers) => {
                // If the password is not changed
                if(value === '' && req.body.oldPassword === ''){ return value }
                // If the password is empty but old password is not
                if(value === '' && req.body.oldPassword !== ''){
                    throw {message: "New password must be filled if the old password is filled"}
                }              
                if(value === req.body.oldPassword){
                    throw {message: "The new password must be different"}
                }                     
                const hashedNewPassword = await bcrypt.hash(
                    value, 10
                )                           
                return hashedNewPassword
            }),                         
        }
        // Create the schema based on the input key
        const schema = {}
        for(const key in input){
            if(rules.hasOwnProperty(key)){ schema[key] = rules[key] }
        }        
        // Validate the input
        const values = await Joi.object(schema).validateAsync(input)

        return {values: values}
    } catch (err) {
        return {errMsg: err.message}
    }    
}