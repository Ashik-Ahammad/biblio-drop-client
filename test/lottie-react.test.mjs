import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as lottie from "lottie-react";

// lottie-react v3 removed the default export: consumers must use the named
// `Lottie` component and pass the animation through `src`.
test("lottie-react renders the named Lottie component from src", () => {
  const animation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    layers: [],
  };

  const markup = renderToStaticMarkup(
    React.createElement(lottie.Lottie, {
      src: animation,
      autoplay: true,
      loop: true,
    }),
  );

  assert.match(markup, /lottie-display/);
});
