import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheader } from "../components/Subheader"

export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4">
                <Header label={"Sign Up"} />
                <Subheader label={"Enter your information to create an account"} />
                <InputBox label={"First Name"} placeholder={"enter your first name"} />
                <InputBox label={"Last Name"} placeholder={"enter your last name"} />
                <InputBox label={"Email"} placeholder={"enter your email"} />
                <InputBox label={"Password"} />
                <div className="pt-2">
                    <Button label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
            </div>
        </div>
    </div>

}


// there's a lot to fix here