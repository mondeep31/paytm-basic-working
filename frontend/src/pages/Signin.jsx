import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { Subheader } from "../components/Subheader"

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Header label={"Sign In"} />
                <Subheader label={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} placeholder={"Enter your email"} />
                <InputBox label={"Password"} placeholder={"Enter your password"} />
                <div className="pt-4">
                    <Button label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>

}