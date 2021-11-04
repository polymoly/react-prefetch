import { Prefetch } from "./types";

async function successTrigger(
  promises: Promise<any>[],
  oneResolved: (value: any) => void,
  onSuccess: () => void,
  onError: (error?: unknown) => void,
) {
  let isInvokeRequest = true;
  const timer = setTimeout(() => {
    isInvokeRequest = false;
    onSuccess();
    onError();
  }, 20000);

  await promiseRace(promises, oneResolved)
    .then(() => isInvokeRequest && onSuccess())
    .catch((error) => onError(error));

  clearTimeout(timer);
}

async function promiseRace(
  promises: Promise<any>[],
  oneResolved: (value: any) => void,
) {
  promises.forEach((promise) => {
    promise.then((value) => {
      oneResolved(value);
    });
  });

  return Promise.all(promises);
}
export function createPrefetch<T extends any>(
  getPromises: (variables?: T) => Promise<{
    promises: Promise<any>[];
    onSuccess: (variables?: T) => void;
    onError?: (error?: unknown) => void;
  }>,
): Prefetch<T> {
  return async ({ onProgress, variables }) => {
    const { promises, onSuccess, onError } = await getPromises(variables);

    return successTrigger(
      promises,
      () => onProgress?.(100 / promises?.length),
      () => onSuccess(variables),
      (error) => onError?.(error),
    );
  };
}
