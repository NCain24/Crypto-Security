//declare a variable that allows bcryptjs to run in the file
const bcrypt = require('bcryptjs')

//declare a variable that starts as an empty array to store our user information
const users = []

module.exports = {
    login: (req, res) => {
      
      //destructure the username and password from req.body
      const { username, password } = req.body

      //iterate through the users array 
      for (let i = 0; i < users.length; i++) {

        //declare a variable that checks the password against the hashed password
         const synced = bcrypt.compareSync(password, users[i].hash)

        //check to see if the user exists in the database already
        if (users[i].username === username && synced) {

          //if the password and the hashed password are the same...
          if (synced) {

            //store the users data in a variable
            let returnUser = {...users[i]}

            //delete the hashed password that was used in the user information
            delete returnUser.hash
            // console.log(returnUser)

            //return the information of the user
            res.status(200).send(returnUser)
            return
          } 
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        //destructure the req.body to get each value
        const {username, email, firstName, lastName, password} = req.body
        
        //declare two variables that salts and hashes the password of the user
        const salt = bcrypt.genSaltSync(5)
        const hash = bcrypt.hashSync(password, salt)
        
        
        //create the user object, including in the req.body, except for the password which will be the value of of the hash variable
        let user = {
          username,
          email,
          firstName,
          lastName,
          hash
        }
        
        //push the user in to the users array at the top of this page
        users.push(user)

        //use the spread operator on user to get all of the data stored inside and set it to a variable
        let returnUser = {...user}
      // console.log(returnUser)
        //return the information of the user
        res.status(200).send(returnUser)
    }
}