import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
        <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  );
}
