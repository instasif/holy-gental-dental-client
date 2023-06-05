import React, { useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { user } = useContext(AuthContext);

  //! treatment is just another name of services
  const { name, slots } = treatment;
  const date = format(selectedDate, "PP");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const patient = form.name.value;
    const slot = form.selectedSlot.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const booking = {
      patient,
      slot,
      phone,
      email,
      appoinmentDate: date,
      treatment: name,
    };

    fetch("https://holy-gental-dental-server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking confirmed");
          refetch();
        } else {
          setTreatment(null);
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="appoinmentModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="appoinmentModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            className="mx-4 grid grid-cols-1 gap-3 my-5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={date}
              className="input w-full input-bordered"
              name="date"
              readOnly
            />

            <select
              name="selectedSlot"
              className="select select-bordered w-full"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              readOnly
              placeholder="Your Full Name"
              className="input w-full input-bordered"
            />
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              placeholder="Your Email"
              name="email"
              className="input w-full input-bordered"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              name="phone"
              required
              className="input w-full input-bordered"
            />
            <input
              type="submit"
              value="Add doctor"
              className="btn btn-accent text-white w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
