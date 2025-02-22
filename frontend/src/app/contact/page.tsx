import AnotherHero from "@/components/main/AnotherHero";
import { Contact } from "@/components/main/contact";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <AnotherHero title="" description="" />
      <Contact />
    </>
  );
};

export default page;
