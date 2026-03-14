import LoginCard from "../../components/LoginCard";

export default function PlayerLogin() {
  return (
    <div className="flex justify-center items-center h-full bg-[#e5e5e5]">
      <LoginCard
        bgColour="#AEEBFF"
        title="Welcome back, user!"
        buttonText="Login"
        buttonColour="#8EB3E4"
      />
    </div>
  );
}
