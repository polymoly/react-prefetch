import { Prefetch } from "./types";

async function successTrigger(
  promises: Promise<any>[],
  oneResolved: (value: any) => void,
  success: () => void,
) {
  let isInvokeRequest = true;
  const timer = setTimeout(() => {
    isInvokeRequest = false;
    success();
  }, 20000);

  await promiseRace(promises, oneResolved).then(
    () => isInvokeRequest && success(),
  );

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
  }>,
): Prefetch<T> {
  return async ({ onProgress, variables }) => {
    const { promises, onSuccess } = await getPromises(variables);

    return successTrigger(
      promises,
      () => onProgress?.(100 / promises?.length),
      () => onSuccess(variables),
    );
  };
}
