import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BedDoubleIcon, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

const formSchema = z.object({
  location: z.string().min(2).max(50),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z.string().min(1, {
    message: "Please select at least 1 adult",
  }),
  children: z.string().min(1, {
    message: "Please select at least 1 adult",
  }),
  rooms: z.string().min(1, {
    message: "Please select at least 1 room",
  }),
});

function SearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      dates: {
        from: undefined,
        to: undefined,
      },
      adults: "1",
      children: "0",
      rooms: "1",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    // <div className="bg-[#1e2139] p-4 mb-4">
    //   <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center">
    //     <div className="relative flex-1">
    //       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
    //       <Input
    //         className="pl-10 bg-white"
    //         placeholder="Hồ Chí Minh"
    //         defaultValue="Hồ Chí Minh - 5,062 nơi ở có phòng"
    //       />
    //     </div>
    //     <div className="flex gap-2">
    //       <Button variant="outline" className="flex-1 md:flex-none bg-white">
    //         <Calendar className="mr-2 h-4 w-4" />
    //         23 - 26 tháng 1
    //       </Button>
    //       <Button variant="outline" className="flex-1 md:flex-none bg-white">
    //         <Users className="mr-2 h-4 w-4" />2 người lớn, 1 phòng
    //       </Button>
    //     </div>
    //     <Button className="bg-blue-500 hover:bg-blue-600">TÌM</Button>
    //   </div>
    // </div>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg"
      >
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex">
                  Location
                  <BedDoubleIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>
                <FormMessage />

                <FormControl>
                  <Input placeholder="ho chi minh" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full lg:max-w-sm flex-1 items-center gap-1.5">
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Dates</FormLabel>
                <FormMessage />

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        name="dates"
                        variant={"outline"}
                        className={cn(
                          "w-full lg:w-[300px] justify-start text-left font-normal",
                          !field.value.from && "text-muted-forceground"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value?.from, "LLL dd y")} -{" "}
                              {format(field.value?.to, "LLL dd y")}
                            </>
                          ) : (
                            format(field.value?.from, "LLL dd y")
                          )
                        ) : (
                          <span>Select your dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      defaultMonth={field.value.from}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full items-center space-x-2">
          <div className="grid items-center flex-1">
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Adults</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Adults" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid items-center flex-1">
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Adults</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Children" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid items-center flex-1">
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Rooms</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Adults" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-auto">
          <Button type="submit" className="bg-blue-500 text-base">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
