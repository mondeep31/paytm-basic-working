import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheader } from "../components/Subheader"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4">
                <Header label={"Sign Up"} />
                <Subheader label={"Enter your information to create an account"} />
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value)
                }}
                    label={"First Name"} placeholder={"enter your first name"} />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value)
                }}
                    label={"Last Name"} placeholder={"enter your last name"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }}
                    label={"Email"} placeholder={"enter your email"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }}
                    label={"Password"} />
                <div className="pt-2">
                    <Button onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")

                        } catch (error) {
                            console.log(error);
                        }

                    }}
                        label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
            </div>
        </div>
    </div>

}


// there's a lot to fix here