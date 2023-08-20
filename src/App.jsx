import React from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddandUpdateContact from "./components/AddandUpdateContact";
import useDiscloser from "./hooks/useDiscloser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotfoundContact from "./components/NotfoundContact";

const App = () => {
  const [contacts, setContact] = useState([]);
  //Using custom hook useDiscloser to maintain code quality
  const { isOpen, onOpen, onClose } = useDiscloser();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContact(contactList);
          return contactList;
        });
      } catch (error) {}
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value)
      );

      setContact(filteredContacts);
      return contactList;
    });
  };
  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <Navbar />
        <div className="flex gap-2">
          <div className=" flex-grow flex relative items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
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
          {contacts.length <= 0 ? (
            <NotfoundContact />
          ) : (
            //Conditional rendering for displaying components if there are no contacts
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddandUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
