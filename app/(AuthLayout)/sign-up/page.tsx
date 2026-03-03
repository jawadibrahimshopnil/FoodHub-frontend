import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";


export default async function SignUpPage() {

  return (
    <div className="w-full">
      {/* 3. Render the Client Component Form */}
      <SignUpForm />
    </div>
  );
}