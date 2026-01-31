import { useState, useCallback, useRef } from 'react';

interface PrefetchState {
  prefetchedPatterns: Set<string>;
  prefetchingPatterns: Set<string>;
}

export const usePatternPrefetch = () => {
  const [state, setState] = useState<PrefetchState>({
    prefetchedPatterns: new Set(),
    prefetchingPatterns: new Set(),
  });

  // Debounce timer ref
  const debounceTimerRef = useRef<Record<string, number>>({});

  const prefetchPattern = useCallback((patternId: string, debounceMs: number = 200) => {
    // Clear any existing debounce timer for this pattern
    if (debounceTimerRef.current[patternId]) {
      clearTimeout(debounceTimerRef.current[patternId]);
    }

    // Check if already prefetched or currently prefetching
    if (state.prefetchedPatterns.has(patternId) || state.prefetchingPatterns.has(patternId)) {
      return;
    }

    // Set up debounced prefetch
    debounceTimerRef.current[patternId] = setTimeout(() => {
      // Mark as prefetching
      setState((prev) => ({
        ...prev,
        prefetchingPatterns: new Set([...prev.prefetchingPatterns, patternId]),
      }));

      // Dynamically import the pattern component
      import(`../patterns/${patternId}/index.tsx`)
        .then(() => {
          setState((prev) => ({
            prefetchedPatterns: new Set([...prev.prefetchedPatterns, patternId]),
            prefetchingPatterns: new Set(
              [...prev.prefetchingPatterns].filter((id) => id !== patternId)
            ),
          }));
          console.log(`✅ Prefetched pattern: ${patternId}`);
        })
        .catch((error) => {
          console.error(`❌ Failed to prefetch pattern ${patternId}:`, error);
          setState((prev) => ({
            ...prev,
            prefetchingPatterns: new Set(
              [...prev.prefetchingPatterns].filter((id) => id !== patternId)
            ),
          }));
        });

      // Clean up the debounce timer
      delete debounceTimerRef.current[patternId];
    }, debounceMs);
  }, [state.prefetchedPatterns, state.prefetchingPatterns]);

  const cancelPrefetch = useCallback((patternId: string) => {
    if (debounceTimerRef.current[patternId]) {
      clearTimeout(debounceTimerRef.current[patternId]);
      delete debounceTimerRef.current[patternId];
    }
  }, []);

  const isPrefetched = useCallback(
    (patternId: string) => state.prefetchedPatterns.has(patternId),
    [state.prefetchedPatterns]
  );

  const isPrefetching = useCallback(
    (patternId: string) => state.prefetchingPatterns.has(patternId),
    [state.prefetchingPatterns]
  );

  return {
    prefetchPattern,
    cancelPrefetch,
    isPrefetched,
    isPrefetching,
    prefetchedCount: state.prefetchedPatterns.size,
  };
};
