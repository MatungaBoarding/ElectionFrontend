import React from 'react';
import background from './../assets/background.png';
import Navbar from './../Components/Navbar'
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import { login_url, unprotected_api_call } from './../api/api';

// export { login_url, unprotected_api_call } from './../api/api';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          isLoading: false,
          errMsg: '',
          email: '',
          pwd: ''
        }
    }

    login = async (e) => {
      e.preventDefault()
      this.setState({isLoading: true})
      const RegexEmail = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
      const RegexPassword = /[a-zA-Z0-9%!@#$^&*;:?\/'\"<,>\.(){}\[\]]{8,}/;

      if(this.state.email === '' || this.state.pwd === ''){
        this.setState({errMsg: "Enter Email and Password"})
        return
      // }else if(!RegexEmail.test(this.state.email)){
      //   this.setState({errMsg: "Enter Valid Email"})
      //   return
      }
      // else if(!RegexPassword.test(this.state.pwd)){
      //   this.setState({errMsg: "Enter Valid Password"})
      //   return
      // }
      else{
        let resp = await unprotected_api_call(login_url, {email: this.state.email, password: this.state.pwd})
        if(resp.status === 200){
          let text = JSON.parse(await resp.text());
          localStorage.setItem("user_data", JSON.stringify(text["data"]));
          this.setState({isLoading: false})
          // console.log()
          window.location.href = "/dashboard"
        }else if(resp.status === 401){
          this.setState({errMsg: "Invalid Email or Password"})
        }else{
          this.setState({errMsg: "Server Error"})
        }
      }
      this.setState({isLoading: false})
    }

    render(){
        return (
          <div className='flex h-screen'>
            {/* <img className='w-screen h-screen' src={background} alt="" /> */}
            <div className="absolute flex flex-col z-1 w-full h-screen top-0 left-0">
              <Navbar type="login"/>
              <div className='flex flex-col items-center md:justify-center grow'>
                <form className="bg-purplegray-100 flex flex-col md:min-h-content w-3/4 md:h-[50vh] md:w-2/5 lg:w-1/3 rounded shadow-lg px-8 py-8 my-36 md:my-12" onSubmit={(e)=>{}}>
                  <div className="mb-5">
                    <h1 className="text-purplegray-400">Your email</h1>
                    <div className="w-full mt-2 h-10 border border-purplegray-400 hover:shadow-md rounded-sm hover:border-purplezinc box-content flex">
                      <div className="h-10 w-10 p-2 border-r-2">
                        <BsFillPersonFill className="h-6 w-6 text-purplezinc" />
                      </div>
                      <input
                        type="text"
                        className="w-full bg-purplegray-100 focus:outline-0 px-4"
                        placeholder="e.g. user@gmail.com"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value, errMsg: ""})}
                      />
                    </div>
                  </div>


                  <div className="mt-2">
                    <h1 className="text-purplegray-400">Your password</h1>
                    <div className="w-full mt-2 h-10 border border-purplegray-400 hover:shadow-md rounded-sm hover:border-purplezinc box-content flex">
                      <div className="h-10 w-10 p-2 border-r-2">
                        <RiLockPasswordFill className="h-6 w-6 text-purplezinc" />
                      </div>
                      <input
                        type="password"
                        className="w-full bg-purplegray-100 focus:outline-0 px-4"
                        placeholder="e.g. user@123"
                        value={this.state.pwd}
                        onChange={e => this.setState({pwd: e.target.value, errMsg: ""})}
                      />
                    </div>
                    <h1 className="text-red-500 text-sm mt-1">{this.state.errpwd ? 'Enter Password' : '‎'}</h1>
                  </div>
                  <h1 className='text-red-500'>{this.state.errMsg}</h1>

                  <div className="w-full flex flex-col items-center mt-auto">
                    <button
                      type="submit"
                      className="w-1/2 h-12 flex justify-center items-center rounded-full bg-purplegray-600 text-purplegray-100 text-lg hover:shadow-md"
                      onClick={this.login}
                      >
                      {this.state.isLoading ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>Log In</h1>}
                    </button>
                  </div>
                </form>
              </div>  

            </div>
          </div>
        )
    }
}

export default Login