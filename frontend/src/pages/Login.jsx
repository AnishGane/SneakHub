import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
        <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
      
      
  );
}
