export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
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
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
      flow_revisions: {
        Row: {
          created_at: string
          created_by: string | null
          data: Json
          flow_id: string
          id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          data: Json
          flow_id: string
          id?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          data?: Json
          flow_id?: string
          id?: string
        }
      }
      flows: {
        Row: {
          created_at: string
          data: Json
          id: string
          is_live: boolean
          is_public: boolean
          is_starter: boolean
          organization_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          is_live?: boolean
          is_public?: boolean
          is_starter?: boolean
          organization_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          is_live?: boolean
          is_public?: boolean
          is_starter?: boolean
          organization_id?: string
          title?: string
          updated_at?: string
        }
      }
      integration_configs: {
        Row: {
          created_at: string
          data: Json
          id: string
          integration_id: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          integration_id: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          integration_id?: string
          organization_id?: string
          updated_at?: string
        }
      }
      integration_jobs: {
        Row: {
          created_at: string
          data: Json
          id: string
          integration_config_id: string | null
          session_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          integration_config_id?: string | null
          session_id?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          integration_config_id?: string | null
          session_id?: string | null
          status?: string
          updated_at?: string
        }
      }
      integrations: {
        Row: {
          created_at: string
          data: Json
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          name?: string
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          organization_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id?: string
          updated_at?: string
          user_id?: string
        }
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          name_slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          name_slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          name_slug?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          updated_at?: string
        }
      }
      session_events: {
        Row: {
          created_at: string
          event_data: Json
          event_type: string
          id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          event_data: Json
          event_type: string
          id?: string
          session_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          session_id?: string
        }
      }
      sessions: {
        Row: {
          created_at: string
          data: Json
          expires_at: string
          external_id: string
          finished_at: string | null
          flow_id: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          expires_at: string
          external_id: string
          finished_at?: string | null
          flow_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          expires_at?: string
          external_id?: string
          finished_at?: string | null
          flow_id?: string
          id?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      user_in_organization: {
        Args: {
          user_id: string
          organization_id: string
        }
        Returns: boolean
      }
      user_is_organization_admin: {
        Args: {
          user_id: string
          organization_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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
