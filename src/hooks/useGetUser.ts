import { supabase } from "@/supabase/createClient";
import { useUserStore } from "@/zustand/useUserStore";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";



export function useGetUser() {
    const setUser = useUserStore((state) => state.setUser);
  
    useEffect(() => {
      async function getUser() {
        const response  = await supabase.auth.getUser();
        const session = await supabase.auth.getSession();
        if (session.data.session){
            console.log(jwtDecode(session.data.session.access_token));
        } else {
            console.log("no session");
        }
        
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