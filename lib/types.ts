// Mealed domain types frontend mirror of the backend-ready schema.
// Aligned with the README's database models so service-layer responses can be
// swapped for real API calls without changing components.

export type UserRole = "consumer" | "chef" | "admin";

export interface User {
 id: string;
 name: string;
 email: string;
 role: UserRole;
 phone?: string;
 image?: string;
 createdAt: string;
 updatedAt: string;
}

export interface ConsumerProfile {
 id: string;
 userId: string;
 dietaryPreferences: string[];
 allergies: string[];
 mealGoals: string[];
 mealsPerWeek?: number;
 fulfillmentPreference: "pickup" | "delivery" | "either";
 createdAt: string;
 updatedAt: string;
}

export interface ChefProfile {
 id: string;
 userId: string;
 displayName: string;
 bio: string;
 specialty: string;
 location: string;
 neighborhood: string;
 latitude?: number;
 longitude?: number;
 serviceRadius?: number;
 profilePhoto?: string;
 avatarGradient: [string, string];
 initials: string;
 pickupEnabled: boolean;
 deliveryEnabled: boolean;
 deliveryRadius?: number;
 deliveryFee?: number;
 customRequestsEnabled: boolean;
 minimumCustomOrderAmount?: number;
 rating: number | null;
 reviewCount: number;
 verificationStatus: "unverified" | "in_review" | "verified" | "rejected";
 payoutStatus: "not_setup" | "pending" | "ready";
 verified: boolean;
 featured?: boolean;
 badges: string[];
 createdAt: string;
 updatedAt: string;
}

export interface Meal {
 id: string;
 chefId: string;
 name: string;
 description?: string;
 imageUrl?: string;
 palette: string;
 category?: string;
 price: number;
 bundlePrice?: number;
 bundle?: { count: number; price: number; label?: string };
 mealsIncluded?: number;
 ingredients?: string[];
 allergens: string[];
 calories?: number;
 protein?: number;
 carbs?: number;
 fat?: number;
 macros?: { cal: number; p: number; c: number; f: number };
 portionSize?: string;
 availableDays?: string[];
 pickupAvailable: boolean;
 deliveryAvailable: boolean;
 tags: string[];
 rating: number | null;
 reviewCount: number;
 active: boolean;
 createdAt: string;
 updatedAt: string;
}

export interface MenuItem {
 id: string;
 menuId: string;
 mealId: string;
 day: string;
 quantityAvailable: number;
}

export interface Menu {
 id: string;
 chefId: string;
 title: string;
 weekStartDate: string;
 weekEndDate: string;
 active: boolean;
 items: MenuItem[];
}

export type OrderStatus =
 | "pending"
 | "accepted"
 | "preparing"
 | "ready_for_pickup"
 | "out_for_delivery"
 | "completed"
 | "cancelled"
 | "refunded";

export type FulfillmentType = "pickup" | "delivery";

export interface OrderItem {
 id: string;
 orderId: string;
 mealId: string;
 meal?: Meal;
 quantity: number;
 unitPrice: number;
 total: number;
}

export interface FeeBreakdown {
 subtotal: number;
 serviceFee: number;
 protectionFee: number;
 deliveryFee: number;
 customRequestFee?: number;
 chefCommission: number;
 chefPayout: number;
 total: number;
}

export interface Order {
 id: string;
 consumerId: string;
 chefId: string;
 chef?: ChefProfile;
 status: OrderStatus;
 fulfillmentType: FulfillmentType;
 pickupTime?: string;
 deliveryAddress?: string;
 items: OrderItem[];
 fees: FeeBreakdown;
 notes?: string;
 allergyConfirmed: boolean;
 completedAt?: string;
 payoutEligibleAt?: string;
 createdAt: string;
 updatedAt: string;
}

export interface CustomRequest {
 id: string;
 consumerId: string;
 chefId: string;
 status: "pending" | "quoted" | "accepted" | "declined" | "expired";
 goal: string;
 mealsPerWeek: number;
 numberOfDays: number;
 dietaryRequirements: string[];
 allergies: string[];
 foodsToAvoid: string[];
 preferredProteins: string[];
 budget: number;
 fulfillmentPreference: "pickup" | "delivery" | "either";
 desiredStartDate: string;
 notes?: string;
 createdAt: string;
 updatedAt: string;
}

export interface CustomQuote {
 id: string;
 customRequestId: string;
 chefId: string;
 consumerId: string;
 description: string;
 price: number;
 serviceFee: number;
 protectionFee: number;
 deliveryFee: number;
 total: number;
 status: "pending" | "accepted" | "declined" | "expired";
 expiresAt: string;
 createdAt: string;
 updatedAt: string;
}

export interface Review {
 id: string;
 reviewerId: string;
 reviewerName: string;
 chefId: string;
 mealId?: string;
 orderId?: string;
 type: "chef" | "meal";
 rating: number;
 text: string;
 tags: string[];
 imageUrls: string[];
 createdAt: string;
}

export interface MessageThread {
 id: string;
 consumerId: string;
 chefId: string;
 orderId?: string;
 customRequestId?: string;
 lastMessage?: Message;
 unread: number;
 consumer?: { id: string; name: string; image?: string };
 chef?: { id: string; name: string; image?: string; initials: string };
 createdAt: string;
 updatedAt: string;
}

export interface Message {
 id: string;
 threadId: string;
 senderId: string;
 body: string;
 readAt?: string;
 createdAt: string;
}

export interface Favorite {
 id: string;
 consumerId: string;
 chefId?: string;
 mealId?: string;
 createdAt: string;
}

export interface Payout {
 id: string;
 chefId: string;
 orderId: string;
 amount: number;
 status: "pending" | "eligible" | "paid";
 eligibleAt: string;
 paidAt?: string;
 createdAt: string;
}

export interface ReportIssue {
 id: string;
 reporterId: string;
 orderId?: string;
 chefId?: string;
 mealId?: string;
 type: string;
 description: string;
 status: "open" | "investigating" | "resolved" | "closed";
 adminNotes?: string;
 createdAt: string;
}

export interface CartItem {
 mealId: string;
 chefId: string;
 quantity: number;
}
