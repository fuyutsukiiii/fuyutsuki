import ContactForm from "../components/organisms/ContactForm";
import GrayGrid from "../components/organisms/GrayGrid";

const Contact = () => {
  return (
    <div className="h-screen w-screen bg-primary-gray flex flex-col px-6 md:px-0 md:grid md:grid-rows-[2fr_8fr_1fr] md:grid-cols-[1fr_10fr_3fr_1fr_3fr_10fr_1fr] z-1 overscroll-contain">
      <GrayGrid />
      <div className="md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-5 text-primary-blue text-shadow-md flex flex-col justify-center items-start md:items-center gap-2 z-1">
        <span className="text-3xl md:text-7xl font-major-mono-display font-extralight tracking-widest">
          contact
        </span>
        <a
          href="mailto:fuyutsukicontact@gmail.com"
          className="underline opacity-60 pl-6 md:pl-24 font-major-mono-display text-dark-gray text-md md:text-xl"
        >
          fuyutsukicontact@gmail.com
        </a>
      </div>
      <div className="md:row-start-2 md:row-end-3 md:col-start-5 md:col-end-7 flex flex-col justify-center items-center text-dark-gray z-1">
        <div className="h-[70%] w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
