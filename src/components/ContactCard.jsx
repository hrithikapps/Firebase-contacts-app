import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import AddandUpdateContact from "./AddandUpdateContact";

const ContactCard = ({ contact }) => {
  const deleteCard = async (id) => {
    try {
      deleteDoc(doc(db, "contacts", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="flex bg-yellow justify-between rounded-lg p-2"
        key={contact.id}
      >
        <div className="flex  rounded-lg gap-2">
          <HiOutlineUserCircle className="text-amber-600 text-4xl items-center" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl items-center">
          <RiEditCircleLine />
          <IoMdTrash
            onClick={deleteDoc(contact.id)}
            className="text-orange-600"
          />
        </div>
      </div>
      {/* <AddandUpdateContact isOpen={} onClose={} /> */}
    </>
  );
};

export default ContactCard;
