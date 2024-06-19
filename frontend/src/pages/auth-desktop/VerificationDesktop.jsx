import { useState, useEffect } from "react";
import "../../style/AdminDesktop.css";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import MoferaLogo from "../../assets/auth-desktop/mofera-login.svg";
import TopCorner from "../../assets/auth-desktop/login-tc.svg";
import BottomCorner from "../../assets/auth-desktop/bc-login.svg";
import Mascot from "../../assets/auth-desktop/login-mascot.svg";
import { motion } from "framer-motion";

function VerificationDesktop() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://mofera-backend-fork-ten.vercel.app/auth/forgot-password", {
        email,
      });
      console.log("Verification email sent:", response.data);
      // Optionally, display a success message or navigate to a different page
    } catch (error) {
      console.error("Error sending verification email:", error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div className="bg-white h-screen">
      {/* Your existing desktop layout goes here */}
      <div className="flex">
        <div className="relative w-full">
          <img src={MoferaLogo} alt="logo" className="absolute top-0 pt-5 pl-5 z-50 w-40"/>
          <img src={TopCorner} alt="" className="fixed z-10"/>
          <img src={BottomCorner} alt="" className="fixed bottom-0 right-0 h-99.999vh"/>
          <img src={Mascot} alt="mascot" className="fixed right-24 top-32 h-md:top-32 h-lg:top-24 w-1/3" />

          <div className="absolute bg-white">
            <motion.div
              initial={{ opacity: 0, x: -200 }} // Start off-screen to the left
              animate={{ opacity: 1, x: 0 }} // Slide to the right into view
              exit={{ opacity: 0, x: 200 }} // Slide out to the right when exiting
              transition={{ duration: 0.5 }}
              className="absolute z-20 p-10"
            >
              <form onSubmit={handleSubmit} className="relative z-20 flex flex-col justify-start pt-56 pl-20 text-primary">
                <p className="text-secondary font-bold text-4xl text-left">Verify Your Email</p>

                <label htmlFor="email" className="text-left secondary font-medium pt-5 text-base">Email</label>
                <Input
                  type="email"
                  name="email"
                  radius="sm"
                  className="pt-1 w-96"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="mt-8">
                  <Button type="submit" className="w-36 bg-secondary text-base text-white font-bold rounded-full">
                    Verify
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationDesktop;
