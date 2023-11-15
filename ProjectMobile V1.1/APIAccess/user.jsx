import { isValidEmail } from "../tools/utils.jsx";
import config from "../config";
import axios from "axios";

const postUser = async (user,error) => {
    if (user.password !== user.repeatPassword) {
        error.setErrorPassword("Password are not the same");
    }
    if (!isValidEmail(user.email)) {
        error.setErrorMail("Invalid email");
    }

    if (!error.errorMail && !error.errorPassword)
    {
        await axios
        .post("http://" + config.URL + "/user", {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                password: user.password,
            }
        )
        .then(( response ) => {
            console.log(response);
            //navigation.navigate("SignIn");
            //or directly connect the user with the login
            //get the token back
        })
        .catch(( reason ) => {
            switch (reason.response.request.status){
                case 400:
                    if (!user.email) {
                        error.setErrorMail("Email is missing");
                    }
                    if (!user.userame) {
                        error.setErrorUsername("Username is missing");
                    }
                    if (!user.password){
                        error.setErrorPassword("Password is missing");
                    }
                    break;
                case 409 : 
                    error.setErrorUsername(
                        "Username already exist"
                    );
                    break;
                case 500:
                    console.log("server error");
                    break;
            }
        })
    }

}

export {postUser};
