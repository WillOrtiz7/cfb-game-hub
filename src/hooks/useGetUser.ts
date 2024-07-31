import { supabase } from "@/supabase/createClient";
import { useUserStore } from "@/zustand/useUserStore";
import { useEffect } from "react";



export function useGetUser() {
    const setUser = useUserStore((state) => state.setUser);
  
    useEffect(() => {
      async function getUser() {
        const response  = await supabase.auth.getUser();
        
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      }
      getUser();
    }, [ setUser]);

    supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
        }
    });
}