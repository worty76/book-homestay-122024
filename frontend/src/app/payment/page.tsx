import AnotherHero from "@/components/main/AnotherHero";
import BookingForm from "@/components/main/payment/BookingForm";
import BookingSummary from "@/components/main/payment/BookingSummary";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <AnotherHero title="" description="" />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <BookingForm />
        <BookingSummary />
      </div>
    </>
  );
};

export default page;
