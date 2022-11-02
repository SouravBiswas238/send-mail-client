import React from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
const Login = () => {
    const [user, setUser] = useState({});

    function handelCallbackResponse(response) {

        let userObject = jwt_decode(response.credential);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;

    }
    console.log(user);
    function handelSignOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;

    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "943694526017-1nbf1kubtvkl2r203t8g4e0mmtnolmd2.apps.googleusercontent.com",
            callback: handelCallbackResponse

        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" },

        )

        google.accounts.id.prompt();
    }, [])


    return (
        <div>
            <div id='signInDiv'></div>

            {
                user && <div>
                    <img className=' rounded-circle' src={user.picture} alt="" />
                    <span className='text-white px-2'>{user.name}</span>
                </div>
            }
            {
                Object.keys(user).length !== 0 && <button className='text-primary ms-5 rounded' onClick={handelSignOut}>
                    Logout
                </button>
            }
        </div>
    );
};

export default Login;