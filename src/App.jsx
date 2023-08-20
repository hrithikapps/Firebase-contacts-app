import React from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddandUpdateContact from "./components/AddandUpdateContact";

const App = () => {
  const [contacts, setContact] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshots = await getDocs(contactsRef);
        const contactList = contactsSnapshots.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContact(contactList);
      } catch (error) {}
    };

    getContacts();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <Navbar />
        <div className="flex gap-2">
          <div className=" flex-grow flex relative items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              type="text"
              className=" pl-9 h-10 bg-transparent border flex-grow rounded "
            />
          </div>

          <BsFillPlusCircleFill
            onClick={onOpen}
            className="text-white cursor-pointer text-5xl"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 ">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddandUpdateContact isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default App;
