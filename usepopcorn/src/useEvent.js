import { useEffect } from "react";

export function useEvent(callback, key) {
  useEffect(
    function () {
      function handleKeyPress(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          callback();
        }
      }
      document.addEventListener("keydown", handleKeyPress);

      return function () {
        document.removeEventListener("keydown", handleKeyPress);
      };
    },
    [callback]
  );
}
