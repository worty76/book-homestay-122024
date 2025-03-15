"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  return (
    <section className="container py-16 md:py-24 mx-auto">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-medium">Hotel Horizon Entebbe</h2>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
                aliquid ex blanditiis veniam officia reiciendis minus. Quaerat
                totam rerum consectetur. Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-black" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    Reservations
                  </p>
                  <p className="text-lg">+256 705 866 700</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-black" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    Email Info
                  </p>
                  <p className="text-lg">info@hotelhorizon.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-black" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    Hotel Address
                  </p>
                  <p className="text-lg">
                    Plot H, 13 Portal Lane,
                    <br />
                    Near Meru Petrol Station Entebbe Uganda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-medium">Get In Touch</h3>
            </div>

            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your fullname"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your nationality"
                    className="bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Enter Subject" className="bg-white" />
                </div>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Enter message here"
                  className="min-h-[120px] bg-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/90"
              >
                SUBMIT
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
