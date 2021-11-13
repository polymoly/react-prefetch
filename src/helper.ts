import { Prefetch } from "./types";

function successTrigger(
  promises: Promise<any>[],
  oneResolved: (value: any) => void,
  onSuccess: () => void,
  status: { isCanceled: boolean },
) {
  let isInvokeRequest = true;

  const timer = setTimeout(() => {
    isInvokeRequest = false;
    !status.isCanceled && onSuccess();
  }, 20000);

  const promise = promiseRace(promises, oneResolved).then(() => {
    clearTimeout(timer);

    isInvokeRequest && !status.isCanceled && onSuccess();
  });

  return promise;
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
  return ({ onProgress, variables }) => {
    const status = { isCanceled: false };
    const promise = new Promise<any>(async (resolve, reject) => {
      try {
        const { promises, onSuccess } = await getPromises(variables);
        resolve(
          await successTrigger(
            promises,
            () => onProgress?.(100 / promises?.length),
            () => onSuccess(variables),
            status,
          ),
        );
      } catch (e) {
        reject(e);
      }
    });

    //@ts-ignore
    promise.cancel = () => {
      status.isCanceled = true;
    };

    return promise;
  };
}
