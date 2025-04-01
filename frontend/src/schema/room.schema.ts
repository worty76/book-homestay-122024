import * as z from "zod";

// Basic info validation
export const basicInfoSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  category: z.string().min(1, "Category is required"),
  floor: z.number().int().min(1, "Floor must be a positive number"),
  status: z.enum(["available", "booked", "maintenance", "inactive"], {
    required_error: "Status is required",
  }),
});

// Description validation
export const descriptionSchema = z.object({
  description: z.string().optional(),
});

// Pricing validation
export const pricingSchema = z.object({
  pricing: z.object({
    basePrice: z.number().min(0, "Base price must be non-negative"),
    cleaningFee: z.number().min(0, "Cleaning fee must be non-negative"),
    securityDeposit: z.number().min(0, "Security deposit must be non-negative"),
    weekendRate: z
      .number()
      .min(0, "Weekend rate must be non-negative")
      .optional(),
    weeklyDiscount: z
      .number()
      .min(0)
      .max(100, "Discount must be between 0 and 100")
      .optional(),
    monthlyDiscount: z
      .number()
      .min(0)
      .max(100, "Discount must be between 0 and 100")
      .optional(),
  }),
});

// Amenities validation
export const amenitiesSchema = z.object({
  amenities: z.array(z.string()).optional(),
});

// Facilities validation
export const bedsDescriptionSchema = z.array(
  z.object({
    type: z.enum(["Single", "Double", "Queen", "King"], {
      required_error: "Bed type is required",
    }),
    count: z.number().int().min(1, "Number of beds must be at least 1"),
  })
);

export const facilitiesSchema = z.object({
  bedrooms: z
    .number()
    .int()
    .min(1, "Number of bedrooms is required")
    .optional(),
  facilities: z.object({
    bathrooms: z.number().min(1, "Number of bathrooms is required"),
    roomSize: z.number().min(1, "Room size is required"),
    bedsDescription: bedsDescriptionSchema,
  }),
});

// House rules validation
export const houseRulesSchema = z.object({
  houseRules: z.object({
    smokingAllowed: z.boolean(),
    petsAllowed: z.boolean(),
    partiesAllowed: z.boolean(),
    checkInTime: z.string().min(1, "Check-in time is required"),
    checkOutTime: z.string().min(1, "Check-out time is required"),
    quietHours: z
      .object({
        from: z.string(),
        to: z.string(),
      })
      .optional(),
  }),
});

// Image validation
export const imageSchema = z.object({
  image: z.array(z.string()).optional(),
});

// Capacity validation
export const capacitySchema = z.object({
  capacity: z.object({
    maxGuests: z.number().min(1, "Maximum guests is required"),
    maxAdults: z.number().min(1, "Maximum adults is required"),
    maxChildren: z.number().min(0, "Maximum children must be non-negative"),
  }),
});

// Daily rate validation
export const dailyRateSchema = z.object({
  dailyRate: z.number().min(0, "Daily rate must be non-negative"),
});

// Shared property validation
export const sharedSchema = z.object({
  shared: z.boolean().optional(),
});

// Complete room schema combining all sections
export const roomSchema = z
  .object({
    _id: z.string().optional(),
  })
  .merge(basicInfoSchema)
  .merge(descriptionSchema)
  .merge(pricingSchema)
  .merge(amenitiesSchema)
  .merge(facilitiesSchema)
  .merge(houseRulesSchema)
  .merge(imageSchema)
  .merge(capacitySchema)
  .merge(dailyRateSchema)
  .merge(sharedSchema);

// Types based on the schemas
export type RoomFormValues = z.infer<typeof roomSchema>;
export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
export type DescriptionFormValues = z.infer<typeof descriptionSchema>;
export type PricingFormValues = z.infer<typeof pricingSchema>;
export type AmenitiesFormValues = z.infer<typeof amenitiesSchema>;
export type FacilitiesFormValues = z.infer<typeof facilitiesSchema>;
export type HouseRulesFormValues = z.infer<typeof houseRulesSchema>;
export type ImageFormValues = z.infer<typeof imageSchema>;
export type CapacityFormValues = z.infer<typeof capacitySchema>;
export type DailyRateFormValues = z.infer<typeof dailyRateSchema>;
export type SharedFormValues = z.infer<typeof sharedSchema>;
