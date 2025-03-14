import { useAuth } from "@/context/auth";
import { Config } from "@common/Config";
import { useEffect, useState } from "react";


export default function useConfig() {
  const { user } = useAuth();
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    console.log({ user });

    const fetchConfig = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/config`, {
        method: 'GET',
        "credentials": "include",
      });

      const data = await response.json();
      setConfig(data);
    }

    fetchConfig();
  }, [user])

  return [config]

}