import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const loaderUrl = process.env.NEXT_PUBLIC_UNITY_LOADER_URL;
const dataUrl = process.env.NEXT_PUBLIC_UNITY_DATA_URL;
const frameworkUrl = process.env.NEXT_PUBLIC_UNITY_FRAMEWORK_URL;
const codeUrl = process.env.NEXT_PUBLIC_UNITY_CODE_URL;

function UnityGame() {
  const hasWindow = typeof window !== "undefined";

  const { unityProvider, loadingProgression, isLoaded, initialisationError } =
    useUnityContext({
      loaderUrl,
      dataUrl,
      frameworkUrl,
      codeUrl,
    });

  const loadingPercent = Math.round(loadingProgression * 100);

  const showMissingConfig =
    !loaderUrl || !dataUrl || !frameworkUrl || !codeUrl;

  if (!hasWindow) {
    return (
      <div className="flex min-h-[300px] items-center justify-center bg-slate-900 text-slate-100">
        <p className="text-sm text-slate-300">
          Unity simulation is only available in the browser.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-6 bg-slate-950 px-4 py-8 text-slate-50">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60 backdrop-blur">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50">
              Unity Simulation
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              This interactive view is powered by a Unity WebGL build.
            </p>
          </div>
          {!isLoaded && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 ring-1 ring-amber-500/40">
              Loading {loadingPercent}%
            </span>
          )}
        </div>

        {showMissingConfig && (
          <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
            <p className="font-medium">Unity WebGL URLs are not configured.</p>
            <p className="mt-1">
              Please set{" "}
              <code className="rounded bg-slate-900/80 px-1 py-0.5">
                NEXT_PUBLIC_UNITY_LOADER_URL
              </code>
              ,{" "}
              <code className="rounded bg-slate-900/80 px-1 py-0.5">
                NEXT_PUBLIC_UNITY_DATA_URL
              </code>
              ,{" "}
              <code className="rounded bg-slate-900/80 px-1 py-0.5">
                NEXT_PUBLIC_UNITY_FRAMEWORK_URL
              </code>{" "}
              and{" "}
              <code className="rounded bg-slate-900/80 px-1 py-0.5">
                NEXT_PUBLIC_UNITY_CODE_URL
              </code>{" "}
              in your environment configuration.
            </p>
          </div>
        )}

        {initialisationError && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-100">
            <p className="font-medium">Unable to load Unity content.</p>
            <p className="mt-1 break-words">
              {initialisationError.message || String(initialisationError)}
            </p>
          </div>
        )}

        {!isLoaded && !initialisationError && !showMissingConfig && (
          <div className="mb-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400 transition-[width] duration-300 ease-out"
                style={{ width: `${loadingPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Preparing the Unity runtime and assets. This may take a few
              moments on first load.
            </p>
          </div>
        )}

        <div className="relative mt-2 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
          <div className="aspect-video w-full bg-slate-900/80">
            {!showMissingConfig && (
              <Unity
                unityProvider={unityProvider}
                className="h-full w-full"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnityGame;

