import { useState } from "react";
import TextInput from "../molecules/TextInput";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const SERVICE_ID = "service_t61wz9o";
  const TEMPLATE_ID = "template_mr1kw6x";
  const PUBLIC_KEY = "E6D6n899sd4zl7LCL";

  const onClick = async () => {
    if (!name || !isValidEmail(email) || !message) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        PUBLIC_KEY
      );
      alert("Email sent.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      alert("Failed to send email. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 pb-8 px-6 text-shadow-md">
      <div className="w-full flex flex-row items-center justify-around gap-4">
        <TextInput
          header="Name"
          placeholder="Enter your name"
          validation={(str) => str.length > 0}
          onChange={(name) => setName(name)}
          value={name}
          setValue={setName}
        />
        <TextInput
          header="Email"
          placeholder="Enter your email"
          validation={isValidEmail}
          onChange={(email) => setEmail(email)}
          value={email}
          setValue={setEmail}
        />
      </div>
      <TextInput
        header="Subject"
        placeholder="Type the subject"
        onChange={(subject) => setSubject(subject)}
        value={subject}
        setValue={setSubject}
      />
      <TextInput
        header="Message"
        placeholder="Type your message here"
        onChange={(message) => setMessage(message)}
        validation={(str) => str.length > 0}
        mode="long-answer"
        value={message}
        setValue={setMessage}
      />
      <motion.div
        className="w-full py-2 mx-8 bg-primary-blue text-white cursor-pointer"
        whileHover={{
          backgroundColor: "white",
          color: "#0023E7",
        }}
        transition={{ ease: "easeInOut", duration: 0.1 }}
      >
        <button className="w-full text-center cursor-pointer" onClick={onClick}>
          Submit
        </button>
      </motion.div>
    </div>
  );
};

export default ContactForm;
