"use client";
import { useEffect, useState } from "react";
import {bookingPlans} from "../lib/data";

export default function Bookings() {
  const [plans, setPlans] = useState([]);

  const [expandedPlan, setExpandedPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    setPlans(bookingPlans || []);
  },[]);
  const toggleExpand = (id) => {
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <h2 className="text-xl font-semibold text-orange-700 text-center">
        Choose Your Camping Plan
      </h2>

      {/* PLAN CARDS (VERTICAL STACK) */}
      <div className="flex flex-col gap-3 w-full ">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-md rounded-sm border border-gray-200 overflow-hidden transition-all"
          >
            {/* HEADER (Always Visible) */}
            <button
              onClick={() => toggleExpand(plan.id)}
              className="w-full flex justify-between items-center px-3 py-3 bg-gradient-to-r from-gray-50 to-orange-50 hover:from-orange-100 hover:to-orange-200 transition-all"
            >
              <h3 className="text-base text-left font-semibold text-gray-800 w-[70%]">
                {plan.title}
              </h3>
              <span className="text-right text-base text-orange-700 font-medium w-[30%]">
                ₹{plan.price}/per
              </span>
            </button>

            {/* DETAILS (Shown only when expanded) */}
            {expandedPlan === plan.id && (
              <div className="p-3 border-t border-gray-200 animate-fadeIn">
                <ul className="list-disc ml-5 text-gray-600 mb-3 text-sm">
                  {plan.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <p className="text-gray-700 font-semibold mt-3 mb-1">
                  💥 Includes:
                </p>
                <ul className="list-disc ml-5 text-gray-600 text-sm mb-4">
                  {plan.includes.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>

                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BOOKING FORM */}
      {selectedPlan && (
        <BookingForm
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}

/* 🧾 Separate Booking Form Component */
function BookingForm({ plan, onClose }) {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: 1,
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = bookingData.persons * plan.price;
    const advance = total * 0.5;
    alert(
      `✅ Booking Confirmed!\n\nName: ${bookingData.name}\nPlan: ${plan.title}\nPersons: ${bookingData.persons}\nTotal: ₹${total}\nAdvance: ₹${advance}`
    );
    setBookingData({
      name: "",
      email: "",
      phone: "",
      persons: 1,
      date: "",
    });
    onClose();
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-orange-700">
          Book: {plan.title}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 text-sm"
        >
          ✕ Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={bookingData.name}
          onChange={(e) =>
            setBookingData({ ...bookingData, name: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={bookingData.email}
          onChange={(e) =>
            setBookingData({ ...bookingData, email: e.target.value })
          }
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={bookingData.phone}
          onChange={(e) =>
            setBookingData({ ...bookingData, phone: e.target.value })
          }
          required
        />
        <input
          type="number"
          min={1}
          placeholder="Number of Persons"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={bookingData.persons}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              persons: Number(e.target.value),
            })
          }
          required
        />
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={bookingData.date}
          onChange={(e) =>
            setBookingData({ ...bookingData, date: e.target.value })
          }
          required
        />

        {/* PRICE SUMMARY */}
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <p className="text-orange-700 font-medium">
            Total Price: ₹{bookingData.persons * plan.price}
          </p>
          <p className="text-sm text-gray-600">
            Advance (50%): ₹
            {(bookingData.persons * plan.price * 0.5).toFixed(0)}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
