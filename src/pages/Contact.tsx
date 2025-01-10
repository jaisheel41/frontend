import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser"; // Import EmailJS

const Contact: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateStep = (): boolean => {
    let newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (currentStep === 0 && !formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (currentStep === 1) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
        isValid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Invalid email format.";
          isValid = false;
        }
      }
    }
    if (currentStep === 2 && !formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await emailjs.send(
        "service_bcb3ris", // EmailJS Service ID
        "template_bo0lidd", //  EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "30CdZHuxfoOTdkpoX" // EmailJS Public Key
      );

      setSuccessMessage("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
      setCurrentStep(0);

      // Trigger confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSuccessMessage("Failed to send message. Please try again later.");
    }
  };

  const steps = [
    {
      label: "What’s your name?",
      component: (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-2">
          <motion.input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter your name"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </motion.div>
      ),
    },
    {
      label: "What’s your email?",
      component: (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-2">
          <motion.input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </motion.div>
      ),
    },
    {
      label: "What’s your message?",
      component: (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-2">
          <motion.textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter your message"
            rows={4}
            required
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </motion.div>
      ),
    },
  ];

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
      Let's <span className="text-blue-500">Connect</span>
      </h1>

      {successMessage && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="mb-6 text-green-600 text-center font-semibold">
          {successMessage}
        </motion.div>
      )}

      {!successMessage && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
          <h2 className="text-xl font-semibold text-center">{steps[currentStep].label}</h2>
          {steps[currentStep].component}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextStep}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition w-full"
          >
            {currentStep < 2 ? "Next" : "Submit"}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Contact;
