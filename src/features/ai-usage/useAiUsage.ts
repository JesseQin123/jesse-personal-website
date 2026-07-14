import { useQuery } from "@tanstack/react-query";
import type { AiUsageResponse } from "@/features/ai-usage/types";

export const EMPTY_AI_USAGE_RESPONSE: AiUsageResponse = {
  generatedAt: new Date(0).toISOString(),
  expectedMachineIds: [],
  expectedSourceCount: 1,
  machines: [],
};

export function useAiUsage() {
  return useQuery<AiUsageResponse>({
    queryKey: ["public-ai-usage"],
    retry: 2,
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
    queryFn: async () => {
      const response = await fetch("/api/ai-usage");
      if (!response.ok) throw new Error("Unable to load usage data");
      return response.json();
    },
  });
}
