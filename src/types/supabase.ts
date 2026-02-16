export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            addresses: {
                Row: {
                    apartment_no: string | null
                    building_no: string
                    city: string
                    country: string
                    created_at: string
                    customer_id: string
                    delivery_notes: string | null
                    id: string
                    is_default: boolean
                    label: string | null
                    lat: number | null
                    lng: number | null
                    postal_code: string
                    street: string
                    updated_at: string
                }
                Insert: {
                    apartment_no?: string | null
                    building_no: string
                    city: string
                    country?: string
                    created_at?: string
                    customer_id: string
                    delivery_notes?: string | null
                    id?: string
                    is_default?: boolean
                    label?: string | null
                    lat?: number | null
                    lng?: number | null
                    postal_code: string
                    street: string
                    updated_at?: string
                }
                Update: {
                    apartment_no?: string | null
                    building_no?: string
                    city?: string
                    country?: string
                    created_at?: string
                    customer_id?: string
                    delivery_notes?: string | null
                    id?: string
                    is_default?: boolean
                    label?: string | null
                    lat?: number | null
                    lng?: number | null
                    postal_code?: string
                    street?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "addresses_customer_id_fkey"
                        columns: ["customer_id"]
                        isOneToOne: false
                        referencedRelation: "customers"
                        referencedColumns: ["id"]
                    },
                ]
            }
            customers: {
                Row: {
                    auth_user_id: string | null
                    created_at: string
                    email: string
                    first_name: string
                    id: string
                    last_name: string
                    marketing_consent: boolean
                    phone: string | null
                    preferences: Json
                    updated_at: string
                }
                Insert: {
                    auth_user_id?: string | null
                    created_at?: string
                    email: string
                    first_name: string
                    id?: string
                    last_name: string
                    marketing_consent?: boolean
                    phone?: string | null
                    preferences?: Json
                    updated_at?: string
                }
                Update: {
                    auth_user_id?: string | null
                    created_at?: string
                    email?: string
                    first_name?: string
                    id?: string
                    last_name?: string
                    marketing_consent?: boolean
                    phone?: string | null
                    preferences?: Json
                    updated_at?: string
                }
                Relationships: []
            }
            delivery_zones: {
                Row: {
                    delivery_window: string | null
                    id: string
                    is_active: boolean
                    name: string
                }
                Insert: {
                    delivery_window?: string | null
                    id?: string
                    is_active?: boolean
                    name: string
                }
                Update: {
                    delivery_window?: string | null
                    id?: string
                    is_active?: boolean
                    name?: string
                }
                Relationships: []
            }
            diet_variants: {
                Row: {
                    currency: string
                    diet_id: string
                    id: string
                    is_active: boolean
                    kcal: number
                    meals_count: number
                    price_per_day: number
                }
                Insert: {
                    currency?: string
                    diet_id: string
                    id?: string
                    is_active?: boolean
                    kcal: number
                    meals_count: number
                    price_per_day: number
                }
                Update: {
                    currency?: string
                    diet_id?: string
                    id?: string
                    is_active?: boolean
                    kcal?: number
                    meals_count?: number
                    price_per_day?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "diet_variants_diet_id_fkey"
                        columns: ["diet_id"]
                        isOneToOne: false
                        referencedRelation: "diets"
                        referencedColumns: ["id"]
                    },
                ]
            }
            diets: {
                Row: {
                    created_at: string
                    description: string | null
                    id: string
                    is_active: boolean
                    name: string
                    slug: string
                    tags: string[]
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_active?: boolean
                    name: string
                    slug: string
                    tags?: string[]
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: string
                    is_active?: boolean
                    name?: string
                    slug?: string
                    tags?: string[]
                }
                Relationships: []
            }
            email_events: {
                Row: {
                    created_at: string
                    customer_id: string | null
                    error: string | null
                    id: string
                    order_id: string | null
                    payload: Json
                    status: string
                    template_key: string
                    to_email: string
                }
                Insert: {
                    created_at?: string
                    customer_id?: string | null
                    error?: string | null
                    id?: string
                    order_id?: string | null
                    payload?: Json
                    status?: string
                    template_key: string
                    to_email: string
                }
                Update: {
                    created_at?: string
                    customer_id?: string | null
                    error?: string | null
                    id?: string
                    order_id?: string | null
                    payload?: Json
                    status?: string
                    template_key?: string
                    to_email?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "email_events_customer_id_fkey"
                        columns: ["customer_id"]
                        isOneToOne: false
                        referencedRelation: "customers"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "email_events_order_id_fkey"
                        columns: ["order_id"]
                        isOneToOne: false
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                ]
            }
            order_deliveries: {
                Row: {
                    delivery_date: string
                    id: string
                    order_id: string
                    skip_reason: string | null
                    status: string
                }
                Insert: {
                    delivery_date: string
                    id?: string
                    order_id: string
                    skip_reason?: string | null
                    status?: string
                }
                Update: {
                    delivery_date?: string
                    id?: string
                    order_id?: string
                    skip_reason?: string | null
                    status?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "order_deliveries_order_id_fkey"
                        columns: ["order_id"]
                        isOneToOne: false
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                ]
            }
            orders: {
                Row: {
                    address_id: string
                    created_at: string
                    currency: string
                    customer_id: string
                    customer_notes: string | null
                    delivery_schedule: Json
                    diet_variant_id: string
                    discount_amount: number
                    discount_code: string | null
                    end_date: string
                    id: string
                    internal_notes: string | null
                    start_date: string
                    status: Database["public"]["Enums"]["order_status"]
                    subtotal: number
                    total: number
                    updated_at: string
                }
                Insert: {
                    address_id: string
                    created_at?: string
                    currency?: string
                    customer_id: string
                    customer_notes?: string | null
                    delivery_schedule?: Json
                    diet_variant_id: string
                    discount_amount?: number
                    discount_code?: string | null
                    end_date: string
                    id?: string
                    internal_notes?: string | null
                    start_date: string
                    status?: Database["public"]["Enums"]["order_status"]
                    subtotal?: number
                    total?: number
                    updated_at?: string
                }
                Update: {
                    address_id?: string
                    created_at?: string
                    currency?: string
                    customer_id?: string
                    customer_notes?: string | null
                    delivery_schedule?: Json
                    diet_variant_id?: string
                    discount_amount?: number
                    discount_code?: string | null
                    end_date?: string
                    id?: string
                    internal_notes?: string | null
                    start_date?: string
                    status?: Database["public"]["Enums"]["order_status"]
                    subtotal?: number
                    total?: number
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "orders_address_id_fkey"
                        columns: ["address_id"]
                        isOneToOne: false
                        referencedRelation: "addresses"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "orders_customer_id_fkey"
                        columns: ["customer_id"]
                        isOneToOne: false
                        referencedRelation: "customers"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "orders_diet_variant_id_fkey"
                        columns: ["diet_variant_id"]
                        isOneToOne: false
                        referencedRelation: "diet_variants"
                        referencedColumns: ["id"]
                    },
                ]
            }
            payments: {
                Row: {
                    amount: number
                    created_at: string
                    currency: string
                    id: string
                    order_id: string
                    paid_at: string | null
                    provider: string | null
                    provider_payment_id: string | null
                    raw: Json
                    status: Database["public"]["Enums"]["payment_status"]
                }
                Insert: {
                    amount: number
                    created_at?: string
                    currency?: string
                    id?: string
                    order_id: string
                    paid_at?: string | null
                    provider?: string | null
                    provider_payment_id?: string | null
                    raw?: Json
                    status?: Database["public"]["Enums"]["payment_status"]
                }
                Update: {
                    amount?: number
                    created_at?: string
                    currency?: string
                    id?: string
                    order_id?: string
                    paid_at?: string | null
                    provider?: string | null
                    provider_payment_id?: string | null
                    raw?: Json
                    status?: Database["public"]["Enums"]["payment_status"]
                }
                Relationships: [
                    {
                        foreignKeyName: "payments_order_id_fkey"
                        columns: ["order_id"]
                        isOneToOne: false
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                ]
            }
            zone_postal_codes: {
                Row: {
                    postal_code: string
                    zone_id: string
                }
                Insert: {
                    postal_code: string
                    zone_id: string
                }
                Update: {
                    postal_code?: string
                    zone_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "zone_postal_codes_zone_id_fkey"
                        columns: ["zone_id"]
                        isOneToOne: false
                        referencedRelation: "delivery_zones"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_or_create_customer: {
                Args: {
                    p_email: string
                    p_first_name: string
                    p_last_name: string
                    p_phone: string
                    p_marketing_consent: boolean
                }
                Returns: string
            }
        }
        Enums: {
            order_status:
            | "draft"
            | "pending_payment"
            | "paid"
            | "active"
            | "paused"
            | "completed"
            | "cancelled"
            | "refunded"
            payment_status: "pending" | "succeeded" | "failed" | "refunded"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {
            order_status: [
                "draft",
                "pending_payment",
                "paid",
                "active",
                "paused",
                "completed",
                "cancelled",
                "refunded",
            ],
            payment_status: ["pending", "succeeded", "failed", "refunded"],
        },
    },
} as const
