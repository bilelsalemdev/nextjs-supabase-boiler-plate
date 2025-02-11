import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/hooks/use-toast";

const supabase = createClientComponentClient();

interface QueryOptions {
  select?: string;
  order?: { column: string; ascending?: boolean };
  filter?: { column: string; operator: string; value: any }[];
  limit?: number;
  single?: boolean;
}

// Add type for Supabase response
type PostgrestResponse<T> = T extends Array<any> 
  ? T 
  : T extends object 
    ? T 
    : never;

/**
 * Generic function to fetch data from a Supabase table
 */
export async function getData<T>(
  table: string,
  options: QueryOptions = {}
): Promise<T | T[] | null> {
  try {
    let query = supabase
      .from(table)
      .select(options.select || '*') as any;

    // Apply filters if provided
    if (options.filter) {
      options.filter.forEach(({ column, operator, value }) => {
        query = query.filter(column, operator, value);
      });
    }

    // Apply ordering if provided
    if (options.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending ?? true,
      });
    }

    // Apply limit if provided
    if (options.limit) {
      query = query.limit(options.limit);
    }

    // Execute query
    const { data, error } = options.single
      ? await query.single()
      : await query;

    if (error) throw error;

    return data as PostgrestResponse<T>;
  } catch (error) {
    console.error('Error fetching data:', error);
    toast({
      title: "Error",
      description: "Failed to fetch data"
    });
    return null;
  }
}

/**
 * Generic function to insert data into a Supabase table
 */
export async function insertData<T>(
  table: string,
  data: Partial<T>
): Promise<T | null> {
  try {
    const { data: insertedData, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    toast({
      title: "Success",
      description: "Data inserted successfully",
    });

    return insertedData;
  } catch (error) {
    console.error('Error inserting data:', error);
    toast({
      title: "Error",
      description: "Failed to insert data"
    });
    return null;
  }
}

/**
 * Generic function to update data in a Supabase table
 */
export async function updateData<T>(
  table: string,
  id: string | number,
  data: Partial<T>
): Promise<T | null> {
  try {
    const { data: updatedData, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    toast({
      title: "Success",
      description: "Data updated successfully",
    });

    return updatedData;
  } catch (error) {
    console.error('Error updating data:', error);
    toast({
      title: "Error",
      description: "Failed to update data"
    });
    return null;
  }
}

/**
 * Generic function to delete data from a Supabase table
 */
export async function deleteData(
  table: string,
  id: string | number
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;

    toast({
      title: "Success",
      description: "Data deleted successfully",
    });

    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    toast({
      title: "Error",
      description: "Failed to delete data"
    });
    return false;
  }
}

/**
 * Generic function to upsert (insert or update) data in a Supabase table
 */
export async function upsertData<T>(
  table: string,
  data: Partial<T>
): Promise<T | null> {
  try {
    const { data: upsertedData, error } = await supabase
      .from(table)
      .upsert(data)
      .select()
      .single();

    if (error) throw error;

    toast({
      title: "Success",
      description: "Data saved successfully",
    });

    return upsertedData;
  } catch (error) {
    console.error('Error upserting data:', error);
    toast({
      title: "Error",
      description: "Failed to save data"
    });
    return null;
  }
} 