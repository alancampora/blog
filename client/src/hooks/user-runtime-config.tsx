import { useState, useEffect } from "react";
import { Config } from "@common/Config";

export default function useUserRuntimeConfig() {
  const [runtimeConfig, setRuntimeConfig] = useState<Config | null>(null);

  useEffect(() => {
    const fetchRuntimeConfig = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/config`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setRuntimeConfig(data);
    }

    fetchRuntimeConfig();
  }, []);

  return [runtimeConfig];
}