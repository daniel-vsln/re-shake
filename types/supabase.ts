export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          label: string
          sort_order: number
        }
        Insert: {
          id: string
          label: string
          sort_order?: number
        }
        Update: {
          id?: string
          label?: string
          sort_order?: number
        }
        Relationships: []
      }
      cocktail_categories: {
        Row: {
          category_id: string
          cocktail_id: string
        }
        Insert: {
          category_id: string
          cocktail_id: string
        }
        Update: {
          category_id?: string
          cocktail_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'cocktail_categories_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'cocktail_categories_cocktail_id_fkey'
            columns: ['cocktail_id']
            isOneToOne: false
            referencedRelation: 'cocktails'
            referencedColumns: ['id']
          },
        ]
      }
      cocktail_ingredients: {
        Row: {
          amount: number
          cocktail_id: string
          id: number
          ingredient_id: string
          sort_order: number
        }
        Insert: {
          amount: number
          cocktail_id: string
          id?: never
          ingredient_id: string
          sort_order?: number
        }
        Update: {
          amount?: number
          cocktail_id?: string
          id?: never
          ingredient_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: 'cocktail_ingredients_cocktail_id_fkey'
            columns: ['cocktail_id']
            isOneToOne: false
            referencedRelation: 'cocktails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'cocktail_ingredients_ingredient_id_fkey'
            columns: ['ingredient_id']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
        ]
      }
      cocktails: {
        Row: {
          abv: number | null
          cloned_from: string | null
          created_at: string
          created_by: string | null
          difficulty: string
          garnish: string | null
          glass: string | null
          id: string
          image: string | null
          is_public: boolean
          method: string | null
          name: string
          notes: string | null
          prep_time: string | null
          tags: string[] | null
        }
        Insert: {
          abv?: number | null
          cloned_from?: string | null
          created_at?: string
          created_by?: string | null
          difficulty: string
          garnish?: string | null
          glass?: string | null
          id: string
          image?: string | null
          is_public?: boolean
          method?: string | null
          name: string
          notes?: string | null
          prep_time?: string | null
          tags?: string[] | null
        }
        Update: {
          abv?: number | null
          cloned_from?: string | null
          created_at?: string
          created_by?: string | null
          difficulty?: string
          garnish?: string | null
          glass?: string | null
          id?: string
          image?: string | null
          is_public?: boolean
          method?: string | null
          name?: string
          notes?: string | null
          prep_time?: string | null
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: 'cocktails_cloned_from_fkey'
            columns: ['cloned_from']
            isOneToOne: false
            referencedRelation: 'cocktails'
            referencedColumns: ['id']
          },
        ]
      }
      collection_cocktails: {
        Row: {
          added_at: string
          cocktail_id: string
          collection_id: number
        }
        Insert: {
          added_at?: string
          cocktail_id: string
          collection_id: number
        }
        Update: {
          added_at?: string
          cocktail_id?: string
          collection_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'collection_cocktails_cocktail_id_fkey'
            columns: ['cocktail_id']
            isOneToOne: false
            referencedRelation: 'cocktails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'collection_cocktails_collection_id_fkey'
            columns: ['collection_id']
            isOneToOne: false
            referencedRelation: 'collections'
            referencedColumns: ['id']
          },
        ]
      }
      collections: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string | null
          id: number
          is_public: boolean
          name: string
          user_id: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: never
          is_public?: boolean
          name: string
          user_id: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: never
          is_public?: boolean
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'collections_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      ingredients: {
        Row: {
          category: string
          color: string | null
          id: string
          image_url: string | null
          name: string
          unit: string
        }
        Insert: {
          category: string
          color?: string | null
          id: string
          image_url?: string | null
          name: string
          unit: string
        }
        Update: {
          category?: string
          color?: string | null
          id?: string
          image_url?: string | null
          name?: string
          unit?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          cocktail_id: string
          completed_at: string
          id: number
          ingredient_score: number | null
          measurement_score: number | null
          measurements: Json | null
          score: number
          selected_ingredients: string[] | null
          serving_correct: boolean | null
          serving_glass: string | null
          serving_method: string | null
          user_id: string
        }
        Insert: {
          cocktail_id: string
          completed_at?: string
          id?: never
          ingredient_score?: number | null
          measurement_score?: number | null
          measurements?: Json | null
          score: number
          selected_ingredients?: string[] | null
          serving_correct?: boolean | null
          serving_glass?: string | null
          serving_method?: string | null
          user_id: string
        }
        Update: {
          cocktail_id?: string
          completed_at?: string
          id?: never
          ingredient_score?: number | null
          measurement_score?: number | null
          measurements?: Json | null
          score?: number
          selected_ingredients?: string[] | null
          serving_correct?: boolean | null
          serving_glass?: string | null
          serving_method?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'training_sessions_cocktail_id_fkey'
            columns: ['cocktail_id']
            isOneToOne: false
            referencedRelation: 'cocktails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'training_sessions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      user_cocktail_progress: {
        Row: {
          attempts_count: number
          best_score: number
          cocktail_id: string
          id: number
          is_favorite: boolean
          last_trained_at: string | null
          mastery_percent: number
          stars: number
          user_id: string
        }
        Insert: {
          attempts_count?: number
          best_score?: number
          cocktail_id: string
          id?: never
          is_favorite?: boolean
          last_trained_at?: string | null
          mastery_percent?: number
          stars?: number
          user_id: string
        }
        Update: {
          attempts_count?: number
          best_score?: number
          cocktail_id?: string
          id?: never
          is_favorite?: boolean
          last_trained_at?: string | null
          mastery_percent?: number
          stars?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_cocktail_progress_cocktail_id_fkey'
            columns: ['cocktail_id']
            isOneToOne: false
            referencedRelation: 'cocktails'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_cocktail_progress_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      user_favorites: {
        Row: {
          cocktail_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          cocktail_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          cocktail_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clone_cocktail: {
        Args: { new_id: string; new_name: string; source_id: string }
        Returns: string
      }
      record_training_result: {
        Args: {
          p_cocktail_id: string
          p_ingredient_score: number
          p_measurement_score: number
          p_measurements: Json
          p_score: number
          p_selected_ingredients: string[]
          p_serving_correct: boolean
          p_serving_glass: string
          p_serving_method: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
