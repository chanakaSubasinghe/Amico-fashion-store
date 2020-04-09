import axios from 'axios'

class Auth {
    constructor() {

        this.authenticated = false
        this.user = {}  
    }

    register(user,cb){

        // request to server to add a new user
        axios.post('/users', user)
            .then(res => {
                
                if(res.status === 201){
                    console.log('got response')
                    this.authenticated = true
                    this.user = res.data.user

                    localStorage.setItem('JWT_Token', res.data.token)
                }
            })
            .catch(err => {
                console.log('Register error: ' + err.response.data)

                this.authenticated = false;
                this.user = {}
            })

        cb()
    }
  
    login(user,cb) {
        // send request to server
        axios.post('/users/login', user)
            .then(res => {

                if (res.status === 200) {

                    this.authenticated = true
                    this.user = res.data.user

                    localStorage.setItem('JWT_Token', res.data.token)
                }
            })
            .catch(err => {
                console.log('error')

                this.authenticated = false
                this.user = {}
            })

      cb();
    }
  
    logout(cb) {
      this.authenticated = false;
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhh')
      cb();
    }
  
    isAuthenticated() {
         const hello = axios.get('/users/me', 
			{headers: 
				{
					Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`
				}
            })
            .then((res) => {
                console.log(res.data)
                return true
            })
            .catch((err) => {
                return false
            })

            return hello
    }


    getUser(){
        console.log(this.user)
        return axios.get('/users/me', 
        {headers: 
            {
                Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`
            }
        })
        .then(res => {
            
            this.user = res.data

            return this.user
        }).catch(err => {
            
            this.user = {}

            return this.user
        })
    }
  }
  
  export default new Auth();